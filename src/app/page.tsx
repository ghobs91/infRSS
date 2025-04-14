// app/page.tsx
"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArticleSkeleton } from "@/components/ArticleSkeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  fetchAndParseRSS,
  loadFeedsFromStorage,
  type Article,
} from "@/lib/rssUtils";
import { AlertCircle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Navigation } from "@/components/Navigation";
import { ArticleCard } from "@/components/ArticleCard";

// Format date to "Month Day, Year" (e.g., "April 13th, 2025")
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original string if parsing fails
    }
    
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    // Add ordinal suffix to day (1st, 2nd, 3rd, etc.)
    let dayWithOrdinal = day.toString();
    if (day > 3 && day < 21) {
      dayWithOrdinal += "th";
    } else {
      const lastDigit = day % 10;
      switch (lastDigit) {
        case 1: dayWithOrdinal += "st"; break;
        case 2: dayWithOrdinal += "nd"; break;
        case 3: dayWithOrdinal += "rd"; break;
        default: dayWithOrdinal += "th";
      }
    }
    
    return `${month} ${dayWithOrdinal}, ${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return original string if there's an error
  }
}

// Article component to reduce re-renders
const Article = ({ article }: { article: { title: string; link: string; pubDate: string; thumbnail?: string } }) => {
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {article.thumbnail && !imgError && (
            <div className="w-full sm:w-40 h-40 sm:h-auto relative">
              {/* Use unoptimized prop for external images */}
              <Image 
                src={article.thumbnail} 
                alt={article.title}
                fill
                unoptimized
                className="object-cover"
                onError={() => setImgError(true)}
              />
            </div>
          )}
          <div className="flex-1 p-3 sm:p-4">
            <a
              href={article.link}
              className="text-base sm:text-lg font-medium text-[var(--primary)] hover:underline line-clamp-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {article.title}
            </a>
            <div className="flex items-center gap-2 my-1">
              {mounted && (
                <div className="w-4 h-4 relative">
                  <Image
                    src={`https://www.google.com/s2/favicons?sz=16&domain_url=${article.link}`}
                    alt="favicon"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              )}
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                {new URL(article.link).hostname.replace("www.", "")}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {formatDate(article.pubDate)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Add a custom style to the head to control pull-to-refresh behavior
const PullToRefreshStyles = () => {
  return (
    <style jsx global>{`
      .ptr-element {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        color: var(--text-secondary);
        z-index: 10;
        display: none;
        text-align: center;
        height: 50px;
        padding: 12px;
      }
      .ptr-refresh .ptr-element {
        display: block;
      }
      .ptr-pull .ptr-element {
        display: block;
      }
      .ptr-content {
        min-height: calc(100vh - 64px);
      }
      /* Ensure content is scrollable */
      .ptr-track {
        overflow-y: auto !important;
        position: relative;
        z-index: 1;
      }
    `}</style>
  );
};

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const feeds = loadFeedsFromStorage();
      const allArticles: Article[] = [];

      for (const feed of feeds) {
        const result = await fetchAndParseRSS(feed.url);
        if (result) {
          const feedDomain = new URL(feed.url).hostname;
          const articles = result.items.map(item => ({
            ...item,
            sourceDomain: feedDomain
          }));
          allArticles.push(...articles);
        }
      }

      // Sort by date, newest first
      const sortedArticles = allArticles.sort((a, b) => {
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      });

      setArticles(sortedArticles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  useEffect(() => {
    const currentRef = loadMoreRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && articles.length > 0) {
          // Load more logic here if needed
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(currentRef);
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isLoading, articles.length]);

  return (
    <main className="container mx-auto p-4">
      <Navigation />
      
      <div className="mt-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <section className="space-y-4">
          {articles.length === 0 && !isLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No articles found. Add some RSS feeds to get started!
              </p>
            </div>
          ) : (
            <>
              {isLoading && articles.length === 0 ? (
                <div className="space-y-4">
                  <ArticleSkeleton />
                  <ArticleSkeleton />
                  <ArticleSkeleton />
                </div>
              ) : (
                <div className="space-y-4">
                  {articles.map((article, index) => (
                    <ArticleCard key={`${article.link}-${index}`} article={article} />
                  ))}
                </div>
              )}
            </>
          )}
          <div ref={loadMoreRef} className="h-4" />
        </section>
      </div>
    </main>
  );
}

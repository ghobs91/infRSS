// app/page.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArticleSkeleton } from "@/components/ArticleSkeleton";
import {
  fetchAndParseRSS,
  loadFeedsFromStorage,
  loadArticleThumbnails,
  type Article,
} from "@/lib/rssUtils";
import { AlertCircle, RefreshCw } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Navigation } from "@/components/Navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";

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

export default function HomePage() {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const ARTICLES_PER_PAGE = 30;

  // Load articles from feeds
  const loadArticles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const feeds = loadFeedsFromStorage();
      const feedPromises = feeds.map(feed => fetchAndParseRSS(feed.url, false));
      const feedResults = await Promise.all(feedPromises);
      
      // Combine all articles and sort by date
      const articles = feedResults
        .filter((result): result is { title: string; items: Article[] } => result !== null)
        .flatMap(result => result.items)
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

      setAllArticles(articles);
      
      // Display first batch of articles
      setDisplayedArticles(articles.slice(0, ARTICLES_PER_PAGE));
      setHasMore(articles.length > ARTICLES_PER_PAGE);

      // Start loading thumbnails for displayed articles
      const articlesWithThumbnails = await loadArticleThumbnails(articles.slice(0, ARTICLES_PER_PAGE));
      setDisplayedArticles(articlesWithThumbnails);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  // Load more articles when scrolling to the bottom
  const loadMoreArticles = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    
    try {
      const currentCount = displayedArticles.length;
      const nextBatch = allArticles.slice(currentCount, currentCount + ARTICLES_PER_PAGE);
      
      if (nextBatch.length === 0) {
        setHasMore(false);
        setIsLoadingMore(false);
        return;
      }
      
      // Load thumbnails for the next batch
      const nextBatchWithThumbnails = await loadArticleThumbnails(nextBatch);
      
      setDisplayedArticles(prev => [...prev, ...nextBatchWithThumbnails]);
      setHasMore(currentCount + nextBatch.length < allArticles.length);
    } catch (error) {
      console.error("Error loading more articles:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [allArticles, displayedArticles.length, hasMore, isLoadingMore]);

  // Intersection observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && !isLoadingMore && hasMore) {
          loadMoreArticles();
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [isLoading, isLoadingMore, hasMore, loadMoreArticles]);

  return (
    <main className="container mx-auto p-4">
      <Navigation />
      
      <div className="mt-4 max-w-[720px] mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Your Articles</h1>
          <Button 
            variant="default" 
            onClick={loadArticles} 
            disabled={isLoading}
            className="flex items-center gap-1 py-1 px-3 text-sm"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <section className="space-y-4">
          {displayedArticles.length === 0 && !isLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No articles found. Add some RSS feeds to get started!
              </p>
            </div>
          ) : (
            <>
              {isLoading && displayedArticles.length === 0 ? (
                <div className="space-y-4">
                  <ArticleSkeleton />
                  <ArticleSkeleton />
                  <ArticleSkeleton />
                </div>
              ) : (
                <div className="space-y-4">
                  {displayedArticles.map((article, index) => (
                    <ArticleCard key={`${article.link}-${index}`} article={article} />
                  ))}
                </div>
              )}
              
              {/* Loading indicator for infinite scroll */}
              {isLoadingMore && (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              )}
              
              {/* Invisible element to trigger loading more */}
              <div ref={loadMoreRef} className="h-10" />
            </>
          )}
        </section>
      </div>
    </main>
  );
}

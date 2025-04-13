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
} from "@/lib/rssUtils";

const PullToRefresh = dynamic(() => import("react-pull-to-refresh"), { ssr: false });

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
  const [articles, setArticles] = useState<{ title: string; link: string; pubDate: string; thumbnail?: string }[]>([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const lastRefreshTime = useRef<number>(0);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize visible articles to prevent unnecessary re-renders
  const visibleArticles = useMemo(() => {
    return articles.slice(0, visibleCount);
  }, [articles, visibleCount]);

  // Handle refreshing feeds
  const handleRefresh = useCallback(async () => {
    // Prevent multiple refreshes in quick succession
    const now = Date.now();
    if (now - lastRefreshTime.current < 5000) { // 5 second cooldown
      return;
    }
    
    lastRefreshTime.current = now;
    setIsRefreshing(true);
    
    try {
      const feeds = loadFeedsFromStorage();
      if (feeds.length === 0) {
        setIsRefreshing(false);
        return;
      }

      // Fetch feeds in parallel with a timeout
      const fetchPromises = feeds.map(async (feed) => {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
          
          const data = await fetchAndParseRSS(feed.url);
          clearTimeout(timeoutId);
          return data?.items || [];
        } catch (error) {
          console.error(`Error fetching feed ${feed.url}:`, error);
          return [];
        }
      });

      const allArticles = await Promise.all(fetchPromises);
      const sorted = allArticles.flat().sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
      setArticles(sorted);
      setVisibleCount(20); // Reset visible count
    } catch (error) {
      console.error("Error refreshing feeds:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Intersection observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setVisibleCount((prev) => Math.min(prev + 20, articles.length));
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isLoading, articles.length]);

  // Load saved feeds on initial render
  useEffect(() => {
    const loadSavedFeeds = async () => {
      setIsLoading(true);
      try {
        const feeds = loadFeedsFromStorage();
        if (feeds.length === 0) {
          setIsLoading(false);
          setIsInitialLoad(false);
          return;
        }

        // Fetch feeds in parallel with a timeout
        const fetchPromises = feeds.map(async (feed) => {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            const data = await fetchAndParseRSS(feed.url);
            clearTimeout(timeoutId);
            return data?.items || [];
          } catch (error) {
            console.error(`Error fetching feed ${feed.url}:`, error);
            return [];
          }
        });

        const allArticles = await Promise.all(fetchPromises);
        const sorted = allArticles.flat().sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        setArticles(sorted);
      } catch (error) {
        console.error("Error loading feeds:", error);
      } finally {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    };

    setIsClient(true);
    loadSavedFeeds();

    // Set up periodic refresh with a reasonable interval
    const interval = setInterval(() => {
      const now = Date.now();
      // Only refresh if it's been at least 10 minutes since the last refresh
      if (now - lastRefreshTime.current > 10 * 60 * 1000) {
        handleRefresh();
      }
    }, 10 * 60 * 1000); // Check every 10 minutes

    return () => {
      clearInterval(interval);
      const currentTimeoutRef = refreshTimeoutRef.current;
      if (currentTimeoutRef) {
        clearTimeout(currentTimeoutRef);
      }
    };
  }, [handleRefresh]);

  return (
    <>
      <PullToRefreshStyles />
      <main className="space-y-8 px-4 max-w-4xl mx-auto pt-6">
        <section className="space-y-4">
          {isClient && (
            <PullToRefresh
              onRefresh={handleRefresh}
              distanceToRefresh={70}
              resistance={2.5}
              hammerOptions={{
                touchAction: 'pan-y',
                recognizers: {
                  pan: {
                    threshold: 5,
                    direction: 'DIRECTION_DOWN'
                  }
                }
              }}
              icon={
                <div className="flex justify-center items-center py-2 text-[var(--text-secondary)]">
                  <Spinner size="sm" className="mr-2" />
                  <span>Pull to refresh</span>
                </div>
              }
              loading={
                <div className="flex justify-center items-center py-2 text-[var(--text-secondary)]">
                  <Spinner size="sm" className="mr-2" />
                  <span>Refreshing...</span>
                </div>
              }
            >
              <div className="grid gap-4 min-h-[calc(100vh-64px)]">
                {isInitialLoad ? (
                  // Show spinner during initial load
                  <div className="flex justify-center items-center py-12">
                    <Spinner size="lg" />
                  </div>
                ) : isRefreshing ? (
                  // Show spinner during pull-to-refresh
                  <div className="flex justify-center items-center py-4">
                    <Spinner size="md" />
                  </div>
                ) : isLoading ? (
                  // Show skeleton loaders while loading
                  Array.from({ length: 10 }).map((_, idx) => (
                    <div 
                      key={`skeleton-${idx}`} 
                      style={{ 
                        animationDelay: `${idx * 100}ms`,
                        animation: `fadeIn 0.5s ease-in-out ${idx * 100}ms forwards`
                      }}
                    >
                      <ArticleSkeleton />
                    </div>
                  ))
                ) : articles.length === 0 ? (
                  <Card className="shadow-sm">
                    <CardContent className="p-4 text-center">
                      <p className="text-[var(--text-secondary)]">No articles found. Add some feeds to get started.</p>
                    </CardContent>
                  </Card>
                ) : (
                  // Show actual articles
                  visibleArticles.map((article, idx) => (
                    <Article key={`${article.link}-${idx}`} article={article} />
                  ))
                )}
                {articles.length > visibleCount && (
                  <div ref={loadMoreRef} className="h-10 flex justify-center">
                    <Button 
                      variant="default" 
                      onClick={() => setVisibleCount(prev => Math.min(prev + 20, articles.length))}
                      className="w-full"
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </div>
            </PullToRefresh>
          )}
        </section>
      </main>
    </>
  );
}

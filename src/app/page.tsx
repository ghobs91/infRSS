// app/page.tsx
"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  fetchAndParseRSS,
  loadFeedsFromStorage,
} from "@/lib/rssUtils";
import { useUnread } from "@/lib/unreadContext";
import { cn } from "@/lib/utils";

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
const Article = ({ 
  article, 
  isRead, 
  onVisible, 
  onMarkAsRead 
}: { 
  article: { title: string; link: string; pubDate: string; thumbnail?: string }, 
  isRead: boolean, 
  onVisible?: () => void,
  onMarkAsRead?: (link: string) => void
}) => {
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!ref.current || !onVisible) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onVisible();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <div ref={ref}>
      <Card className={cn(
        "shadow-sm overflow-hidden transition-all duration-200",
        isRead 
          ? "read-article opacity-75" 
          : "border-l-4 border-l-blue-500 bg-blue-50/30"
      )}>
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
                              <div className="flex items-start gap-2 flex-1">
                  <div className="flex-1">
                    <a
                      href={article.link}
                      className="text-base sm:text-lg font-medium text-[var(--primary)] hover:underline line-clamp-2 block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.title}
                    </a>
                    {!isRead && (
                      <span className="inline-block text-xs bg-blue-500 text-white px-2 py-1 rounded-full mt-1">
                        NEW
                      </span>
                    )}
                  </div>
                  {onMarkAsRead && (
                    <button
                      onClick={() => onMarkAsRead(article.link)}
                      className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex-shrink-0"
                      title={isRead ? "Mark as unread" : "Mark as read"}
                    >
                      {isRead ? "👁️" : "👁️‍🗨️"}
                    </button>
                  )}
                </div>
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
                  {(() => {
                    try {
                      return article.link ? new URL(article.link).hostname.replace("www.", "") : "Unknown Source";
                    } catch {
                      return "Unknown Source";
                    }
                  })()}
                </p>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                {formatDate(article.pubDate)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function HomePage() {
  const [articles, setArticles] = useState<{ title: string; link: string; pubDate: string; thumbnail?: string }[]>([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hideRead, setHideRead] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { toggleReadStatus, setTotalArticles, readLinks, unreadCount } = useUnread();

  // Only show unread articles if hideRead is true
  const filteredArticles = useMemo(() => {
    if (hideRead) {
      return articles.filter(article => !readLinks.has(article.link));
    }
    return articles;
  }, [articles, readLinks, hideRead]);

  // Memoize visible articles to prevent unnecessary re-renders
  const visibleArticles = useMemo(() => {
    return filteredArticles.slice(0, visibleCount);
  }, [filteredArticles, visibleCount]);

  // Handle refreshing feeds
  const handleRefresh = useCallback(async () => {
    try {
      setHideRead(true);
      const feeds = loadFeedsFromStorage();
      if (feeds.length === 0) {
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

    const interval = setInterval(() => {
      handleRefresh();
    }, 10 * 60 * 1000); // Check every 10 minutes

    return () => {
      clearInterval(interval);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isLoading, articles.length, handleRefresh]);

  // Load saved feeds on initial render
  useEffect(() => {
    const loadSavedFeeds = async () => {
      setIsLoading(true);
      try {
        setHideRead(true);
        const feeds = loadFeedsFromStorage();
        if (feeds.length === 0) {
          setIsLoading(false);
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
      }
    };

    setIsClient(true);
    loadSavedFeeds();
  }, [handleRefresh]);

  // After first render, allow read articles to be shown (but grayed out)
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setHideRead(false), 0);
    }
  }, [isLoading]);

  useEffect(() => {
    setTotalArticles(articles.length);
  }, [articles.length, setTotalArticles]);

  return (
    <main className="space-y-8 px-4 max-w-4xl mx-auto pt-6">
      <section className="space-y-4">
        {isClient && (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-[var(--text-secondary)]">
                {unreadCount} unread articles
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setHideRead(!hideRead)}
                className="text-xs"
              >
                {hideRead ? "Show all" : "Hide read"}
              </Button>
            </div>
            <div className="grid gap-4">
            {isLoading ? (
              // Show spinner during initial load
              <div className="flex justify-center items-center py-12">
                <Spinner size="lg" />
              </div>
            ) : articles.length === 0 ? (
              <Card className="shadow-sm">
                <CardContent className="p-4 text-center">
                  <p className="text-[var(--text-secondary)]">No articles found. Add some feeds to get started.</p>
                </CardContent>
              </Card>
            ) : (
              // Show actual articles
              visibleArticles.map((article, idx) => (
                <Article
                  key={`${article.link}-${idx}`}
                  article={article}
                  isRead={readLinks.has(article.link)}
                  onVisible={() => {
                    // Don't automatically mark as read - let user interact first
                    // This prevents marking articles as read before they're actually read
                  }}
                  onMarkAsRead={(link) => toggleReadStatus(link)}
                />
              ))
            )}
            {filteredArticles.length > visibleCount && (
              <div ref={loadMoreRef} className="h-10 flex justify-center">
                <Button 
                  variant="default" 
                  onClick={() => setVisibleCount(prev => Math.min(prev + 20, filteredArticles.length))}
                  className="w-full"
                >
                  Load More
                </Button>
              </div>
            )}
            </div>
          </>
        )}
        <Button
          variant="default"
          onClick={handleRefresh}
          className="flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>Refresh</span>
        </Button>
      </section>
    </main>
  );
}

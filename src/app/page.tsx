// app/page.tsx
"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ArticleCard } from "@/components/ArticleCard";
import {
  loadFeedsFromStorage,
  loadUserPreferences,
} from "@/lib/rssUtils";
import { fetchAndParseRSSClient } from "@/lib/rssUtilsClient";
import { useRSSParserWorker } from "@/lib/useRSSParserWorker";
import { useUnread } from "@/lib/unreadContext";
import { useView } from "@/lib/viewContext";
import type { UserPreferences } from "@/lib/types";



// Helper function to convert article format for ArticleCard
const convertArticleForCard = (article: { title: string; link: string; pubDate: string; thumbnail?: string; vibes?: any }) => ({
  id: article.link,
  title: article.title,
  link: article.link,
  pubDate: article.pubDate,
  thumbnail: article.thumbnail,
  content: '',
  summary: '',
  vibes: article.vibes,
  sourceDomain: (() => {
    try {
      return article.link ? new URL(article.link).hostname.replace("www.", "") : "Unknown Source";
    } catch {
      return "Unknown Source";
    }
  })(),
  readStatus: 'unread' as const,
  tags: []
});

// Helper function to check if article should be filtered based on vibes
const shouldFilterArticle = (article: any, preferences: UserPreferences | null): { filtered: boolean; reason: string } => {
  if (!preferences?.vibesFilter?.enabled || !article.vibes) {
    return { filtered: false, reason: '' };
  }

  const { hideClickbait, hideRagebait } = preferences.vibesFilter;
  const { isClickbait, isRagebait } = article.vibes;

  if (hideClickbait && isClickbait) {
    return { filtered: true, reason: 'Clickbait' };
  }

  if (hideRagebait && isRagebait) {
    return { filtered: true, reason: 'Ragebait' };
  }

  return { filtered: false, reason: '' };
};

export default function HomePage() {
  const [articles, setArticles] = useState<{ title: string; link: string; pubDate: string; thumbnail?: string; vibes?: any }[]>([]);
  const [visibleCount, setVisibleCount] = useState(100); // Increased from 20 to 100 to show more articles initially
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hideRead, setHideRead] = useState(true); // Default to true - hide read articles
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [feedStats, setFeedStats] = useState<{ total: number; successful: number; failed: number }>({ total: 0, successful: 0, failed: 0 });
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { toggleReadStatus, setTotalArticles, readLinks, previouslyReadLinks, autoMarkAsReadOnScroll, toggleAutoMarkAsRead } = useUnread();
  const { parseRSSWithWorker } = useRSSParserWorker();
  const { viewMode } = useView();
  const markingAsReadRef = useRef<Set<string>>(new Set()); // Track articles currently being marked
  const pendingMarksRef = useRef<Set<string>>(new Set()); // Track pending marks to batch
  const batchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Batch process pending marks to reduce re-renders
  const processPendingMarks = useCallback(() => {
    if (pendingMarksRef.current.size > 0) {
      const toMark = Array.from(pendingMarksRef.current);
      pendingMarksRef.current.clear();
      
      // Mark all pending articles as read in a single batch
      toMark.forEach(link => {
        if (!readLinks.has(link)) {
          toggleReadStatus(link);
        }
      });
      
      // Clean up marking refs
      setTimeout(() => {
        toMark.forEach(link => markingAsReadRef.current.delete(link));
      }, 500);
    }
  }, [readLinks, toggleReadStatus]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (batchTimeoutRef.current) {
        clearTimeout(batchTimeoutRef.current);
      }
    };
  }, []);

  // Only hide articles that were previously read (from a previous session)
  // Articles marked as read in the current session will be grayed out but still visible
  const filteredArticles = useMemo(() => {
    if (hideRead) {
      // Hide both previously read AND currently read articles
      return articles.filter(article => !previouslyReadLinks.has(article.link) && !readLinks.has(article.link));
    }
    return articles;
  }, [articles, previouslyReadLinks, readLinks, hideRead]);

  // Memoize visible articles to prevent unnecessary re-renders
  const visibleArticles = useMemo(() => {
    return filteredArticles.slice(0, visibleCount);
  }, [filteredArticles, visibleCount]);

  // Handle refreshing feeds
  const handleRefresh = useCallback(async () => {
    try {
      const feeds = loadFeedsFromStorage();
      if (feeds.length === 0) {
        return;
      }

      // Fetch feeds in parallel with a timeout
      const fetchPromises = feeds.map(async (feed) => {
        try {
          // Use client-side parsing with Web Worker
          const data = await fetchAndParseRSSClient(feed.url, parseRSSWithWorker);
          if (data?.items && data.items.length > 0) {
            return { success: true, items: data.items };
          } else {
            return { success: false, items: [] };
          }
        } catch {
          return { success: false, items: [] };
        }
      });

      const results = await Promise.all(fetchPromises);
      const successCount = results.filter(r => r.success).length;
      const failCount = results.filter(r => !r.success).length;
      const allArticles = results.flatMap(r => r.items);
      const sorted = allArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
      
      console.log(`✅ Refreshed: ${successCount}/${feeds.length} feeds loaded, ${sorted.length} articles`);
      
      setArticles(sorted);
      setVisibleCount(100); // Reset visible count to show more articles initially
      setFeedStats({ total: feeds.length, successful: successCount, failed: failCount });
    } catch (error) {
      console.error("Error refreshing feeds:", error);
    }
  }, [parseRSSWithWorker]);

  // Intersection observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setVisibleCount((prev) => Math.min(prev + 50, articles.length)); // Load 50 articles at a time instead of 20
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
        const feeds = loadFeedsFromStorage();
        if (feeds.length === 0) {
          setIsLoading(false);
          return;
        }

        console.log(`📥 Loading ${feeds.length} feeds...`);

        // Fetch feeds in parallel - no timeout wrapper here since fetch has its own timeout
        const fetchPromises = feeds.map(async (feed) => {
          try {
            // Use client-side parsing with Web Worker
            const data = await fetchAndParseRSSClient(feed.url, parseRSSWithWorker);
            
            if (data && data.items.length > 0) {
              return { success: true, items: data.items, url: feed.url };
            } else {
              return { success: false, items: [], url: feed.url };
            }
          } catch {
            return { success: false, items: [], url: feed.url };
          }
        });

        const results = await Promise.all(fetchPromises);
        const successCount = results.filter(r => r.success).length;
        const failCount = results.filter(r => !r.success).length;
        const allArticles = results.flatMap(r => r.items);
        const sorted = allArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        console.log(`✅ Load complete: ${successCount}/${feeds.length} feeds successful, ${failCount} failed, ${sorted.length} total articles`);
        setArticles(sorted);
        setFeedStats({ total: feeds.length, successful: successCount, failed: failCount });
      } catch (error) {
        console.error("Error loading feeds:", error);
      } finally {
        setIsLoading(false);
      }
    };

    setIsClient(true);
    loadSavedFeeds();
  }, [handleRefresh, parseRSSWithWorker]);

  // Load user preferences
  useEffect(() => {
    if (isClient) {
      const prefs = loadUserPreferences();
      setPreferences(prefs);
    }
  }, [isClient]);

  // Don't automatically show read articles - let user control this
  // useEffect(() => {
  //   if (!isLoading) {
  //     setTimeout(() => setHideRead(false), 0);
  //   }
  // }, [isLoading]);

  useEffect(() => {
    setTotalArticles(articles.length);
  }, [articles.length, setTotalArticles]);

  return (
    <main className="space-y-8 px-4 max-w-5xl mx-auto pt-8 pb-12 md:pb-12 pb-28 overflow-hidden">
      <section className="space-y-6 w-full overflow-hidden">
        {isClient && (
          <>
            <div className="flex items-center justify-between mb-8 glass-card p-5 rounded-[12px] animate-[fadeIn_0.5s_ease-out] shadow-lg hover:shadow-xl transition-all duration-400">
              <div className="text-sm font-semibold text-[var(--text-secondary)]">
                {filteredArticles.length} unread articles ({articles.length} total)
                {feedStats.total > 0 && (
                  <span className="ml-3 text-xs opacity-75">
                    • {feedStats.successful}/{feedStats.total} feeds loaded
                    {feedStats.failed > 0 && (
                      <span className="text-orange-500"> ({feedStats.failed} failed)</span>
                    )}
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleAutoMarkAsRead}
                  className="text-xs"
                  title={autoMarkAsReadOnScroll ? "Disable auto-mark as read when scrolling past" : "Enable auto-mark as read when scrolling past"}
                >
                  {autoMarkAsReadOnScroll ? "📖 Auto-scroll" : "📖 Manual"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setHideRead(!hideRead)}
                  className="text-xs"
                >
                  {hideRead ? "Show read" : "Hide read"}
                </Button>
              </div>
            </div>
            <div className={viewMode === 'cards' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full overflow-hidden' : 'grid gap-6 w-full overflow-hidden'}>
            {isLoading ? (
              // Show spinner during initial load
              <div className="flex justify-center items-center py-12 col-span-full">
                <Spinner size="lg" />
              </div>
            ) : articles.length === 0 ? (
              <Card className="animate-[fadeIn_0.5s_ease-out] col-span-full">
                <CardContent className="p-8 text-center">
                  <p className="text-[var(--text-secondary)] text-lg">No articles found. Add some feeds to get started.</p>
                </CardContent>
              </Card>
            ) : (
              // Show actual articles using ArticleCard component
              visibleArticles.map((article, idx) => {
                const { filtered, reason } = shouldFilterArticle(article, preferences);
                const articleLink = article.link;
                
                // Create stable callback per article to prevent observer resets
                const handleScrollPast = () => {
                  // Auto-mark as read when article is scrolled past
                      
                  // Skip if auto-mark is disabled, already read, or already being marked
                  if (!autoMarkAsReadOnScroll || 
                      readLinks.has(articleLink) || 
                      markingAsReadRef.current.has(articleLink)) {
                    return;
                  }
                      
                  // Add to tracking and pending batch
                  markingAsReadRef.current.add(articleLink);
                  pendingMarksRef.current.add(articleLink);
                      
                  // Clear existing timeout and set a new one to batch updates
                  if (batchTimeoutRef.current) {
                    clearTimeout(batchTimeoutRef.current);
                  }
                      
                  // Process batch after a short delay (300ms)
                  batchTimeoutRef.current = setTimeout(() => {
                    processPendingMarks();
                    batchTimeoutRef.current = null;
                  }, 300);
                };
                
                return (
                  <ArticleCard
                    key={`${article.link}-${idx}`}
                    article={convertArticleForCard(article)}
                    isRead={readLinks.has(articleLink)}
                    filtered={filtered}
                    filterReason={reason}
                    viewMode={viewMode}
                    onScrollPast={handleScrollPast}
                  />
                );
              })
            )}
            {filteredArticles.length > visibleCount && (
              <div ref={loadMoreRef} className="h-10 flex justify-center animate-[fadeIn_0.5s_ease-out] col-span-full">
                <Button 
                  variant="default" 
                  onClick={() => setVisibleCount(prev => Math.min(prev + 50, filteredArticles.length))}
                  className="w-full max-w-md"
                >
                  Load More ({filteredArticles.length - visibleCount} remaining)
                </Button>
              </div>
            )}
            </div>
          </>
        )}
        <Button
          variant="default"
          onClick={handleRefresh}
          className="flex items-center gap-3 animate-[fadeIn_0.5s_ease-out] shadow-lg hover:shadow-xl"
        >
          <svg
            className="w-5 h-5"
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
          <span className="font-semibold">Refresh</span>
        </Button>
      </section>
    </main>
  );
}

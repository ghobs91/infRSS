// app/page.tsx
"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ArticleCard } from "@/components/ArticleCard";
import {
  loadFeedsFromStorage,
} from "@/lib/rssUtils";
import { fetchAndParseRSSClient } from "@/lib/rssUtilsClient";
import { useRSSParserWorker } from "@/lib/useRSSParserWorker";
import { useUnread } from "@/lib/unreadContext";



// Helper function to convert article format for ArticleCard
const convertArticleForCard = (article: { title: string; link: string; pubDate: string; thumbnail?: string }) => ({
  id: article.link,
  title: article.title,
  link: article.link,
  pubDate: article.pubDate,
  thumbnail: article.thumbnail,
  content: '',
  summary: '',
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

export default function HomePage() {
  const [articles, setArticles] = useState<{ title: string; link: string; pubDate: string; thumbnail?: string }[]>([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hideRead, setHideRead] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { toggleReadStatus, setTotalArticles, readLinks, unreadCount, autoMarkAsReadOnScroll, toggleAutoMarkAsRead } = useUnread();
  const { parseRSSWithWorker } = useRSSParserWorker();
  const markingAsReadRef = useRef<Set<string>>(new Set()); // Track articles currently being marked

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
          
          // Use client-side parsing with Web Worker
          const data = await fetchAndParseRSSClient(feed.url, parseRSSWithWorker);
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
  }, [parseRSSWithWorker]);

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
            
            // Use client-side parsing with Web Worker
            const data = await fetchAndParseRSSClient(feed.url, parseRSSWithWorker);
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
  }, [handleRefresh, parseRSSWithWorker]);

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
    <main className="space-y-8 px-4 max-w-4xl mx-auto pt-6 overflow-hidden">
      <section className="space-y-4 w-full overflow-hidden">
        {isClient && (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-[var(--text-secondary)]">
                {unreadCount} unread articles
              </div>
              <div className="flex gap-2">
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
                  {hideRead ? "Show all" : "Hide read"}
                </Button>
              </div>
            </div>
            <div className="grid gap-4 w-full overflow-hidden">
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
              // Show actual articles using ArticleCard component
              visibleArticles.map((article, idx) => (
                <ArticleCard
                  key={`${article.link}-${idx}`}
                  article={convertArticleForCard(article)}
                  isRead={readLinks.has(article.link)}
                  onScrollPast={() => {
                    // Auto-mark as read when article is scrolled past
                    // Prevent duplicate marks with ref tracking
                    if (autoMarkAsReadOnScroll && !readLinks.has(article.link) && !markingAsReadRef.current.has(article.link)) {
                      markingAsReadRef.current.add(article.link);
                      toggleReadStatus(article.link);
                      // Clean up after a short delay
                      setTimeout(() => {
                        markingAsReadRef.current.delete(article.link);
                      }, 500);
                    }
                  }}
                  onToggleRead={(articleId) => toggleReadStatus(articleId)}
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

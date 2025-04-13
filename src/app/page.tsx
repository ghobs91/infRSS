// app/page.tsx
"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArticleSkeleton } from "@/components/ArticleSkeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  getFeedUrlFromHtml,
  fetchAndParseRSS,
  loadFeedsFromStorage,
  saveFeedToStorage,
  type FeedData,
} from "@/lib/rssUtils";
import { suggestFeedsWithWorker } from "@/lib/useTransformerWorker";

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
  return (
    <Card className="shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {article.thumbnail && (
            <div className="w-full sm:w-40 h-40 sm:h-auto">
              <img 
                src={article.thumbnail} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 p-3 sm:p-4">
            <a
              href={article.link}
              className="text-base sm:text-lg font-medium text-[var(--primary)] hover:underline line-clamp-2"
            >
              {article.title}
            </a>
            <div className="flex items-center gap-2 my-1">
              <img
                src={`https://www.google.com/s2/favicons?sz=16&domain_url=${article.link}`}
                className="w-4 h-4"
                alt="favicon"
              />
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
  const [feedUrlInput, setFeedUrlInput] = useState("");
  const [articles, setArticles] = useState<{ title: string; link: string; pubDate: string; thumbnail?: string }[]>([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [topic, setTopic] = useState("");
  const [suggestedFeeds, setSuggestedFeeds] = useState<FeedData[]>([]);
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

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
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
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  // Handle adding a new feed
  const handleAddFeed = useCallback(async () => {
    if (!feedUrlInput.trim()) return;
    
    setIsLoading(true);
    try {
      const resolvedFeedUrl = await getFeedUrlFromHtml(feedUrlInput);
      if (resolvedFeedUrl) {
        const feedData = await fetchAndParseRSS(resolvedFeedUrl);
        if (feedData) {
          saveFeedToStorage({ title: feedData.title, url: resolvedFeedUrl });
          setFeedUrlInput(""); // Clear input after successful add
          
          // Refresh articles
          handleRefresh();
        }
      }
    } catch (error) {
      console.error("Error adding feed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [feedUrlInput]);

  // Handle topic suggestion
  const handleTopicSuggest = useCallback(async () => {
    if (!topic.trim()) return;
    
    try {
      const results = await suggestFeedsWithWorker(topic, []);
      setSuggestedFeeds(results);
    } catch (error) {
      console.error("Error suggesting feeds:", error);
    }
  }, [topic]);

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

  return (
    <main className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Add Feed</h1>
        <input
          type="file"
          accept=".opml, text/xml"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setIsLoading(true);
            try {
              const text = await file.text();
              const parser = new DOMParser();
              const doc = parser.parseFromString(text, "text/xml");
              const outlines = doc.querySelectorAll("outline[type='rss']");
              outlines.forEach((el) => {
                const url = el.getAttribute("xmlUrl");
                const title = el.getAttribute("title") || el.getAttribute("text") || url;
                if (url) {
                  saveFeedToStorage({ title: title ?? url, url });
                }
              });
              handleRefresh();
            } catch (error) {
              console.error("Error importing OPML:", error);
            } finally {
              setIsLoading(false);
            }
          }}
          className="block mb-2 text-sm text-[var(--text-secondary)]"
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Enter site URL or RSS feed"
            value={feedUrlInput}
            onChange={(e) => setFeedUrlInput(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleAddFeed}>Add Feed</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Suggest Feeds</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Enter a topic you're interested in"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleTopicSuggest}>Suggest</Button>
        </div>
        <div className="grid gap-3">
          {suggestedFeeds.map((feed) => (
            <Card key={feed.url} className="shadow-sm">
              <CardContent className="p-4">
                <p className="font-medium text-[var(--text-primary)]">{feed.title}</p>
                <p className="text-sm text-[var(--text-secondary)]">{feed.url}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Articles</h2>
          <Button
            variant="default"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? <Spinner size="sm" /> : "Refresh"}
          </Button>
        </div>

        {isClient && (
          <PullToRefresh
            onRefresh={handleRefresh}
          >
            <div className="grid gap-4">
              {isInitialLoad ? (
                // Show spinner during initial load
                <div className="flex justify-center items-center py-12">
                  <Spinner size="lg" />
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
  );
}

// app/page.tsx
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Spinner } from "@/components/ui/spinner";
import { FeedSidebar } from "@/components/FeedSidebar";
import { ArticleListColumn } from "@/components/ArticleListColumn";
import { ArticleViewer } from "@/components/ArticleViewer";
import { loadFeedsFromStorage } from "@/lib/rssUtils";
import { fetchAndParseRSSClient } from "@/lib/rssUtilsClient";
import { useRSSParserWorker } from "@/lib/useRSSParserWorker";
import { useUnread } from "@/lib/unreadContext";

interface ArticleData {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  content?: string;
  summary?: string;
  sourceDomain: string;
  readStatus: 'read' | 'unread';
}

interface FeedData {
  id: string;
  name: string;
  url: string;
  unreadCount?: number;
}

export default function HomePage() {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [feeds, setFeeds] = useState<FeedData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const { readArticleIds, toggleReadStatus, setTotalArticles } = useUnread();
  const { parseRSSWithWorker } = useRSSParserWorker();

  // Load feeds and articles with progressive loading
  useEffect(() => {
    // Convert article to proper format
    const convertArticle = (article: any, feedUrl: string, index: number): ArticleData => {
      const sourceDomain = (() => {
        try {
          return article.link ? new URL(article.link).hostname.replace("www.", "") : "Unknown Source";
        } catch {
          return "Unknown Source";
        }
      })();

      // Create unique ID based primarily on article link to prevent duplicates across feeds
      // Fall back to feed+index if no link available
      const uniqueId = article.link || `${feedUrl}::${index}`;

      return {
        id: uniqueId,
        title: article.title,
        link: article.link,
        pubDate: article.pubDate,
        thumbnail: article.thumbnail,
        content: article.content,
        summary: article.summary,
        sourceDomain,
        readStatus: readArticleIds.has(uniqueId) ? 'read' : 'unread',
      };
    };
    
    const loadData = async () => {
      setIsLoading(true);
      try {
        const savedFeeds = loadFeedsFromStorage();
        
        if (savedFeeds.length === 0) {
          setIsLoading(false);
          return;
        }

        // Filter out invalid feeds and ensure unique IDs
        const validFeeds = savedFeeds.filter(feed => feed.url && feed.url.trim());
        const uniqueUrls = new Set<string>();
        const deduplicatedFeeds = validFeeds.filter(feed => {
          if (uniqueUrls.has(feed.url)) {
            console.warn('Duplicate feed URL detected:', feed.url);
            return false;
          }
          uniqueUrls.add(feed.url);
          return true;
        });

        // Convert feeds to proper format with guaranteed unique IDs
        const feedsData: FeedData[] = deduplicatedFeeds.map((feed, idx) => {
          const name = ('name' in feed && typeof feed.name === 'string' ? feed.name : undefined) || feed.title || `Feed ${idx + 1}`;
          return {
            id: `${feed.url}-${idx}`, // Ensure unique ID
            name,
            url: feed.url,
            unreadCount: 0,
          };
        });
        setFeeds(feedsData);
        
        // Show loading state but allow UI to be interactive
        setIsLoading(false);

        // Fetch all feeds without progressive updates to avoid race conditions
        const ARTICLE_LIMIT = 4000;

        // Fetch feeds using Promise.allSettled to handle failures gracefully
        const fetchPromises = deduplicatedFeeds.map(async (feed) => {
          try {
            const data = await fetchAndParseRSSClient(feed.url, parseRSSWithWorker);
            if (data?.items && data.items.length > 0) {
              const newArticles = data.items.map((item: any, itemIdx: number) => 
                convertArticle(item, feed.url, itemIdx)
              );
              return { success: true, items: newArticles, url: feed.url };
            }
            return { success: false, items: [], url: feed.url };
          } catch (error) {
            console.error('Failed to fetch feed:', feed.url, error);
            return { success: false, items: [], url: feed.url };
          }
        });

        const results = await Promise.allSettled(fetchPromises);
        
        // Collect all articles from successful fetches
        const allArticles: ArticleData[] = [];
        results.forEach(result => {
          if (result.status === 'fulfilled' && result.value.success) {
            allArticles.push(...result.value.items);
          }
        });
        
        // Final sort and limit to ensure consistency
        const sortedArticles = allArticles.sort((a, b) => {
          try {
            return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
          } catch {
            return 0;
          }
        });
        
        const limitedArticles = sortedArticles.slice(0, ARTICLE_LIMIT);
        
        // Final update to articles state
        setArticles(limitedArticles);
        setTotalArticles(limitedArticles.length);
        
        console.log(`📊 Total articles fetched: ${allArticles.length}, displaying: ${limitedArticles.length}`);

        // Update feed unread counts based on limited articles
        const updatedFeeds = feedsData.map(feed => {
          const feedArticles = limitedArticles.filter(a => {
            try {
              return a.link.includes(new URL(feed.url).hostname);
            } catch {
              return false;
            }
          });
          return {
            ...feed,
            unreadCount: feedArticles.filter(a => a.readStatus === 'unread').length,
          };
        });
        setFeeds(updatedFeeds);

      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, [parseRSSWithWorker, setTotalArticles, readArticleIds]);

  // Pre-compute feed hostname for selected feed to avoid repeated URL parsing
  const selectedFeedHostname = useMemo(() => {
    if (!selectedFeed) return null;
    const feed = feeds.find(f => f.id === selectedFeed);
    if (!feed) return null;
    try {
      return new URL(feed.url).hostname;
    } catch {
      return null;
    }
  }, [selectedFeed, feeds]);

  // Filter articles based on selected feed - memoized to prevent recalculation on every render
  const filteredArticles = useMemo(() => {
    if (!selectedFeed || !selectedFeedHostname) return articles;
    
    return articles.filter(a => {
      try {
        const articleHostname = new URL(a.link).hostname;
        return selectedFeedHostname === articleHostname;
      } catch {
        return false;
      }
    });
  }, [articles, selectedFeed, selectedFeedHostname]);

  // Get selected article - memoized
  const selectedArticle = useMemo(() => {
    return selectedArticleId 
      ? articles.find(a => a.id === selectedArticleId) || null
      : null;
  }, [articles, selectedArticleId]);

  // Handle article selection - memoized callback
  const handleSelectArticle = useCallback((articleId: string) => {
    setSelectedArticleId(articleId);
    // Mark article as read using its unique ID
    if (!readArticleIds.has(articleId)) {
      toggleReadStatus(articleId);
    }
  }, [readArticleIds, toggleReadStatus]);

  // Calculate total unread count - memoized
  const totalUnreadCount = useMemo(() => {
    return articles.filter(a => a.readStatus === 'unread').length;
  }, [articles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="app-layout">
      <FeedSidebar
        feeds={feeds}
        selectedFeed={selectedFeed}
        onSelectFeed={setSelectedFeed}
        unreadCount={totalUnreadCount}
      />
      <ArticleListColumn
        articles={filteredArticles}
        selectedArticle={selectedArticleId}
        onSelectArticle={handleSelectArticle}
        title={selectedFeed ? feeds.find(f => f.id === selectedFeed)?.name || 'Feed' : 'Today'}
        subtitle={`${filteredArticles.length} article${filteredArticles.length !== 1 ? 's' : ''}`}
      />
      <ArticleViewer article={selectedArticle} />
    </div>
  );
}

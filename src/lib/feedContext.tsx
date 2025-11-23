"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadFeedsFromStorage } from "@/lib/rssUtils";
import { fetchAndParseRSSClient } from "@/lib/rssUtilsClient";
import { useRSSParserWorker } from "@/lib/useRSSParserWorker";
import { useUnread } from "@/lib/unreadContext";

export interface ArticleData {
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

export interface FeedData {
  id: string;
  name: string;
  url: string;
  unreadCount?: number;
  favicon?: string;
}

interface FeedContextType {
  articles: ArticleData[];
  feeds: FeedData[];
  isLoading: boolean;
  refreshFeeds: () => Promise<void>;
  selectedFeed: string | null;
  setSelectedFeed: (feedId: string | null) => void;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const useFeed = () => {
  const context = useContext(FeedContext);
  if (context === undefined) {
    throw new Error('useFeed must be used within a FeedProvider');
  }
  return context;
};

export const FeedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [feeds, setFeeds] = useState<FeedData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);
  const { readArticleIds } = useUnread();
  const { parseRSSWithWorker } = useRSSParserWorker();
  const [isInitialized, setIsInitialized] = useState(false);

  // Convert article to proper format
  const convertArticle = useCallback((article: any, feedUrl: string, index: number): ArticleData => {
    // Use the sourceDomain from the parsed article (which contains the feed title)
    // This was set by the RSS parser and should not be overridden
    const sourceDomain = article.sourceDomain || "Unknown Source";

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
  }, [readArticleIds]);

  const refreshFeeds = useCallback(async () => {
    setIsLoading(true);
    try {
      const savedFeeds = loadFeedsFromStorage();
      
      if (savedFeeds.length === 0) {
        setIsLoading(false);
        setFeeds([]);
        setArticles([]);
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

      // Convert feeds to proper format with guaranteed unique IDs and fetch favicons
      const feedsData: FeedData[] = deduplicatedFeeds.map((feed, idx) => {
        const name = ('name' in feed && typeof feed.name === 'string' ? feed.name : undefined) || feed.title || `Feed ${idx + 1}`;
        return {
          id: `${feed.url}-${idx}`, // Ensure unique ID
          name,
          url: feed.url,
          unreadCount: 0,
          favicon: `https://www.google.com/s2/favicons?sz=32&domain_url=${encodeURIComponent(feed.url)}`,
        };
      });
      
      // We don't set feeds here yet, we wait for articles to calculate unread counts
      
      // Fetch all feeds without progressive updates to avoid race conditions
      const ARTICLE_LIMIT = 4000;

      // Fetch feeds using Promise.allSettled to handle failures gracefully
      const fetchPromises = deduplicatedFeeds.map(async (feed) => {
        try {
          const data = await fetchAndParseRSSClient(feed.url, parseRSSWithWorker);
          if (data?.items && data.items.length > 0) {
            // We use a temporary converter here that doesn't depend on readArticleIds for the initial fetch
            // The actual read status will be applied when we process all articles
            return { success: true, items: data.items, url: feed.url };
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
      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value.success) {
           // Convert items to ArticleData
           const feedUrl = result.value.url;
           const items = result.value.items.map((item: any, itemIdx: number) => 
             convertArticle(item, feedUrl, itemIdx)
           );
           allArticles.push(...items);
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
      
      console.log(`📊 Total articles fetched: ${allArticles.length}, displaying: ${limitedArticles.length}`);

      // Update feed unread counts based on limited articles
      const updatedFeeds = feedsData.map(feed => {
        let feedHostname: string;
        try {
          feedHostname = new URL(feed.url).hostname;
        } catch {
          return { ...feed, unreadCount: 0 };
        }
        
        const feedArticles = limitedArticles.filter(a => {
          try {
            const articleHostname = new URL(a.link).hostname;
            return articleHostname === feedHostname;
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
      setIsLoading(false);

    } catch (error) {
      console.error("Error loading data:", error);
      setIsLoading(false);
    }
  }, [parseRSSWithWorker, convertArticle]);

  // Initial load
  useEffect(() => {
    if (!isInitialized) {
      refreshFeeds();
      setIsInitialized(true);
    }
  }, [isInitialized, refreshFeeds]);

  // Update read status when readArticleIds changes, without re-fetching
  useEffect(() => {
    if (articles.length === 0) return;

    let hasChanges = false;
    const updatedArticles = articles.map(article => {
      const isRead = readArticleIds.has(article.id);
      if ((isRead && article.readStatus === 'unread') || (!isRead && article.readStatus === 'read')) {
        hasChanges = true;
        return { ...article, readStatus: isRead ? 'read' : 'unread' } as ArticleData;
      }
      return article;
    });

    if (hasChanges) {
      setArticles(updatedArticles);
      
      // Also update feed unread counts
      const updatedFeeds = feeds.map(feed => {
        let feedHostname: string;
        try {
          feedHostname = new URL(feed.url).hostname;
        } catch {
          return feed;
        }
        
        const feedArticles = updatedArticles.filter(a => {
          try {
            const articleHostname = new URL(a.link).hostname;
            return articleHostname === feedHostname;
          } catch {
            return false;
          }
        });
        
        const newUnreadCount = feedArticles.filter(a => a.readStatus === 'unread').length;
        if (newUnreadCount !== feed.unreadCount) {
           return { ...feed, unreadCount: newUnreadCount };
        }
        return feed;
      });
      setFeeds(updatedFeeds);
    }
  }, [readArticleIds, articles, feeds]);

  return (
    <FeedContext.Provider value={{ articles, feeds, isLoading, refreshFeeds, selectedFeed, setSelectedFeed }}>
      {children}
    </FeedContext.Provider>
  );
};

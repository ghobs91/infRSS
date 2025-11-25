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
  feedUrl: string;
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
      feedUrl,
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
      
      // Calculate date threshold (1 week ago)
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      // Collect all articles from successful fetches
      const allArticles: ArticleData[] = [];
      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value.success) {
           // Convert items to ArticleData and filter out articles older than a week
           const feedUrl = result.value.url;
           const items = result.value.items
             .map((item: any, itemIdx: number) => convertArticle(item, feedUrl, itemIdx))
             .filter((article: ArticleData) => {
               try {
                 const articleDate = new Date(article.pubDate);
                 return articleDate >= oneWeekAgo;
               } catch {
                 // If date parsing fails, include the article
                 return true;
               }
             });
           console.log(`📥 Fetched ${items.length} articles from ${feedUrl} (filtered by 1 week)`);
           allArticles.push(...items);
        }
      });
      
      // Deduplicate articles by ID (link-based) to prevent duplicates across feeds
      const uniqueArticlesMap = new Map<string, ArticleData>();
      allArticles.forEach(article => {
        if (!uniqueArticlesMap.has(article.id)) {
          uniqueArticlesMap.set(article.id, article);
        } else {
          console.log(`🔄 Skipping duplicate article: "${article.title}" (ID: ${article.id})`);
        }
      });
      const deduplicatedArticles = Array.from(uniqueArticlesMap.values());
      console.log(`🗑️  Removed ${allArticles.length - deduplicatedArticles.length} duplicate articles`);
      
      // Final sort and limit to ensure consistency
      const sortedArticles = deduplicatedArticles.sort((a, b) => {
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

      // Debug: show unique feedUrls in articles
      const uniqueFeedUrls = new Set(limitedArticles.map(a => a.feedUrl));
      console.log(`🔍 Unique feed URLs in articles (${uniqueFeedUrls.size}):`, Array.from(uniqueFeedUrls));
      console.log(`🔍 Feed URLs in feedsData (${feedsData.length}):`, feedsData.map(f => f.url));
      
      // Update feed unread counts based on limited articles and sort by name
      const updatedFeeds = feedsData.map(feed => {
        const feedArticles = limitedArticles.filter(a => a.feedUrl === feed.url);
        const unreadCount = feedArticles.filter(a => a.readStatus === 'unread').length;
        console.log(`📊 Feed "${feed.name}":\n   Feed URL: ${feed.url}\n   Articles: ${feedArticles.length}, Unread: ${unreadCount}`);
        return {
          ...feed,
          unreadCount,
        };
      }).sort((a, b) => a.name.localeCompare(b.name));
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
    setArticles(prevArticles => {
      if (prevArticles.length === 0) return prevArticles;

      let hasChanges = false;
      const updatedArticles = prevArticles.map(article => {
        const isRead = readArticleIds.has(article.id);
        if ((isRead && article.readStatus === 'unread') || (!isRead && article.readStatus === 'read')) {
          hasChanges = true;
          return { ...article, readStatus: isRead ? 'read' : 'unread' } as ArticleData;
        }
        return article;
      });

      if (hasChanges) {
        // Also update feed unread counts
        setFeeds(prevFeeds => prevFeeds.map(feed => {
          const feedArticles = updatedArticles.filter(a => a.feedUrl === feed.url);
          
          const newUnreadCount = feedArticles.filter(a => a.readStatus === 'unread').length;
          if (newUnreadCount !== feed.unreadCount) {
            console.log(`📊 Feed "${feed.name}" unread count changed: ${feed.unreadCount} -> ${newUnreadCount}`);
            return { ...feed, unreadCount: newUnreadCount };
          }
          return feed;
        }));
        
        return updatedArticles;
      }
      
      return prevArticles;
    });
  }, [readArticleIds]);

  return (
    <FeedContext.Provider value={{ articles, feeds, isLoading, refreshFeeds, selectedFeed, setSelectedFeed }}>
      {children}
    </FeedContext.Provider>
  );
};

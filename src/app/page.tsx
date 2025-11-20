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
  const { readLinks, toggleReadStatus, setTotalArticles } = useUnread();
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

      // Create unique ID combining feed URL, article link, and index to prevent duplicates
      const uniqueId = `${feedUrl}::${article.link}::${index}`;

      return {
        id: uniqueId,
        title: article.title,
        link: article.link,
        pubDate: article.pubDate,
        thumbnail: article.thumbnail,
        content: article.content,
        summary: article.summary,
        sourceDomain,
        readStatus: readLinks.has(article.link) ? 'read' : 'unread',
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
        const feedsData: FeedData[] = deduplicatedFeeds.map((feed, idx) => ({
          id: `${feed.url}-${idx}`, // Ensure unique ID
          name: (feed as any).name || feed.title || `Feed ${idx + 1}`,
          url: feed.url,
          unreadCount: 0,
        }));
        setFeeds(feedsData);
        
        // Show loading state but allow UI to be interactive
        setIsLoading(false);

        // Progressive loading: fetch feeds and update UI as each completes
        const allArticles: ArticleData[] = [];

        // Fetch feeds with progressive updates
        const fetchPromises = deduplicatedFeeds.map(async (feed) => {
          try {
            const data = await fetchAndParseRSSClient(feed.url, parseRSSWithWorker);
            if (data?.items && data.items.length > 0) {
              const newArticles = data.items.map((item: any, itemIdx: number) => 
                convertArticle(item, feed.url, itemIdx)
              );
              
              // Update articles progressively
              setArticles(prev => {
                const combined = [...prev, ...newArticles];
                // Sort by date
                combined.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
                return combined;
              });
              
              allArticles.push(...newArticles);
              
              return { success: true, items: data.items, url: feed.url };
            }
            return { success: false, items: [], url: feed.url };
          } catch (error) {
            console.error('Failed to fetch feed:', feed.url, error);
            return { success: false, items: [], url: feed.url };
          }
        });

        await Promise.all(fetchPromises);
        
        setTotalArticles(allArticles.length);

        // Update feed unread counts
        const updatedFeeds = feedsData.map(feed => {
          const feedArticles = allArticles.filter(a => {
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
  }, [parseRSSWithWorker, setTotalArticles, readLinks]);

  // Filter articles based on selected feed - memoized to prevent recalculation on every render
  const filteredArticles = useMemo(() => {
    if (!selectedFeed) return articles;
    
    return articles.filter(a => {
      try {
        // Find the feed by ID to get its URL
        const feed = feeds.find(f => f.id === selectedFeed);
        if (!feed) return false;
        
        const selectedFeedHostname = new URL(feed.url).hostname;
        const articleHostname = new URL(a.link).hostname;
        return selectedFeedHostname === articleHostname;
      } catch {
        return false;
      }
    });
  }, [articles, selectedFeed, feeds]);

  // Get selected article - memoized
  const selectedArticle = useMemo(() => {
    return selectedArticleId 
      ? articles.find(a => a.id === selectedArticleId) || null
      : null;
  }, [articles, selectedArticleId]);

  // Handle article selection - memoized callback
  const handleSelectArticle = useCallback((articleId: string) => {
    setSelectedArticleId(articleId);
    // Find the article to get its actual link for read status tracking
    const article = articles.find(a => a.id === articleId);
    if (article && !readLinks.has(article.link)) {
      toggleReadStatus(article.link);
    }
  }, [articles, readLinks, toggleReadStatus]);

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

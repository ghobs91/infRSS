// app/page.tsx
"use client";

import { useState, useEffect } from "react";
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

  // Load feeds and articles
  useEffect(() => {
    // Convert article to proper format
    const convertArticle = (article: any): ArticleData => {
      const sourceDomain = (() => {
        try {
          return article.link ? new URL(article.link).hostname.replace("www.", "") : "Unknown Source";
        } catch {
          return "Unknown Source";
        }
      })();

      return {
        id: article.link,
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

        // Convert feeds to proper format
        const feedsData: FeedData[] = savedFeeds.map((feed, idx) => ({
          id: feed.url,
          name: (feed as any).name || feed.title || `Feed ${idx + 1}`,
          url: feed.url,
          unreadCount: 0,
        }));
        setFeeds(feedsData);

        // Fetch all feeds in parallel
        const fetchPromises = savedFeeds.map(async (feed) => {
          try {
            const data = await fetchAndParseRSSClient(feed.url, parseRSSWithWorker);
            if (data?.items && data.items.length > 0) {
              return { success: true, items: data.items, url: feed.url };
            }
            return { success: false, items: [], url: feed.url };
          } catch {
            return { success: false, items: [], url: feed.url };
          }
        });

        const results = await Promise.all(fetchPromises);
        const allArticles: ArticleData[] = [];

        results.forEach((result) => {
          if (result.success) {
            result.items.forEach((item: any) => {
              allArticles.push(convertArticle(item));
            });
          }
        });

        // Sort by date
        allArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        
        setArticles(allArticles);
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
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [parseRSSWithWorker, setTotalArticles, readLinks]);

  // Filter articles based on selected feed
  const filteredArticles = selectedFeed 
    ? articles.filter(a => {
        try {
          return a.link.includes(new URL(selectedFeed).hostname);
        } catch {
          return false;
        }
      })
    : articles;

  // Get selected article
  const selectedArticle = selectedArticleId 
    ? articles.find(a => a.id === selectedArticleId) || null
    : null;

  // Handle article selection
  const handleSelectArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    if (!readLinks.has(articleId)) {
      toggleReadStatus(articleId);
    }
  };

  // Calculate total unread count
  const totalUnreadCount = articles.filter(a => a.readStatus === 'unread').length;

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

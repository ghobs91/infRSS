// app/page.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { Spinner } from "@/components/ui/spinner";
import { FeedSidebar } from "@/components/FeedSidebar";
import { ArticleListColumn } from "@/components/ArticleListColumn";
import { ArticleViewer } from "@/components/ArticleViewer";
import { useUnread } from "@/lib/unreadContext";
import { useFeed } from "@/lib/feedContext";

export default function HomePage() {
  const { articles, feeds, isLoading, selectedFeed, setSelectedFeed } = useFeed();
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const { readArticleIds, toggleReadStatus } = useUnread();

  // Filter articles based on selected feed - memoized to prevent recalculation on every render
  const filteredArticles = useMemo(() => {
    if (!selectedFeed) return articles;
    
    const feed = feeds.find(f => f.id === selectedFeed);
    if (!feed) return articles;

    return articles.filter(a => a.feedUrl === feed.url);
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
    // Mark article as read using its unique ID
    if (!readArticleIds.has(articleId)) {
      toggleReadStatus(articleId);
    }
  }, [readArticleIds, toggleReadStatus]);

  // Calculate total unread count based on filtered articles - memoized
  const totalUnreadCount = useMemo(() => {
    return filteredArticles.filter(a => a.readStatus === 'unread').length;
  }, [filteredArticles]);

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

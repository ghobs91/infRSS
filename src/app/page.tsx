// app/page.tsx
"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { FeedSidebar } from "@/components/FeedSidebar";
import { ArticleListColumn } from "@/components/ArticleListColumn";
import { ArticleViewer } from "@/components/ArticleViewer";
import { useUnread } from "@/lib/unreadContext";
import { useFeed } from "@/lib/feedContext";

export default function HomePage() {
  const { articles, feeds, isLoading, selectedFeed, setSelectedFeed } = useFeed();
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { readArticleIds, previouslyReadArticleIds, toggleReadStatus } = useUnread();

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter articles based on selected feed and exclude previously read articles
  const filteredArticles = useMemo(() => {
    // First filter out articles that were read in previous sessions
    let filtered = articles.filter(a => !previouslyReadArticleIds.has(a.id));
    
    // Then filter by selected feed if applicable
    if (selectedFeed) {
      const feed = feeds.find(f => f.id === selectedFeed);
      if (feed) {
        filtered = filtered.filter(a => a.feedUrl === feed.url);
      }
    }
    
    return filtered;
  }, [articles, selectedFeed, feeds, previouslyReadArticleIds]);

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

  // Close mobile article viewer
  const closeMobileViewer = useCallback(() => {
    setSelectedArticleId(null);
  }, []);

  // Mark all filtered articles as read - memoized callback
  const handleMarkAllAsRead = useCallback(() => {
    filteredArticles.forEach(article => {
      if (!readArticleIds.has(article.id)) {
        toggleReadStatus(article.id);
      }
    });
  }, [filteredArticles, readArticleIds, toggleReadStatus]);

  // Calculate total unread count across ALL articles (not just filtered) - memoized
  // This ensures "Today" always shows the total count regardless of selected feed
  const totalUnreadCount = useMemo(() => {
    return articles
      .filter(a => !previouslyReadArticleIds.has(a.id))
      .filter(a => a.readStatus === 'unread').length;
  }, [articles, previouslyReadArticleIds]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
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
          onMarkAllAsRead={handleMarkAllAsRead}
          showMarkAllAsRead={selectedFeed !== null}
          feeds={feeds}
          selectedFeed={selectedFeed}
          onSelectFeed={setSelectedFeed}
          totalUnreadCount={totalUnreadCount}
        />
        <ArticleViewer article={selectedArticle} />
      </div>

      {/* Mobile Article Viewer Modal */}
      {isMobile && selectedArticle && (
        <div className="fixed inset-0 z-[100] bg-[var(--background)] overflow-y-auto">
          <div className="sticky top-0 z-50 bg-[var(--background)]/95 backdrop-blur-xl border-b border-white/10 px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={closeMobileViewer}
                className="flex items-center gap-2 text-[var(--primary)] font-medium text-[15px]"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4l-8 8 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Back</span>
              </button>
            </div>
          </div>
          <ArticleViewer article={selectedArticle} />
        </div>
      )}
    </>
  );
}

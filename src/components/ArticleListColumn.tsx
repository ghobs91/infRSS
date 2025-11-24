import React, { memo, useCallback, useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { CheckIcon } from '@/components/ui/icons';
import { useUnread } from '@/lib/unreadContext';

interface Article {
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

interface Feed {
  id: string;
  name: string;
  url: string;
  unreadCount?: number;
  favicon?: string;
}

interface ArticleListColumnProps {
  articles: Article[];
  selectedArticle: string | null;
  onSelectArticle: (articleId: string) => void;
  title?: string;
  subtitle?: string;
  onMarkAsRead?: (articleId: string) => void;
  onMarkAllAsRead?: () => void;
  showMarkAllAsRead?: boolean;
  feeds?: Feed[];
  selectedFeed?: string | null;
  onSelectFeed?: (feedId: string | null) => void;
  totalUnreadCount?: number;
}

const INITIAL_BATCH_SIZE = 100;
const LOAD_MORE_BATCH_SIZE = 50;
const LOAD_MORE_THRESHOLD = 1000; // pixels from bottom

const ArticleListItem = memo(({ 
  article, 
  selectedArticle, 
  onSelectArticle,
  getExcerpt,
  onMarkAsRead
}: { 
  article: Article; 
  selectedArticle: string | null; 
  onSelectArticle: (id: string) => void;
  getExcerpt: (article: Article) => string;
  onMarkAsRead?: (id: string) => void;
}) => {
  const [faviconError, setFaviconError] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const hasBeenSeenRef = useRef(false);
  const hasBeenMarkedRef = useRef(false);

  // Track when article is scrolled past
  useEffect(() => {
    if (!itemRef.current || !onMarkAsRead || article.readStatus === 'read') return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        
        // Article is visible - mark as seen
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          hasBeenSeenRef.current = true;
        }
        // Article has left viewport and was previously seen - mark as read
        else if (!entry.isIntersecting && hasBeenSeenRef.current && !hasBeenMarkedRef.current) {
          hasBeenMarkedRef.current = true;
          onMarkAsRead(article.id);
        }
      },
      { 
        threshold: [0, 0.5],
        rootMargin: '-50px 0px -50px 0px'
      }
    );
    
    observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [article.id, article.readStatus, onMarkAsRead]);

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?sz=32&domain_url=${domain}`;
    } catch {
      return `https://www.google.com/s2/favicons?sz=32&domain_url=${url}`;
    }
  };

  return (
    <div
      ref={itemRef}
      className={`article-list-item border-b border-[var(--border)] py-4 px-4 active:bg-white/5 transition-colors ${
        selectedArticle === article.id ? 'bg-white/5' : ''
      } ${article.readStatus === 'read' ? 'opacity-70' : ''}`}
      onClick={() => onSelectArticle(article.id)}
    >
      <div className="flex gap-4">
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          {/* Source Line */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 relative flex-shrink-0 rounded-sm overflow-hidden bg-[#2C2C2E]">
              {!faviconError ? (
                <Image
                  src={getFaviconUrl(article.link)}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                  onError={() => setFaviconError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-[var(--article-list-text-secondary)]">
                  R
                </div>
              )}
            </div>
            <span className="text-[13px] text-[var(--article-list-text-secondary)] font-medium truncate">
              {article.sourceDomain}
            </span>
            <span className="text-[13px] text-[var(--article-list-text-secondary)]">·</span>
            <span className="text-[13px] text-[var(--article-list-text-secondary)]">
              {(() => {
                const date = new Date(article.pubDate);
                const now = new Date();
                const diffMs = now.getTime() - date.getTime();
                const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                if (diffHours < 1) return 'Just now';
                if (diffHours < 24) return `${diffHours} hours ago`;
                return date.toLocaleDateString();
              })()}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-[17px] font-bold text-[var(--article-list-text)] leading-tight mb-1 line-clamp-3">
            {article.title}
          </h3>

          {/* Summary */}
          {getExcerpt(article) && (
            <p className="text-[15px] text-[var(--article-list-text-secondary)] leading-snug line-clamp-2">
              {getExcerpt(article)}
            </p>
          )}
        </div>

        {/* Thumbnail */}
        {article.thumbnail && (
          <div className="flex-shrink-0 pt-1">
            <Image
              src={article.thumbnail}
              alt=""
              width={120}
              height={120}
              unoptimized
              loading="lazy"
              className="w-[120px] h-[120px] rounded-[12px] object-cover bg-[#2C2C2E]"
            />
          </div>
        )}
      </div>
    </div>
  );
});

ArticleListItem.displayName = 'ArticleListItem';

const ArticleListColumnComponent: React.FC<ArticleListColumnProps> = ({
  articles,
  selectedArticle,
  onSelectArticle,
  title = 'Today',
  subtitle,
  onMarkAsRead,
  onMarkAllAsRead,
  showMarkAllAsRead = false,
  feeds = [],
  selectedFeed = null,
  onSelectFeed,
  totalUnreadCount = 0,
}) => {
  const { markAsRead } = useUnread();
  const [displayCount, setDisplayCount] = useState(INITIAL_BATCH_SIZE);
  const [showMarkAllDialog, setShowMarkAllDialog] = useState(false);
  const [showMobileFeedPanel, setShowMobileFeedPanel] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const isLoadingMoreRef = useRef(false);
  const articlesLengthRef = useRef(articles.length);

  // Use provided callback or context method
  const handleMarkAsRead = onMarkAsRead || markAsRead;

  // Keep articles length in ref for scroll handler
  useEffect(() => {
    articlesLengthRef.current = articles.length;
  }, [articles.length]);

  // Reset display count when articles array changes (e.g. feed change)
  // We use the article ID of the first article as a proxy for list changes
  // to avoid resetting on simple read status updates
  const firstArticleId = articles.length > 0 ? articles[0].id : '';
  
  useEffect(() => {
    console.log('🔄 Articles changed, resetting display count. Total articles:', articles.length);
    setDisplayCount(INITIAL_BATCH_SIZE);
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [firstArticleId, articles.length]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const target = listRef.current;
      if (!target) return;

      const { scrollTop, scrollHeight, clientHeight } = target;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      
      // Load more when within threshold and not already loading
      if (distanceFromBottom < LOAD_MORE_THRESHOLD && !isLoadingMoreRef.current) {
        setDisplayCount(prev => {
          const totalArticles = articlesLengthRef.current;
          if (prev >= totalArticles) {
            return prev;
          }
          
          isLoadingMoreRef.current = true;
          const newCount = Math.min(prev + LOAD_MORE_BATCH_SIZE, totalArticles);
          console.log(`📜 Loading more articles: ${prev} -> ${newCount} of ${totalArticles}`);
          
          // Reset the loading flag after a short delay
          setTimeout(() => {
            isLoadingMoreRef.current = false;
          }, 100);
          
          return newCount;
        });
      }
    };

    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener('scroll', handleScroll, { passive: true });
      return () => listElement.removeEventListener('scroll', handleScroll);
    }
  }, []); // Empty dependency array - handler uses refs for current values

  const getExcerpt = useCallback((article: Article) => {
    if (article.summary) return article.summary;
    if (article.content) {
      const text = article.content.replace(/<[^>]*>/g, '').substring(0, 150);
      return text + (article.content.length > 150 ? '...' : '');
    }
    return '';
  }, []);

  // Calculate unread count
  const unreadCount = useMemo(() => {
    return articles.filter(a => a.readStatus === 'unread').length;
  }, [articles]);

  // Handle mark all as read with confirmation
  const handleMarkAllClick = useCallback(() => {
    if (onMarkAllAsRead && unreadCount > 0) {
      setShowMarkAllDialog(true);
    }
  }, [onMarkAllAsRead, unreadCount]);

  const confirmMarkAllAsRead = useCallback(() => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
    setShowMarkAllDialog(false);
  }, [onMarkAllAsRead]);

  const cancelMarkAllAsRead = useCallback(() => {
    setShowMarkAllDialog(false);
  }, []);

  const displayedArticles = articles.slice(0, displayCount);

  // Debug logging
  useEffect(() => {
    console.log(`📊 ArticleListColumn: Displaying ${displayedArticles.length} of ${articles.length} articles`);
  }, [displayedArticles.length, articles.length]);

  return (
    <div className="article-list">
      <div className="article-list-header">
        <div className="hidden md:flex items-start justify-between gap-4">
          <div>
            <h1 className="article-list-title">{title}</h1>
            {subtitle && (
              <p className="article-list-subtitle">{subtitle}</p>
            )}
          </div>
          {showMarkAllAsRead && onMarkAllAsRead && articles.length > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 rounded-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
              title="Mark all articles in this feed as read"
            >
              <CheckIcon />
              <span>Mark All Read</span>
            </button>
          )}
        </div>
        
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-20 bg-[var(--background)] backdrop-blur-xl border-b border-white/10 px-4 py-3">
          <div className="flex items-center justify-between w-full">
            <button
              onClick={() => setShowMobileFeedPanel(true)}
              className="w-8 h-8 rounded-full bg-[#2C2C2E] flex items-center justify-center text-white hover:bg-[#3A3A3C] transition-colors"
              aria-label="Open feed filter"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <h1 className="text-[17px] font-semibold text-white absolute left-1/2 transform -translate-x-1/2">Articles</h1>
            <div className="flex items-center gap-4">
              {unreadCount > 0 ? (
                <button 
                  onClick={handleMarkAllClick}
                  className="px-3 py-1.5 bg-[#FF6B35] text-white rounded-full text-sm font-semibold hover:bg-[#FF5722] transition-colors"
                  title="Mark all articles as read"
                >
                  {unreadCount}
                </button>
              ) : (
                <div className="px-3 py-1.5 bg-[#2C2C2E] text-[#8E8E93] rounded-full text-sm font-semibold">
                  0
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Mark All as Read Confirmation Dialog */}
        {showMarkAllDialog && (
          <div className="md:hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md mx-4 bg-[#1C1C1E] rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Mark All as Read?</h3>
                <p className="text-[#8E8E93] text-sm mb-6">
                  This will mark all {unreadCount} unread article{unreadCount !== 1 ? 's' : ''} as read. This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={cancelMarkAllAsRead}
                    className="flex-1 px-4 py-3 bg-[#2C2C2E] text-white rounded-xl font-medium hover:bg-[#3A3A3C] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmMarkAllAsRead}
                    className="flex-1 px-4 py-3 bg-[#FF6B35] text-white rounded-xl font-medium hover:bg-[#FF5722] transition-colors"
                  >
                    Mark All Read
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Feed Filter Panel */}
        {showMobileFeedPanel && (
          <div className="md:hidden fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" onClick={() => setShowMobileFeedPanel(false)}>
            <div 
              className="absolute left-0 top-0 bottom-0 w-[280px] bg-[#1C1C1E] shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-[#1C1C1E] border-b border-white/10 px-4 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Feeds</h2>
                <button
                  onClick={() => setShowMobileFeedPanel(false)}
                  className="w-8 h-8 rounded-full bg-[#2C2C2E] flex items-center justify-center text-white hover:bg-[#3A3A3C] transition-colors"
                  aria-label="Close"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div className="p-4 space-y-2">
                {/* All Articles Option */}
                <button
                  onClick={() => {
                    if (onSelectFeed) onSelectFeed(null);
                    setShowMobileFeedPanel(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    selectedFeed === null 
                      ? 'bg-[#FF6B35] text-white' 
                      : 'bg-[#2C2C2E] text-white hover:bg-[#3A3A3C]'
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3h6v6H3V3zm0 8h6v6H3v-6zm8-8h6v6h-6V3zm0 8h6v6h-6v-6z" fill="currentColor"/>
                  </svg>
                  <span className="flex-1 text-left font-medium">All Articles</span>
                  {totalUnreadCount > 0 && (
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/20">
                      {totalUnreadCount}
                    </span>
                  )}
                </button>

                {/* Individual Feeds */}
                <div className="pt-2">
                  <div className="text-[#8E8E93] text-xs font-semibold uppercase tracking-wider px-4 mb-2">
                    Subscriptions
                  </div>
                  {feeds.length === 0 ? (
                    <div className="px-4 py-6 text-center text-[#8E8E93] text-sm">
                      No feeds yet
                    </div>
                  ) : (
                    feeds.map((feed) => (
                      <button
                        key={feed.id}
                        onClick={() => {
                          if (onSelectFeed) onSelectFeed(feed.id);
                          setShowMobileFeedPanel(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          selectedFeed === feed.id
                            ? 'bg-[#FF6B35] text-white'
                            : 'bg-[#2C2C2E] text-white hover:bg-[#3A3A3C]'
                        }`}
                      >
                        <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {feed.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="flex-1 text-left font-medium truncate">{feed.name}</span>
                        {feed.unreadCount && feed.unreadCount > 0 && (
                          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/20">
                            {feed.unreadCount}
                          </span>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div 
        className="article-list-items"
        ref={listRef}
      >
        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="text-6xl mb-4 opacity-50">📰</div>
            <p className="text-lg text-[var(--text-secondary)]">No articles to display</p>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Add some feeds to get started
            </p>
          </div>
        ) : (
          <>
            {displayedArticles.map((article) => (
              <ArticleListItem
                key={article.id}
                article={article}
                selectedArticle={selectedArticle}
                onSelectArticle={onSelectArticle}
                getExcerpt={getExcerpt}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
            {displayCount < articles.length && (
              <div className="flex items-center justify-center py-8 text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-[var(--primary)] border-t-transparent"></div>
                  <span className="text-sm">Loading more articles...</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export const ArticleListColumn = memo(ArticleListColumnComponent);

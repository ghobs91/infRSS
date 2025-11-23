import React, { memo, useCallback, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { CheckIcon } from '@/components/ui/icons';

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

interface ArticleListColumnProps {
  articles: Article[];
  selectedArticle: string | null;
  onSelectArticle: (articleId: string) => void;
  title?: string;
  subtitle?: string;
}

const INITIAL_BATCH_SIZE = 100;
const LOAD_MORE_BATCH_SIZE = 50;
const LOAD_MORE_THRESHOLD = 1000; // pixels from bottom

const ArticleListItem = memo(({ 
  article, 
  selectedArticle, 
  onSelectArticle,
  getExcerpt 
}: { 
  article: Article; 
  selectedArticle: string | null; 
  onSelectArticle: (id: string) => void;
  getExcerpt: (article: Article) => string;
}) => {
  const [faviconError, setFaviconError] = useState(false);

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
      className={`article-list-item border-b border-white/10 py-4 px-4 active:bg-white/5 transition-colors ${
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
                <div className="w-full h-full flex items-center justify-center text-[10px] text-[#8E8E93]">
                  R
                </div>
              )}
            </div>
            <span className="text-[13px] text-[#8E8E93] font-medium truncate">
              {article.sourceDomain}
            </span>
            <span className="text-[13px] text-[#8E8E93]">·</span>
            <span className="text-[13px] text-[#8E8E93]">
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
          <h3 className="text-[17px] font-bold text-white leading-tight mb-1 line-clamp-3">
            {article.title}
          </h3>

          {/* Summary */}
          {getExcerpt(article) && (
            <p className="text-[15px] text-[#8E8E93] leading-snug line-clamp-2">
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
              width={80}
              height={80}
              unoptimized
              loading="lazy"
              className="w-[80px] h-[80px] rounded-[12px] object-cover bg-[#2C2C2E]"
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
}) => {
  const [displayCount, setDisplayCount] = useState(INITIAL_BATCH_SIZE);
  const scrollPositionRef = useRef<number>(0);

  // Save scroll position before articles change and restore after
  useEffect(() => {
    const listElement = document.querySelector('.article-list-items') as HTMLElement;
    if (!listElement) return;

    // Save current scroll position
    const savedScrollPosition = scrollPositionRef.current;

    // Reset display count when articles change significantly (new feed or refresh)
    // But keep higher display count if we already loaded more
    setDisplayCount(prev => Math.max(prev, INITIAL_BATCH_SIZE));

    // Restore scroll position after DOM updates
    requestAnimationFrame(() => {
      if (savedScrollPosition > 0 && listElement) {
        listElement.scrollTop = savedScrollPosition;
      }
    });
  }, [articles.length]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target || !target.classList.contains('article-list-items')) return;

      const scrollTop = target.scrollTop;
      const scrollHeight = target.scrollHeight;
      const clientHeight = target.clientHeight;

      // Save scroll position
      scrollPositionRef.current = scrollTop;

      if (scrollHeight - scrollTop - clientHeight < LOAD_MORE_THRESHOLD) {
        setDisplayCount(prev => {
          const newCount = Math.min(prev + LOAD_MORE_BATCH_SIZE, articles.length);
          if (newCount > prev) {
            console.log(`Loading more articles: ${prev} -> ${newCount} of ${articles.length}`);
          }
          return newCount;
        });
      }
    };

    const listElement = document.querySelector('.article-list-items');
    if (listElement) {
      listElement.addEventListener('scroll', handleScroll);
      return () => listElement.removeEventListener('scroll', handleScroll);
    }
  }, [articles.length]);



  const getExcerpt = useCallback((article: Article) => {
    if (article.summary) return article.summary;
    if (article.content) {
      const text = article.content.replace(/<[^>]*>/g, '').substring(0, 150);
      return text + (article.content.length > 150 ? '...' : '');
    }
    return '';
  }, []);

  const displayedArticles = articles.slice(0, displayCount);

  return (
    <div className="article-list">
      <div className="article-list-header">
        <div className="hidden md:block">
          <h1 className="article-list-title">{title}</h1>
          {subtitle && (
            <p className="article-list-subtitle">{subtitle}</p>
          )}
        </div>
        
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 py-3">
          <div className="flex items-center justify-between w-full">
            <div className="w-8 h-8 rounded-full bg-[#2C2C2E] flex items-center justify-center text-[#8E8E93] font-medium text-xs">
              PP
            </div>
            <h1 className="text-[17px] font-semibold text-white absolute left-1/2 transform -translate-x-1/2">Articles</h1>
            <div className="flex items-center gap-4">
              <button className="w-6 h-6 rounded-full border-2 border-[#8E8E93] flex items-center justify-center">
              </button>
              <button className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white">
                <CheckIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="article-list-items bg-black">
        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="text-6xl mb-4 opacity-50">📰</div>
            <p className="text-lg text-[var(--text-secondary)]">No articles to display</p>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Add some feeds to get started
            </p>
          </div>
        ) : (
          displayedArticles.map((article) => (
            <ArticleListItem
              key={article.id}
              article={article}
              selectedArticle={selectedArticle}
              onSelectArticle={onSelectArticle}
              getExcerpt={getExcerpt}
            />
          ))
        )}
      </div>
    </div>
  );
};

export const ArticleListColumn = memo(ArticleListColumnComponent);

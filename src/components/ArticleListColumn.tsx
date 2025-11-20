import React, { memo, useCallback, useState, useEffect } from 'react';
import Image from 'next/image';

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

const INITIAL_BATCH_SIZE = 50;
const LOAD_MORE_THRESHOLD = 500; // pixels from bottom

const ArticleListColumnComponent: React.FC<ArticleListColumnProps> = ({
  articles,
  selectedArticle,
  onSelectArticle,
  title = 'Today',
  subtitle,
}) => {
  const [displayCount, setDisplayCount] = useState(INITIAL_BATCH_SIZE);

  // Reset display count when articles change
  useEffect(() => {
    setDisplayCount(INITIAL_BATCH_SIZE);
  }, [articles]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target || !target.classList.contains('article-list-items')) return;

      const scrollTop = target.scrollTop;
      const scrollHeight = target.scrollHeight;
      const clientHeight = target.clientHeight;

      if (scrollHeight - scrollTop - clientHeight < LOAD_MORE_THRESHOLD) {
        setDisplayCount(prev => Math.min(prev + 20, articles.length));
      }
    };

    const listElement = document.querySelector('.article-list-items');
    if (listElement) {
      listElement.addEventListener('scroll', handleScroll);
      return () => listElement.removeEventListener('scroll', handleScroll);
    }
  }, [articles.length]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      });
    }
  }, []);

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
        <h1 className="article-list-title">{title}</h1>
        {subtitle && (
          <p className="article-list-subtitle">{subtitle}</p>
        )}
      </div>

      <div className="article-list-items">
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
            <div
              key={article.id}
              className={`article-list-item ${
                selectedArticle === article.id ? 'active' : ''
              } ${article.readStatus === 'read' ? 'read' : ''}`}
              onClick={() => onSelectArticle(article.id)}
            >
              <div className="flex gap-3">
                <div className="flex-1 min-w-0">
                  <div className="article-list-item-header">
                    <div className="article-list-item-source">
                      <Image
                        src={`https://www.google.com/s2/favicons?sz=16&domain_url=${article.link}`}
                        alt="favicon"
                        width={16}
                        height={16}
                        unoptimized
                        loading="lazy"
                      />
                      <span>{article.sourceDomain}</span>
                    </div>
                    <span>•</span>
                    <span className="text-xs text-[var(--text-secondary)]">
                      {formatDate(article.pubDate)}
                    </span>
                  </div>

                  <h3 className="article-list-item-title">{article.title}</h3>

                  {getExcerpt(article) && (
                    <p className="article-list-item-excerpt">
                      {getExcerpt(article)}
                    </p>
                  )}
                </div>

                {article.thumbnail && (
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    width={80}
                    height={80}
                    unoptimized
                    loading="lazy"
                    className="article-list-item-thumbnail"
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const ArticleListColumn = memo(ArticleListColumnComponent);

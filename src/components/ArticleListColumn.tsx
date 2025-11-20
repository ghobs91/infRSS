import React from 'react';
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

export const ArticleListColumn: React.FC<ArticleListColumnProps> = ({
  articles,
  selectedArticle,
  onSelectArticle,
  title = 'Today',
  subtitle,
}) => {
  const formatDate = (dateString: string) => {
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
  };

  const getExcerpt = (article: Article) => {
    if (article.summary) return article.summary;
    if (article.content) {
      const text = article.content.replace(/<[^>]*>/g, '').substring(0, 150);
      return text + (article.content.length > 150 ? '...' : '');
    }
    return '';
  };

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
          articles.map((article) => (
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

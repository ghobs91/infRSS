import React, { memo, useCallback } from 'react';
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

interface ArticleViewerProps {
  article: Article | null;
}

const ArticleViewerComponent: React.FC<ArticleViewerProps> = ({ article }) => {
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }, []);

  if (!article) {
    return (
      <div className="article-viewer">
        <div className="article-viewer-empty">
          <div className="article-viewer-empty-icon">📰</div>
          <p className="article-viewer-empty-text">
            Select an article to read
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="article-viewer">
      <div className="article-viewer-header">
        <div className="article-viewer-meta">
          <div className="article-viewer-source">
            <Image
              src={`https://www.google.com/s2/favicons?sz=16&domain_url=${article.link}`}
              alt="favicon"
              width={16}
              height={16}
              unoptimized
            />
            <span>{article.sourceDomain}</span>
          </div>
          <span className="text-[var(--text-secondary)]">•</span>
          <span className="article-viewer-date">{formatDate(article.pubDate)}</span>
        </div>

        <h1 className="article-viewer-title">{article.title}</h1>

        {article.thumbnail && (
          <Image
            src={article.thumbnail}
            alt={article.title}
            width={800}
            height={500}
            unoptimized
            priority
            className="article-viewer-image"
          />
        )}
      </div>

      <div className="article-viewer-content">
        {article.summary && (
          <div className="mb-8 p-6 bg-[var(--accent)] rounded-xl">
            <p className="text-lg font-medium leading-relaxed">{article.summary}</p>
          </div>
        )}

        {article.content ? (
          <div
            dangerouslySetInnerHTML={{ __html: article.content }}
            className="prose prose-lg max-w-none"
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-[var(--text-secondary)] mb-6">
              Content not available. Read the full article on the source website:
            </p>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white rounded-full font-semibold hover:bg-[var(--primary-hover)] transition-all duration-200"
            >
              <span>Read Full Article</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-[var(--border)] text-center">
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium transition-colors"
          >
            <span>View original article</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8.667V12a1.333 1.333 0 01-1.333 1.333H4A1.333 1.333 0 012.667 12V5.333A1.333 1.333 0 014 4h3.333M10 2.667h3.333v3.333M6.667 9.333l6.666-6.666"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export const ArticleViewer = memo(ArticleViewerComponent, (prevProps, nextProps) => {
  return prevProps.article?.id === nextProps.article?.id;
});

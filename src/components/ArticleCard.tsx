// components/ArticleCard.tsx

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Article, SentimentAnalysis } from "@/lib/types";

interface ArticleCardProps {
  article: Article;
  isRead: boolean;
  onScrollPast?: () => void;
  onToggleRead?: (articleId: string) => void;
  onArchive?: (articleId: string) => void;
  showSentiment?: boolean;
  showSummary?: boolean;
}

// Sentiment indicator component
const SentimentIndicator = ({ sentiment }: { sentiment: SentimentAnalysis }) => {
  const getSentimentColor = (score: number) => {
    if (score > 0.3) return 'text-green-600';
    if (score < -0.3) return 'text-red-600';
    return 'text-yellow-600';
  };

  const getSentimentIcon = (score: number) => {
    if (score > 0.3) return '😊';
    if (score < -0.3) return '😞';
    return '😐';
  };

  const getToxicityColor = (toxicity: number) => {
    if (toxicity > 0.7) return 'text-red-600';
    if (toxicity > 0.4) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="flex flex-wrap gap-2 text-xs w-full overflow-hidden">
      <div className={cn("flex items-center gap-1 flex-shrink-0", getSentimentColor(sentiment.score))}>
        <span>{getSentimentIcon(sentiment.score)}</span>
        <span>{Math.round(sentiment.score * 100)}%</span>
      </div>
      
      {sentiment.isClickbait && (
        <div className="text-orange-600 flex items-center gap-1 flex-shrink-0">
          <span>🚨</span>
          <span>Clickbait</span>
        </div>
      )}
      
      {sentiment.isRagebait && (
        <div className="text-red-600 flex items-center gap-1 flex-shrink-0">
          <span>💥</span>
          <span>Ragebait</span>
        </div>
      )}
      
      <div className={cn("flex items-center gap-1 flex-shrink-0", getToxicityColor(sentiment.toxicity))}>
        <span>⚠️</span>
        <span>{Math.round(sentiment.toxicity * 100)}%</span>
      </div>
    </div>
  );
};

// Article summary component
const ArticleSummary = ({ summary, isExpanded, onToggle }: { 
  summary: string; 
  isExpanded: boolean; 
  onToggle: () => void;
}) => {
  const maxLength = 150;
  const shouldTruncate = summary.length > maxLength;
  
  if (!shouldTruncate) {
    return <p className="text-sm text-[var(--text-secondary)] mt-2 break-words">{summary}</p>;
  }

  return (
    <div className="mt-2 w-full overflow-hidden">
      <p className="text-sm text-[var(--text-secondary)] break-words">
        {isExpanded ? summary : `${summary.substring(0, maxLength)}...`}
      </p>
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="text-xs p-1 h-auto mt-1 flex-shrink-0"
      >
        {isExpanded ? 'Show less' : 'Read more'}
      </Button>
    </div>
  );
};

export const ArticleCard = ({ 
  article, 
  isRead, 
  onScrollPast, 
  onToggleRead,
  onArchive,
  showSentiment = true,
  showSummary = true
}: ArticleCardProps) => {
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [wasVisible, setWasVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!ref.current || !onScrollPast) return;
    
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Mark as read when scrolling PAST (was visible, now not visible)
          if (wasVisible && !entry.isIntersecting) {
            onScrollPast();
          }
          // Track if the article is currently visible
          if (entry.isIntersecting) {
            setWasVisible(true);
          }
        });
      },
      { 
        threshold: 0,
        rootMargin: '-50px 0px -50px 0px' // Only trigger when article is well within viewport
      }
    );
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onScrollPast, wasVisible]);

  const handleToggleRead = () => {
    if (onToggleRead) {
      onToggleRead(article.id);
    }
  };

  const handleArchive = () => {
    if (onArchive) {
      onArchive(article.id);
    }
  };

  return (
    <div ref={ref}>
      <Card className={cn(
        "shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md max-w-full",
        isRead && "read-article opacity-75",
        article.sentiment?.isClickbait && "border-orange-200",
        article.sentiment?.isRagebait && "border-red-200"
      )}>
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row w-full overflow-hidden">
            {article.thumbnail && !imgError && (
              <div className="w-full sm:w-40 h-40 sm:h-auto relative flex-shrink-0">
                <Image 
                  src={article.thumbnail} 
                  alt={article.title}
                  fill
                  unoptimized
                  className="object-cover"
                  onError={() => setImgError(true)}
                />
              </div>
            )}
            
            <div className="flex-1 p-3 sm:p-4 min-w-0">
              <div className="flex items-start justify-between gap-2 w-full overflow-hidden">
                <a
                  href={article.link}
                  className="text-base sm:text-lg font-medium text-[var(--primary)] hover:underline line-clamp-2 flex-1 break-words overflow-hidden"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.title}
                </a>
                
                <div className="flex gap-1 flex-shrink-0">
                  {onToggleRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleToggleRead}
                      className="text-xs p-2 h-auto whitespace-nowrap"
                      title={isRead ? "Mark as unread" : "Mark as read"}
                    >
                      {isRead ? "👁️" : "👁️‍🗨️"}
                    </Button>
                  )}
                  
                  {onArchive && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleArchive}
                      className="text-xs p-2 h-auto whitespace-nowrap"
                      title="Archive article"
                    >
                      📁
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 my-1 w-full overflow-hidden">
                {mounted && (
                  <div className="w-4 h-4 relative flex-shrink-0">
                    <Image
                      src={`https://www.google.com/s2/favicons?sz=16&domain_url=${article.link}`}
                      alt="favicon"
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                )}
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] truncate flex-1">
                  {(() => {
                    try {
                      return article.link ? new URL(article.link).hostname.replace("www.", "") : "Unknown Source";
                    } catch {
                      return "Unknown Source";
                    }
                  })()}
                </p>
                
                {article.tags && article.tags.length > 0 && (
                  <div className="flex gap-1 flex-shrink-0">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-2 truncate">
                {new Date(article.pubDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>

              {/* Sentiment Analysis */}
              {showSentiment && article.sentiment && (
                <div className="mb-2 w-full overflow-hidden">
                  <SentimentIndicator sentiment={article.sentiment} />
                </div>
              )}

              {/* Article Summary */}
              {showSummary && article.summary && (
                <div className="w-full overflow-hidden">
                  <ArticleSummary
                    summary={article.summary}
                    isExpanded={summaryExpanded}
                    onToggle={() => setSummaryExpanded(!summaryExpanded)}
                  />
                </div>
              )}

              {/* Article Content Preview - show content if no summary, or as fallback */}
              {(!article.summary || showSummary === false) && article.content && (
                <div className="w-full overflow-hidden">
                  <p className="text-sm text-[var(--text-secondary)] mt-2 line-clamp-3 break-words">
                    {article.content.substring(0, 200)}...
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 
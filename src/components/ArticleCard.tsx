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
  onVisible?: () => void;
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
    <div className="flex flex-wrap gap-2 text-xs">
      <div className={cn("flex items-center gap-1", getSentimentColor(sentiment.score))}>
        <span>{getSentimentIcon(sentiment.score)}</span>
        <span>{Math.round(sentiment.score * 100)}%</span>
      </div>
      
      {sentiment.isClickbait && (
        <div className="text-orange-600 flex items-center gap-1">
          <span>🚨</span>
          <span>Clickbait</span>
        </div>
      )}
      
      {sentiment.isRagebait && (
        <div className="text-red-600 flex items-center gap-1">
          <span>💥</span>
          <span>Ragebait</span>
        </div>
      )}
      
      <div className={cn("flex items-center gap-1", getToxicityColor(sentiment.toxicity))}>
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
    return <p className="text-sm text-[var(--text-secondary)] mt-2">{summary}</p>;
  }

  return (
    <div className="mt-2">
      <p className="text-sm text-[var(--text-secondary)]">
        {isExpanded ? summary : `${summary.substring(0, maxLength)}...`}
      </p>
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="text-xs p-1 h-auto mt-1"
      >
        {isExpanded ? 'Show less' : 'Read more'}
      </Button>
    </div>
  );
};

export const ArticleCard = ({ 
  article, 
  isRead, 
  onVisible, 
  onToggleRead,
  onArchive,
  showSentiment = true,
  showSummary = true
}: ArticleCardProps) => {
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!ref.current || !onVisible) return;
    
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onVisible();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onVisible]);

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
        "shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md",
        isRead && "read-article opacity-75",
        article.sentiment?.isClickbait && "border-orange-200",
        article.sentiment?.isRagebait && "border-red-200"
      )}>
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            {article.thumbnail && !imgError && (
              <div className="w-full sm:w-40 h-40 sm:h-auto relative">
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
            
            <div className="flex-1 p-3 sm:p-4">
              <div className="flex items-start justify-between gap-2">
                <a
                  href={article.link}
                  className="text-base sm:text-lg font-medium text-[var(--primary)] hover:underline line-clamp-2 flex-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.title}
                </a>
                
                <div className="flex gap-1">
                  {onToggleRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleToggleRead}
                      className="text-xs p-2 h-auto"
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
                      className="text-xs p-2 h-auto"
                      title="Archive article"
                    >
                      📁
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 my-1">
                {mounted && (
                  <div className="w-4 h-4 relative">
                    <Image
                      src={`https://www.google.com/s2/favicons?sz=16&domain_url=${article.link}`}
                      alt="favicon"
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                )}
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  {(() => {
                    try {
                      return article.link ? new URL(article.link).hostname.replace("www.", "") : "Unknown Source";
                    } catch {
                      return "Unknown Source";
                    }
                  })()}
                </p>
                
                {article.tags && article.tags.length > 0 && (
                  <div className="flex gap-1">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-2">
                {new Date(article.pubDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>

              {/* Sentiment Analysis */}
              {showSentiment && article.sentiment && (
                <div className="mb-2">
                  <SentimentIndicator sentiment={article.sentiment} />
                </div>
              )}

              {/* Article Summary */}
              {showSummary && article.summary && (
                <ArticleSummary
                  summary={article.summary}
                  isExpanded={summaryExpanded}
                  onToggle={() => setSummaryExpanded(!summaryExpanded)}
                />
              )}

              {/* Article Content Preview */}
              {!article.summary && article.content && (
                <p className="text-sm text-[var(--text-secondary)] mt-2 line-clamp-3">
                  {article.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 
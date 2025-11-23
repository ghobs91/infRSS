// components/ArticleCard.tsx

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Article, VibesAnalysis } from "@/lib/types";

interface ArticleCardProps {
  article: Article;
  isRead: boolean;
  onScrollPast?: () => void;
  onArchive?: (articleId: string) => void;
  showVibes?: boolean;
  showSummary?: boolean;
  filtered?: boolean;
  filterReason?: string;
  viewMode?: 'magazine' | 'cards';
}

// Helper functions for vibes display
const getVibesColor = (score: number) => {
  if (score > 0.3) return 'text-green-500';
  if (score < -0.3) return 'text-red-500';
  return 'text-yellow-500';
};

const getVibesIcon = (score: number) => {
  if (score > 0.3) return '😊';
  if (score < -0.3) return '😞';
  return '😐';
};

const getToxicityColor = (toxicity: number) => {
  if (toxicity > 0.7) return 'text-red-500';
  if (toxicity > 0.4) return 'text-yellow-500';
  return 'text-green-500';
};

// Vibes indicator component
const VibesIndicator = ({ vibes }: { vibes: VibesAnalysis }) => {

  return (
    <div className="flex flex-wrap gap-2.5 text-xs w-full overflow-hidden">
      <div className={cn("flex items-center gap-1.5 glass-card px-4 py-2 rounded-full flex-shrink-0 font-semibold shadow-md hover:scale-105 transition-all duration-300", getVibesColor(vibes.score))}>
        <span className="text-base">{getVibesIcon(vibes.score)}</span>
        <span>{Math.round(vibes.score * 100)}%</span>
      </div>
      
      {vibes.isClickbait && (
        <div className="text-orange-500 flex items-center gap-1.5 glass-card px-4 py-2 rounded-full flex-shrink-0 font-semibold shadow-md hover:scale-105 transition-all duration-300">
          <span className="text-base">🚨</span>
          <span>Clickbait</span>
        </div>
      )}
      
      {vibes.isRagebait && (
        <div className="text-red-500 flex items-center gap-1.5 glass-card px-4 py-2 rounded-full flex-shrink-0 font-semibold shadow-md hover:scale-105 transition-all duration-300">
          <span className="text-base">💥</span>
          <span>Ragebait</span>
        </div>
      )}
      
      <div className={cn("flex items-center gap-1.5 glass-card px-4 py-2 rounded-full flex-shrink-0 font-semibold shadow-md hover:scale-105 transition-all duration-300", getToxicityColor(vibes.toxicity))}>
        <span className="text-base">⚠️</span>
        <span>{Math.round(vibes.toxicity * 100)}%</span>
      </div>
    </div>
  );
};

export const ArticleCard = ({ 
  article, 
  isRead, 
  onScrollPast,
  onArchive,
  showVibes = true,
  showSummary = true,
  filtered = false,
  filterReason = '',
  viewMode = 'magazine'
}: ArticleCardProps) => {
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [showFiltered, setShowFiltered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);
  const wasVisibleRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset tracking refs when article changes or read status changes
  useEffect(() => {
    hasTriggeredRef.current = false;
    wasVisibleRef.current = false;
  }, [article.id, isRead]);

  useEffect(() => {
    if (!ref.current || !onScrollPast || isRead) return;
    
    const element = ref.current;
    
    const observer = new window.IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        
        // Article is now visible - mark it as "seen" only when most of it is visible
        if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
          wasVisibleRef.current = true;
        }
        // Article has scrolled completely out of view AND was previously seen AND hasn't been triggered yet
        else if (!entry.isIntersecting && entry.intersectionRatio === 0 && wasVisibleRef.current && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          onScrollPast();
        }
      },
      { 
        threshold: [0, 0.8],
        rootMargin: '-100px 0px -100px 0px' // Require more of article to be in viewport
      }
    );
    
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [onScrollPast, isRead, article.id]); // Include article.id to re-initialize when article changes

  const handleArchive = () => {
    if (onArchive) {
      onArchive(article.id);
    }
  };

  // Cards view - compact vertical layout with larger image
  if (viewMode === 'cards') {
    return (
      <div ref={ref} className="animate-[fadeIn_0.5s_ease-out]">
        <Card className={cn(
          "overflow-hidden transition-all duration-300 max-w-full relative h-full flex flex-col",
          isRead && "opacity-60 saturate-50",
          article.vibes?.isClickbait && "border-orange-300",
          article.vibes?.isRagebait && "border-red-300",
          filtered && "border-2"
        )}>
          {filtered && !showFiltered && (
            <div className="absolute inset-0 z-10 bg-[var(--background)]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed border-[var(--border)] rounded-[12px]">
              <div className="text-center space-y-3">
                <div className="text-4xl">
                  {filterReason === 'Clickbait' ? '🚨' : '💥'}
                </div>
                <p className="text-base font-bold text-[var(--text-primary)]">
                  Filtered: {filterReason}
                </p>
                <p className="text-sm text-[var(--text-secondary)] max-w-xs leading-relaxed">
                  This article was hidden based on your content preferences
                </p>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => setShowFiltered(true)}
                className="text-sm shadow-xl"
              >
                👁️ Show Article
              </Button>
            </div>
          )}
          {filtered && showFiltered && (
            <div className="absolute top-3 right-3 z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFiltered(false)}
                className="text-xs bg-[var(--background)]/90 backdrop-blur-xl hover:bg-[var(--background)]/95 shadow-lg"
                title="Hide this article again"
              >
                🙈 Hide
              </Button>
            </div>
          )}
          <CardContent className={cn("p-0 transition-all duration-300 flex flex-col h-full", filtered && !showFiltered && "blur-md")}>
            {/* Large Thumbnail */}
            {article.thumbnail && !imgError && (
              <div className="w-full h-48 relative overflow-hidden">
                <Image 
                  src={article.thumbnail} 
                  alt={article.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  onError={() => setImgError(true)}
                />
              </div>
            )}
            
            <div className="flex-1 p-4 flex flex-col">
              {/* Source and Date */}
              <div className="flex items-center gap-2 mb-2">
                {mounted && (
                  <div className="w-4 h-4 relative flex-shrink-0">
                    <Image
                      src={`https://www.google.com/s2/favicons?sz=16&domain_url=${article.link}`}
                      alt="favicon"
                      fill
                      unoptimized
                      className="object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <p className="text-xs text-[var(--text-secondary)] truncate flex-1">
                  {(() => {
                    try {
                      return article.link ? new URL(article.link).hostname.replace("www.", "") : "Unknown Source";
                    } catch {
                      return "Unknown Source";
                    }
                  })()}
                </p>
              </div>

              {/* Title */}
              <a
                href={article.link}
                className="text-base font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] line-clamp-3 mb-2 break-words transition-all duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                {article.title}
              </a>

              {/* Date */}
              <p className="text-xs text-[var(--text-secondary)] mb-2">
                {(() => {
                  const date = new Date(article.pubDate);
                  // Check if date is epoch time (Jan 1, 1970) which indicates unavailable date
                  if (date.getTime() === 0) {
                    return 'Date unavailable';
                  }
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });
                })()}
              </p>

              {/* Vibes - Compact */}
              {showVibes && article.vibes && (
                <div className="mb-2">
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    <div className={cn("flex items-center gap-1 glass-card px-2.5 py-1 rounded-full flex-shrink-0 font-semibold", getVibesColor(article.vibes.score))}>
                      <span className="text-sm">{getVibesIcon(article.vibes.score)}</span>
                      <span>{Math.round(article.vibes.score * 100)}%</span>
                    </div>
                    {article.vibes.isClickbait && (
                      <div className="text-orange-500 flex items-center gap-1 glass-card px-2.5 py-1 rounded-full flex-shrink-0 font-semibold">
                        <span className="text-sm">🚨</span>
                      </div>
                    )}
                    {article.vibes.isRagebait && (
                      <div className="text-red-500 flex items-center gap-1 glass-card px-2.5 py-1 rounded-full flex-shrink-0 font-semibold">
                        <span className="text-sm">💥</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Archive Button */}
              {onArchive && (
                <div className="mt-auto pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleArchive}
                    className="text-sm p-2 h-auto w-full hover:scale-105 transition-all duration-300"
                    title="Archive article"
                  >
                    📁 Archive
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Magazine view - updated list layout
  return (
    <div ref={ref} className="animate-[fadeIn_0.5s_ease-out]">
      <Card className={cn(
        "overflow-hidden transition-all duration-300 max-w-full relative border-0 border-b border-white/10 bg-transparent rounded-none shadow-none",
        isRead && "opacity-60 saturate-50",
        article.vibes?.isClickbait && "bg-orange-500/5",
        article.vibes?.isRagebait && "bg-red-500/5",
        filtered && "border-2"
      )}>
        {filtered && !showFiltered && (
          <div className="absolute inset-0 z-10 bg-[var(--background)]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed border-[var(--border)] rounded-[12px]">
            <div className="text-center space-y-3">
              <div className="text-4xl">
                {filterReason === 'Clickbait' ? '🚨' : '💥'}
              </div>
              <p className="text-base font-bold text-[var(--text-primary)]">
                Filtered: {filterReason}
              </p>
              <p className="text-sm text-[var(--text-secondary)] max-w-xs leading-relaxed">
                This article was hidden based on your content preferences
              </p>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => setShowFiltered(true)}
              className="text-sm shadow-xl"
            >
              👁️ Show Article
            </Button>
          </div>
        )}
        {filtered && showFiltered && (
          <div className="absolute top-3 right-3 z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFiltered(false)}
              className="text-xs bg-[var(--background)]/90 backdrop-blur-xl hover:bg-[var(--background)]/95 shadow-lg"
              title="Hide this article again"
            >
              🙈 Hide
            </Button>
          </div>
        )}
        <CardContent className={cn("p-4 transition-all duration-300", filtered && !showFiltered && "blur-md")}>
          
          {/* Meta Header */}
          <div className="flex items-center gap-2 mb-3 text-xs text-[var(--text-secondary)]">
            {mounted && (
              <div className="w-4 h-4 relative flex-shrink-0 rounded-sm overflow-hidden">
                <Image
                  src={`https://www.google.com/s2/favicons?sz=32&domain_url=${article.link}`}
                  alt="favicon"
                  fill
                  unoptimized
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
            <span className="font-medium text-[var(--text-primary)]">
              {(() => {
                try {
                  return article.link ? new URL(article.link).hostname.replace("www.", "") : "Unknown Source";
                } catch {
                  return "Unknown Source";
                }
              })()}
            </span>
            <span>·</span>
            <span>
              {(() => {
                const date = new Date(article.pubDate);
                if (date.getTime() === 0) return '';
                
                const now = new Date();
                const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
                
                if (diffInSeconds < 60) return 'just now';
                if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
                if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
                if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
                
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              })()}
            </span>
          </div>

          <div className="flex gap-4 justify-between items-start">
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <a
                href={article.link}
                className="text-base sm:text-lg font-bold text-[var(--text-primary)] leading-tight hover:text-[var(--primary)] transition-colors line-clamp-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                {article.title}
              </a>
              
              {(!article.summary || showSummary === false) && article.content ? (
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                      {article.content.replace(/<[^>]*>/g, '')}
                  </p>
              ) : article.summary ? (
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                      {article.summary}
                  </p>
              ) : null}

              {/* Vibes Analysis */}
              {showVibes && article.vibes && (
                <div className="mt-1 w-full overflow-hidden">
                  <VibesIndicator vibes={article.vibes} />
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-2 mt-1">
                 {onArchive && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleArchive}
                      className="text-xs h-8 px-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      title="Archive article"
                    >
                      📁 Archive
                    </Button>
                  )}
              </div>
            </div>

            {article.thumbnail && !imgError && (
              <div className="w-24 h-24 sm:w-32 sm:h-32 relative flex-shrink-0 overflow-hidden rounded-xl bg-white/5">
                <Image 
                  src={article.thumbnail} 
                  alt={article.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  onError={() => setImgError(true)}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 
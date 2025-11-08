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
        className="text-xs p-2 h-auto mt-2 flex-shrink-0 hover:scale-105"
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
  onArchive,
  showVibes = true,
  showSummary = true,
  filtered = false,
  filterReason = '',
  viewMode = 'magazine'
}: ArticleCardProps) => {
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [summaryExpanded, setSummaryExpanded] = useState(false);
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
                {new Date(article.pubDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
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

  // Magazine view - original horizontal layout
  return (
    <div ref={ref} className="animate-[fadeIn_0.5s_ease-out]">
      <Card className={cn(
        "overflow-hidden transition-all duration-300 max-w-full relative",
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
        <CardContent className={cn("p-0 transition-all duration-300", filtered && !showFiltered && "blur-md")}>
          <div className="flex flex-col sm:flex-row w-full overflow-hidden">
            {article.thumbnail && !imgError && (
              <div className="w-full sm:w-40 h-40 sm:h-auto relative flex-shrink-0 overflow-hidden">
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
            
            <div className="flex-1 p-3 sm:p-4 min-w-0">
              <div className="flex items-start justify-between gap-2 w-full overflow-hidden">
                <a
                  href={article.link}
                  className="text-base sm:text-lg font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] line-clamp-2 flex-1 break-words overflow-hidden transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.title}
                </a>
                
                <div className="flex gap-2 flex-shrink-0">
                  {onArchive && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleArchive}
                      className="text-sm p-2.5 h-auto whitespace-nowrap hover:scale-110 hover:rotate-6 transition-all duration-300"
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
                  <div className="flex gap-2 flex-shrink-0">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-1.5 text-xs glass-card rounded-full whitespace-nowrap font-semibold shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
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

              {/* Vibes Analysis */}
              {showVibes && article.vibes && (
                <div className="mb-2 w-full overflow-hidden">
                  <VibesIndicator vibes={article.vibes} />
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
import { type Article } from "@/lib/rssUtils";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [mounted, setMounted] = useState(false);
  const [previewText, setPreviewText] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Extract preview text from the article content if available
    if (article.content) {
      // Remove HTML tags and get plain text
      const plainText = article.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      // Limit to approximately 2 lines (around 150 characters)
      setPreviewText(plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText);
    }
  }, [article.content]);

  return (
    <Card className="shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex hover:bg-muted/50 transition-colors"
        >
          {article.thumbnail && (
            <div className="w-40 h-auto relative">
              <Image
                src={article.thumbnail}
                alt=""
                width={160}
                height={120}
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          <div className="flex-1 p-4">
            <h3 className="font-semibold mb-2 line-clamp-2">{article.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              {mounted && (
                <div className="w-4 h-4 relative">
                  <Image
                    src={`https://www.google.com/s2/favicons?sz=32&domain_url=${article.link}`}
                    alt=""
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              )}
              <span>{article.sourceDomain}</span>
              <span>•</span>
              <time dateTime={article.pubDate}>{formatDate(article.pubDate)}</time>
            </div>
            {previewText && (
              <p className="text-sm text-muted-foreground line-clamp-2">{previewText}</p>
            )}
          </div>
        </a>
      </CardContent>
    </Card>
  );
} 
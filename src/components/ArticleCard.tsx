import { type Article } from "@/lib/rssUtils";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
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
            <div className="w-40 h-auto">
              <img
                src={article.thumbnail}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}
          <div className="flex-1 p-4">
            <h3 className="font-semibold mb-2 line-clamp-2">{article.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{article.sourceDomain}</span>
              <span>•</span>
              <time dateTime={article.pubDate}>{formatDate(article.pubDate)}</time>
            </div>
          </div>
        </a>
      </CardContent>
    </Card>
  );
} 
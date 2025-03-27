// app/page.tsx (Next.js App Router with TypeScript)
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getFeedUrlFromHtml, fetchAndParseRSS } from "@/lib/rssUtils";
import { suggestFeedsByTopic } from "../lib/feedSuggestions";

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
}

interface FeedData {
  title: string;
  url: string;
  items: FeedItem[];
}

export default function HomePage() {
  const [feedUrlInput, setFeedUrlInput] = useState<string>("");
  const [feeds, setFeeds] = useState<FeedData[]>([]);
  const [articles, setArticles] = useState<FeedItem[]>([]);
  const [topic, setTopic] = useState<string>("");
  const [suggestedFeeds, setSuggestedFeeds] = useState<FeedData[]>([]);

  const handleAddFeed = async () => {
    const resolvedFeedUrl = await getFeedUrlFromHtml(feedUrlInput);
    if (resolvedFeedUrl) {
      const feedData = await fetchAndParseRSS(resolvedFeedUrl);
      if (feedData) {
        setFeeds((prev) => [...prev, { url: resolvedFeedUrl, ...feedData }]);
        setArticles((prev) => [...prev, ...feedData.items]);
      }
    }
  };

  const handleTopicSuggest = async () => {
    const results = await suggestFeedsByTopic(topic);
    setSuggestedFeeds(results);
  };

  return (
    <main className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">FeedStream</h1>
      <div className="space-y-2">
        <Input
          placeholder="Enter site URL or RSS feed"
          value={feedUrlInput}
          onChange={(e) => setFeedUrlInput(e.target.value)}
        />
        <Button onClick={handleAddFeed}>Add Feed</Button>
      </div>

      <div className="space-y-2">
        <Input
          placeholder="Enter a topic you're interested in"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button onClick={handleTopicSuggest}>Suggest Feeds</Button>
        <div>
          {suggestedFeeds.map((feed) => (
            <Card key={feed.url} className="mt-2">
              <CardContent>
                <p className="font-semibold">{feed.title}</p>
                <p className="text-sm text-muted-foreground">{feed.url}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Articles</h2>
        <div className="grid gap-4">
          {articles.map((article, idx) => (
            <Card key={idx}>
              <CardContent>
                <a href={article.link} className="text-lg font-medium underline">
                  {article.title}
                </a>
                <p className="text-sm text-muted-foreground">{article.pubDate}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

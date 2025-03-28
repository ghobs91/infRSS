// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getFeedUrlFromHtml,
  fetchAndParseRSS,
  loadFeedsFromStorage,
  saveFeedToStorage,
  type FeedData,
} from "@/lib/rssUtils";
import { suggestFeedsByTopic } from "@/lib/feedSuggestions";

interface FeedData {
  title: string;
  url: string;
}

export default function HomePage() {
  const [feedUrlInput, setFeedUrlInput] = useState("");
  const [articles, setArticles] = useState<{ title: string; link: string; pubDate: string }[]>([]);
  const [topic, setTopic] = useState("");
  const [suggestedFeeds, setSuggestedFeeds] = useState<FeedData[]>([]);

  useEffect(() => {
    const loadSavedFeeds = async () => {
      const feeds = loadFeedsFromStorage();
      const allArticles = await Promise.all(
        feeds.map(async (feed) => {
          const data = await fetchAndParseRSS(feed.url);
          return data?.items || [];
        })
      );
      setArticles(allArticles.flat());
    };
    loadSavedFeeds();
  }, []);

  const handleAddFeed = async () => {
    const resolvedFeedUrl = await getFeedUrlFromHtml(feedUrlInput);
    if (resolvedFeedUrl) {
      const feedData = await fetchAndParseRSS(resolvedFeedUrl);
      if (feedData) {
        saveFeedToStorage({ title: feedData.title, url: resolvedFeedUrl });
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
      <h1 className="text-3xl font-bold">FeedReader</h1>
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

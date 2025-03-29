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
  type Article,
} from "@/lib/rssUtils";
import { suggestFeedsWithWorker } from "@/lib/useTransformerWorker";

export default function HomePage() {
  const [feedUrlInput, setFeedUrlInput] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState("");
  const [suggestedFeeds, setSuggestedFeeds] = useState<FeedData[]>([]);

  useEffect(() => {
    const loadSavedFeeds = async () => {
      setLoading(true);
      const feeds = loadFeedsFromStorage();
      const allArticles = await Promise.all(
        feeds.map(async (feed) => {
          const data = await fetchAndParseRSS(feed.url);
          return data?.items || [];
        })
      );
      setArticles(allArticles.flat());
      setLoading(false);
    };
    loadSavedFeeds();
  }, []);

  const handleAddFeed = async () => {
    setLoading(true);
    const resolvedFeedUrl = await getFeedUrlFromHtml(feedUrlInput);
    if (resolvedFeedUrl) {
      const feedData = await fetchAndParseRSS(resolvedFeedUrl);
      if (feedData) {
        saveFeedToStorage({ title: feedData.title, url: resolvedFeedUrl });
        setArticles((prev) => [...prev, ...feedData.items]);
      }
    }
    setLoading(false);
  };

  const handleTopicSuggest = async () => {
    const results = await suggestFeedsWithWorker(topic, []);
    setSuggestedFeeds(results);
  };

  return (
    <main className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">Add Feed</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Enter site URL or RSS feed"
            value={feedUrlInput}
            onChange={(e) => setFeedUrlInput(e.target.value)}
            className="flex-1 border-gray-300"
          />
          <Button onClick={handleAddFeed}>Add Feed</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Suggest Feeds</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Enter a topic you're interested in"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 border-gray-300"
          />
          <Button onClick={handleTopicSuggest}>Suggest</Button>
        </div>
        <div className="grid gap-3">
          {suggestedFeeds.map((feed) => (
            <Card key={feed.url} className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <p className="font-medium text-gray-800">{feed.title}</p>
                <p className="text-sm text-gray-500">{feed.url}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Articles</h2>
        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="h-3 w-3 rounded-full bg-blue-500 animate-pulse" />
            Loading articles…
          </div>
        )}
        <div className="grid gap-4">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="bg-white border border-gray-200 shadow-sm animate-pulse">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-gray-200 rounded" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-100 rounded w-1/2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            : articles.map((article, idx) => (
                <Card key={idx} className="bg-white border border-gray-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={article.thumbnail || "/fallback-thumbnail.png"}
                        alt="thumbnail"
                        className="w-20 h-20 object-cover rounded border"
                      />
                      <div className="flex-1 space-y-1">
                        <a
                          href={article.link}
                          className="text-lg font-medium text-blue-600 hover:underline"
                        >
                          {article.title}
                        </a>
                        <p className="text-sm text-gray-500">{article.pubDate}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <img
                            src={`https://www.google.com/s2/favicons?sz=16&domain_url=${article.sourceDomain}`}
                            className="w-4 h-4"
                            alt="favicon"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = "/favicon.ico";
                            }}
                          />
                          {article.sourceDomain}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </section>
    </main>
  );
}

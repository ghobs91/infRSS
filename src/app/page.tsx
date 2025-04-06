// app/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
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
import { suggestFeedsWithWorker } from "@/lib/useTransformerWorker";

const PullToRefresh = dynamic(() => import("react-pull-to-refresh"), { ssr: false });

export default function HomePage() {
  const [feedUrlInput, setFeedUrlInput] = useState("");
  const [articles, setArticles] = useState<{ title: string; link: string; pubDate: string }[]>([]);
  const [visibleCount, setVisibleCount] = useState(50);
  const [topic, setTopic] = useState("");
  const [suggestedFeeds, setSuggestedFeeds] = useState<FeedData[]>([]);
  const [isClient, setIsClient] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 50);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const loadSavedFeeds = async () => {
      const feeds = loadFeedsFromStorage();
      const allArticles = await Promise.all(
        feeds.map(async (feed) => {
          const data = await fetchAndParseRSS(feed.url);
          return data?.items || [];
        })
      );
      const sorted = allArticles.flat().sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
      setArticles(sorted);
    };

    setIsClient(true);
    loadSavedFeeds();

    const interval = setInterval(() => {
      loadSavedFeeds();
    }, 1000 * 60 * 10);

    return () => clearInterval(interval);
  }, []);

  const handleAddFeed = async () => {
    const resolvedFeedUrl = await getFeedUrlFromHtml(feedUrlInput);
    if (resolvedFeedUrl) {
      const feedData = await fetchAndParseRSS(resolvedFeedUrl);
      if (feedData) {
        saveFeedToStorage({ title: feedData.title, url: resolvedFeedUrl });
        const feeds = loadFeedsFromStorage();
        const allArticles = await Promise.all(
          feeds.map(async (feed) => {
            const data = await fetchAndParseRSS(feed.url);
            return data?.items || [];
          })
        );
        const sorted = allArticles.flat().sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        setArticles(sorted);
      }
    }
  };

  const handleTopicSuggest = async () => {
    const results = await suggestFeedsWithWorker(topic, []);
    setSuggestedFeeds(results);
  };

  return (
    <main className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">Add Feed</h1>
        <input
          type="file"
          accept=".opml, text/xml"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const text = await file.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/xml");
            const outlines = doc.querySelectorAll("outline[type='rss']");
            outlines.forEach((el) => {
              const url = el.getAttribute("xmlUrl");
              const title = el.getAttribute("title") || el.getAttribute("text") || url;
              if (url) {
                saveFeedToStorage({ title: title ?? url, url });
              }
            });
            const feeds = loadFeedsFromStorage();
            const allArticles = await Promise.all(
              feeds.map(async (feed) => {
                const data = await fetchAndParseRSS(feed.url);
                return data?.items || [];
              })
            );
            const sorted = allArticles.flat().sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
            setArticles(sorted);
          }}
          className="block mb-2 text-sm text-gray-700"
        />
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
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Articles</h2>
          <Button
            variant="outline"
            onClick={async () => {
              const feeds = loadFeedsFromStorage();
              const allArticles = await Promise.all(
                feeds.map(async (feed) => {
                  const data = await fetchAndParseRSS(feed.url);
                  return data?.items || [];
                })
              );
              const sorted = allArticles.flat().sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
              setArticles(sorted);
              setVisibleCount(50);
            }}
          >
            Refresh
          </Button>
        </div>

        {isClient && (
          <PullToRefresh
            onRefresh={async () => {
              const feeds = loadFeedsFromStorage();
              const allArticles = await Promise.all(
                feeds.map(async (feed) => {
                  const data = await fetchAndParseRSS(feed.url);
                  return data?.items || [];
                })
              );
              const sorted = allArticles.flat().sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
              setArticles(sorted);
              setVisibleCount(50);
            }}
          >
            <div className="grid gap-4">
              {articles.slice(0, visibleCount).map((article, idx) => (
                <Card key={idx} className="bg-white border border-gray-200 shadow-sm">
                  <CardContent className="p-4">
                    <a
                      href={article.link}
                      className="text-lg font-medium text-blue-600 hover:underline"
                    >
                      {article.title}
                    </a>
                    <p className="text-sm text-gray-500">{article.pubDate}</p>
                  </CardContent>
                </Card>
              ))}
              <div ref={loadMoreRef} className="h-10" />
            </div>
          </PullToRefresh>
        )}
      </section>
    </main>
  );
}

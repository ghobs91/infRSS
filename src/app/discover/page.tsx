"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { SearchIcon } from "@/components/ui/icons";
import { useFeed } from "@/lib/feedContext";

interface FeedSuggestion {
  title: string;
  url: string;
  score: number;
}

export default function DiscoverPage() {
  const [topic, setTopic] = useState("");
  const [suggestions, setSuggestions] = useState<FeedSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { refreshFeeds } = useFeed();

  const handleSearch = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      const response = await fetch("/api/suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: topic.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data = await response.json();
      setSuggestions(data);
    } catch (err) {
      setError("Failed to fetch suggestions. Please try again.");
      console.error("Error fetching suggestions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFeed = (feed: FeedSuggestion) => {
    // Get existing feeds from localStorage
    const existingFeeds = localStorage.getItem("rssFeeds");
    const feeds = existingFeeds ? JSON.parse(existingFeeds) : [];

    // Check if feed already exists
    const feedExists = feeds.some((f: any) => f.url === feed.url);
    if (feedExists) {
      alert("This feed is already in your subscriptions!");
      return;
    }

    // Add new feed
    feeds.push({
      id: Date.now().toString(),
      title: feed.title,
      url: feed.url,
      addedAt: new Date().toISOString(),
    });

    // Save to localStorage
    localStorage.setItem("rssFeeds", JSON.stringify(feeds));
    refreshFeeds();
    
    // Show success message and redirect
    alert(`Added "${feed.title}" to your feeds!`);
    router.push("/manage");
  };

  const popularTopics = [
    { emoji: "💻", label: "Tech", query: "technology news" },
    { emoji: "⚽", label: "Sports", query: "sports" },
    { emoji: "🍳", label: "Cooking", query: "cooking recipes" },
    { emoji: "🔬", label: "Science", query: "science" },
    { emoji: "🎮", label: "Gaming", query: "gaming" },
    { emoji: "🎬", label: "Movies", query: "movies entertainment" },
    { emoji: "📚", label: "Books", query: "books reading" },
    { emoji: "✈️", label: "Travel", query: "travel" },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24 md:pb-0 md:pt-16">
      {/* Mobile Back Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-[var(--background)] border-b border-[var(--border)] safe-area-top">
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-[var(--card-bg)] flex items-center justify-center border border-[var(--card-border)] shadow-sm"
          >
            ←
          </button>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Discover Feeds</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-20 md:pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
            Discover New Feeds
          </h1>
          <p className="text-[var(--text-secondary)] text-base md:text-lg">
            Find RSS feeds based on your interests
          </p>
        </div>

        {/* Search Box */}
        <div className="glass-card rounded-3xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Enter a topic (e.g., 'programming', 'cooking', 'sports')"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pr-10"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none">
                <SearchIcon />
              </div>
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading || !topic.trim()}
              className="w-full sm:w-auto px-8"
            >
              {isLoading ? <Spinner size="sm" /> : "Search"}
            </Button>
          </div>
        </div>

        {/* Popular Topics */}
        {!isLoading && suggestions.length === 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Popular Topics
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {popularTopics.map((topic) => (
                <button
                  key={topic.query}
                  onClick={() => {
                    setTopic(topic.query);
                    setTimeout(() => handleSearch(), 100);
                  }}
                  className="glass-card rounded-2xl p-4 text-center hover:scale-105 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="text-3xl mb-2">{topic.emoji}</div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">
                    {topic.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="glass-card rounded-2xl p-4 mb-6 bg-red-500/10 border-red-500/30">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Spinner size="lg" />
            <p className="text-[var(--text-secondary)] mt-4">
              Searching for feeds about "{topic}"...
            </p>
          </div>
        )}

        {/* Results */}
        {!isLoading && suggestions.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Found {suggestions.length} feed{suggestions.length !== 1 ? "s" : ""} for "{topic}"
            </h2>
            <div className="space-y-3">
              {suggestions.map((feed, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-1 truncate">
                          {feed.title}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)] mb-2 break-all">
                          {feed.url}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[var(--text-secondary)]">
                            Relevance:
                          </span>
                          <div className="flex-1 max-w-[200px] h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[var(--primary)] to-orange-400 rounded-full transition-all duration-500"
                              style={{ width: `${Math.round(feed.score * 100)}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-[var(--text-primary)]">
                            {Math.round(feed.score * 100)}%
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleAddFeed(feed)}
                        size="sm"
                        className="flex-shrink-0"
                      >
                        + Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

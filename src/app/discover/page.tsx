"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const dynamic = 'force-dynamic';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { SearchIcon } from "@/components/ui/icons";
import { SettingsLayout } from "@/components/SettingsLayout";
import { useFeed } from "@/lib/feedContext";

interface FeedSuggestion {
  title: string;
  url: string;
  score: number;
  category?: string;
  country?: string;
  preview?: {
    title: string;
    link: string;
    pubDate?: string;
    imageUrl?: string;
  };
  faviconUrl?: string;
}

interface Category {
  slug: string;
  name: string;
  feedCount: number;
}

interface DirectoryData {
  categories: Category[];
  countries: Category[];
}

export default function DiscoverPage() {
  const [topic, setTopic] = useState("");
  const [suggestions, setSuggestions] = useState<FeedSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [directory, setDirectory] = useState<DirectoryData | null>(null);
  const [viewMode, setViewMode] = useState<"search" | "categories" | "countries">("search");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loadingPreviews, setLoadingPreviews] = useState<Set<number>>(new Set());
  const router = useRouter();
  const { refreshFeeds } = useFeed();

  // Category emoji mapping
  const getCategoryEmoji = (slug: string): string => {
    const emojiMap: Record<string, string> = {
      'android': '🤖',
      'apple': '🍎',
      'artificial-intelligence': '🤖',
      'business': '💼',
      'cars': '🚗',
      'cricket': '🏏',
      'crypto': '₿',
      'cybersecurity': '🔒',
      'design': '🎨',
      'entertainment': '🎬',
      'food': '🍳',
      'football': '⚽',
      'funny': '😄',
      'gaming': '🎮',
      'google': '🔍',
      'health-fitness': '💪',
      'linux': '🐧',
      'marketing': '📢',
      'microsoft': '🪟',
      'movies': '🎥',
      'music': '🎵',
      'news': '📰',
      'open-source': '🔓',
      'personal-finance': '💰',
      'photography': '📷',
      'politics': '🏛️',
      'programming': '💻',
      'science': '🔬',
      'space': '🚀',
      'sports': '⚽',
      'startups': '🚀',
      'tech': '⚙️',
      'television': '📺',
      'travel': '✈️',
      'ui-ux': '🖌️',
      'web-development': '🌐',
    };
    return emojiMap[slug] || '📁';
  };

  // Helper to get favicon URL
  const getFaviconUrl = (feedUrl: string) => {
    try {
      const url = new URL(feedUrl);
      return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=64`;
    } catch {
      return null;
    }
  };

  // Fetch preview for a single feed
  const fetchFeedPreview = async (feedUrl: string, index: number) => {
    try {
      setLoadingPreviews(prev => new Set(prev).add(index));
      
      const response = await fetch("/api/fetch-rss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: feedUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const latestItem = data.items[0];
          setSuggestions(prev => prev.map((feed, idx) => 
            idx === index ? {
              ...feed,
              preview: {
                title: latestItem.title,
                link: latestItem.link,
                pubDate: latestItem.pubDate,
                imageUrl: latestItem.imageUrl,
              }
            } : feed
          ));
        }
      }
    } catch (err) {
      console.error("Failed to fetch preview:", err);
    } finally {
      setLoadingPreviews(prev => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
    }
  };

  // Load directory on mount
  useEffect(() => {
    const loadDirectory = async () => {
      try {
        const response = await fetch("/api/suggest");
        if (response.ok) {
          const data = await response.json();
          setDirectory(data);
        }
      } catch (err) {
        console.error("Failed to load directory:", err);
      }
    };
    loadDirectory();
  }, []);

  const handleSearch = async (searchTopic?: string) => {
    const query = searchTopic || topic;
    if (!query.trim()) {
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
        body: JSON.stringify({ topic: query.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data = await response.json();
      // Add favicon URLs to each feed
      const feedsWithFavicons = data.map((feed: FeedSuggestion) => ({
        ...feed,
        faviconUrl: getFaviconUrl(feed.url),
      }));
      setSuggestions(feedsWithFavicons);
      setViewMode("search");
      
      // Load previews for the first 5 feeds
      feedsWithFavicons.slice(0, 5).forEach((feed: FeedSuggestion, index: number) => {
        fetchFeedPreview(feed.url, index);
      });
    } catch (err) {
      setError("Failed to fetch suggestions. Please try again.");
      console.error("Error fetching suggestions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category.slug);
    setTopic(category.slug);
    handleSearch(category.slug);
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
    { emoji: "💻", label: "Tech", query: "tech" },
    { emoji: "📱", label: "Programming", query: "programming" },
    { emoji: "⚽", label: "Sports", query: "sports" },
    { emoji: "🍳", label: "Food", query: "food" },
    { emoji: "🔬", label: "Science", query: "science" },
    { emoji: "🎮", label: "Gaming", query: "gaming" },
    { emoji: "🎬", label: "Movies", query: "movies" },
    { emoji: "📚", label: "Books", query: "books" },
    { emoji: "✈️", label: "Travel", query: "travel" },
    { emoji: "💰", label: "Finance", query: "personal-finance" },
    { emoji: "🎨", label: "Design", query: "ui-ux" },
    { emoji: "🚀", label: "Startups", query: "startups" },
  ];

  const topCountries = [
    { emoji: "🇺🇸", label: "USA", query: "united-states" },
    { emoji: "🇬🇧", label: "UK", query: "united-kingdom" },
    { emoji: "🇮🇳", label: "India", query: "india" },
    { emoji: "🇨🇦", label: "Canada", query: "canada" },
    { emoji: "🇦🇺", label: "Australia", query: "australia" },
    { emoji: "🇩🇪", label: "Germany", query: "germany" },
    { emoji: "🇫🇷", label: "France", query: "france" },
    { emoji: "🇯🇵", label: "Japan", query: "japan" },
  ];

  return (
    <SettingsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Discover Feeds
          </h1>
          <p className="text-[var(--text-secondary)] mt-2">
            Find RSS feeds based on your interests
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="glass-card rounded-3xl p-2 mb-6 flex gap-2">
          <button
            onClick={() => setViewMode("search")}
            className={`flex-1 px-4 py-2 rounded-2xl font-semibold text-sm transition-all ${
              viewMode === "search"
                ? "bg-[var(--primary)] text-white shadow-lg"
                : "text-[var(--text-secondary)] hover:bg-[var(--muted)]"
            }`}
          >
            🔍 Search
          </button>
          <button
            onClick={() => setViewMode("categories")}
            className={`flex-1 px-4 py-2 rounded-2xl font-semibold text-sm transition-all ${
              viewMode === "categories"
                ? "bg-[var(--primary)] text-white shadow-lg"
                : "text-[var(--text-secondary)] hover:bg-[var(--muted)]"
            }`}
          >
            📁 Categories
          </button>
          <button
            onClick={() => setViewMode("countries")}
            className={`flex-1 px-4 py-2 rounded-2xl font-semibold text-sm transition-all ${
              viewMode === "countries"
                ? "bg-[var(--primary)] text-white shadow-lg"
                : "text-[var(--text-secondary)] hover:bg-[var(--muted)]"
            }`}
          >
            🌍 News
          </button>
        </div>

        {/* Search Box */}
        {viewMode === "search" && (
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
                onClick={() => handleSearch()}
                disabled={isLoading || !topic.trim()}
                className="w-full sm:w-auto px-8"
              >
                {isLoading ? <Spinner size="sm" /> : "Search"}
              </Button>
            </div>
          </div>
        )}

        {/* Popular Topics */}
        {viewMode === "search" && !isLoading && suggestions.length === 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Popular Topics
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {popularTopics.map((topic) => (
                <button
                  key={topic.query}
                  onClick={() => {
                    setTopic(topic.query);
                    handleSearch(topic.query);
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

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                News by Country
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {topCountries.map((country) => (
                  <button
                    key={country.query}
                    onClick={() => {
                      setTopic(country.query);
                      handleSearch(country.query);
                    }}
                    className="glass-card rounded-2xl p-4 text-center hover:scale-105 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="text-3xl mb-2">{country.emoji}</div>
                    <div className="text-sm font-semibold text-[var(--text-primary)]">
                      {country.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Categories View */}
        {viewMode === "categories" && directory && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Browse by Category ({directory.categories.length} categories)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {directory.categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryClick(cat)}
                  className="glass-card rounded-2xl p-4 text-left hover:scale-105 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl flex-shrink-0">
                      {getCategoryEmoji(cat.slug)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-semibold text-[var(--text-primary)] mb-1">
                        {cat.name}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)]">
                        {cat.feedCount} feed{cat.feedCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <div className="text-xl opacity-50 flex-shrink-0">→</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Countries View */}
        {viewMode === "countries" && directory && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              News Sources by Country ({directory.countries.length} countries)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {directory.countries.map((country) => (
                <button
                  key={country.slug}
                  onClick={() => handleCategoryClick(country)}
                  className="glass-card rounded-2xl p-4 text-left hover:scale-105 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-base font-semibold text-[var(--text-primary)] mb-1">
                        {country.name}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)]">
                        {country.feedCount} news source{country.feedCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <div className="text-2xl opacity-70">→</div>
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                {selectedCategory ? (
                  <>
                    {suggestions.length} feed{suggestions.length !== 1 ? "s" : ""} in{" "}
                    <span className="text-[var(--primary)]">
                      {topic.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </span>
                  </>
                ) : (
                  <>
                    Found {suggestions.length} feed{suggestions.length !== 1 ? "s" : ""} for "{topic}"
                  </>
                )}
              </h2>
              <Button
                onClick={() => {
                  setSuggestions([]);
                  setSelectedCategory(null);
                  setTopic("");
                }}
                size="sm"
                className="text-xs"
              >
                Clear
              </Button>
            </div>
            <div className="space-y-3">
              {suggestions.map((feed, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex gap-4">
                      {/* Favicon */}
                      <div className="flex-shrink-0">
                        {feed.faviconUrl ? (
                          <Image
                            src={feed.faviconUrl}
                            alt={`${feed.title} favicon`}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-lg object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                            unoptimized
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-[var(--muted)] flex items-center justify-center text-[var(--text-secondary)]">
                            📰
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-1 truncate">
                              {feed.title}
                            </h3>
                            <p className="text-xs text-[var(--text-secondary)] mb-2 break-all line-clamp-1">
                              {feed.url}
                            </p>
                          </div>
                          <Button
                            onClick={() => handleAddFeed(feed)}
                            size="sm"
                            className="flex-shrink-0"
                          >
                            + Add
                          </Button>
                        </div>

                        {/* Tags and Relevance */}
                        <div className="flex items-center gap-3 flex-wrap mb-3">
                          {feed.category && (
                            <span className="text-xs px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">
                              {feed.category}
                            </span>
                          )}
                          {feed.country && (
                            <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full">
                              {feed.country}
                            </span>
                          )}
                          <div className="flex items-center gap-2 ml-auto">
                            <span className="text-xs text-[var(--text-secondary)]">
                              Relevance:
                            </span>
                            <div className="w-16 h-2 bg-[var(--muted)] rounded-full overflow-hidden">
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

                        {/* Preview */}
                        {feed.preview ? (
                          <div className="mt-3 pt-3 border-t border-[var(--border)]">
                            <div className="flex items-start gap-2">
                              <span className="text-xs text-[var(--text-secondary)] flex-shrink-0 mt-0.5">
                                Latest:
                              </span>
                              <div className="flex-1 min-w-0 flex gap-3 items-start">
                                <div className="flex-1 min-w-0">
                                  <a
                                    href={feed.preview.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-[var(--text-primary)] hover:text-[var(--primary)] line-clamp-2 transition-colors font-medium"
                                  >
                                    {feed.preview.title}
                                  </a>
                                  {feed.preview.pubDate && (
                                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                                      {new Date(feed.preview.pubDate).toLocaleDateString()}
                                    </p>
                                  )}
                                </div>
                                {feed.preview.imageUrl && (
                                  <div className="flex-shrink-0 relative w-24 h-24 rounded-xl overflow-hidden bg-white/5">
                                    <Image
                                      src={feed.preview.imageUrl}
                                      alt=""
                                      fill
                                      className="object-cover transition-transform duration-300 hover:scale-105"
                                      unoptimized
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : loadingPreviews.has(index) ? (
                          <div className="mt-3 pt-3 border-t border-[var(--border)]">
                            <div className="flex items-center gap-2">
                              <Spinner size="sm" />
                              <span className="text-xs text-[var(--text-secondary)]">
                                Loading preview...
                              </span>
                            </div>
                          </div>
                        ) : index < 5 ? (
                          <div className="mt-3 pt-3 border-t border-[var(--border)]">
                            <button
                              onClick={() => fetchFeedPreview(feed.url, index)}
                              className="text-xs text-[var(--primary)] hover:underline"
                            >
                              Load preview
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </SettingsLayout>
  );
}

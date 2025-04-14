// app/manage/page.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import {
  getFeedUrlFromHtml,
  fetchAndParseRSS,
  loadFeedsFromStorage,
  saveFeedToStorage,
  parseOPMLFile,
  type FeedData,
} from "@/lib/rssUtils";
import { suggestFeedsWithWorker } from "@/lib/useTransformerWorker";

// SuggestedFeed component to reduce re-renders
const SuggestedFeed = ({ feed, onSubscribe }: { feed: FeedData, onSubscribe: (feed: FeedData) => void }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card key={feed.url} className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {mounted && (
              <div className="w-6 h-6 relative">
                <Image
                  src={`https://www.google.com/s2/favicons?sz=32&domain_url=${feed.url}`}
                  className="object-contain"
                  alt="favicon"
                  fill
                  unoptimized
                />
              </div>
            )}
            <div>
              <p className="font-medium text-[var(--text-primary)]">{feed.title}</p>
              <p className="text-xs text-[var(--text-secondary)] break-all">{feed.url}</p>
            </div>
          </div>
          <Button 
            variant="default" 
            onClick={() => onSubscribe(feed)}
            className="whitespace-nowrap"
          >
            Subscribe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// SavedFeed component
const SavedFeed = ({ feed, onRemove }: { feed: { title: string; url: string }, onRemove: (url: string) => void }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card key={feed.url} className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {mounted && (
              <div className="w-6 h-6 relative">
                <Image
                  src={`https://www.google.com/s2/favicons?sz=32&domain_url=${feed.url}`}
                  className="object-contain"
                  alt="favicon"
                  fill
                  unoptimized
                />
              </div>
            )}
            <div>
              <p className="font-medium text-[var(--text-primary)]">{feed.title}</p>
              <p className="text-xs text-[var(--text-secondary)] break-all">{feed.url}</p>
            </div>
          </div>
          <Button 
            variant="destructive" 
            onClick={() => onRemove(feed.url)}
            className="whitespace-nowrap"
          >
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function ManagePage() {
  const [feedUrlInput, setFeedUrlInput] = useState("");
  const [topic, setTopic] = useState("");
  const [suggestedFeeds, setSuggestedFeeds] = useState<FeedData[]>([]);
  const [savedFeeds, setSavedFeeds] = useState<FeedData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load saved feeds on initial render
  useEffect(() => {
    const feeds = loadFeedsFromStorage();
    setSavedFeeds(feeds);
  }, []);

  // Handle adding a feed
  const handleAddFeed = useCallback(async () => {
    if (!feedUrlInput.trim()) {
      setError("Please enter a feed URL");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check if the URL is already in the saved feeds
      if (savedFeeds.some(feed => feed.url === feedUrlInput.trim())) {
        setError("This feed is already added");
        setIsLoading(false);
        return;
      }

      // Try to parse the feed directly first
      let feedData = await fetchAndParseRSS(feedUrlInput.trim());
      
      // If that fails, try to extract the feed URL from the HTML
      if (!feedData) {
        const feedUrl = await getFeedUrlFromHtml(feedUrlInput.trim());
        if (feedUrl) {
          feedData = await fetchAndParseRSS(feedUrl);
        }
      }

      if (feedData && feedData.length > 0) {
        // Get the feed title from the first article or use the hostname
        const feedTitle = feedData[0].title || new URL(feedUrlInput.trim()).hostname;
        
        const newFeed: FeedData = {
          title: feedTitle,
          url: feedUrlInput.trim(),
        };
        
        saveFeedToStorage(newFeed);
        setSavedFeeds(prev => [...prev, newFeed]);
        setFeedUrlInput("");
      } else {
        setError("Could not find a valid RSS feed at this URL");
      }
    } catch (error) {
      console.error("Error adding feed:", error);
      setError("Error adding feed. Please check the URL and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [feedUrlInput, savedFeeds]);

  // Handle suggesting feeds
  const handleSuggestFeeds = useCallback(async () => {
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    setIsSuggesting(true);
    setError(null);

    try {
      const feeds = await suggestFeedsWithWorker(topic.trim(), []);
      setSuggestedFeeds(feeds);
    } catch (error) {
      console.error("Error suggesting feeds:", error);
      setError("Error suggesting feeds. Please try again.");
    } finally {
      setIsSuggesting(false);
    }
  }, [topic]);

  // Handle subscribing to a suggested feed
  const handleSubscribeToFeed = useCallback((feed: FeedData) => {
    // Check if the feed is already in the saved feeds
    if (savedFeeds.some(savedFeed => savedFeed.url === feed.url)) {
      setError("This feed is already added");
      return;
    }

    saveFeedToStorage(feed);
    setSavedFeeds(prev => [...prev, feed]);
  }, [savedFeeds]);

  // Handle removing a feed
  const handleRemoveFeed = useCallback((url: string) => {
    const updatedFeeds = savedFeeds.filter(feed => feed.url !== url);
    localStorage.setItem("feeds", JSON.stringify(updatedFeeds));
    setSavedFeeds(updatedFeeds);
  }, [savedFeeds]);

  // Handle importing OPML file
  const handleImportOPML = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setError(null);

    try {
      const feeds = await parseOPMLFile(file);
      
      // Filter out feeds that are already saved
      const newFeeds = feeds.filter(feed => 
        !savedFeeds.some(savedFeed => savedFeed.url === feed.url)
      );

      // Save new feeds
      newFeeds.forEach(feed => saveFeedToStorage(feed));
      
      // Update state with new feeds
      setSavedFeeds(prev => [...prev, ...newFeeds]);
      
      // Clear the file input
      event.target.value = '';
      
      // Show success message
      setError(`Successfully imported ${newFeeds.length} new feeds${newFeeds.length < feeds.length ? ` (${feeds.length - newFeeds.length} were already saved)` : ''}`);
    } catch (error) {
      console.error("Error importing OPML file:", error);
      setError("Error importing OPML file. Please make sure it's a valid OPML file.");
    } finally {
      setIsImporting(false);
    }
  }, [savedFeeds]);

  return (
    <main className="space-y-8 px-4 max-w-4xl mx-auto">
      <section className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Add Feed</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="url"
                placeholder="Enter RSS feed URL"
                value={feedUrlInput}
                onChange={(e) => setFeedUrlInput(e.target.value)}
                className="flex-1"
              />
              <Button 
                variant="default" 
                onClick={handleAddFeed}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? <Spinner size="sm" /> : "Add Feed"}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept=".opml,.xml"
                onChange={handleImportOPML}
                className="flex-1"
                disabled={isImporting}
              />
              {isImporting && <Spinner size="sm" />}
            </div>
            {error && <p className={`text-sm ${error.includes("Successfully") ? "text-green-500" : "text-red-500"}`}>{error}</p>}
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Suggest Feeds</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="text"
                placeholder="Enter a topic (e.g., 'tech news', 'programming')"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="flex-1"
              />
              <Button 
                variant="default" 
                onClick={handleSuggestFeeds}
                disabled={isSuggesting}
                className="w-full sm:w-auto"
              >
                {isSuggesting ? <Spinner size="sm" /> : "Suggest"}
              </Button>
            </div>
          </div>

          {suggestedFeeds.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-[var(--text-primary)]">Suggested Feeds</h3>
              <div className="grid gap-3">
                {suggestedFeeds.map((feed) => (
                  <SuggestedFeed key={feed.url} feed={feed} onSubscribe={handleSubscribeToFeed} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Your Feeds</h2>
        <div className="grid gap-3">
          {savedFeeds.length === 0 ? (
            <Card className="shadow-sm">
              <CardContent className="p-4 text-center">
                <p className="text-[var(--text-secondary)]">No feeds added yet. Add some feeds to get started.</p>
              </CardContent>
            </Card>
          ) : (
            savedFeeds.map((feed) => (
              <SavedFeed key={feed.url} feed={feed} onRemove={handleRemoveFeed} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
"use client";

// app/manage/page.tsx

import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import {
  getFeedUrlFromHtml,
  loadFeedsFromStorage,
  saveFeedToStorage,
  parseOPMLFile,
  loadCategoriesFromStorage,
  saveCategoriesToStorage,
  loadUserPreferences,
  saveUserPreferences,
  discoverFeedUrlWithFallbacks,
} from "@/lib/rssUtils";
import { fetchAndParseRSSClient } from "@/lib/rssUtilsClient";
import type { FeedData } from "@/lib/types";
import { useTransformerWorker } from "@/lib/useTransformerWorker";
import { useRSSParserWorker } from "@/lib/useRSSParserWorker";
import type { Category, UserPreferences } from "@/lib/types";
import { FeedHealthChecker } from "@/components/FeedHealthChecker";

// Category management component
const CategoryManager = ({ 
  categories, 
  onAddCategory, 
  onEditCategory, 
  onDeleteCategory 
}: {
  categories: Category[];
  onAddCategory: (category: Omit<Category, 'id' | 'createdAt'>) => void;
  onEditCategory: (id: string, updates: Partial<Category>) => void;
  onDeleteCategory: (id: string) => void;
}) => {
  const [newCategory, setNewCategory] = useState({ name: '', color: '#3B82F6', description: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.name.trim()) {
      onAddCategory(newCategory);
      setNewCategory({ name: '', color: '#3B82F6', description: '' });
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setNewCategory({ name: category.name, color: category.color, description: category.description || '' });
  };

  const handleSaveEdit = () => {
    if (editingId && newCategory.name.trim()) {
      onEditCategory(editingId, newCategory);
      setEditingId(null);
      setNewCategory({ name: '', color: '#3B82F6', description: '' });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewCategory({ name: '', color: '#3B82F6', description: '' });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-[var(--text-primary)]">Manage Categories</h3>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Category name"
          value={newCategory.name}
          onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
          className="flex-1"
        />
        <Input
          type="color"
          value={newCategory.color}
          onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
          className="w-16"
        />
        <Input
          type="text"
          placeholder="Description (optional)"
          value={newCategory.description}
          onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
          className="flex-1"
        />
        {editingId ? (
          <div className="flex gap-2">
            <Button type="button" onClick={handleSaveEdit} size="sm">Save</Button>
            <Button type="button" variant="destructive" onClick={handleCancelEdit} size="sm">Cancel</Button>
          </div>
        ) : (
          <Button type="submit" size="sm">Add</Button>
        )}
      </form>

      <div className="grid gap-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between p-4 bg-[var(--muted)] border border-[var(--card-border)] rounded-lg hover:bg-[var(--muted-hover)] transition-colors">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full border border-[var(--card-border)]" 
                style={{ backgroundColor: category.color }}
              />
              <div>
                <p className="font-medium text-[var(--text-primary)]">{category.name}</p>
                {category.description && (
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{category.description}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleEdit(category)}
                className="hover:bg-[var(--accent)] hover:text-[var(--text-primary)]"
              >
                Edit
              </Button>
              {category.id !== 'uncategorized' && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => onDeleteCategory(category.id)}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Sentiment filter settings component
const SentimentFilterSettings = ({ 
  preferences, 
  onUpdatePreferences 
}: {
  preferences: UserPreferences;
  onUpdatePreferences: (prefs: UserPreferences) => void;
}) => {
  const updateSentimentFilter = (updates: Partial<UserPreferences['sentimentFilter']>) => {
    onUpdatePreferences({
      ...preferences,
      sentimentFilter: {
        ...preferences.sentimentFilter,
        ...updates
      }
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-[var(--text-primary)]">Sentiment Filtering</h3>
      
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-[var(--text-primary)]">
          <input
            type="checkbox"
            checked={preferences.sentimentFilter.enabled}
            onChange={(e) => updateSentimentFilter({ enabled: e.target.checked })}
            className="rounded border-[var(--input-border)] focus:ring-[var(--input-focus)]"
          />
          <span>Enable sentiment filtering</span>
        </label>

        {preferences.sentimentFilter.enabled && (
          <>
            <div className="space-y-2">
              <label className="block text-sm text-[var(--text-primary)]">
                Minimum sentiment score: {preferences.sentimentFilter.minSentiment}
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.1"
                  value={preferences.sentimentFilter.minSentiment}
                  onChange={(e) => updateSentimentFilter({ minSentiment: parseFloat(e.target.value) })}
                  className="w-full mt-2"
                />
              </label>
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-[var(--text-primary)]">
                Maximum toxicity: {Math.round(preferences.sentimentFilter.maxToxicity * 100)}%
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={preferences.sentimentFilter.maxToxicity}
                  onChange={(e) => updateSentimentFilter({ maxToxicity: parseFloat(e.target.value) })}
                  className="w-full mt-2"
                />
              </label>
            </div>

            <label className="flex items-center gap-2 text-[var(--text-primary)]">
              <input
                type="checkbox"
                checked={preferences.sentimentFilter.hideClickbait}
                onChange={(e) => updateSentimentFilter({ hideClickbait: e.target.checked })}
                className="rounded border-[var(--input-border)] focus:ring-[var(--input-focus)]"
              />
              <span>Hide clickbait articles</span>
            </label>

            <label className="flex items-center gap-2 text-[var(--text-primary)]">
              <input
                type="checkbox"
                checked={preferences.sentimentFilter.hideRagebait}
                onChange={(e) => updateSentimentFilter({ hideRagebait: e.target.checked })}
                className="rounded border-[var(--input-border)] focus:ring-[var(--input-focus)]"
              />
              <span>Hide ragebait articles</span>
            </label>
          </>
        )}
      </div>
    </div>
  );
};

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
const SavedFeed = ({ 
  feed, 
  categories, 
  onRemove, 
  onUpdate 
}: { 
  feed: FeedData; 
  categories: Category[];
  onRemove: (url: string) => void;
  onUpdate: (url: string, updates: Partial<FeedData>) => void;
}) => {
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title: feed.title, category: feed.category || 'Uncategorized' });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = () => {
    onUpdate(feed.url, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ title: feed.title, category: feed.category || 'Uncategorized' });
    setIsEditing(false);
  };

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
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={editData.title}
                    onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                    className="text-sm"
                  />
                  <select
                    value={editData.category}
                    onChange={(e) => setEditData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full text-sm p-2 border border-[var(--input-border)] rounded bg-[var(--input-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)]"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <p className="font-medium text-[var(--text-primary)]">{feed.title}</p>
                  <p className="text-xs text-[var(--text-secondary)] break-all">{feed.url}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Category: {categories.find(c => c.id === feed.category)?.name || 'Uncategorized'}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="default" size="sm" onClick={handleSave}>Save</Button>
                <Button variant="destructive" size="sm" onClick={handleCancel}>Cancel</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => onRemove(feed.url)}
                >
                  Remove
                </Button>
              </>
            )}
          </div>
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'feeds' | 'categories' | 'sentiment' | 'health'>('feeds');

  const { suggestFeedsWithWorker, isLoading: workerLoading } = useTransformerWorker();
  const { parseRSSWithWorker } = useRSSParserWorker();

  // Load saved data on initial render
  useEffect(() => {
    const feeds = loadFeedsFromStorage();
    const cats = loadCategoriesFromStorage();
    const prefs = loadUserPreferences();
    
    setSavedFeeds(feeds);
    setCategories(cats);
    setPreferences(prefs);
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
      let feedData = await fetchAndParseRSSClient(feedUrlInput.trim(), parseRSSWithWorker);
      
      // If that fails, try to extract the feed URL from the HTML
      let discoveredFeedUrl: string | null = null;
      if (!feedData) {
        discoveredFeedUrl = await getFeedUrlFromHtml(feedUrlInput.trim());
        if (discoveredFeedUrl) {
          feedData = await fetchAndParseRSSClient(discoveredFeedUrl, parseRSSWithWorker);
        }
      }
      // If still no feed, try advanced discovery
      if (!feedData) {
        discoveredFeedUrl = await discoverFeedUrlWithFallbacks(feedUrlInput.trim());
        if (discoveredFeedUrl) {
          feedData = await fetchAndParseRSSClient(discoveredFeedUrl, parseRSSWithWorker);
        }
      }

      if (feedData && feedData.items && feedData.items.length > 0) {
        // Get the feed title from the feed data or use the hostname
        const feedTitle = feedData.title || new URL(feedUrlInput.trim()).hostname;
        
        const newFeed: FeedData = {
          id: `feed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: feedTitle,
          url: discoveredFeedUrl || feedUrlInput.trim(),
          category: 'Uncategorized',
          tags: [],
          isActive: true
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
  }, [feedUrlInput, savedFeeds, parseRSSWithWorker]);

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
  }, [topic, suggestFeedsWithWorker]);

  // Handle subscribing to a suggested feed
  const handleSubscribeToFeed = useCallback((feed: FeedData) => {
    // Check if the feed is already in the saved feeds
    if (savedFeeds.some(savedFeed => savedFeed.url === feed.url)) {
      setError("This feed is already added");
      return;
    }

    const newFeed: FeedData = {
      ...feed,
      id: feed.id || `feed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      category: 'Uncategorized',
      tags: [],
      isActive: true
    };

    saveFeedToStorage(newFeed);
    setSavedFeeds(prev => [...prev, newFeed]);
  }, [savedFeeds]);

  // Handle removing a feed
  const handleRemoveFeed = useCallback((url: string) => {
    const updatedFeeds = savedFeeds.filter(feed => feed.url !== url);
    localStorage.setItem("feeds", JSON.stringify(updatedFeeds));
    setSavedFeeds(updatedFeeds);
  }, [savedFeeds]);

  // Handle updating a feed
  const handleUpdateFeed = useCallback((url: string, updates: Partial<FeedData>) => {
    setSavedFeeds(prev => prev.map(feed => 
      feed.url === url ? { ...feed, ...updates } : feed
    ));
    
    // Update in storage
    const updatedFeeds = savedFeeds.map(feed => 
      feed.url === url ? { ...feed, ...updates } : feed
    );
    localStorage.setItem("feeds", JSON.stringify(updatedFeeds));
  }, [savedFeeds]);

  // Handle feed URL updates for health checker
  const handleFeedUrlUpdate = useCallback((oldUrl: string, newUrl: string) => {
    setSavedFeeds(prev => prev.map(feed => 
      feed.url === oldUrl ? { ...feed, url: newUrl } : feed
    ));
    
    // Update in storage
    const updatedFeeds = savedFeeds.map(feed => 
      feed.url === oldUrl ? { ...feed, url: newUrl } : feed
    );
    localStorage.setItem("feeds", JSON.stringify(updatedFeeds));
  }, [savedFeeds]);

  // Handle adding a category
  const handleAddCategory = useCallback((categoryData: Omit<Category, 'id' | 'createdAt'>) => {
    const newCategory: Category = {
      id: `cat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...categoryData,
      createdAt: Date.now()
    };
    
    const updatedCategories = [...categories, newCategory];
    saveCategoriesToStorage(updatedCategories);
    setCategories(updatedCategories);
  }, [categories]);

  // Handle editing a category
  const handleEditCategory = useCallback((id: string, updates: Partial<Category>) => {
    const updatedCategories = categories.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    );
    saveCategoriesToStorage(updatedCategories);
    setCategories(updatedCategories);
  }, [categories]);

  // Handle deleting a category
  const handleDeleteCategory = useCallback((id: string) => {
    const updatedCategories = categories.filter(cat => cat.id !== id);
    saveCategoriesToStorage(updatedCategories);
    setCategories(updatedCategories);
    
    // Update feeds that were using this category
    const updatedFeeds = savedFeeds.map(feed => 
      feed.category === id ? { ...feed, category: 'Uncategorized' } : feed
    );
    localStorage.setItem("feeds", JSON.stringify(updatedFeeds));
    setSavedFeeds(updatedFeeds);
  }, [categories, savedFeeds]);

  // Handle updating preferences
  const handleUpdatePreferences = useCallback((newPreferences: UserPreferences) => {
    saveUserPreferences(newPreferences);
    setPreferences(newPreferences);
  }, []);

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

  // Handle exporting OPML file
  const handleExportOPML = useCallback(async () => {
    try {
      const response = await fetch('/api/export-opml', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feeds: savedFeeds,
          categories: categories,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to export OPML');
      }

      // Get the OPML content as a blob
      const blob = await response.blob();
      
      // Create a download link and trigger it
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `feeds-export-${new Date().toISOString().split('T')[0]}.opml`;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setError('Successfully exported feeds to OPML file');
    } catch (error) {
      console.error("Error exporting OPML file:", error);
      setError("Error exporting OPML file. Please try again.");
    }
  }, [savedFeeds, categories]);

  return (
    <main className="space-y-8 px-4 max-w-4xl mx-auto py-6 pb-28 md:pb-6">
      {/* Page Header */}
      <div className="border-b border-[var(--border)] pb-4">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Manage Feeds</h1>
        <p className="text-[var(--text-secondary)] mt-1">Add, organize, and monitor your RSS feeds</p>
      </div>
      {/* Tab Navigation */}
      <div className="flex gap-1 border-b border-[var(--border)] bg-[var(--muted)] rounded-t-lg p-1">
        <button
          onClick={() => setActiveTab('feeds')}
          className={`px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
            activeTab === 'feeds' 
              ? 'bg-[var(--background)] text-[var(--primary)] shadow-sm border border-[var(--card-border)]' 
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-hover)]'
          }`}
        >
          Feeds
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
            activeTab === 'categories' 
              ? 'bg-[var(--background)] text-[var(--primary)] shadow-sm border border-[var(--card-border)]' 
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-hover)]'
          }`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab('sentiment')}
          className={`px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
            activeTab === 'sentiment' 
              ? 'bg-[var(--background)] text-[var(--primary)] shadow-sm border border-[var(--card-border)]' 
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-hover)]'
          }`}
        >
          Sentiment
        </button>
        <button
          onClick={() => setActiveTab('health')}
          className={`px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
            activeTab === 'health' 
              ? 'bg-[var(--background)] text-[var(--primary)] shadow-sm border border-[var(--card-border)]' 
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-hover)]'
          }`}
        >
          Health
        </button>
      </div>

      {/* Feeds Tab */}
      {activeTab === 'feeds' && (
        <section className="space-y-6">
          <div className="space-y-3">
            <div className="border-b border-[var(--border)] pb-2">
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">Add Feed</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Enter a feed URL or import from OPML file</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
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
            {isLoading && !error && (
              <div className="flex items-center gap-2 mt-2 p-3 bg-[var(--muted)] border border-[var(--card-border)] rounded-lg">
                <Spinner size="sm" />
                <span className="text-sm text-[var(--text-secondary)]">Searching for feeds...</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Input
                type="file"
                accept=".opml,.xml"
                onChange={handleImportOPML}
                className="flex-1"
                disabled={isImporting}
              />
              {isImporting && <Spinner size="sm" />}
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="default"
                onClick={handleExportOPML}
                disabled={savedFeeds.length === 0}
                className="w-full"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Export to OPML
              </Button>
            </div>
            {error && (
              <div className={`p-3 rounded-lg border ${
                error.includes("Successfully") 
                  ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200" 
                  : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200"
              }`}>
                {error}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="border-b border-[var(--border)] pb-2">
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">Suggest Feeds</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Discover new feeds based on topics</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
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
                disabled={isSuggesting || workerLoading}
                className="w-full sm:w-auto"
              >
                {isSuggesting || workerLoading ? <Spinner size="sm" /> : "Suggest"}
              </Button>
            </div>
          </div>

          {suggestedFeeds.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-[var(--text-primary)]">Suggested Feeds</h3>
              <div className="grid gap-3">
                {suggestedFeeds.map((feed) => (
                  <SuggestedFeed key={feed.url} feed={feed} onSubscribe={handleSubscribeToFeed} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <section className="space-y-6">
          <CategoryManager
            categories={categories}
            onAddCategory={handleAddCategory}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        </section>
      )}

      {/* Sentiment Tab */}
      {activeTab === 'sentiment' && preferences && (
        <section className="space-y-6">
          <SentimentFilterSettings
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
          />
        </section>
      )}

      {/* Health Tab */}
      {activeTab === 'health' && (
        <section className="space-y-6">
          <FeedHealthChecker
            feeds={savedFeeds}
            onUpdateFeed={handleFeedUrlUpdate}
          />
        </section>
      )}

      {/* Your Feeds Section */}
      <section className="space-y-4 pt-6 border-t border-[var(--border)]">
        <div className="border-b border-[var(--border)] pb-2">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Your Feeds</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Manage and organize your subscribed feeds</p>
        </div>
        <div className="grid gap-3">
          {savedFeeds.length === 0 ? (
            <Card className="shadow-sm border-[var(--card-border)]">
              <CardContent className="p-6 text-center">
                <p className="text-[var(--text-secondary)] text-lg">No feeds added yet. Add some feeds to get started.</p>
              </CardContent>
            </Card>
          ) : (
            savedFeeds.map((feed) => (
              <SavedFeed 
                key={feed.url} 
                feed={feed} 
                categories={categories}
                onRemove={handleRemoveFeed}
                onUpdate={handleUpdateFeed}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
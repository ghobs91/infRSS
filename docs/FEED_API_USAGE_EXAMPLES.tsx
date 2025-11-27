/**
 * Example usage of the feed suggestion API in React components
 */

import { useState, useEffect } from 'react';

// Type definitions
interface Feed {
  title: string;
  url: string;
  score: number;
  category?: string;
  country?: string;
}

interface Category {
  slug: string;
  name: string;
  feedCount: number;
}

interface CategoriesResponse {
  categories: Category[];
  countries: Category[];
}

/**
 * Hook to fetch all available categories and countries
 */
export function useCategories() {
  const [data, setData] = useState<CategoriesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('/api/suggest')
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

/**
 * Hook to get feed suggestions for a topic
 */
export function useFeedSuggestions(topic: string | null) {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!topic) return;

    setLoading(true);
    setError(null);

    fetch('/api/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    })
      .then(res => res.json())
      .then(setFeeds)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [topic]);

  return { feeds, loading, error };
}

/**
 * Example: Category Browser Component
 */
export function CategoryBrowser() {
  const { data, loading, error } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { feeds } = useFeedSuggestions(selectedCategory);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div className="flex gap-4">
      {/* Categories Sidebar */}
      <div className="w-64 space-y-2">
        <h2 className="text-xl font-bold">Categories</h2>
        {data.categories.map(cat => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`w-full text-left px-3 py-2 rounded ${
              selectedCategory === cat.slug ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            {cat.name} ({cat.feedCount})
          </button>
        ))}
      </div>

      {/* Feed List */}
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4">
          {selectedCategory ? `Feeds for ${selectedCategory}` : 'Select a category'}
        </h2>
        {feeds.map((feed, i) => (
          <div key={i} className="border rounded p-3 mb-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{feed.title}</h3>
                <a href={feed.url} className="text-sm text-blue-600 hover:underline">
                  {feed.url}
                </a>
              </div>
              <span className="text-sm text-gray-500">
                Score: {feed.score.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Example: Search Component
 */
export function FeedSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { feeds, loading } = useFeedSuggestions(debouncedQuery);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for feeds (e.g., tech, programming, india)"
        className="w-full px-4 py-2 border rounded"
      />
      
      {loading && <div className="mt-2">Searching...</div>}
      
      <div className="mt-4 space-y-2">
        {feeds.map((feed, i) => (
          <div key={i} className="border rounded p-3">
            <h3 className="font-semibold">{feed.title}</h3>
            <p className="text-sm text-gray-600">{feed.url}</p>
            {feed.category && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {feed.category}
              </span>
            )}
            {feed.country && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded ml-2">
                {feed.country}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Example: Quick Add Feed Component
 */
export function QuickAddFeed() {
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);
  const [topic, setTopic] = useState('');
  const { feeds } = useFeedSuggestions(topic);

  const handleAddFeed = async (feed: Feed) => {
    // Add feed to user's subscriptions
    const existingFeeds = JSON.parse(localStorage.getItem('rssFeedUrls') || '[]');
    if (!existingFeeds.includes(feed.url)) {
      existingFeeds.push(feed.url);
      localStorage.setItem('rssFeedUrls', JSON.stringify(existingFeeds));
      alert(`Added ${feed.title} to your feeds!`);
    } else {
      alert('This feed is already in your subscriptions.');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          What are you interested in?
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., technology, cooking, sports"
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      {feeds.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Suggested Feeds:</h3>
          <div className="space-y-2">
            {feeds.slice(0, 5).map((feed, i) => (
              <div key={i} className="flex justify-between items-center border rounded p-3">
                <div>
                  <h4 className="font-medium">{feed.title}</h4>
                  <p className="text-sm text-gray-600 truncate max-w-md">{feed.url}</p>
                </div>
                <button
                  onClick={() => handleAddFeed(feed)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Example: Country News Selector
 */
export function CountryNewsSelector() {
  const { data } = useCategories();
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const { feeds } = useFeedSuggestions(selectedCountry);

  if (!data) return null;

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Select a country for news:
      </label>
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="w-full px-4 py-2 border rounded"
      >
        <option value="">Choose a country...</option>
        {data.countries.map(country => (
          <option key={country.slug} value={country.slug}>
            {country.name} ({country.feedCount} sources)
          </option>
        ))}
      </select>

      {feeds.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">News Sources from {selectedCountry}:</h3>
          <ul className="space-y-2">
            {feeds.map((feed, i) => (
              <li key={i} className="border-l-4 border-blue-500 pl-3">
                <a href={feed.url} className="text-blue-600 hover:underline">
                  {feed.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

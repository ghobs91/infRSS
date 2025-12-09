'use client';

import { useState, useEffect } from 'react';
import { getEntityOwnership, getCacheStats, clearOwnershipCache } from '@/lib/wikipediaOwnership';

export default function TestWikiPage() {
  const [feedName, setFeedName] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [cacheStats, setCacheStats] = useState<any>(null);

  const testFeeds = [
    'TechCrunch',
    'The New York Times',
    'BBC News',
    'CNN',
    'The Guardian',
    'Forbes',
    'Wired',
    'Ars Technica',
    'The Verge',
    'Android Authority'
  ];

  useEffect(() => {
    updateCacheStats();
  }, []);

  const updateCacheStats = () => {
    const stats = getCacheStats();
    setCacheStats(stats);
  };

  const handleTest = async (name: string) => {
    setLoading(true);
    setFeedName(name);
    setResult(null);
    
    try {
      const ownership = await getEntityOwnership(name);
      setResult(ownership);
      updateCacheStats();
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  const handleClearCache = () => {
    clearOwnershipCache();
    updateCacheStats();
    alert('Cache cleared!');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Wikipedia Ownership Test</h1>
      
      {cacheStats && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#e3f2fd', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>Cache Stats:</strong> {cacheStats.size} entries
            {cacheStats.storageSize && ` (${cacheStats.storageSize})`}
          </div>
          <button
            onClick={handleClearCache}
            style={{
              padding: '0.5rem 1rem',
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Clear Cache
          </button>
        </div>
      )}
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Test Sample Feeds</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
          {testFeeds.map(feed => (
            <button
              key={feed}
              onClick={() => handleTest(feed)}
              style={{
                padding: '0.5rem 1rem',
                background: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              disabled={loading}
            >
              {feed}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Custom Test</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={feedName}
            onChange={(e) => setFeedName(e.target.value)}
            placeholder="Enter feed name..."
            style={{
              flex: 1,
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            disabled={loading}
          />
          <button
            onClick={() => handleTest(feedName)}
            style={{
              padding: '0.5rem 1rem',
              background: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            disabled={loading || !feedName}
          >
            Test
          </button>
        </div>
      </div>

      {loading && (
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f0f0', borderRadius: '4px' }}>
          Loading...
        </div>
      )}

      {result && !loading && (
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f0f0', borderRadius: '4px' }}>
          <h3>Result for: {feedName}</h3>
          <pre style={{ background: 'white', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { loadFeedsFromStorage, saveFeedsToStorage } from "@/lib/rssUtils";
import { fetchAndParseRSSClient } from "@/lib/rssUtilsClient";
import { useRSSParserWorker } from "@/lib/useRSSParserWorker";
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Trash2, ExternalLink, Clock } from "lucide-react";

interface FeedHealth {
  url: string;
  title?: string;
  status: 'checking' | 'success' | 'failed' | 'timeout' | 'unknown';
  error?: string;
  errorCode?: number;
  suggestion?: string;
  itemCount?: number;
  responseTime?: number;
  lastChecked?: Date;
}

export default function FeedHealthPage() {
  const [feeds, setFeeds] = useState<FeedHealth[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [filter, setFilter] = useState<'all' | 'success' | 'failed'>('all');
  const { parseRSSWithWorker } = useRSSParserWorker();

  const checkFeedHealth = async (url: string): Promise<FeedHealth> => {
    const startTime = Date.now();
    try {
      const data = await fetchAndParseRSSClient(url, parseRSSWithWorker);
      const responseTime = Date.now() - startTime;
      
      if (data && data.items.length > 0) {
        return {
          url,
          title: data.title,
          status: 'success',
          itemCount: data.items.length,
          responseTime,
          lastChecked: new Date()
        };
      } else {
        return {
          url,
          status: 'failed',
          error: 'No items found in feed',
          responseTime,
          lastChecked: new Date()
        };
      }
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      if (error?.name === 'AbortError' || responseTime > 28000) {
        return {
          url,
          status: 'timeout',
          error: 'Feed took too long to respond (>30s)',
          suggestion: 'The feed server is very slow or unresponsive. Consider removing this feed.',
          responseTime,
          lastChecked: new Date()
        };
      }
      
      return {
        url,
        status: 'failed',
        error: error?.message || 'Unknown error',
        responseTime,
        lastChecked: new Date()
      };
    }
  };

  const checkAllFeeds = async () => {
    setIsChecking(true);
    const savedFeeds = loadFeedsFromStorage();
    
    // Initialize with checking status
    setFeeds(savedFeeds.map(f => ({
      url: f.url,
      title: f.title,
      status: 'checking' as const,
    })));

    // Check feeds in batches of 10 to avoid overwhelming the server
    const batchSize = 10;
    const results: FeedHealth[] = [];
    
    for (let i = 0; i < savedFeeds.length; i += batchSize) {
      const batch = savedFeeds.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(feed => checkFeedHealth(feed.url))
      );
      
      results.push(...batchResults);
      
      // Update UI incrementally
      setFeeds(prev => {
        const updated = [...prev];
        batchResults.forEach(result => {
          const index = updated.findIndex(f => f.url === result.url);
          if (index !== -1) {
            updated[index] = result;
          }
        });
        return updated;
      });
      
      // Small delay between batches
      if (i + batchSize < savedFeeds.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    setIsChecking(false);
  };

  const retryFeed = async (url: string) => {
    setFeeds(prev => prev.map(f => 
      f.url === url ? { ...f, status: 'checking' as const } : f
    ));
    
    const result = await checkFeedHealth(url);
    setFeeds(prev => prev.map(f => f.url === url ? result : f));
  };

  const removeFeed = (url: string) => {
    const savedFeeds = loadFeedsFromStorage();
    const updated = savedFeeds.filter(f => f.url !== url);
    saveFeedsToStorage(updated);
    setFeeds(prev => prev.filter(f => f.url !== url));
  };

  const removeAllFailed = () => {
    const failedUrls = feeds.filter(f => f.status === 'failed' || f.status === 'timeout').map(f => f.url);
    const savedFeeds = loadFeedsFromStorage();
    const updated = savedFeeds.filter(f => !failedUrls.includes(f.url));
    saveFeedsToStorage(updated);
    setFeeds(prev => prev.filter(f => f.status === 'success'));
  };

  useEffect(() => {
    const savedFeeds = loadFeedsFromStorage();
    setFeeds(savedFeeds.map(f => ({
      url: f.url,
      title: f.title,
      status: 'unknown' as const,
    })));
  }, []);

  const filteredFeeds = feeds.filter(f => {
    if (filter === 'all') return true;
    if (filter === 'success') return f.status === 'success';
    if (filter === 'failed') return f.status === 'failed' || f.status === 'timeout';
    return true;
  });

  const stats = {
    total: feeds.length,
    success: feeds.filter(f => f.status === 'success').length,
    failed: feeds.filter(f => f.status === 'failed' || f.status === 'timeout').length,
    checking: feeds.filter(f => f.status === 'checking').length,
    unknown: feeds.filter(f => f.status === 'unknown').length,
  };

  const getStatusIcon = (status: FeedHealth['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'timeout':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'checking':
        return <Spinner size="sm" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: FeedHealth['status']) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500">Working</Badge>;
      case 'failed':
        return <Badge className="bg-red-500">Failed</Badge>;
      case 'timeout':
        return <Badge className="bg-orange-500">Timeout</Badge>;
      case 'checking':
        return <Badge className="bg-blue-500">Checking...</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatResponseTime = (ms?: number) => {
    if (!ms) return '-';
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const getRSSHubAlternative = (url: string): string | null => {
    if (!url.includes('rsshub.app')) return null;
    
    // Twitter/X feeds
    if (url.includes('/twitter/')) {
      const match = url.match(/\/twitter\/([^\/]+)/);
      if (match) {
        return `Alternative: Try Nitter RSS at https://nitter.net/${match[1]}/rss`;
      }
    }
    
    // YouTube feeds
    if (url.includes('/youtube/')) {
      const match = url.match(/\/youtube\/user\/([^\/]+)/);
      if (match) {
        return `Alternative: Use YouTube's native RSS feed`;
      }
    }
    
    return 'RSSHub feeds may be unreliable. Consider finding the native RSS feed from the source.';
  };

  return (
    <main className="space-y-8 px-4 max-w-7xl mx-auto pt-8 pb-12 md:pb-12 pb-28">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Feed Health Dashboard</h1>
        <p className="text-[var(--text-secondary)]">
          Check the status of all your RSS feeds and identify issues
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-[var(--text-secondary)]">Total Feeds</div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-700">{stats.success}</div>
            <div className="text-sm text-green-600">Working</div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-700">{stats.failed}</div>
            <div className="text-sm text-red-600">Failed</div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-700">{stats.checking}</div>
            <div className="text-sm text-blue-600">Checking</div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 bg-gray-50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-700">{stats.unknown}</div>
            <div className="text-sm text-gray-600">Unknown</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          <Button
            onClick={checkAllFeeds}
            disabled={isChecking}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
            {isChecking ? 'Checking...' : 'Check All Feeds'}
          </Button>
          {stats.failed > 0 && (
            <Button
              onClick={removeAllFailed}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Remove All Failed ({stats.failed})
            </Button>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={filter === 'success' ? 'default' : 'outline'}
            onClick={() => setFilter('success')}
            size="sm"
          >
            Working
          </Button>
          <Button
            variant={filter === 'failed' ? 'default' : 'outline'}
            onClick={() => setFilter('failed')}
            size="sm"
          >
            Failed
          </Button>
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-3">
        {filteredFeeds.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-[var(--text-secondary)]">
                {feeds.length === 0 
                  ? 'No feeds found. Add some feeds to get started.'
                  : 'No feeds match the current filter.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredFeeds.map((feed) => (
            <Card key={feed.url} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getStatusIcon(feed.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm mb-1 truncate">
                          {feed.title || 'Untitled Feed'}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)] break-all">
                          {feed.url}
                        </p>
                      </div>
                      {getStatusBadge(feed.status)}
                    </div>

                    {feed.status === 'success' && (
                      <div className="flex gap-4 text-xs text-[var(--text-secondary)] mb-2">
                        <span>✓ {feed.itemCount} articles</span>
                        <span>⚡ {formatResponseTime(feed.responseTime)}</span>
                      </div>
                    )}

                    {(feed.status === 'failed' || feed.status === 'timeout') && (
                      <div className="bg-red-50 border border-red-200 rounded p-3 mb-2">
                        <p className="text-sm text-red-800 font-medium mb-1">
                          {feed.error}
                        </p>
                        {feed.suggestion && (
                          <p className="text-xs text-red-600">
                            💡 {feed.suggestion}
                          </p>
                        )}
                        {getRSSHubAlternative(feed.url) && (
                          <p className="text-xs text-blue-600 mt-1">
                            🔄 {getRSSHubAlternative(feed.url)}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2">
                      {feed.status !== 'checking' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => retryFeed(feed.url)}
                          className="text-xs"
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Retry
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(feed.url, '_blank')}
                        className="text-xs"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Open
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFeed(feed.url)}
                        className="text-xs text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Help Section */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-sm">Tips for Managing Feeds</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <p>• <strong>Timeout errors:</strong> The feed server is too slow. Consider removing these feeds.</p>
          <p>• <strong>RSSHub feeds:</strong> These may be rate-limited or unreliable. Look for native RSS feeds from the source.</p>
          <p>• <strong>404 errors:</strong> The feed URL no longer exists. Remove these feeds.</p>
          <p>• <strong>Failed feeds:</strong> Check if the website still provides an RSS feed, or look for alternatives.</p>
          <p>• <strong>Slow response times:</strong> Feeds taking &gt;5s may slow down your app. Consider removing them.</p>
        </CardContent>
      </Card>
    </main>
  );
}

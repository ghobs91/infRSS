import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  ExternalLink,
  TrendingUp,
  Users,
  Twitter,
  Github
} from 'lucide-react';
import { generateMigrationReport, FeedMigration } from '@/lib/feedMigration';
import { FeedData } from '@/lib/types';

interface FeedHealthCheckerProps {
  feeds: FeedData[];
  onUpdateFeed?: (oldUrl: string, newUrl: string) => void;
  onRemoveFeed?: (url: string) => void;
}

interface FeedHealthStatus {
  url: string;
  status: 'healthy' | 'error' | 'rate_limited' | 'not_found';
  error?: string;
  responseTime?: number;
  lastChecked: Date;
}

export function FeedHealthChecker({ feeds, onUpdateFeed, onRemoveFeed }: FeedHealthCheckerProps) {
  const [healthStatuses, setHealthStatuses] = useState<FeedHealthStatus[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [migrationReport, setMigrationReport] = useState<any>(null);

  const checkFeedHealth = async (feed: FeedData): Promise<FeedHealthStatus> => {
    const startTime = Date.now();
    
    try {
      const response = await fetch(`/api/proxy?url=${encodeURIComponent(feed.url)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const responseTime = Date.now() - startTime;
      
      if (response.ok) {
        return {
          url: feed.url,
          status: 'healthy',
          responseTime,
          lastChecked: new Date()
        };
      } else {
        const errorData = await response.json();
        let status: FeedHealthStatus['status'] = 'error';
        
        if (response.status === 404) status = 'not_found';
        else if (response.status === 429) status = 'rate_limited';
        
        return {
          url: feed.url,
          status,
          error: errorData.error || `HTTP ${response.status}`,
          responseTime,
          lastChecked: new Date()
        };
      }
    } catch (error) {
      return {
        url: feed.url,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        lastChecked: new Date()
      };
    }
  };

  const checkAllFeeds = async () => {
    setIsChecking(true);
    const statuses: FeedHealthStatus[] = [];
    
    for (const feed of feeds) {
      const status = await checkFeedHealth(feed);
      statuses.push(status);
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setHealthStatuses(statuses);
    setIsChecking(false);
    
    // Generate migration report for failed feeds
    const failedUrls = statuses
      .filter(s => s.status !== 'healthy')
      .map(s => s.url);
    
    if (failedUrls.length > 0) {
      const report = generateMigrationReport(failedUrls);
      setMigrationReport(report);
    }
  };

  const getStatusIcon = (status: FeedHealthStatus['status']) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'rate_limited': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'not_found': return <XCircle className="h-4 w-4 text-orange-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: FeedHealthStatus['status']) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800';
      case 'error': return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800';
      case 'rate_limited': return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'not_found': return 'text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-900/20 dark:border-orange-800';
      default: return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800';
    }
  };

  const getFeedTypeIcon = (url: string) => {
    if (url.includes('twitter.com') || url.includes('rsshub.app/twitter')) {
      return <Twitter className="h-4 w-4 text-[var(--text-secondary)]" />;
    }
    if (url.includes('github.com') || url.includes('rsshub.app/github')) {
      return <Github className="h-4 w-4 text-[var(--text-secondary)]" />;
    }
    if (url.includes('rsshub.app')) {
      return <TrendingUp className="h-4 w-4 text-[var(--text-secondary)]" />;
    }
    return <Users className="h-4 w-4 text-[var(--text-secondary)]" />;
  };

  useEffect(() => {
    if (feeds.length > 0) {
      checkAllFeeds();
    }
  }, [feeds]);

  const healthyFeeds = healthStatuses.filter(s => s.status === 'healthy');
  const problematicFeeds = healthStatuses.filter(s => s.status !== 'healthy');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Feed Health Checker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-[var(--text-secondary)]">
              {feeds.length} total feeds • {healthyFeeds.length} healthy • {problematicFeeds.length} problematic
            </div>
            <Button 
              onClick={checkAllFeeds} 
              disabled={isChecking}
              variant="outline"
              size="sm"
            >
              {isChecking ? <Spinner className="h-4 w-4" /> : <RefreshCw className="h-4 w-4" />}
              {isChecking ? 'Checking...' : 'Recheck All'}
            </Button>
          </div>

          {problematicFeeds.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-[var(--text-primary)] mb-3">Problematic Feeds</h3>
              <div className="space-y-3">
                {problematicFeeds.map((status, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-[var(--card-border)] rounded-lg bg-[var(--muted)] hover:bg-[var(--muted-hover)] transition-colors">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(status.status)}
                      <div className="flex items-center gap-2">
                        {getFeedTypeIcon(status.url)}
                        <span className="text-sm font-medium text-[var(--text-primary)]">
                          {feeds.find(f => f.url === status.url)?.title || 'Unknown Feed'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(status.status)}>
                        {status.status.replace('_', ' ')}
                      </Badge>
                      {status.responseTime && (
                        <span className="text-xs text-[var(--text-secondary)]">
                          {status.responseTime}ms
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {migrationReport && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-[var(--text-primary)] mb-3">Migration Recommendations</h3>
              <div className="space-y-3">
                {migrationReport.recommendations.map((rec, index) => (
                  <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200">
                    <p className="text-sm text-blue-800 dark:text-blue-200">{rec}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <h4 className="text-md font-medium text-[var(--text-primary)] mb-2">Migration Options</h4>
                <div className="space-y-3">
                  {migrationReport.migrations.map((migration, index) => (
                    <div key={index} className="border border-[var(--card-border)] rounded-lg p-4 bg-[var(--card-bg)]">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-[var(--text-primary)]">
                          {feeds.find(f => f.url === migration.originalUrl)?.title || 'Unknown Feed'}
                        </h5>
                        <Badge variant="outline" className="text-xs border-[var(--card-border)] text-[var(--text-secondary)]">
                          {migration.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        {migration.alternatives.map((alt, altIndex) => (
                          <div key={altIndex} className="flex items-center justify-between p-3 bg-[var(--muted)] rounded border border-[var(--card-border)] hover:bg-[var(--muted-hover)] transition-colors">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-[var(--text-primary)]">{alt.title}</span>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs border-[var(--card-border)] ${
                                    alt.reliability === 'high' ? 'text-green-600 dark:text-green-400' : 
                                    alt.reliability === 'medium' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
                                  }`}
                                >
                                  {alt.reliability} reliability
                                </Badge>
                              </div>
                              <p className="text-xs text-[var(--text-secondary)] mt-1">{alt.description}</p>
                              {alt.setupInstructions && (
                                <p className="text-xs text-[var(--text-secondary)] mt-1">{alt.setupInstructions}</p>
                              )}
                            </div>
                            <div className="flex gap-1">
                              {onUpdateFeed && !alt.setupRequired && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => onUpdateFeed(migration.originalUrl, alt.url)}
                                  className="text-xs px-2 py-1"
                                >
                                  Use
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(alt.url, '_blank')}
                                className="text-xs px-2 py-1"
                              >
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {healthyFeeds.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-[var(--text-primary)] mb-3">Healthy Feeds</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {healthyFeeds.map((status, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded dark:bg-green-900/20 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                    {getStatusIcon(status.status)}
                    <span className="text-sm text-green-800 dark:text-green-200">
                      {feeds.find(f => f.url === status.url)?.title || 'Unknown Feed'}
                    </span>
                    {status.responseTime && (
                      <span className="text-xs text-green-600 dark:text-green-400 ml-auto">
                        {status.responseTime}ms
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

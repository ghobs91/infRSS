import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, ExternalLink } from 'lucide-react';
import { getAlternativeRSSSources } from '@/lib/rssUtils';

interface FeedErrorDisplayProps {
  url: string;
  error: string;
  status?: number;
  suggestion?: string;
  onRetry?: () => void;
  onAddAlternative?: (url: string) => void;
}

export function FeedErrorDisplay({ 
  url, 
  error, 
  status, 
  suggestion, 
  onRetry, 
  onAddAlternative 
}: FeedErrorDisplayProps) {
  const alternatives = getAlternativeRSSSources(url);
  const isRSSHub = url.includes('rsshub.app');
  
  const getErrorIcon = () => {
    if (status === 404) return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    if (status === 429) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    if (status === 408) return <AlertTriangle className="h-5 w-5 text-blue-500" />;
    return <AlertTriangle className="h-5 w-5 text-red-500" />;
  };

  const getErrorColor = () => {
    if (status === 404) return 'border-orange-200 bg-orange-50';
    if (status === 429) return 'border-yellow-200 bg-yellow-50';
    if (status === 408) return 'border-blue-200 bg-blue-50';
    return 'border-red-200 bg-red-50';
  };

  return (
    <Card className={`${getErrorColor()} mb-4`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          {getErrorIcon()}
          Feed Error: {status ? `HTTP ${status}` : 'Unknown Error'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm">
          <p className="font-medium text-gray-900 mb-1">{error}</p>
          {suggestion && (
            <p className="text-gray-600 mb-2">{suggestion}</p>
          )}
          <p className="text-xs text-gray-500 break-all">
            Failed URL: {url}
          </p>
        </div>

        <div className="flex gap-2">
          {onRetry && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRetry}
              className="flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              Retry
            </Button>
          )}
          
          {isRSSHub && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://github.com/DIYgod/RSSHub', '_blank')}
              className="flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3" />
              RSSHub Docs
            </Button>
          )}
        </div>

        {alternatives.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Alternative RSS Sources
            </h4>
            <div className="space-y-2">
              {alternatives.map((alt, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alt.title}</p>
                    <p className="text-xs text-gray-600">{alt.description}</p>
                  </div>
                  <div className="flex gap-1">
                    {onAddAlternative && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onAddAlternative(alt.url)}
                        className="text-xs px-2 py-1"
                      >
                        Add
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
        )}

        {isRSSHub && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> RSSHub is a community service that may have outages or rate limits. 
              Consider self-hosting RSSHub for better reliability, or use alternative RSS services.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

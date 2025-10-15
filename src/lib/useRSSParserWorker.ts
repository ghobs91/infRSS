"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import type { Article } from './types';

interface ParsedRSSFeed {
  title: string;
  items: Article[];
}

export function useRSSParserWorker() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Worker will be initialized on first use
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  // Lazy worker initialization
  const ensureWorker = useCallback(() => {
    if (!workerRef.current && typeof window !== 'undefined') {
      try {
        // Disable worker in development mode due to Turbopack compatibility issues
        if (process.env.NODE_ENV === 'development') {
          console.log('RSS Parser Worker disabled in development mode - using fallback');
          return null;
        }
        
        const workerPath = new URL('/workers/rss-parser-worker.js', window.location.origin);
        workerRef.current = new Worker(workerPath, { 
          type: 'module',
          name: 'rss-parser-worker'
        });
        
        workerRef.current.onerror = (error) => {
          console.error('RSS Parser Worker error:', error);
          setError('Worker error occurred');
          setIsLoading(false);
        };
      } catch (error) {
        console.error('Failed to initialize RSS parser worker:', error);
        return null;
      }
    }
    return workerRef.current;
  }, []);

  const parseRSSWithWorker = useCallback(async (xmlText: string, feedUrl: string): Promise<ParsedRSSFeed | null> => {
    try {
      const worker = ensureWorker();
      if (!worker) {
        // Fallback to direct parsing if worker not available
        console.warn('Worker not available, using direct parsing fallback');
        return null;
      }

      setIsLoading(true);
      setError(null);

      return await new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Worker timeout'));
        }, 15000);

        const handleMessage = (event: MessageEvent) => {
          clearTimeout(timeoutId);
          
          if (event.data.type === 'rss_parsed') {
            resolve(event.data.data);
          } else if (event.data.type === 'error') {
            reject(new Error(event.data.error));
          }
        };

        workerRef.current!.addEventListener('message', handleMessage, { once: true });
        
        workerRef.current!.postMessage({
          type: 'parse_rss',
          data: { xmlText, feedUrl }
        });
      });
    } catch (err) {
      console.error("parseRSSWithWorker error:", err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [ensureWorker]);

  return {
    parseRSSWithWorker,
    isLoading,
    error
  };
}

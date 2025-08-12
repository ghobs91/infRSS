"use client";

// lib/useTransformerWorker.ts

import { useState, useCallback, useRef, useEffect } from 'react';
import type { FeedData, Article, SentimentAnalysis } from './types';

interface FeedDataWithScore extends FeedData {
  score?: number;
}

interface ArticleAnalysis {
  sentiment: SentimentAnalysis;
  summary: string;
}

interface BatchAnalysisResult {
  articleId: string;
  analysis: ArticleAnalysis;
}

// Fallback feed suggestions when API fails
const FALLBACK_FEEDS: FeedData[] = [
  { id: '1', title: "TechCrunch", url: "https://techcrunch.com/feed/" },
  { id: '2', title: "The Verge", url: "https://www.theverge.com/rss/index.xml" },
  { id: '3', title: "Wired", url: "https://www.wired.com/feed/rss" },
  { id: '4', title: "Ars Technica", url: "https://arstechnica.com/feed/" },
  { id: '5', title: "Engadget", url: "https://www.engadget.com/rss.xml" }
];

// Direct topic-based suggestions for common topics
const TOPIC_BASED_FEEDS: Record<string, FeedData[]> = {
  "tech": [
    { id: '1', title: "TechCrunch", url: "https://techcrunch.com/feed/" },
    { id: '2', title: "The Verge", url: "https://www.theverge.com/rss/index.xml" },
    { id: '3', title: "Wired", url: "https://www.wired.com/feed/rss" },
    { id: '4', title: "Ars Technica", url: "https://arstechnica.com/feed/" },
    { id: '5', title: "Engadget", url: "https://www.engadget.com/rss.xml" }
  ],
  "programming": [
    { id: '6', title: "Dev.to", url: "https://dev.to/feed/" },
    { id: '7', title: "CSS-Tricks", url: "https://css-tricks.com/feed/" },
    { id: '8', title: "Smashing Magazine", url: "https://www.smashingmagazine.com/feed/" },
    { id: '9', title: "JavaScript Weekly", url: "https://javascriptweekly.com/rss/" },
    { id: '10', title: "React Blog", url: "https://reactjs.org/feed.xml" }
  ],
  "news": [
    { id: '11', title: "BBC News", url: "http://feeds.bbci.co.uk/news/rss.xml" },
    { id: '12', title: "Reuters", url: "https://www.reutersagency.com/feed/" },
    { id: '13', title: "The Guardian", url: "https://www.theguardian.com/international/rss" },
    { id: '14', title: "NPR News", url: "https://feeds.npr.org/1001/rss.xml" },
    { id: '15', title: "CNN", url: "https://rss.cnn.com/rss/cnn_topstories.rss" }
  ],
  "science": [
    { id: '16', title: "Scientific American", url: "https://www.scientificamerican.com/feed/" },
    { id: '17', title: "Science Daily", url: "https://www.sciencedaily.com/rss/all.xml" },
    { id: '18', title: "Nature", url: "https://www.nature.com/nature.rss" },
    { id: '19', title: "Science News", url: "https://www.sciencenews.org/feed" },
    { id: '20', title: "New Scientist", url: "https://www.newscientist.com/feed/" }
  ]
};

export function useTransformerWorker() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Initialize worker
    if (typeof window !== 'undefined') {
      workerRef.current = new Worker('/workers/transformer-worker.js');
      
      workerRef.current.onerror = (error) => {
        console.error('Worker error:', error);
        setError('Worker error occurred');
        setIsLoading(false);
      };
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const suggestFeedsWithWorker = useCallback(async (topic: string, feeds: FeedData[]): Promise<FeedDataWithScore[]> => {
    // Check if we have direct topic-based suggestions
    const normalizedTopic = topic.toLowerCase().trim();
    for (const [key, topicFeeds] of Object.entries(TOPIC_BASED_FEEDS)) {
      if (normalizedTopic.includes(key)) {
        console.log(`Using direct topic-based suggestions for: ${key}`);
        return topicFeeds.map(feed => ({ ...feed, score: 1.0 }));
      }
    }
    
    if (!workerRef.current) {
      return FALLBACK_FEEDS.map(feed => ({ ...feed, score: 0.5 }));
    }

    setIsLoading(true);
    setError(null);

    try {
      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Worker timeout'));
        }, 15000);

        const handleMessage = (event: MessageEvent) => {
          clearTimeout(timeoutId);
          
          if (event.data.type === 'feed_suggestions') {
            resolve(event.data.data);
          } else if (event.data.type === 'error') {
            reject(new Error(event.data.error));
          }
        };

        workerRef.current!.addEventListener('message', handleMessage, { once: true });
        
        workerRef.current!.postMessage({
          type: 'suggest_feeds',
          data: { topic, feeds }
        });
      });
    } catch (err) {
      console.error("suggestFeedsWithWorker error:", err);
      return FALLBACK_FEEDS.map(feed => ({ ...feed, score: 0.5 }));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const analyzeArticle = useCallback(async (title: string, content: string): Promise<ArticleAnalysis> => {
    if (!workerRef.current) {
      throw new Error('Worker not initialized');
    }

    setIsLoading(true);
    setError(null);

    try {
      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Worker timeout'));
        }, 30000);

        const handleMessage = (event: MessageEvent) => {
          clearTimeout(timeoutId);
          
          if (event.data.type === 'article_analysis') {
            resolve(event.data.data);
          } else if (event.data.type === 'error') {
            reject(new Error(event.data.error));
          }
        };

        workerRef.current!.addEventListener('message', handleMessage, { once: true });
        
        workerRef.current!.postMessage({
          type: 'analyze_article',
          data: { title, content }
        });
      });
    } catch (err) {
      console.error("analyzeArticle error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const batchAnalyzeArticles = useCallback(async (articles: Article[]): Promise<BatchAnalysisResult[]> => {
    if (!workerRef.current) {
      throw new Error('Worker not initialized');
    }

    setIsLoading(true);
    setError(null);

    try {
      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Worker timeout'));
        }, 60000);

        const handleMessage = (event: MessageEvent) => {
          clearTimeout(timeoutId);
          
          if (event.data.type === 'batch_analysis') {
            resolve(event.data.data);
          } else if (event.data.type === 'error') {
            reject(new Error(event.data.error));
          }
        };

        workerRef.current!.addEventListener('message', handleMessage, { once: true });
        
        workerRef.current!.postMessage({
          type: 'batch_analyze',
          data: { articles }
        });
      });
    } catch (err) {
      console.error("batchAnalyzeArticles error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    suggestFeedsWithWorker,
    analyzeArticle,
    batchAnalyzeArticles,
    isLoading,
    error
  };
}
  
  
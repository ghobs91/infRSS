// lib/types.ts

export interface FeedData {
  id: string;
  title: string;
  url: string;
  category?: string;
  tags?: string[];
  lastFetched?: number;
  isActive?: boolean;
}

export interface Article {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  content: string;
  sourceDomain: string;
  summary?: string;
  sentiment?: SentimentAnalysis;
  tags?: string[];
  readStatus: 'unread' | 'read' | 'archived';
  lastRead?: number;
}

export interface SentimentAnalysis {
  score: number; // -1 to 1 (negative to positive)
  label: 'positive' | 'negative' | 'neutral';
  confidence: number;
  isClickbait: boolean;
  isRagebait: boolean;
  toxicity: number; // 0 to 1
}

export interface Category {
  id: string;
  name: string;
  color: string;
  description?: string;
  createdAt: number;
}

export interface UserPreferences {
  id: string;
  sentimentFilter: {
    enabled: boolean;
    minSentiment: number; // -1 to 1
    maxToxicity: number; // 0 to 1
    hideClickbait: boolean;
    hideRagebait: boolean;
  };
  categories: Category[];
  syncEnabled: boolean;
  syncDeviceId: string;
  lastSync: number;
  language: string;
  autoMarkAsReadOnScroll: boolean; // New preference for auto-marking articles as read when scrolling past
}

export interface SyncData {
  deviceId: string;
  timestamp: number;
  feeds: FeedData[];
  articles: Article[];
  preferences: UserPreferences;
  version: string;
}

export interface P2PSyncMessage {
  type: 'sync_request' | 'sync_response' | 'feed_update' | 'article_update';
  data: any;
  deviceId: string;
  timestamp: number;
  signature: string;
}

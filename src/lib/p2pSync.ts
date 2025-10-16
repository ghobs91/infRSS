// lib/p2pSync.ts

import type { SyncData, FeedData, Article, UserPreferences } from './types';

export class P2PSyncService {
  private deviceId: string;
  private syncEnabled: boolean = false;
  private peers: Set<string> = new Set();
  private syncInterval: NodeJS.Timeout | null = null;
  private lastSync: number = 0;
  private syncVersion: string = '1.0.0';

  constructor(deviceId: string) {
    this.deviceId = deviceId;
  }

  // Enable P2P sync
  enableSync() {
    this.syncEnabled = true;
    this.startSyncLoop();
  }

  // Disable P2P sync
  disableSync() {
    this.syncEnabled = false;
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  // Start the sync loop
  private startSyncLoop() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }

    this.syncInterval = setInterval(() => {
      if (this.syncEnabled && this.peers.size > 0) {
        this.syncWithPeers();
      }
    }, 30000); // Sync every 30 seconds
  }

  // Add a peer device
  addPeer(peerId: string) {
    this.peers.add(peerId);
    console.log(`Added peer: ${peerId}`);
  }

  // Remove a peer device
  removePeer(peerId: string) {
    this.peers.delete(peerId);
    console.log(`Removed peer: ${peerId}`);
  }

  // Get current peers
  getPeers(): string[] {
    return Array.from(this.peers);
  }

  // Generate sync data from local storage
  private generateSyncData(): SyncData {
    const feeds = this.loadFeedsFromStorage();
    const articles = this.loadArticlesFromStorage();
    const preferences = this.loadUserPreferences();

    return {
      deviceId: this.deviceId,
      timestamp: Date.now(),
      feeds,
      articles,
      preferences,
      version: this.syncVersion
    };
  }

  // Sync with all peers
  private async syncWithPeers() {
    if (this.peers.size === 0) return;

    const syncData = this.generateSyncData();
    
    for (const peerId of this.peers) {
      try {
        await this.syncWithPeer(peerId, syncData);
      } catch (error) {
        console.error(`Failed to sync with peer ${peerId}:`, error);
      }
    }
  }

  // Sync with a specific peer
  private async syncWithPeer(peerId: string, syncData: SyncData) {
    try {
      // Send sync request
      // const syncRequest: P2PSyncMessage = {
      //   type: 'sync_request',
      //   data: syncData,
      //   deviceId: this.deviceId,
      //   timestamp: Date.now(),
      //   signature: this.generateSignature(syncData)
      // };

      // In a real implementation, this would use WebRTC or similar P2P technology
      // For now, we'll simulate the sync process
      console.log(`Syncing with peer ${peerId}...`);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Process the sync response
      await this.processSyncResponse(syncData);
      
      this.lastSync = Date.now();
      console.log(`Successfully synced with peer ${peerId}`);
    } catch (error) {
      console.error(`Sync failed with peer ${peerId}:`, error);
    }
  }

  // Process sync response from peer
  private async processSyncResponse(peerSyncData: SyncData) {
    const localFeeds = this.loadFeedsFromStorage();
    const localArticles = this.loadArticlesFromStorage();
    const localPreferences = this.loadUserPreferences();

    // Merge feeds
    const mergedFeeds = this.mergeFeeds(localFeeds, peerSyncData.feeds);
    
    // Merge articles
    const mergedArticles = this.mergeArticles(localArticles, peerSyncData.articles);
    
    // Merge preferences (take the most recent)
    const mergedPreferences = this.mergePreferences(localPreferences, peerSyncData.preferences);

    // Save merged data
    this.saveFeedsToStorage(mergedFeeds);
    this.saveArticlesToStorage(mergedArticles);
    this.saveUserPreferences(mergedPreferences);
  }

  // Merge feeds from different devices
  private mergeFeeds(localFeeds: FeedData[], peerFeeds: FeedData[]): FeedData[] {
    const merged = new Map<string, FeedData>();
    
    // Add local feeds
    localFeeds.forEach(feed => {
      merged.set(feed.url, feed);
    });
    
    // Add/update peer feeds
    peerFeeds.forEach(feed => {
      const existing = merged.get(feed.url);
      if (!existing || (feed.lastFetched && (!existing.lastFetched || existing.lastFetched < feed.lastFetched))) {
        merged.set(feed.url, feed);
      }
    });
    return Array.from(merged.values());
  }

  // Merge articles from different devices
  private mergeArticles(localArticles: Article[], peerArticles: Article[]): Article[] {
    const merged = new Map<string, Article>();
    
    // Add local articles
    localArticles.forEach(article => {
      merged.set(article.id, article);
    });
    
    // Add/update peer articles
    peerArticles.forEach(article => {
      const existing = merged.get(article.id);
      if (!existing || (article.lastRead && (!existing.lastRead || existing.lastRead < article.lastRead))) {
        merged.set(article.id, article);
      }
    });
    return Array.from(merged.values());
  }

  // Merge preferences from different devices
  private mergePreferences(localPrefs: UserPreferences, peerPrefs: UserPreferences): UserPreferences {
    // Take the most recent preferences
    if (localPrefs.lastSync > peerPrefs.lastSync) {
      return localPrefs;
    } else {
      return peerPrefs;
    }
  }

  // Generate a simple signature for data integrity
  private generateSignature(data: any): string {
    const dataString = JSON.stringify(data);
    // In a real implementation, this would use proper cryptographic signing
    return btoa(dataString).slice(0, 16);
  }

  // Load feeds from storage (placeholder)
  private loadFeedsFromStorage(): FeedData[] {
    try {
      const feeds = localStorage.getItem("feeds");
      return feeds ? JSON.parse(feeds) : [];
    } catch {
      return [];
    }
  }

  // Save feeds to storage (placeholder)
  private saveFeedsToStorage(feeds: FeedData[]): void {
    try {
      localStorage.setItem("feeds", JSON.stringify(feeds));
    } catch (error) {
      console.error("Error saving feeds:", error);
    }
  }

  // Load articles from storage (placeholder)
  private loadArticlesFromStorage(): Article[] {
    try {
      const articles = localStorage.getItem("articles");
      return articles ? JSON.parse(articles) : [];
    } catch {
      return [];
    }
  }

  // Save articles to storage (placeholder)
  private saveArticlesToStorage(articles: Article[]): void {
    try {
      localStorage.setItem("articles", JSON.stringify(articles));
    } catch (error) {
      console.error("Error saving articles:", error);
    }
  }

  // Load user preferences (placeholder)
  private loadUserPreferences(): UserPreferences {
    try {
      const prefs = localStorage.getItem("userPreferences");
      const defaultPrefs: UserPreferences = {
        id: crypto.randomUUID(),
        vibesFilter: {
          enabled: false,
          minVibes: 0,
          maxToxicity: 1,
          hideClickbait: false,
          hideRagebait: false
        },
        categories: [],
        syncEnabled: false,
        language: 'en',
        syncDeviceId: '',
        lastSync: 0,
        autoMarkAsReadOnScroll: true // Default to enabled
      };
      return prefs ? JSON.parse(prefs) : defaultPrefs;
    } catch {
      return {
        id: crypto.randomUUID(),
        vibesFilter: {
          enabled: false,
          minVibes: 0,
          maxToxicity: 1,
          hideClickbait: false,
          hideRagebait: false
        },
        categories: [],
        syncEnabled: false,
        syncDeviceId: this.deviceId,
        lastSync: 0,
        language: 'en',
        autoMarkAsReadOnScroll: true // Default to enabled
      };
    }
  }

  // Save user preferences (placeholder)
  private saveUserPreferences(prefs: UserPreferences): void {
    try {
      localStorage.setItem("userPreferences", JSON.stringify(prefs));
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  }

  // Get sync status
  getSyncStatus() {
    return {
      enabled: this.syncEnabled,
      peers: this.peers.size,
      lastSync: this.lastSync,
      version: this.syncVersion
    };
  }

  // Cleanup
  destroy() {
    this.disableSync();
    this.peers.clear();
  }
}

// Export singleton instance
export const p2pSyncService = new P2PSyncService(
  typeof window !== 'undefined' 
    ? localStorage.getItem('deviceId') || `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    : 'server-device'
);

// Initialize device ID if not exists
if (typeof window !== 'undefined') {
  if (!localStorage.getItem('deviceId')) {
    const deviceId = `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('deviceId', deviceId);
  }
}

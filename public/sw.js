// Service Worker for InfRSS with Background Sync

const CACHE_NAME = 'infrss-v1';
const STATIC_CACHE = 'infrss-static-v1';
const DYNAMIC_CACHE = 'infrss-dynamic-v1';

// Files to cache for offline use
const STATIC_FILES = [
  '/',
  '/manage',
  '/manifest.webmanifest',
  '/styles/scroll-fix.css',
  '/workers/transformer-worker.js'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Static files cached successfully');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Background sync for RSS feeds
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-feed-sync') {
    event.waitUntil(backgroundSyncFeeds());
  }
});

// Background sync for article analysis
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-article-analysis') {
    event.waitUntil(backgroundAnalyzeArticles());
  }
});

// Background sync RSS feeds
async function backgroundSyncFeeds() {
  try {
    console.log('Background sync: Fetching RSS feeds');
    
    // Get feeds from IndexedDB or localStorage
    const feeds = await getFeedsFromStorage();
    
    if (feeds.length === 0) {
      console.log('No feeds to sync');
      return;
    }

    // Fetch feeds in background
    const syncPromises = feeds.map(async (feed) => {
      try {
        const response = await fetch(`/api/proxy?url=${encodeURIComponent(feed.url)}`);
        if (response.ok) {
          const data = await response.text();
          // Store the feed data for offline use
          await storeFeedData(feed.url, data);
          console.log(`Background sync: Successfully synced ${feed.title}`);
        }
      } catch (error) {
        console.error(`Background sync: Failed to sync ${feed.title}:`, error);
      }
    });

    await Promise.allSettled(syncPromises);
    console.log('Background sync: RSS feeds sync completed');
  } catch (error) {
    console.error('Background sync: RSS feeds sync failed:', error);
  }
}

// Background analyze articles
async function backgroundAnalyzeArticles() {
  try {
    console.log('Background sync: Analyzing articles');
    
    // Get unanalyzed articles from storage
    const articles = await getUnanalyzedArticles();
    
    if (articles.length === 0) {
      console.log('No articles to analyze');
      return;
    }

    // Analyze articles in background using transformer worker
    for (const article of articles.slice(0, 10)) { // Limit to 10 articles per sync
      try {
        await analyzeArticleInBackground(article);
        console.log(`Background sync: Analyzed article: ${article.title}`);
      } catch (error) {
        console.error(`Background sync: Failed to analyze article: ${article.title}:`, error);
      }
    }

    console.log('Background sync: Article analysis completed');
  } catch (error) {
    console.error('Background sync: Article analysis failed:', error);
  }
}

// Store feed data for offline use
async function storeFeedData(feedUrl: string, data: string) {
  try {
    if ('indexedDB' in self) {
      const db = await openIndexedDB();
      const transaction = db.transaction(['feedData'], 'readwrite');
      const store = transaction.objectStore('feedData');
      
      await store.put({
        url: feedUrl,
        data: data,
        timestamp: Date.now()
      });
    } else {
      // Fallback to localStorage
      const key = `feed_${btoa(feedUrl)}`;
      localStorage.setItem(key, data);
      localStorage.setItem(`${key}_timestamp`, Date.now().toString());
    }
  } catch (error) {
    console.error('Failed to store feed data:', error);
  }
}

// Get feeds from storage
async function getFeedsFromStorage() {
  try {
    if ('indexedDB' in self) {
      const db = await openIndexedDB();
      const transaction = db.transaction(['feeds'], 'readonly');
      const store = transaction.objectStore('feeds');
      const feeds = await store.getAll();
      return feeds;
    } else {
      // Fallback to localStorage
      const feedsJson = localStorage.getItem('feeds');
      return feedsJson ? JSON.parse(feedsJson) : [];
    }
  } catch (error) {
    console.error('Failed to get feeds from storage:', error);
    return [];
  }
}

// Get unanalyzed articles
async function getUnanalyzedArticles() {
  try {
    if ('indexedDB' in self) {
      const db = await openIndexedDB();
      const transaction = db.transaction(['articles'], 'readonly');
      const store = transaction.objectStore('articles');
      const articles = await store.getAll();
      return articles.filter(article => !article.sentiment);
    } else {
      // Fallback to localStorage
      const articlesJson = localStorage.getItem('articles');
      const articles = articlesJson ? JSON.parse(articlesJson) : [];
      return articles.filter(article => !article.sentiment);
    }
  } catch (error) {
    console.error('Failed to get articles from storage:', error);
    return [];
  }
}

// Analyze article in background
async function analyzeArticleInBackground(article: any) {
  try {
    // Use transformer worker to analyze article
    const worker = new Worker('/workers/transformer-worker.js');
    
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Analysis timeout'));
      }, 30000);

      worker.onmessage = (event) => {
        clearTimeout(timeout);
        if (event.data.type === 'article_analysis') {
          // Store analysis results
          storeArticleAnalysis(article.id, event.data.data);
          resolve(event.data.data);
        } else if (event.data.type === 'error') {
          reject(new Error(event.data.error));
        }
      };

      worker.onerror = (error) => {
        clearTimeout(timeout);
        reject(error);
      };

      worker.postMessage({
        type: 'analyze_article',
        data: { title: article.title, content: article.content }
      });
    });
  } catch (error) {
    console.error('Failed to analyze article in background:', error);
    throw error;
  }
}

// Store article analysis results
async function storeArticleAnalysis(articleId: string, analysis: any) {
  try {
    if ('indexedDB' in self) {
      const db = await openIndexedDB();
      const transaction = db.transaction(['articles'], 'readwrite');
      const store = transaction.objectStore('articles');
      
      const article = await store.get(articleId);
      if (article) {
        article.sentiment = analysis.sentiment;
        article.summary = analysis.summary;
        await store.put(article);
      }
    } else {
      // Fallback to localStorage
      const articlesJson = localStorage.getItem('articles');
      const articles = articlesJson ? JSON.parse(articlesJson) : [];
      const articleIndex = articles.findIndex((a: any) => a.id === articleId);
      
      if (articleIndex >= 0) {
        articles[articleIndex].sentiment = analysis.sentiment;
        articles[articleIndex].summary = analysis.summary;
        localStorage.setItem('articles', JSON.stringify(articles));
      }
    }
  } catch (error) {
    console.error('Failed to store article analysis:', error);
  }
}

// Open IndexedDB
async function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('InfRSS', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object stores
      if (!db.objectStoreNames.contains('feeds')) {
        db.createObjectStore('feeds', { keyPath: 'url' });
      }
      
      if (!db.objectStoreNames.contains('articles')) {
        db.createObjectStore('articles', { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains('feedData')) {
        db.createObjectStore('feedData', { keyPath: 'url' });
      }
    };
  });
}

// Fetch event - network first with cache fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleAPIRequest(request));
    return;
  }

  // Handle static files
  if (STATIC_FILES.includes(url.pathname)) {
    event.respondWith(handleStaticRequest(request));
    return;
  }

  // Handle RSS feed requests
  if (url.pathname.startsWith('/api/proxy') && url.searchParams.get('url')) {
    event.respondWith(handleRSSRequest(request));
    return;
  }

  // Default: network first with cache fallback
  event.respondWith(handleDefaultRequest(request));
});

// Handle API requests
async function handleAPIRequest(request: Request) {
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    console.error('API request failed:', error);
    return new Response('Network error', { status: 503 });
  }
}

// Handle static file requests
async function handleStaticRequest(request: Request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fallback to network
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Static request failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Handle RSS feed requests
async function handleRSSRequest(request: Request) {
  try {
    // Try network first
    const response = await fetch(request);
    if (response.ok) {
      // Cache the response
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
      return response;
    }
  } catch (error) {
    console.log('RSS request failed, trying cache:', error);
  }

  // Fallback to cache
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
  } catch (error) {
    console.error('Cache fallback failed:', error);
  }

  return new Response('Offline', { status: 503 });
}

// Handle default requests
async function handleDefaultRequest(request: Request) {
  try {
    // Try network first
    const response = await fetch(request);
    if (response.ok) {
      // Cache the response
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
      return response;
    }
  } catch (error) {
    console.log('Request failed, trying cache:', error);
  }

  // Fallback to cache
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
  } catch (error) {
    console.error('Cache fallback failed:', error);
  }

  return new Response('Offline', { status: 503 });
}

// Message event - handle communication with main thread
self.addEventListener('message', (event) => {
  const { type, data } = event.data;

  switch (type) {
    case 'REGISTER_BACKGROUND_SYNC':
      registerBackgroundSync(data);
      break;
    case 'GET_SYNC_STATUS':
      getSyncStatus(event);
      break;
    default:
      console.log('Unknown message type:', type);
  }
});

// Register background sync
async function registerBackgroundSync(syncData: any) {
  try {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      const registration = await navigator.serviceWorker.ready;
      
      // Register background sync for RSS feeds
      await registration.sync.register('background-feed-sync');
      
      // Register background sync for article analysis
      await registration.sync.register('background-article-analysis');
      
      console.log('Background sync registered successfully');
    } else {
      console.log('Background sync not supported');
    }
  } catch (error) {
    console.error('Failed to register background sync:', error);
  }
}

// Get sync status
function getSyncStatus(event: ExtendableMessageEvent) {
  const syncStatus = {
    backgroundSyncSupported: 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype,
    serviceWorkerActive: true,
    cacheAvailable: 'caches' in self,
    indexedDBSupported: 'indexedDB' in self
  };

  event.ports[0].postMessage(syncStatus);
}

console.log('InfRSS Service Worker loaded with background sync support');

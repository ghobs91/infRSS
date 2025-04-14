// lib/rssUtils.ts

interface FeedData {
  title: string;
  url: string;
}

interface Article {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  sourceDomain: string;
}

interface ArticleItem {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  content?: string;
}

// Helper function to fetch with timeout
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 10000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeout}ms`);
    }
    throw error;
  }
}

// Batch process promises with concurrency limit
async function batchProcess<T, R>(
  items: T[],
  processItem: (item: T) => Promise<R>,
  concurrency = 3
): Promise<R[]> {
  const results: R[] = [];
  const inProgress = new Set<Promise<void>>();

  for (const item of items) {
    if (inProgress.size >= concurrency) {
      await Promise.race(inProgress);
    }

    const processPromise = Promise.resolve().then(async () => {
      try {
        results.push(await processItem(item));
      } finally {
        inProgress.delete(processPromise);
      }
    });

    inProgress.add(processPromise);
  }

  await Promise.all(inProgress);
  return results;
}

export async function getFeedUrlFromHtml(siteUrl: string): Promise<string | null> {
  try {
    const res = await fetchWithCors(siteUrl);
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const linkEl = doc.querySelector('link[type="application/rss+xml"], link[rel="alternate"][type="application/rss+xml"]');
    if (linkEl && linkEl.getAttribute("href")) {
      const href = linkEl.getAttribute("href")!;
      const url = new URL(href, siteUrl);
      return url.toString();
    }
    return null;
  } catch (err) {
    console.error("Failed to resolve feed URL:", err);
    return null;
  }
}

// Function to extract thumbnail from various sources
async function extractThumbnail(content: string, url: string): Promise<string | undefined> {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    // Try to find the first image in the content
    const firstImage = doc.querySelector('img');
    if (!firstImage) return undefined;

    const imageUrl = firstImage.getAttribute('src');
    if (!imageUrl) return undefined;

    // Convert relative URLs to absolute
    const absoluteUrl = new URL(imageUrl, new URL(url).origin).toString();
    
    // Return the proxied URL
    return `/api/proxy?url=${encodeURIComponent(absoluteUrl)}`;
  } catch (error) {
    console.warn('Error extracting thumbnail:', error);
    return undefined;
  }
}

export async function fetchAndParseRSS(url: string): Promise<{ title: string; items: any[] } | null> {
  try {
    // Use our API endpoint to fetch the RSS feed
    const response = await fetchWithTimeout('/api/fetch-rss', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data: text } = await response.json();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");

    // Check if it's a valid RSS feed
    const rssElement = xmlDoc.querySelector("rss, feed");
    if (!rssElement) {
      return null;
    }

    const channel = xmlDoc.querySelector("channel, feed");
    if (!channel) {
      return null;
    }

    const title = channel.querySelector("title")?.textContent || "";
    const items = Array.from(xmlDoc.querySelectorAll("item, entry")).map((item): ArticleItem => {
      const itemTitle = item.querySelector("title")?.textContent || "";
      const itemLink = item.querySelector("link")?.textContent || item.querySelector("link")?.getAttribute("href") || "";
      const itemPubDate = item.querySelector("pubDate, published")?.textContent || "";
      const content = item.querySelector("content\\:encoded, content, description")?.textContent || "";
      
      // Try to get enclosure image first
      let thumbnail: string | undefined = undefined;
      const enclosureUrl = item.querySelector("enclosure[type^='image']")?.getAttribute("url");
      if (enclosureUrl) {
        thumbnail = `/api/proxy?url=${encodeURIComponent(enclosureUrl)}`;
      }
      
      // If no enclosure image, try media:content
      if (!thumbnail) {
        const mediaContent = item.querySelector("media\\:content[type^='image'], media\\:thumbnail");
        const mediaUrl = mediaContent?.getAttribute("url");
        if (mediaUrl) {
          thumbnail = `/api/proxy?url=${encodeURIComponent(mediaUrl)}`;
        }
      }

      return {
        title: itemTitle,
        link: itemLink,
        pubDate: itemPubDate,
        thumbnail,
        content,
      };
    });

    // Process thumbnails in batches
    const processedItems = await batchProcess(items, async (item) => {
      const result = { ...item };
      
      if (!result.thumbnail && result.link) {
        try {
          const pageResponse = await fetchWithTimeout('/api/fetch-rss', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: result.link }),
          }, 10000); // Increased timeout to 10 seconds for article pages

          if (pageResponse.ok) {
            const { data: html } = await pageResponse.json();
            
            // Try to get Open Graph image
            const ogMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i) ||
                          html.match(/<meta[^>]*content="([^"]*)"[^>]*property="og:image"[^>]*>/i);
            if (ogMatch && ogMatch[1]) {
              result.thumbnail = ogMatch[1];
              return result;
            }

            // Try to get Twitter image if no OG image
            const twitterMatch = html.match(/<meta[^>]*name="twitter:image"[^>]*content="([^"]*)"[^>]*>/i) ||
                               html.match(/<meta[^>]*content="([^"]*)"[^>]*name="twitter:image"[^>]*>/i);
            if (twitterMatch && twitterMatch[1]) {
              result.thumbnail = twitterMatch[1];
              return result;
            }

            // If still no thumbnail, try to find first image in content
            if (result.content) {
              const imgMatch = result.content.match(/<img[^>]*src="([^"]*)"[^>]*>/i);
              if (imgMatch && imgMatch[1]) {
                result.thumbnail = imgMatch[1];
              }
            }
          }
        } catch (error) {
          console.error("Error fetching article page:", error);
        }
      }
      
      const { content: _, ...cleanResult } = result;
      return cleanResult;
    }, 3); // Process 3 items concurrently

    return {
      title,
      items: processedItems,
    };
  } catch (error) {
    console.error("Error fetching RSS:", error);
    return null;
  }
}

export const fetchWithCors = async (url: string): Promise<Response> => {
  return fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
};

export function saveFeedToStorage(feed: FeedData) {
  const stored = localStorage.getItem("feeds");
  const current: FeedData[] = stored ? JSON.parse(stored) : [];
  if (!current.find((f) => f.url === feed.url)) {
    const updated = [...current, feed];
    localStorage.setItem("feeds", JSON.stringify(updated));
  }
}

export function loadFeedsFromStorage(): FeedData[] {
  const stored = localStorage.getItem("feeds");
  return stored ? JSON.parse(stored) : [];
}

export function removeFeedFromStorage(url: string) {
  const stored = localStorage.getItem("feeds");
  const current: FeedData[] = stored ? JSON.parse(stored) : [];
  const updated = current.filter((feed) => feed.url !== url);
  localStorage.setItem("feeds", JSON.stringify(updated));
}

export type { FeedData, Article };

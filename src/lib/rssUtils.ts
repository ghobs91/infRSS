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
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 15000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...options.headers,
        'User-Agent': 'Mozilla/5.0 (compatible; InfrssBot/1.0; +https://infrss.vercel.app)'
      }
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(`Request timed out after ${timeout}ms for URL: ${url}`);
      }
      throw new Error(`Failed to fetch ${url}: ${error.message}`);
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

export async function fetchAndParseRSS(url: string, fetchThumbnails = false): Promise<{ title: string; items: any[] } | null> {
  try {
    // Use our proxy endpoint to fetch the RSS feed
    const response = await fetchWithTimeout('/api/proxy', {
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
        content: fetchThumbnails ? content : undefined,
      };
    });

    // Only process thumbnails if requested
    if (fetchThumbnails) {
      const processedItems = await batchProcess(items, async (item) => {
        const result = { ...item };
        
        if (result.thumbnail) {
          const { content, ...cleanResult } = result;
          return cleanResult;
        }

        if (result.link) {
          try {
            const pageResponse = await fetchWithTimeout('/api/proxy', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ url: result.link }),
            }, 10000);

            if (pageResponse.ok) {
              const { data: html } = await pageResponse.json();
              result.thumbnail = await extractThumbnailFromHtml(html, result.link);
            }
          } catch (error) {
            if (!(error instanceof Error && error.message.includes('timed out'))) {
              console.error("Error fetching article page:", error);
            }
          }
        }
        
        const { content, ...cleanResult } = result;
        return cleanResult;
      }, 5);

      return {
        title,
        items: processedItems,
      };
    }

    // Return items without processing thumbnails
    return {
      title,
      items: items.map(({ content, ...item }) => ({
        ...item,
        sourceDomain: new URL(url).hostname
      })),
    };
  } catch (error) {
    console.error("Error fetching RSS:", error);
    return null;
  }
}

// Helper function to extract thumbnail from HTML
async function extractThumbnailFromHtml(html: string, articleUrl: string): Promise<string | undefined> {
  // Try to get Open Graph image first (most reliable)
  const ogMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i) ||
                  html.match(/<meta[^>]*content="([^"]*)"[^>]*property="og:image"[^>]*>/i);
  if (ogMatch && ogMatch[1]) {
    return `/api/proxy?url=${encodeURIComponent(ogMatch[1])}`;
  }

  // Try to get Twitter image as fallback
  const twitterMatch = html.match(/<meta[^>]*name="twitter:image"[^>]*content="([^"]*)"[^>]*>/i) ||
                      html.match(/<meta[^>]*content="([^"]*)"[^>]*name="twitter:image"[^>]*>/i);
  if (twitterMatch && twitterMatch[1]) {
    return `/api/proxy?url=${encodeURIComponent(twitterMatch[1])}`;
  }

  // Try to find first image in content
  const imgMatch = html.match(/<img[^>]*src="([^"]*)"[^>]*>/i);
  if (imgMatch && imgMatch[1]) {
    return `/api/proxy?url=${encodeURIComponent(imgMatch[1])}`;
  }

  return undefined;
}

// Function to lazily load thumbnails for articles
export async function loadArticleThumbnails(articles: Article[]): Promise<Article[]> {
  return batchProcess(
    articles.filter(article => !article.thumbnail),
    async (article) => {
      try {
        const pageResponse = await fetchWithTimeout('/api/proxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: article.link }),
        }, 10000);

        if (pageResponse.ok) {
          const { data: html } = await pageResponse.json();
          const thumbnail = await extractThumbnailFromHtml(html, article.link);
          return { ...article, thumbnail };
        }
      } catch (error) {
        if (!(error instanceof Error && error.message.includes('timed out'))) {
          console.error("Error fetching article thumbnail:", error);
        }
      }
      return article;
    },
    5
  );
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
  const updated = current.filter((f) => f.url !== url);
  localStorage.setItem("feeds", JSON.stringify(updated));
}

export async function parseOPMLFile(file: File): Promise<FeedData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        
        // Check if it's a valid OPML file
        const opmlElement = xmlDoc.querySelector("opml");
        if (!opmlElement) {
          throw new Error("Invalid OPML file");
        }

        // Get all outline elements that have an xmlUrl attribute (these are the feed entries)
        const outlines = Array.from(xmlDoc.querySelectorAll("outline[xmlUrl]"));
        const feeds: FeedData[] = outlines.map((outline) => ({
          title: outline.getAttribute("title") || outline.getAttribute("text") || "",
          url: outline.getAttribute("xmlUrl") || "",
        })).filter(feed => feed.url !== ""); // Filter out any entries without URLs

        resolve(feeds);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}

export type { FeedData, Article };

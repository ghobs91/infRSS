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
async function extractThumbnail(link: string, content?: string): Promise<string | undefined> {
  try {
    // Try to fetch the HTML of the article page
    const response = await fetch(link);
    const html = await response.text();

    // Try to get Open Graph image
    const ogMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i) ||
                   html.match(/<meta[^>]*content="([^"]*)"[^>]*property="og:image"[^>]*>/i);
    if (ogMatch && ogMatch[1]) {
      return ogMatch[1];
    }

    // Try to get Twitter image
    const twitterMatch = html.match(/<meta[^>]*name="twitter:image"[^>]*content="([^"]*)"[^>]*>/i) ||
                        html.match(/<meta[^>]*content="([^"]*)"[^>]*name="twitter:image"[^>]*>/i);
    if (twitterMatch && twitterMatch[1]) {
      return twitterMatch[1];
    }

    // If we have content, try to find the first image
    if (content) {
      const imgMatch = content.match(/<img[^>]*src="([^"]*)"[^>]*>/i);
      if (imgMatch && imgMatch[1]) {
        return imgMatch[1];
      }
    }

    return undefined;
  } catch (error) {
    console.error("Error extracting thumbnail:", error);
    return undefined;
  }
}

export async function fetchAndParseRSS(url: string): Promise<{ title: string; items: any[] } | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
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
    const items = Array.from(xmlDoc.querySelectorAll("item, entry")).map(async (item) => {
      const itemTitle = item.querySelector("title")?.textContent || "";
      const itemLink = item.querySelector("link")?.textContent || item.querySelector("link")?.getAttribute("href") || "";
      const itemPubDate = item.querySelector("pubDate, published")?.textContent || "";
      const content = item.querySelector("content\\:encoded, content, description")?.textContent || "";
      
      // Try to get enclosure image first
      let thumbnail = item.querySelector("enclosure[type^='image']")?.getAttribute("url");
      
      // If no enclosure image, try media:content
      if (!thumbnail) {
        const mediaContent = item.querySelector("media\\:content[type^='image'], media\\:thumbnail");
        thumbnail = mediaContent?.getAttribute("url");
      }

      // If still no thumbnail, try to extract from the article
      if (!thumbnail && itemLink) {
        thumbnail = await extractThumbnail(itemLink, content);
      }

      return {
        title: itemTitle,
        link: itemLink,
        pubDate: itemPubDate,
        thumbnail: thumbnail,
      };
    });

    return {
      title,
      items: await Promise.all(items),
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
        const feeds = outlines.map((outline) => ({
          title: outline.getAttribute("title") || outline.getAttribute("text") || "",
          url: outline.getAttribute("xmlUrl") || ""
        })).filter((feed) => feed.url !== ""); // Filter out any entries without URLs
        
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
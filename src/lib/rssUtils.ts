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

export async function fetchAndParseRSS(feedUrl: string): Promise<{ title: string; items: Article[] } | null> {
  try {
    const res = await fetchWithCors(feedUrl);
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "application/xml");

    const title = doc.querySelector("channel > title")?.textContent || "Untitled Feed";
    const items: Article[] = [];

    doc.querySelectorAll("item").forEach((item) => {
      const title = item.querySelector("title")?.textContent || "(No title)";
      const link = item.querySelector("link")?.textContent || "";
      const pubDate = item.querySelector("pubDate")?.textContent || "";
      const media = item.querySelector("media\\:content, enclosure");
      const thumbnail = media?.getAttribute("url") || undefined;
      const sourceDomain = link ? new URL(link).hostname.replace("www.", "") : "";

      items.push({ title, link, pubDate, thumbnail, sourceDomain });
    });

    return { title, items };
  } catch (err) {
    console.error("Failed to fetch or parse RSS:", err);
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

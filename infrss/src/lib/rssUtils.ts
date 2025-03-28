// lib/rssUtils.ts

// 🔁 Use a public CORS proxy for cross-origin RSS/HTML fetches
export const fetchWithCors = async (url: string): Promise<Response> => {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    return fetch(proxyUrl);
};

export async function getFeedUrlFromHtml(siteUrl: string): Promise<string | null> {
    try {
      const res = await fetchWithCors(siteUrl);
      const html = await res.text();
  
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
  
      const linkEl = doc.querySelector('link[type="application/rss+xml"], link[type="application/atom+xml"]');
      if (linkEl && linkEl.getAttribute("href")) {
        const href = linkEl.getAttribute("href")!;
        const resolved = new URL(href, siteUrl);
        return resolved.toString();
      }
  
      return null;
    } catch (err) {
      console.error("Failed to resolve feed URL:", err);
      return null;
    }
  }
  

export async function fetchAndParseRSS(feedUrl: string): Promise<{ title: string; items: { title: string; link: string; pubDate: string }[] } | null> {
  try {
    const res = await fetchWithCors(feedUrl);
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "application/xml");

    const title = doc.querySelector("channel > title")?.textContent || "Untitled Feed";
    const items: { title: string; link: string; pubDate: string }[] = [];

    doc.querySelectorAll("item").forEach((item) => {
      const title = item.querySelector("title")?.textContent || "(No title)";
      const link = item.querySelector("link")?.textContent || "";
      const pubDate = item.querySelector("pubDate")?.textContent || "";
      items.push({ title, link, pubDate });
    });

    return { title, items };
  } catch (err) {
    console.error("Failed to fetch or parse RSS:", err);
    return null;
  }
}

// Persistence
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
  

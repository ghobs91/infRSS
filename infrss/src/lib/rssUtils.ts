// lib/rssUtils.ts
export async function getFeedUrlFromHtml(siteUrl: string): Promise<string | null> {
    try {
      const res = await fetch(siteUrl);
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
    const res = await fetch(feedUrl);
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

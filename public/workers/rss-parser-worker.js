(() => {
  // workers/rss-parser-worker.ts
  function parseRSSDate(dateString) {
    if (!dateString || typeof dateString !== "string") {
      return null;
    }
    const trimmed = dateString.trim();
    if (!trimmed) {
      return null;
    }
    try {
      const directParse = new Date(trimmed);
      if (!isNaN(directParse.getTime())) {
        return directParse.toISOString();
      }
      const rfc2822Pattern = /^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s+\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{2,4}\s+\d{1,2}:\d{2}(?::\d{2})?(?:\s+(?:[+-]\d{4}|[A-Z]{3,4}))?/i;
      if (rfc2822Pattern.test(trimmed)) {
        const parsed = new Date(trimmed);
        if (!isNaN(parsed.getTime())) {
          return parsed.toISOString();
        }
      }
      const iso8601Pattern = /^\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:?\d{2})?$/;
      if (iso8601Pattern.test(trimmed)) {
        const parsed = new Date(trimmed);
        if (!isNaN(parsed.getTime())) {
          return parsed.toISOString();
        }
      }
      const timestampPattern = /^\d{10,13}$/;
      if (timestampPattern.test(trimmed)) {
        const timestamp = parseInt(trimmed, 10);
        const ms = timestamp < 1e10 ? timestamp * 1e3 : timestamp;
        const parsed = new Date(ms);
        if (!isNaN(parsed.getTime())) {
          return parsed.toISOString();
        }
      }
      const tzNamePattern = /^(.+)\s+([A-Z]{2,4})$/;
      const tzMatch = trimmed.match(tzNamePattern);
      if (tzMatch) {
        const parsed = new Date(tzMatch[1]);
        if (!isNaN(parsed.getTime())) {
          return parsed.toISOString();
        }
      }
      const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;
      if (dateOnlyPattern.test(trimmed)) {
        const parsed = /* @__PURE__ */ new Date(trimmed + "T00:00:00Z");
        if (!isNaN(parsed.getTime())) {
          return parsed.toISOString();
        }
      }
      const slashDatePattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
      const slashMatch = trimmed.match(slashDatePattern);
      if (slashMatch) {
        let parsed = /* @__PURE__ */ new Date(`${slashMatch[3]}-${slashMatch[1].padStart(2, "0")}-${slashMatch[2].padStart(2, "0")}T00:00:00Z`);
        if (!isNaN(parsed.getTime())) {
          return parsed.toISOString();
        }
        parsed = /* @__PURE__ */ new Date(`${slashMatch[3]}-${slashMatch[2].padStart(2, "0")}-${slashMatch[1].padStart(2, "0")}T00:00:00Z`);
        if (!isNaN(parsed.getTime())) {
          return parsed.toISOString();
        }
      }
      console.warn(`Could not parse date string: "${trimmed}", date unavailable`);
      return null;
    } catch (error) {
      console.error(`Error parsing date "${trimmed}":`, error);
      return null;
    }
  }
  function extractItems(xml) {
    const items = [];
    const itemRegex = /<item[^>]*?>([\s\S]*?)<\/item>/gi;
    const entryRegex = /<entry[^>]*?>([\s\S]*?)<\/entry>/gi;
    let match;
    while ((match = itemRegex.exec(xml)) !== null) {
      items.push(match[1]);
    }
    if (items.length === 0) {
      while ((match = entryRegex.exec(xml)) !== null) {
        items.push(match[1]);
      }
    }
    return items;
  }
  function extractThumbnailFromXML(itemXml) {
    let match = itemXml.match(/<enclosure[^>]+type=["']image[^>]+url=["']([^"']+)["']/i);
    if (match) return match[1];
    match = itemXml.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]+type=["']image/i);
    if (match) return match[1];
    match = itemXml.match(/<media:content[^>]+url=["']([^"']+)["']/i);
    if (match) return match[1];
    match = itemXml.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i);
    if (match) return match[1];
    const descMatch = itemXml.match(/<description[^>]*?><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i) || itemXml.match(/<description[^>]*?>([\s\S]*?)<\/description>/i);
    if (descMatch) {
      const imgMatch = descMatch[1].match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch) return imgMatch[1];
    }
    return void 0;
  }
  function cleanText(text) {
    if (!text) return "";
    text = text.replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "");
    text = text.replace(/<[^>]*>/g, "");
    text = text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code))).replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
    text = text.replace(/\s+/g, " ").trim();
    return text;
  }
  function parseRSSFeed(xmlText, feedUrl) {
    try {
      const text = xmlText;
      const titleMatch = text.match(/<(?:channel|feed)>[\s\S]*?<title[^>]*?>([\s\S]*?)<\/title>/i);
      let channelTitle = "Unknown Feed";
      if (titleMatch) {
        channelTitle = cleanText(titleMatch[1]);
      }
      if (!channelTitle || channelTitle === "Unknown Feed") {
        try {
          channelTitle = new URL(feedUrl).hostname.replace("www.", "");
        } catch {
        }
      }
      const itemsXml = extractItems(text);
      if (itemsXml.length === 0) {
        console.error(`\u274C Worker found no items/entries in feed: ${feedUrl}`);
        return null;
      }
      console.log(`\u{1F527} Worker found ${itemsXml.length} items in: ${feedUrl}`);
      const parsedItems = itemsXml.map((itemXml, index) => {
        const titleMatch2 = itemXml.match(/<title[^>]*?>([\s\S]*?)<\/title>/i);
        let title = titleMatch2 ? cleanText(titleMatch2[1]) : `Untitled Article ${index + 1}`;
        if (title.length > 200) {
          title = title.substring(0, 200) + "...";
        }
        let link = "";
        const linkMatch = itemXml.match(/<link[^>]*?>([\s\S]*?)<\/link>/i);
        if (linkMatch) {
          link = cleanText(linkMatch[1]);
        } else {
          const atomLinkMatch = itemXml.match(/<link[^>]+href=["']([^"']+)["']/i);
          if (atomLinkMatch) {
            link = atomLinkMatch[1];
          } else {
            const idMatch = itemXml.match(/<id[^>]*?>([\s\S]*?)<\/id>/i);
            if (idMatch) link = cleanText(idMatch[1]);
          }
        }
        const pubDateMatch = itemXml.match(/<(?:pubDate|published|updated|dc:date|date)[^>]*?>([\s\S]*?)<\/(?:pubDate|published|updated|dc:date|date)>/i);
        const pubDateRaw = pubDateMatch ? cleanText(pubDateMatch[1]) : null;
        const pubDate = parseRSSDate(pubDateRaw) || (/* @__PURE__ */ new Date(0)).toISOString();
        let content = "";
        const contentMatch = itemXml.match(/<(?:description|content:encoded|content|summary)[^>]*?>([\s\S]*?)<\/(?:description|content:encoded|content|summary)>/i);
        if (contentMatch) {
          content = cleanText(contentMatch[1]);
          if (content.length > 1e3) {
            content = content.substring(0, 1e3) + "...";
          }
        }
        let summary = "";
        const summaryMatch = itemXml.match(/<(?:description|summary)[^>]*?>([\s\S]*?)<\/(?:description|summary)>/i);
        if (summaryMatch) {
          summary = cleanText(summaryMatch[1]);
        }
        if (!summary && content) {
          summary = content.length > 300 ? content.substring(0, 300) + "..." : content;
        } else if (summary && summary.length > 300) {
          summary = summary.substring(0, 300) + "...";
        }
        const thumbnail = extractThumbnailFromXML(itemXml);
        let sourceDomain = channelTitle || "Unknown Source";
        if (!channelTitle && link) {
          try {
            sourceDomain = new URL(link).hostname.replace("www.", "");
          } catch {
            const domainMatch = link.match(/https?:\/\/([^\/]+)/);
            if (domainMatch) {
              sourceDomain = domainMatch[1].replace("www.", "");
            }
          }
        }
        return {
          id: `${feedUrl}-${index}`,
          title,
          link,
          pubDate,
          thumbnail,
          content,
          summary,
          sourceDomain,
          readStatus: "unread",
          tags: []
        };
      });
      console.log(`\u2705 Worker successfully parsed ${parsedItems.length} items from ${feedUrl}`);
      return {
        title: channelTitle,
        items: parsedItems
      };
    } catch (error) {
      console.error("Error parsing RSS feed:", error);
      return null;
    }
  }
  self.onmessage = async (e) => {
    const { type, data } = e.data;
    try {
      switch (type) {
        case "parse_rss":
          const { xmlText, feedUrl } = data;
          const result = parseRSSFeed(xmlText, feedUrl);
          if (result) {
            postMessage({
              type: "rss_parsed",
              data: result
            });
          } else {
            postMessage({
              type: "error",
              error: "Failed to parse RSS feed"
            });
          }
          break;
        default:
          console.warn("Unknown message type:", type);
      }
    } catch (error) {
      console.error("Worker error:", error);
      postMessage({
        type: "error",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  };
})();
//# sourceMappingURL=rss-parser-worker.js.map

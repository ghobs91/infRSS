// lib/rssUtils.ts

// ... (Keep existing interfaces and other functions like getFeedUrlFromHtml, extractThumbnail, etc.)

// Import fetchWithCors if it's not already implicitly available in the scope
// (Assuming it's exported from the same file or imported correctly)

// Helper function to clean XML content before parsing
function cleanXMLContent(xmlString: string): string {
  // First, normalize line endings
  xmlString = xmlString.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Handle CDATA sections that might contain problematic sequences
  // Use [\s\S]*? to match any character including newlines non-greedily
  xmlString = xmlString.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (match, content) => {
    // Escape any ]] sequences within CDATA content by splitting the CDATA section
    const escapedContent = content.replace(/\]\]>/g, ']]]]><![CDATA[>');
    return `<![CDATA[${escapedContent}]]>`;
  });

  // Remove any invalid XML characters (Control characters except Tab, LF, CR)
  // XML 1.0: #x9 | #xA | #xD | [#x20-#xD7FF] | [#xE000-#xFFFD] | [#x10000-#x10FFFF]
  // We remove characters in the ranges #x0-#x8, #xB-#xC, #xE-#x1F, #x7F-#x84, #x86-#x9F
  xmlString = xmlString.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F]/g, '');

  return xmlString;
}

export async function fetchAndParseRSS(url: string): Promise<{ title: string; items: Article[] } | null> { // Changed items type to Article[]
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    // *** Use fetchWithCors here instead of direct fetch ***
    const response = await fetchWithCors(url);
    // Note: You might need to adjust how you handle the signal if fetchWithCors doesn't support it directly.
    // If the proxy handles timeouts, you might remove the AbortController here.
    // If the proxy *doesn't* handle timeouts, the timeout here won't abort the *proxy's* fetch,
    // only the fetch *to* the proxy. You might need timeout logic within the /api/proxy endpoint itself.
    // For now, let's assume the proxy forwards the request quickly or handles its own timeout.

    clearTimeout(timeoutId); // Keep this for the fetch *to* the proxy

    if (!response.ok) {
      // Consider logging the response body for more details on proxy errors
      const errorText = await response.text().catch(() => 'Could not read error response');
      console.error(`Proxy fetch failed for ${url}. Status: ${response.status}, Body: ${errorText}`);
      // Don't throw an error, just return null to allow the app to continue
      return null;
    }

    let text = await response.text();
    
    // Check if the response is empty
    if (!text.trim()) {
      console.error(`Empty response from ${url}`);
      return null;
    }

    // Try to parse as JSON first, in case the XML is wrapped in a JSON object
    try {
      const jsonResponse = JSON.parse(text);
      if (jsonResponse.data && typeof jsonResponse.data === 'string') {
        text = jsonResponse.data;
      }
    } catch {
      // If it's not JSON, continue with the original text
    }

    // Check if the response starts with XML declaration or a tag
    if (!text.trim().startsWith('<?xml') && !text.trim().startsWith('<')) {
      console.error(`Response from ${url} is not XML. First 100 chars: ${text.substring(0, 100)}`);
      return null;
    }

    // Add media namespace if it's missing
    if (text.includes('media:content') && !text.includes('xmlns:media')) {
      text = text.replace(
        /<rss[^>]*>/,
        match => `${match.replace('>', ' xmlns:media="http://search.yahoo.com/mrss/">')}`
      );
    }

    // Fix unclosed CDATA sections
    text = text.replace(/<!\[CDATA\[([^\]>]*?)(?!\]\]>)/g, (match, content) => {
      // If the CDATA section is not properly closed, close it
      if (!content.includes(']]>')) {
        return `<!\[CDATA\[${content}]]>`;
      }
      return match;
    });

    // Escape unescaped ampersands in content
    text = text.replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;');

    // Clean the XML content before parsing
    const cleanedXML = cleanXMLContent(text);

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(cleanedXML, "text/xml");

    // Check for XML parsing errors
    const parseError = xmlDoc.querySelector("parsererror");
    if (parseError) {
      // Try to extract any useful information from the error
      const errorText = parseError.textContent || '';
      if (errorText.includes("Start tag expected")) {
        console.error("Response might not be XML. First 100 chars:", text.substring(0, 100));
      }
      return null;
    }

    // Check if it's a valid RSS/Atom feed
    const rssElement = xmlDoc.querySelector("rss, feed");
    if (!rssElement) {
      console.warn(`Invalid RSS/Atom structure for ${url}. Missing <rss> or <feed> tag.`);
      return null;
    }

    const channel = xmlDoc.querySelector("channel, feed");
    if (!channel) {
      console.warn(`Invalid RSS/Atom structure for ${url}. Missing <channel> or <feed> tag.`);
      return null;
    }

    const title = channel.querySelector("title")?.textContent || "Untitled Feed"; // Provide a default title

    // Use Promise.allSettled to handle potential errors in individual item processing
    const itemPromises = Array.from(xmlDoc.querySelectorAll("item, entry")).map(async (item): Promise<Article | null> => {
      try {
        const itemTitle = item.querySelector("title")?.textContent || "";
        // Prioritize link[@href] for Atom feeds
        const itemLink = item.querySelector("link[href]")?.getAttribute("href") || item.querySelector("link")?.textContent || "";
        // Handle different date formats more robustly if needed
        const itemPubDateStr = item.querySelector("pubDate, published")?.textContent || "";
        const itemPubDate = itemPubDateStr ? new Date(itemPubDateStr).toISOString() : new Date().toISOString(); // Standardize date or use current if missing

        const content = item.querySelector("content\\:encoded, content, description")?.textContent || "";

        // Try to get enclosure image first
        let thumbnail = item.querySelector("enclosure[type^='image']")?.getAttribute("url");

        // If no enclosure image, try media:content or media:thumbnail
        if (!thumbnail) {
          const mediaContent = item.querySelector("media\\:content[type^='image'], media\\:thumbnail");
          thumbnail = mediaContent?.getAttribute("url");
        }

        // If still no thumbnail, try to extract from the article (consider rate limiting/delaying this)
        // This can be slow and resource-intensive if done for every item.
        // Maybe only do it if content is empty or lacks images.
        // if (!thumbnail && itemLink) {
        //   thumbnail = await extractThumbnail(itemLink, content);
        // }

        // Extract source domain from the link
        let sourceDomain = "";
        try {
          if (itemLink) {
            sourceDomain = new URL(itemLink).hostname.replace(/^www\./, ""); // More robust www removal
          } else if (url) {
             // Fallback to feed's domain if item link is missing
             sourceDomain = new URL(url).hostname.replace(/^www\./, "");
          }
        } catch (error) {
          console.warn("Error extracting source domain:", error); // Use warn for non-critical errors
        }

        // Basic validation: Ensure there's at least a title or link
        if (!itemTitle && !itemLink) {
            console.warn("Skipping item with no title or link");
            return null;
        }

        return {
          title: itemTitle,
          link: itemLink,
          pubDate: itemPubDate, // Use standardized date
          thumbnail: thumbnail || undefined, // Ensure undefined if null/empty
          content: content,
          sourceDomain: sourceDomain
        };
      } catch (itemError) {
          console.error("Error processing feed item:", itemError, item.innerHTML); // Log item content on error
          return null; // Skip this item on error
      }
    });

    // Wait for all item promises to settle and filter out nulls (errors or skipped items)
    const settledItems = await Promise.allSettled(itemPromises);
    const validItems = settledItems
        .filter(result => result.status === 'fulfilled' && result.value !== null)
        .map(result => (result as PromiseFulfilledResult<Article>).value);


    return {
      title,
      items: validItems, // Return only successfully processed items
    };
  } catch (error) {
    // Differentiate between fetch errors and parsing errors if needed
    if (error instanceof Error && error.message.includes('Abort')) {
        console.warn("RSS fetch timed out:", url);
    } else {
        console.error(`Error fetching or parsing RSS feed ${url}:`, error);
    }
    return null; // Return null on any error
  }
}

// Ensure fetchWithCors is defined in this file or imported
export const fetchWithCors = async (url: string): Promise<Response> => {
  // Make sure your proxy endpoint is correct
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
  console.log(`Fetching via proxy: ${proxyUrl}`); // Add logging
  try {
      const response = await fetch(proxyUrl);
      if (!response.ok) {
          // Log proxy errors specifically
          console.error(`Proxy request to ${proxyUrl} failed with status ${response.status}`);
      }
      return response;
  } catch (proxyError) {
      console.error(`Error fetching from proxy URL ${proxyUrl}:`, proxyError);
      throw proxyError; // Re-throw the error to be caught by fetchAndParseRSS
  }
};


// ... (Keep existing storage functions and parseOPMLFile)

export type FeedData = {
  title: string;
  url: string;
};

export type Article = {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  content: string;
  sourceDomain: string;
};

export function loadFeedsFromStorage(): FeedData[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const feedsJson = localStorage.getItem('feeds');
    if (!feedsJson) return [];
    
    const feeds = JSON.parse(feedsJson);
    return Array.isArray(feeds) ? feeds : [];
  } catch (error) {
    console.error('Error loading feeds from storage:', error);
    return [];
  }
}

export function saveFeedToStorage(feed: FeedData): void {
  if (typeof window === 'undefined') return;
  
  try {
    const feeds = loadFeedsFromStorage();
    if (!feeds.some(f => f.url === feed.url)) {
      feeds.push(feed);
      localStorage.setItem('feeds', JSON.stringify(feeds));
    }
  } catch (error) {
    console.error('Error saving feed to storage:', error);
  }
}

export async function getFeedUrlFromHtml(url: string): Promise<string | null> {
  try {
    const response = await fetchWithCors(url);
    if (!response.ok) {
      console.error(`Failed to fetch HTML from ${url}: ${response.status}`);
      return null;
    }

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Look for RSS feed links in various formats
    const feedLinks = [
      // Standard RSS/Atom links
      ...Array.from(doc.querySelectorAll('link[type="application/rss+xml"], link[type="application/atom+xml"], link[type="application/xml"], link[type="text/xml"]'))
        .map(link => link.getAttribute('href')),
      // Alternate links
      ...Array.from(doc.querySelectorAll('link[rel="alternate"][type="application/rss+xml"], link[rel="alternate"][type="application/atom+xml"]'))
        .map(link => link.getAttribute('href')),
      // Feed links
      ...Array.from(doc.querySelectorAll('a[href*="feed"], a[href*="rss"], a[href*="atom"]'))
        .map(link => link.getAttribute('href'))
    ].filter(Boolean) as string[];

    // If we found any feed links, return the first one
    if (feedLinks.length > 0) {
      const feedUrl = feedLinks[0];
      // If the URL is relative, make it absolute
      try {
        return new URL(feedUrl, url).toString();
      } catch (e) {
        console.error('Error making feed URL absolute:', e);
        return feedUrl;
      }
    }

    return null;
  } catch (error) {
    console.error('Error extracting feed URL from HTML:', error);
    return null;
  }
}

export async function parseOPMLFile(file: File): Promise<FeedData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) {
          reject(new Error('Failed to read file content'));
          return;
        }
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/xml');
        
        // Check for OPML structure
        const opmlElement = doc.querySelector('opml');
        if (!opmlElement) {
          reject(new Error('Invalid OPML file: missing <opml> tag'));
          return;
        }
        
        // Find all outline elements that have a type="rss" attribute or a url attribute
        const outlines = doc.querySelectorAll('outline[type="rss"], outline[url]');
        
        if (outlines.length === 0) {
          reject(new Error('No feed outlines found in OPML file'));
          return;
        }
        
        const feeds: FeedData[] = [];
        
        outlines.forEach(outline => {
          const title = outline.getAttribute('title') || outline.getAttribute('text') || '';
          const url = outline.getAttribute('url') || outline.getAttribute('xmlUrl') || '';
          
          // Only add if we have both a title and URL
          if (title && url) {
            feeds.push({ title, url });
          }
        });
        
        resolve(feeds);
      } catch (error) {
        console.error('Error parsing OPML file:', error);
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
}

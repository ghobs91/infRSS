"use client";

// Client-side RSS utilities that use Web Workers for parsing
import type { Article } from './types';

export interface ParsedRSSFeed {
  title: string;
  items: Article[];
}

/**
 * Fetch XML from proxy and parse using Web Worker
 * This function is designed to work on the client-side only
 */
export async function fetchAndParseRSSClient(url: string, parseRSSWorker?: (xmlText: string, feedUrl: string) => Promise<ParsedRSSFeed | null>): Promise<ParsedRSSFeed | null> {
  try {
    // Fetch XML text from proxy with a 30 second timeout
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(proxyUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      // Try to get error details from response
      try {
        const errorData = await response.json();
        
        // Log different error types at appropriate levels
        if (response.status === 404) {
          console.debug(`Feed not found: ${url}`);
        } else if (response.status === 429) {
          console.warn(`Rate limited: ${url} - ${errorData.suggestion || 'Too many requests'}`);
        } else if (response.status === 408 || response.status === 504) {
          console.warn(`Timeout: ${url} - Server took too long to respond`);
        } else if (response.status >= 500) {
          console.warn(`Server error (${response.status}): ${url} - ${errorData.error || 'Server is experiencing issues'}`);
        } else {
          console.warn(`Feed fetch failed: ${url} (HTTP ${response.status}): ${errorData.error || 'Unknown error'}`);
        }
      } catch {
        console.warn(`Feed fetch failed: ${url} (HTTP ${response.status})`);
      }
      return null;
    }

    const xmlText = await response.text();
    
    if (!xmlText.trim()) {
      return null;
    }

    // Check if response is XML
    if (!xmlText.trim().startsWith('<?xml') && !xmlText.trim().startsWith('<')) {
      return null;
    }

    // If worker parser is provided, use it
    if (parseRSSWorker) {
      try {
        const result = await parseRSSWorker(xmlText, url);
        if (result) {
          return result;
        }
      } catch {
        // Worker failed, fall back to inline parsing silently
      }
    }

    // Fallback to inline parsing (same logic as worker, but runs in main thread)
    return parseRSSInline(xmlText, url);
  } catch (error) {
    // Only log unexpected errors (not timeouts)
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn(`Feed timeout (30s): ${url}`);
      } else {
        console.error(`Unexpected error parsing feed ${url}:`, error.message);
      }
    }
    return null;
  }
}

/**
 * Inline RSS parsing fallback (runs in main thread)
 * This is a simplified version of the worker parser
 */
function parseRSSInline(xmlText: string, feedUrl: string): ParsedRSSFeed | null {
  try {
    // First check if this is actually HTML, not RSS/XML
    const trimmedText = xmlText.trim();
    const looksLikeHTML = (trimmedText.startsWith('<!DOCTYPE html') || 
                          trimmedText.startsWith('<html') || 
                          trimmedText.startsWith('<HTML')) &&
                         !trimmedText.includes('<rss') && 
                         !trimmedText.includes('<feed');
    
    if (looksLikeHTML) {
      console.warn(`Received HTML instead of RSS/XML feed from ${feedUrl}`);
      return null;
    }

    // Add missing namespaces if needed
    let text = xmlText;
    
    if (text.includes('media:') && !text.includes('xmlns:media')) {
      text = text.replace(
        /<rss([^>]*?)>/i,
        '<rss$1 xmlns:media="http://search.yahoo.com/mrss/">'
      );
    }
    
    if (text.includes('content:encoded') && !text.includes('xmlns:content')) {
      text = text.replace(
        /<rss([^>]*?)>/i,
        '<rss$1 xmlns:content="http://purl.org/rss/1.0/modules/content/">'
      );
    }
    
    if (text.includes('itunes:') && !text.includes('xmlns:itunes')) {
      text = text.replace(
        /<rss([^>]*?)>/i,
        '<rss$1 xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">'
      );
    }
    
    if (text.includes('dc:') && !text.includes('xmlns:dc')) {
      text = text.replace(
        /<rss([^>]*?)>/i,
        '<rss$1 xmlns:dc="http://purl.org/dc/elements/1.1/">'
      );
    }

    // Replace HTML entities with numeric equivalents before parsing
    text = text
      .replace(/&nbsp;/g, '&#160;')
      .replace(/&ndash;/g, '&#8211;')
      .replace(/&mdash;/g, '&#8212;')
      .replace(/&lsquo;/g, '&#8216;')
      .replace(/&rsquo;/g, '&#8217;')
      .replace(/&ldquo;/g, '&#8220;')
      .replace(/&rdquo;/g, '&#8221;')
      .replace(/&hellip;/g, '&#8230;')
      .replace(/&bull;/g, '&#8226;')
      .replace(/&middot;/g, '&#183;')
      .replace(/&euro;/g, '&#8364;')
      .replace(/&pound;/g, '&#163;')
      .replace(/&yen;/g, '&#165;')
      .replace(/&cent;/g, '&#162;')
      .replace(/&copy;/g, '&#169;')
      .replace(/&reg;/g, '&#174;')
      .replace(/&trade;/g, '&#8482;')
      .replace(/&deg;/g, '&#176;')
      .replace(/&plusmn;/g, '&#177;')
      .replace(/&para;/g, '&#182;')
      .replace(/&sect;/g, '&#167;')
      .replace(/&times;/g, '&#215;')
      .replace(/&divide;/g, '&#247;')
      // Fix self-closing tags
      .replace(/<(img|br|hr|input|meta|link)([^>]*?)(?<!\/)>/gi, '<$1$2 />')
      // Fix malformed CDATA
      .replace(/<!\[CDATA\[([^\]>]*?)(?!\]\]>)/g, (match, content) => {
        if (!content.includes(']]>')) {
          return `<![CDATA[${content}]]>`;
        }
        return match;
      })
      .replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');

    const parser = new DOMParser();
    let xmlDoc = parser.parseFromString(text, "application/xml");

    let parseError = xmlDoc.querySelector("parsererror");
    if (parseError) {
      const errorText = parseError.textContent || '';
      
      // For HTML mismatch errors, fail silently
      if (errorText.includes('Opening and ending tag mismatch') && 
          (errorText.includes('head') || errorText.includes('body') || errorText.includes('html'))) {
        return null;
      }
      
      // Try multiple parsing strategies
      let fallbackText = text;
      let success = false;
      
      // Strategy 1: Try as plain text/xml (more lenient)
      xmlDoc = parser.parseFromString(text, "text/xml");
      parseError = xmlDoc.querySelector("parsererror");
      if (!parseError) {
        success = true;
      }
      
      // Strategy 2: Handle self-closing link tags (most common issue)
      if (!success && errorText.includes('link')) {
        fallbackText = text.replace(/<link([^>]*?)\/>/gi, '<link$1></link>');
        xmlDoc = parser.parseFromString(fallbackText, "application/xml");
        parseError = xmlDoc.querySelector("parsererror");
        if (!parseError) {
          success = true;
        }
      }
      
      // Strategy 3: Try parsing as HTML (more lenient) then converting
      if (!success) {
        try {
          xmlDoc = parser.parseFromString(text, "text/html");
          // Check if we got valid RSS/Atom structure
          if (xmlDoc.querySelector("rss, feed")) {
            success = true;
            parseError = null;
          }
        } catch {
          // HTML parsing failed, continue
        }
      }
      
      // Strategy 4: Strip problematic elements
      if (!success) {
        fallbackText = text
          // Fix unclosed CDATA
          .replace(/<!\[CDATA\[([^\]]*?)(?!\]\]>)/g, (match, content) => {
            if (!content.includes(']]>')) {
              return `<![CDATA[${content}]]>`;
            }
            return match;
          })
          // Fix entity issues
          .replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');
          
        xmlDoc = parser.parseFromString(fallbackText, "text/xml");
        parseError = xmlDoc.querySelector("parsererror");
        if (!parseError) {
          success = true;
        }
      }
      
      if (!success) {
        // Only log actual failures, not parsing attempts
        console.debug(`Parse failed for ${feedUrl}: ${errorText.substring(0, 100)}`);
        return null;
      }
    }

    const channelTitle = xmlDoc.querySelector("channel > title")?.textContent || 
                        xmlDoc.querySelector("feed > title")?.textContent ||
                        new URL(feedUrl).hostname.replace("www.", "");

    let items: Element[];
    if (xmlDoc.querySelector("item")) {
      items = Array.from(xmlDoc.querySelectorAll("item"));
    } else if (xmlDoc.querySelector("entry")) {
      items = Array.from(xmlDoc.querySelectorAll("entry"));
    } else {
      return null;
    }
    
    if (items.length === 0) {
      return null;
    }

    const parsedItems: Article[] = items.map((item, index) => {
      let title = item.querySelector("title")?.textContent?.trim() || `Untitled Article ${index + 1}`;
      
      // Clean title
      title = title.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
      title = title.replace(/<[^>]*>/g, '');
      title = title.replace(/&amp;/g, '&')
                  .replace(/&lt;/g, '<')
                  .replace(/&gt;/g, '>')
                  .replace(/&quot;/g, '"')
                  .replace(/&#39;/g, "'")
                  .replace(/&nbsp;/g, ' ');
      title = title.replace(/\s+/g, ' ').trim();
      
      if (title.length > 200) {
        title = title.substring(0, 200) + '...';
      }
      
      const link = item.querySelector("link")?.textContent?.trim() || 
                  item.querySelector("link")?.getAttribute("href") ||
                  "";
      
      const pubDate = item.querySelector("pubDate")?.textContent?.trim() || 
                     item.querySelector("published")?.textContent?.trim() || 
                     new Date().toISOString();
      
      let content = item.querySelector("description")?.textContent?.trim() || 
                   item.querySelector("content")?.textContent?.trim() || 
                   "";
      
      if (content) {
        content = content.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
        content = content.replace(/<[^>]*>/g, '');
        content = content.replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
        content = content.replace(/\s+/g, ' ').trim();
        
        if (content.length > 1000) {
          content = content.substring(0, 1000) + '...';
        }
      }
      
      const summary = content.length > 300 ? content.substring(0, 300) + '...' : content;
      
      // Enhanced thumbnail extraction
      let thumbnail: string | undefined = item.querySelector("enclosure[type^='image']")?.getAttribute("url") || undefined;
      
      // Try media:content and media:thumbnail
      if (!thumbnail) {
        const mediaContent = item.querySelector("media\\:content[type^='image'], media\\:content[medium='image']") ||
                            item.querySelector("media\\:thumbnail");
        if (mediaContent) {
          thumbnail = mediaContent.getAttribute("url") || undefined;
        }
      }
      
      // Try to extract from description/content HTML
      if (!thumbnail) {
        const desc = item.querySelector("description")?.textContent || 
                    item.querySelector("content")?.textContent || "";
        if (desc) {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = desc;
          const imgTag = tempDiv.querySelector("img");
          if (imgTag) {
            thumbnail = imgTag.getAttribute("src") || 
                       imgTag.getAttribute("data-src") || undefined;
          }
        }
      }
      
      // Try iTunes image
      if (!thumbnail) {
        const itunesImage = item.querySelector("itunes\\:image");
        if (itunesImage) {
          thumbnail = itunesImage.getAttribute("href") || undefined;
        }
      }
      
      // Try Atom link rel="enclosure"
      if (!thumbnail) {
        const atomEnclosure = item.querySelector("link[rel='enclosure'][type^='image']");
        if (atomEnclosure) {
          thumbnail = atomEnclosure.getAttribute("href") || undefined;
        }
      }
      
      // Validate thumbnail URL
      if (thumbnail && !thumbnail.startsWith('http://') && !thumbnail.startsWith('https://')) {
        thumbnail = undefined;
      }
      
      let sourceDomain = "Unknown Source";
      if (link) {
        try {
          sourceDomain = new URL(link).hostname.replace("www.", "");
        } catch {
          // ignore
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
        readStatus: 'unread' as const,
        tags: []
      };
    });

    return {
      title: channelTitle,
      items: parsedItems
    };
  } catch (error) {
    console.error('Error parsing RSS inline:', error);
    return null;
  }
}

// Export fetchWithCors for compatibility
export const fetchWithCors = async (url: string): Promise<Response> => {
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
  return fetch(proxyUrl);
};

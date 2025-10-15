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
    // Fetch XML text from proxy
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      console.error(`Proxy fetch failed for ${url}. Status: ${response.status}`);
      return null;
    }

    const xmlText = await response.text();
    
    if (!xmlText.trim()) {
      console.error(`Empty response from ${url}`);
      return null;
    }

    // Check if response is XML
    if (!xmlText.trim().startsWith('<?xml') && !xmlText.trim().startsWith('<')) {
      console.error(`Response from ${url} is not XML`);
      return null;
    }

    // If worker parser is provided, use it
    if (parseRSSWorker) {
      try {
        const result = await parseRSSWorker(xmlText, url);
        if (result) {
          return result;
        }
      } catch (workerError) {
        console.warn('Worker parsing failed, falling back to inline parsing:', workerError);
      }
    }

    // Fallback to inline parsing (same logic as worker, but runs in main thread)
    return parseRSSInline(xmlText, url);
  } catch (error) {
    console.error(`Error fetching and parsing RSS from ${url}:`, error);
    return null;
  }
}

/**
 * Inline RSS parsing fallback (runs in main thread)
 * This is a simplified version of the worker parser
 */
function parseRSSInline(xmlText: string, feedUrl: string): ParsedRSSFeed | null {
  try {
    // Replace HTML entities with numeric equivalents before parsing
    const text = xmlText
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
      .replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");

    const parseError = xmlDoc.querySelector("parsererror");
    if (parseError) {
      console.error('XML parsing error:', parseError.textContent);
      return null;
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
      console.error('No items found in feed');
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
      
      const thumbnail = item.querySelector("enclosure[type^='image']")?.getAttribute("url") || undefined;
      
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

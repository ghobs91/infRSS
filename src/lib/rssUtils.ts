// lib/rssUtils.ts

import type { FeedData, Article, Category } from './types';

// ... (Keep existing interfaces and other functions like getFeedUrlFromHtml, extractThumbnail, etc.)

// Import fetchWithCors if it's not already implicitly available in the scope
// (Assuming it's exported from the same file or imported correctly)

/**
 * Helper function to clean XML content before parsing.
 * 
 * Specifically handles the malformed CDATA patterns commonly found in RSS feeds:
 * - "><![CDATA[>>" - completely malformed pattern
 * - "><![CDATA[>" - incomplete CDATA start
 * - "><![CDATA[><![CDATA[>>" - nested malformed CDATA
 * - "><![CDATA[><![CDATA[><![CDATA[>>" - triple nested malformed CDATA
 * 
 * These patterns are commonly seen in feeds from major publishers like Apple,
 * Samsung, Microsoft, and others that have incomplete XML generation.
 */
// Helper function to clean XML content before parsing
function cleanXMLContent(xmlString: string): string {
  // First, normalize line endings
  xmlString = xmlString.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Handle the specific malformed CDATA patterns we're seeing in error logs
  // Pattern: "><![CDATA[>>" - this is completely malformed
  xmlString = xmlString.replace(/><!\[CDATA\[>>/g, '>');
  
  // Pattern: "><![CDATA[>" - another malformed pattern
  xmlString = xmlString.replace(/><!\[CDATA\[>/g, '>');
  
  // Pattern: "><![CDATA[><![CDATA[>>" - nested malformed CDATA
  xmlString = xmlString.replace(/><!\[CDATA\[><!\[CDATA\[>>/g, '>');
  
  // Pattern: "><![CDATA[><![CDATA[><![CDATA[>>" - triple nested malformed CDATA
  xmlString = xmlString.replace(/><!\[CDATA\[><!\[CDATA\[><!\[CDATA\[>>/g, '>');

  // Handle CDATA sections that might contain problematic sequences
  // Use [\s\S]*? to match any character including newlines non-greedily
  xmlString = xmlString.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (match, content) => {
    // Escape any ]] sequences within CDATA content by splitting the CDATA section
    const escapedContent = content.replace(/\]\]>/g, ']]]]><![CDATA[>');
    return `<![CDATA[${escapedContent}]]>`;
  });

  // Fix malformed CDATA sections that might cause parsing errors
  xmlString = xmlString.replace(/<!\[CDATA\[([^\]>]*?)(?!\]\]>)/g, (match, content) => {
    // If the CDATA section is not properly closed, close it
    if (!content.includes(']]>')) {
      return `<!\[CDATA\[${content}]]>`;
    }
    return match;
  });

  // Handle cases where ]] sequences appear outside of CDATA sections
  // This is a common issue in RSS feeds where content contains these sequences
  // We'll use a more aggressive approach to catch all problematic sequences
  
  // First, let's handle the most common case: ]] sequences in content
  // Replace any ]] that's not part of a CDATA section with a safe alternative
  xmlString = xmlString.replace(/\]\]/g, (match, offset) => {
    // Check if this ]] is part of a CDATA section
    const before = xmlString.substring(0, offset);
    const lastCDataStart = before.lastIndexOf('<![CDATA[');
    const lastCDataEnd = before.lastIndexOf(']]>');
    
    // If we're inside a CDATA section, don't replace
    if (lastCDataStart > lastCDataEnd) {
      return match;
    }
    
    // Otherwise, escape it
    return ']]]]><![CDATA[>';
  });
  
  // Now let's also handle any remaining problematic sequences
  // Some feeds might have HTML content with these sequences
  xmlString = xmlString.replace(/\]\]>/g, (match, offset) => {
    const before = xmlString.substring(0, offset);
    const lastCDataStart = before.lastIndexOf('<![CDATA[');
    const lastCDataEnd = before.lastIndexOf(']]>');
    
    // If we're inside a CDATA section, don't replace
    if (lastCDataStart > lastCDataEnd) {
      return match;
    }
    
    // Otherwise, escape it
    return ']]]]><![CDATA[>';
  });
  
  // Additional safety: wrap any content that might contain problematic sequences
  // This is a more aggressive approach for very problematic feeds
  xmlString = xmlString.replace(/(<description>|<content>|<summary>)(.*?)(<\/description>|<\/content>|<\/summary>)/g, (match, openTag, content, closeTag) => {
    // If content contains problematic sequences, wrap it in CDATA
    if (content.includes(']]') || content.includes(']]>')) {
      return `${openTag}<![CDATA[${content}]]>${closeTag}`;
    }
    return match;
  });

  // Remove any invalid XML characters (Control characters except Tab, LF, CR)
  // XML 1.0: #x9 | #xA | #xD | [#x20-#xD7FF] | [#xE000-#xFFFD] | [#x10000-#x10FFFF]
  // We remove characters in the ranges #x0-#x8, #xB-#xC, #xE-#x1F, #x7F-#x84, #x86-#x9F
  xmlString = xmlString.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F]/g, '');

  // Final cleanup: handle any remaining problematic sequences that might cause parsing errors
  // This is a more aggressive approach for very problematic feeds
  xmlString = xmlString.replace(/\]\]/g, ']]]]><![CDATA[>');
  
  // Also handle any remaining ]] sequences that might be in HTML content
  xmlString = xmlString.replace(/\]\]>/g, ']]]]><![CDATA[>');

  return xmlString;
}

// Helper function to extract thumbnail from RSS item
function extractThumbnailFromItem(item: Element): string | undefined {
  // Try to get enclosure image first
  let thumbnail = item.querySelector("enclosure[type^='image']")?.getAttribute("url");
  
  // If no enclosure image, try media:content or media:thumbnail
  if (!thumbnail) {
    try {
      // Try different approaches for media elements
      // First, try with proper namespace handling
      const mediaContent = item.querySelector("media\\:content[type^='image']") ||
                          item.querySelector("media\\:thumbnail");
      
      if (mediaContent) {
        thumbnail = mediaContent.getAttribute("url");
      } else {
        // Fallback: search for any element with 'media' in the tag name
        const allElements = item.querySelectorAll("*");
        for (const element of allElements) {
          if (element.tagName.toLowerCase().includes('media') && 
              element.getAttribute('type')?.startsWith('image')) {
            thumbnail = element.getAttribute('url');
            break;
          }
        }
      }
    } catch (error) {
      console.warn('Error extracting thumbnail from media elements:', error);
    }
  }
  
  return thumbnail || undefined;
}

/**
 * Fetches and parses an RSS feed with robust error handling for malformed XML.
 * 
 * This function implements a multi-layered approach to handle common RSS parsing issues:
 * 1. Pre-parse detection and cleanup of malformed CDATA patterns (e.g., "><![CDATA[>>")
 * 2. Standard XML cleaning for common issues
 * 3. Aggressive cleaning fallback for persistent parsing errors
 * 4. Final fallback to strip all CDATA sections
 * 
 * The function is designed to handle the specific malformed CDATA patterns seen in
 * feeds from Apple, Samsung, Microsoft, and other major publishers that often
 * have incomplete or malformed CDATA sections.
 */
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
      
      // If it's a 404, the feed might not exist - try to discover the correct URL
      if (response.status === 404) {
        console.debug(`Feed not found at ${url}, attempting to discover correct RSS URL...`);
        try {
          const discoveredUrl = await discoverFeedUrlWithFallbacks(url);
          if (discoveredUrl && discoveredUrl !== url) {
            console.log(`✅ Discovered RSS feed at: ${discoveredUrl}`);
            return await fetchAndParseRSS(discoveredUrl);
          }
        } catch (discoverError) {
          console.warn(`Failed to discover RSS feed for ${url}:`, discoverError);
        }
      }
      
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
    
    // Check if the response is HTML instead of XML (common with 404 pages)
    if (text.trim().startsWith('<!DOCTYPE html') || text.includes('<html')) {
      console.error(`Response from ${url} is HTML instead of XML. This usually means the RSS feed doesn't exist.`);
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

    // Declare xmlDoc at function level
    let xmlDoc: Document;

    // Pre-check for the specific malformed CDATA patterns we're seeing in error logs
    if (cleanedXML.includes('><![CDATA[>>') || 
        cleanedXML.includes('><![CDATA[>') || 
        cleanedXML.includes('><![CDATA[><![CDATA[>>') ||
        cleanedXML.includes('><![CDATA[><![CDATA[><![CDATA[>>')) {
      console.debug(`Detected malformed CDATA patterns in ${url}, applying pre-parse cleanup...`);
      
      // Log the specific patterns found for debugging
      const patterns: string[] = [];
      if (cleanedXML.includes('><![CDATA[>>')) patterns.push('><![CDATA[>>');
      if (cleanedXML.includes('><![CDATA[>')) patterns.push('><![CDATA[>');
      if (cleanedXML.includes('><![CDATA[><![CDATA[>>')) patterns.push('><![CDATA[><![CDATA[>>');
      if (cleanedXML.includes('><![CDATA[><![CDATA[><![CDATA[>>')) patterns.push('><![CDATA[><![CDATA[><![CDATA[>>');
      
      console.debug(`Found malformed patterns in ${url}:`, patterns);
      
      // Apply the same cleanup patterns we use in aggressive cleaning
      let preCleaned = cleanedXML;
      preCleaned = preCleaned.replace(/><!\[CDATA\[>>/g, '>');
      preCleaned = preCleaned.replace(/><!\[CDATA\[>/g, '>');
      preCleaned = preCleaned.replace(/><!\[CDATA\[><!\[CDATA\[>>/g, '>');
      preCleaned = preCleaned.replace(/><!\[CDATA\[><!\[CDATA\[><!\[CDATA\[>>/g, '>');
      
      // Try parsing the pre-cleaned version first
      const parser = new DOMParser();
      xmlDoc = parser.parseFromString(preCleaned, "text/xml");
      
      // If pre-cleaning worked, use it; otherwise fall back to original cleaned version
      const preParseError = xmlDoc.querySelector("parsererror");
      if (!preParseError) {
        console.log(`Pre-parse cleanup successful for ${url}`);
      } else {
        console.debug(`Pre-parse cleanup failed for ${url}, falling back to standard cleaning...`);
        xmlDoc = parser.parseFromString(cleanedXML, "text/xml");
      }
    } else {
      const parser = new DOMParser();
      xmlDoc = parser.parseFromString(cleanedXML, "text/xml");
    }

    // Check for parsing errors
    const parseError = xmlDoc.querySelector("parsererror");
    if (parseError) {
      console.error(`XML parsing error for ${url}:`, parseError.textContent);
      
      // Try aggressive cleaning as a fallback
      if (parseError.textContent?.includes("Sequence ']]>' not allowed")) {
        console.debug(`Attempting aggressive XML cleaning for ${url}...`);
        
        // Try multiple cleaning strategies for malformed XML
        let aggressiveCleaned = cleanedXML;
        
        // Strategy 1: Handle the specific malformed CDATA patterns we're seeing
        // Pattern: "><![CDATA[>>" - completely malformed
        aggressiveCleaned = aggressiveCleaned.replace(/><!\[CDATA\[>>/g, '>');
        aggressiveCleaned = aggressiveCleaned.replace(/><!\[CDATA\[>/g, '>');
        aggressiveCleaned = aggressiveCleaned.replace(/><!\[CDATA\[><!\[CDATA\[>>/g, '>');
        aggressiveCleaned = aggressiveCleaned.replace(/><!\[CDATA\[><!\[CDATA\[><!\[CDATA\[>>/g, '>');
        
        // Strategy 2: Escape all ]] sequences that aren't in CDATA
        aggressiveCleaned = aggressiveCleaned.replace(/\]\]/g, ']]]]><![CDATA[>');
        
        // Strategy 3: If that doesn't work, try removing problematic sequences
        if (aggressiveCleaned.includes(']]]]><![CDATA[>')) {
          aggressiveCleaned = aggressiveCleaned.replace(/\]\]\]\]><!\[CDATA\[>/g, ']]');
        }
        
        // Strategy 4: Remove any remaining problematic CDATA sections
        aggressiveCleaned = aggressiveCleaned.replace(/<!\[CDATA\[[^\]]*\]\]>/g, '');
        
        // Strategy 5: Clean up any remaining malformed patterns
        aggressiveCleaned = aggressiveCleaned.replace(/<!\[CDATA\[[^\]>]*$/g, ''); // Remove incomplete CDATA at end
        aggressiveCleaned = aggressiveCleaned.replace(/^[^<]*\]\]>/g, ''); // Remove incomplete CDATA at start
        
        // Try parsing again
        const parser = new DOMParser();
        xmlDoc = parser.parseFromString(aggressiveCleaned, "text/xml");
        
        // Check if the aggressive cleaning worked
        const secondParseError = xmlDoc.querySelector("parsererror");
        if (secondParseError) {
          console.warn(`Aggressive cleaning failed for ${url}, trying final fallback...`);
          
          // Final fallback: strip all CDATA and try to parse as basic XML
          const strippedXML = cleanedXML
            .replace(/<!\[CDATA\[/g, '')
            .replace(/\]\]>/g, '')
            .replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;');
          
          xmlDoc = parser.parseFromString(strippedXML, "text/xml");
          
          const finalParseError = xmlDoc.querySelector("parsererror");
          if (finalParseError) {
            console.warn(`All XML cleaning strategies failed for ${url}, continuing with original...`);
            xmlDoc = parser.parseFromString(cleanedXML, "text/xml");
          } else {
            console.log(`Final fallback cleaning successful for ${url}`);
          }
        } else {
          console.log(`Aggressive cleaning successful for ${url}`);
        }
      }
      
      // Try to extract any useful information despite the error
      // Sometimes the parser can still extract some content even with errors
      const hasItems = xmlDoc.querySelector("item, entry");
      if (!hasItems) {
        return null; // Only fail completely if we can't get any items
      }
      
      console.warn(`Continuing with potentially malformed XML for ${url}`);
    }

    // Try to find the channel title
    const channelTitle = xmlDoc.querySelector("channel > title")?.textContent || 
                        xmlDoc.querySelector("feed > title")?.textContent ||
                        new URL(url).hostname.replace("www.", "");

    // Handle both RSS and Atom feeds
    let items: Element[];
    if (xmlDoc.querySelector("item")) {
      // RSS format
      items = Array.from(xmlDoc.querySelectorAll("item"));
    } else if (xmlDoc.querySelector("entry")) {
      // Atom format
      items = Array.from(xmlDoc.querySelectorAll("entry"));
    } else {
      console.error(`No items found in feed at ${url}`);
      return null;
    }

    const parsedItems: Article[] = items.map((item, index) => {
      const title = item.querySelector("title")?.textContent?.trim() || 
                   item.querySelector("title")?.textContent?.trim() || 
                   `Untitled Article ${index + 1}`;
      
      const link = item.querySelector("link")?.textContent?.trim() || 
                  item.querySelector("link")?.getAttribute("href") ||
                  item.querySelector("id")?.textContent?.trim() || 
                  "";
      
      const pubDate = item.querySelector("pubDate")?.textContent?.trim() || 
                     item.querySelector("published")?.textContent?.trim() || 
                     item.querySelector("updated")?.textContent?.trim() || 
                     new Date().toISOString();
      
      const content = item.querySelector("description")?.textContent?.trim() || 
                     item.querySelector("content")?.textContent?.trim() || 
                     item.querySelector("summary")?.textContent?.trim() || 
                     "";
      
             const thumbnail = extractThumbnailFromItem(item);
      
      let sourceDomain = "Unknown Source";
      if (link) {
        try {
          sourceDomain = new URL(link).hostname.replace("www.", "");
        } catch {
          console.warn(`Invalid link URL for article: ${link}`);
          // Try to extract domain from the link string if possible
          const domainMatch = link.match(/https?:\/\/([^\/]+)/);
          if (domainMatch) {
            sourceDomain = domainMatch[1].replace("www.", "");
          }
        }
      }

      return {
        id: `${url}-${index}`,
        title,
        link,
        pubDate,
        thumbnail,
        content,
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
    console.error(`Error fetching and parsing RSS from ${url}:`, error);
    return null;
  }
}

// Ensure fetchWithCors is defined in this file or imported
export const fetchWithCors = async (url: string): Promise<Response> => {
  // Make sure your proxy endpoint is correct
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
  
  try {
      const response = await fetch(proxyUrl);
      if (!response.ok) {
          // Only log 404 errors as warnings since they're expected during feed discovery
          if (response.status === 404) {
              console.debug(`Feed not found at ${url} - trying next URL pattern...`);
          } else {
              // Log other errors as they might indicate real problems
              console.error(`Proxy request to ${proxyUrl} failed with status ${response.status}`);
          }
          
          // Don't throw here, let the calling function handle the response
          // This allows for better error handling upstream
      }
      return response;
  } catch (proxyError) {
      console.error(`Error fetching from proxy URL ${proxyUrl}:`, proxyError);
      throw proxyError; // Re-throw the error to be caught by fetchAndParseRSS
  }
};


// ... (Keep existing storage functions and parseOPMLFile)

// Remove duplicate type definitions since they're imported from types.ts

export function loadFeedsFromStorage(): FeedData[] {
  try {
    const feeds = localStorage.getItem("feeds");
    if (feeds) {
      const parsedFeeds = JSON.parse(feeds);
      // Ensure all feeds have IDs for backward compatibility
      return parsedFeeds.map((feed: any, index: number) => ({
        ...feed,
        id: feed.id || `feed-${index}`,
        category: feed.category || 'Uncategorized',
        tags: feed.tags || [],
        lastFetched: feed.lastFetched || 0,
        isActive: feed.isActive !== false
      }));
    }
    return [];
  } catch (error) {
    console.error("Error loading feeds from storage:", error);
    return [];
  }
}

export function saveFeedToStorage(feed: FeedData): void {
  try {
    const feeds = loadFeedsFromStorage();
    const existingIndex = feeds.findIndex(f => f.url === feed.url);
    
    if (existingIndex >= 0) {
      feeds[existingIndex] = { ...feeds[existingIndex], ...feed };
    } else {
      feeds.push(feed);
    }
    
    localStorage.setItem("feeds", JSON.stringify(feeds));
  } catch (error) {
    console.error("Error saving feed to storage:", error);
  }
}

export function loadCategoriesFromStorage(): Category[] {
  try {
    const categories = localStorage.getItem("categories");
    if (categories) {
      return JSON.parse(categories);
    }
    // Return default categories
    return [
      { id: 'uncategorized', name: 'Uncategorized', color: '#6B7280', createdAt: Date.now() },
      { id: 'tech', name: 'Technology', color: '#3B82F6', createdAt: Date.now() },
      { id: 'news', name: 'News', color: '#EF4444', createdAt: Date.now() },
      { id: 'science', name: 'Science', color: '#10B981', createdAt: Date.now() },
      { id: 'programming', name: 'Programming', color: '#8B5CF6', createdAt: Date.now() }
    ];
  } catch (error) {
    console.error("Error loading categories from storage:", error);
    return [];
  }
}

export function saveCategoriesToStorage(categories: Category[]): void {
  try {
    localStorage.setItem("categories", JSON.stringify(categories));
  } catch (error) {
    console.error("Error saving categories to storage:", error);
  }
}

export function loadUserPreferences() {
  try {
    const preferences = localStorage.getItem("userPreferences");
    if (preferences) {
      return JSON.parse(preferences);
    }
    // Return default preferences
    return {
      id: 'default',
      sentimentFilter: {
        enabled: false,
        minSentiment: -0.5,
        maxToxicity: 0.7,
        hideClickbait: false,
        hideRagebait: false
      },
      categories: loadCategoriesFromStorage(),
      syncEnabled: false,
      syncDeviceId: generateDeviceId(),
      lastSync: 0
    };
  } catch (error) {
    console.error("Error loading user preferences:", error);
    return null;
  }
}

export function saveUserPreferences(preferences: any): void {
  try {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  } catch (error) {
    console.error("Error saving user preferences:", error);
  }
}

function generateDeviceId(): string {
  return 'device-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36);
}

export function filterArticlesBySentiment(articles: Article[], preferences: any): Article[] {
  if (!preferences?.sentimentFilter?.enabled) {
    return articles;
  }

  const { minSentiment, maxToxicity, hideClickbait, hideRagebait } = preferences.sentimentFilter;

  return articles.filter(article => {
    if (!article.sentiment) return true;

    const { score, toxicity, isClickbait, isRagebait } = article.sentiment;

    // Filter by sentiment score
    if (score < minSentiment) return false;

    // Filter by toxicity
    if (toxicity > maxToxicity) return false;

    // Filter clickbait
    if (hideClickbait && isClickbait) return false;

    // Filter ragebait
    if (hideRagebait && isRagebait) return false;

    return true;
  });
}

export function groupArticlesByCategory(articles: Article[], feeds: FeedData[]): Record<string, Article[]> {
  const grouped: Record<string, Article[]> = {};
  
  articles.forEach(article => {
    const feed = feeds.find(f => f.url === article.link || article.sourceDomain.includes(new URL(f.url).hostname));
    const category = feed?.category || 'Uncategorized';
    
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(article);
  });
  
  return grouped;
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
            feeds.push({ 
              id: `opml-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              title, 
              url,
              category: 'Uncategorized',
              tags: [],
              isActive: true
            });
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

/**
 * Attempts to discover the most likely RSS feed URL for a given website by searching:
 * - meta tags
 * - meta tags in parent pages
 * - website links
 * - sitemap.xml
 * - common suffixes
 * - blog meta tags
 * Returns the best guess for the feed URL or null if none found.
 */
export async function discoverFeedUrlWithFallbacks(siteUrl: string): Promise<string | null> {
  // Helper to fetch and parse HTML
  async function fetchHtml(url: string): Promise<Document | null> {
    try {
      const response = await fetchWithCors(url);
      if (!response.ok) return null;
      const html = await response.text();
      return new DOMParser().parseFromString(html, 'text/html');
    } catch {
      return null;
    }
  }

  // 1. Try meta tags and link tags on the main page
  const doc = await fetchHtml(siteUrl);
  if (doc) {
    const feedLinks = [
      ...Array.from(doc.querySelectorAll('link[type="application/rss+xml"], link[type="application/atom+xml"], link[type="application/xml"], link[type="text/xml"]')).map(link => link.getAttribute('href')),
      ...Array.from(doc.querySelectorAll('link[rel="alternate"][type="application/rss+xml"], link[rel="alternate"][type="application/atom+xml"]')).map(link => link.getAttribute('href')),
      ...Array.from(doc.querySelectorAll('a[href*="feed"], a[href*="rss"], a[href*="atom"]')).map(link => link.getAttribute('href')),
      ...Array.from(doc.querySelectorAll('meta[property="og:see_also"], meta[name="twitter:app:url:ipad"], meta[name="twitter:app:url:iphone"]')).map(meta => meta.getAttribute('content'))
    ].filter(Boolean) as string[];
    for (const href of feedLinks) {
      try {
        const absUrl = new URL(href!, siteUrl).toString();
        if (absUrl.match(/\.(xml|rss|atom)$/i) || absUrl.includes('feed')) {
          return absUrl;
        }
      } catch {}
    }
  }

  // 2. Try parent pages (e.g., remove path segments)
  try {
    const urlObj = new URL(siteUrl);
    const segments = urlObj.pathname.split('/').filter(Boolean);
    for (let i = segments.length - 1; i >= 0; i--) {
      const parentUrl = `${urlObj.origin}/${segments.slice(0, i).join('/')}`;
      const parentDoc = await fetchHtml(parentUrl);
      if (parentDoc) {
        const parentLinks = [
          ...Array.from(parentDoc.querySelectorAll('link[type="application/rss+xml"], link[type="application/atom+xml"], link[type="application/xml"], link[type="text/xml"]')).map(link => link.getAttribute('href')),
          ...Array.from(parentDoc.querySelectorAll('link[rel="alternate"][type="application/rss+xml"], link[rel="alternate"][type="application/atom+xml"]')).map(link => link.getAttribute('href')),
          ...Array.from(parentDoc.querySelectorAll('a[href*="feed"], a[href*="rss"], a[href*="atom"]')).map(link => link.getAttribute('href'))
        ].filter(Boolean) as string[];
        for (const href of parentLinks) {
          try {
            const absUrl = new URL(href!, parentUrl).toString();
            if (absUrl.match(/\.(xml|rss|atom)$/i) || absUrl.includes('feed')) {
              return absUrl;
            }
          } catch (urlError) {
            console.warn(`Invalid URL in parent page discovery: ${href}`, urlError);
          }
        }
      }
    }
  } catch (urlError) {
    console.warn(`Error during parent page discovery for ${siteUrl}:`, urlError);
  }

  // 3. Try common feed URL suffixes
  const commonSuffixes = [
    '/feed', '/rss', '/rss.xml', '/atom.xml', '/feed.xml', '/feeds/posts/default', '/blog/rss.xml', '/blog/feed', '/blog/atom.xml'
  ];
  for (const suffix of commonSuffixes) {
    try {
      const testUrl = siteUrl.replace(/\/$/, '') + suffix;
      const resp = await fetchWithCors(testUrl);
      if (resp.ok) {
        const text = await resp.text();
        if (text.match(/<rss|<feed|<channel/i)) {
          return testUrl;
        }
      }
    } catch (error) {
      console.warn(`Error testing suffix ${suffix} for ${siteUrl}:`, error);
    }
  }

  // 4. Try /sitemap.xml and look for feed links
  try {
    const sitemapUrl = new URL('/sitemap.xml', siteUrl).toString();
    const resp = await fetchWithCors(sitemapUrl);
    if (resp.ok) {
      const xml = await resp.text();
      const feedUrls = Array.from(xml.matchAll(/<loc>([^<]+\.(xml|rss|atom))<\/loc>/gi)).map(m => m[1]);
      for (const url of feedUrls) {
        if (url.match(/(rss|feed|atom)/i)) {
          return url;
        }
      }
    }
  } catch (error) {
    console.warn(`Error checking sitemap for ${siteUrl}:`, error);
  }

  // 5. Try blog meta tags
  if (doc) {
    const blogMeta = doc.querySelector('meta[name="blog-channel-url"], meta[name="blog-feed-url"]');
    if (blogMeta) {
      const blogUrl = blogMeta.getAttribute('content');
      if (blogUrl) {
        try {
          return new URL(blogUrl, siteUrl).toString();
        } catch (urlError) {
          console.warn(`Invalid blog URL in meta tag: ${blogUrl}`, urlError);
        }
      }
    }
  }

  return null;
}

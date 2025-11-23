// lib/rssUtils.ts
// This file contains both server-side and client-side RSS utilities
// Client-side parsing should use Web Workers when available

import type { FeedData, Article, Category } from './types';

// Re-export client-side utilities
export { fetchAndParseRSSClient } from './rssUtilsClient';

/**
 * Robust date parsing function that handles multiple RSS date formats
 * Returns ISO 8601 string or null if parsing fails
 */
function parseRSSDate(dateString: string | undefined | null): string | null {
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }

  const trimmed = dateString.trim();
  if (!trimmed) {
    return null;
  }

  try {
    // Try parsing as-is first (handles ISO 8601 and most standard formats)
    const directParse = new Date(trimmed);
    if (!isNaN(directParse.getTime())) {
      return directParse.toISOString();
    }

    // Handle RFC 2822 format (e.g., "Wed, 02 Oct 2002 13:00:00 GMT")
    // This is the most common RSS date format
    const rfc2822Pattern = /^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s+\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{2,4}\s+\d{1,2}:\d{2}(?::\d{2})?(?:\s+(?:[+-]\d{4}|[A-Z]{3,4}))?/i;
    if (rfc2822Pattern.test(trimmed)) {
      const parsed = new Date(trimmed);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString();
      }
    }

    // Handle ISO 8601 variants
    // Pattern: YYYY-MM-DDTHH:mm:ss.sssZ or YYYY-MM-DD HH:mm:ss
    const iso8601Pattern = /^\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:?\d{2})?$/;
    if (iso8601Pattern.test(trimmed)) {
      const parsed = new Date(trimmed);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString();
      }
    }

    // Handle Unix timestamp (seconds or milliseconds)
    const timestampPattern = /^\d{10,13}$/;
    if (timestampPattern.test(trimmed)) {
      const timestamp = parseInt(trimmed, 10);
      // If it's in seconds (10 digits), convert to milliseconds
      const ms = timestamp < 10000000000 ? timestamp * 1000 : timestamp;
      const parsed = new Date(ms);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString();
      }
    }

    // Handle date with timezone names (e.g., "2023-01-15 12:00:00 EST")
    const tzNamePattern = /^(.+)\s+([A-Z]{2,4})$/;
    const tzMatch = trimmed.match(tzNamePattern);
    if (tzMatch) {
      const parsed = new Date(tzMatch[1]);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString();
      }
    }

    // Handle format: "YYYY-MM-DD" without time
    const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;
    if (dateOnlyPattern.test(trimmed)) {
      const parsed = new Date(trimmed + 'T00:00:00Z');
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString();
      }
    }

    // Handle format: "DD/MM/YYYY" or "MM/DD/YYYY"
    const slashDatePattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const slashMatch = trimmed.match(slashDatePattern);
    if (slashMatch) {
      // Try MM/DD/YYYY first (US format)
      let parsed = new Date(`${slashMatch[3]}-${slashMatch[1].padStart(2, '0')}-${slashMatch[2].padStart(2, '0')}T00:00:00Z`);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString();
      }
      // Try DD/MM/YYYY (European format)
      parsed = new Date(`${slashMatch[3]}-${slashMatch[2].padStart(2, '0')}-${slashMatch[1].padStart(2, '0')}T00:00:00Z`);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString();
      }
    }

    // If all parsing attempts fail, return null
    console.warn(`Could not parse date string: "${trimmed}", date unavailable`);
    return null;
  } catch (error) {
    console.error(`Error parsing date "${trimmed}":`, error);
    return null;
  }
}

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
function cleanXMLContent(xmlString: string): string {
  // First, normalize line endings
  xmlString = xmlString.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // STEP 1: Handle the specific malformed CDATA patterns we're seeing in error logs
  // These patterns appear when feed generators don't properly escape content
  // We need to remove these BEFORE doing any other CDATA processing
  
  // Pattern: "><![CDATA[><![CDATA[><![CDATA[>>" - triple nested malformed CDATA (most specific first)
  xmlString = xmlString.replace(/><!\[CDATA\[><!\[CDATA\[><!\[CDATA\[>>/g, '>');
  
  // Pattern: "><![CDATA[><![CDATA[>>" - double nested malformed CDATA
  xmlString = xmlString.replace(/><!\[CDATA\[><!\[CDATA\[>>/g, '>');
  
  // Pattern: "><![CDATA[>>" - single malformed CDATA with extra >
  xmlString = xmlString.replace(/><!\[CDATA\[>>/g, '>');
  
  // Pattern: "><![CDATA[>" - incomplete CDATA start
  xmlString = xmlString.replace(/><!\[CDATA\[>/g, '>');

  // STEP 2: Remove any invalid XML characters (Control characters except Tab, LF, CR)
  // XML 1.0: #x9 | #xA | #xD | [#x20-#xD7FF] | [#xE000-#xFFFD] | [#x10000-#x10FFFF]
  // We remove characters in the ranges #x0-#x8, #xB-#xC, #xE-#x1F, #x7F-#x84, #x86-#x9F
  xmlString = xmlString.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F]/g, '');

  // STEP 3: Fix unclosed CDATA sections
  // Find CDATA sections that don't have proper closing tags
  const cdataStartCount = (xmlString.match(/<!\[CDATA\[/g) || []).length;
  const cdataEndCount = (xmlString.match(/\]\]>/g) || []).length;
  
  // If we have more CDATA starts than ends, we need to close them
  if (cdataStartCount > cdataEndCount) {
    // Find unclosed CDATA sections and close them before the next tag
    xmlString = xmlString.replace(/<!\[CDATA\[([^<]*?)(?=<(?!!\[CDATA\[))/g, (match, content) => {
      if (!content.includes(']]>')) {
        return `<![CDATA[${content}]]>`;
      }
      return match;
    });
  }

  // STEP 4: Handle problematic ]]> sequences throughout the entire document
  // This is the most critical step - ]]> appearing outside CDATA sections breaks XML parsing
  
  // First, protect legitimate CDATA section endings by temporarily replacing them
  const cdataEndMarker = '___CDATA_END_MARKER___';
  xmlString = xmlString.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (match, content) => {
    // Replace the ending ]]> with our marker temporarily
    return `<![CDATA[${content}${cdataEndMarker}`;
  });
  
  // Now escape ALL remaining ]]> sequences (these are the problematic ones in content)
  // Replace ]]> with ]] > (adding a space to break the sequence)
  xmlString = xmlString.replace(/\]\]>/g, ']] >');
  
  // Restore the legitimate CDATA endings
  xmlString = xmlString.replace(new RegExp(cdataEndMarker, 'g'), ']]>');
  
  // STEP 5: Remove HTML5 boolean attributes and problematic attributes without values
  // This must be done BEFORE parsing to prevent "Specification mandates value for attribute" errors
  // We do this outside CDATA sections to preserve content integrity
  
  // First, temporarily protect CDATA sections
  const cdataProtectionMarker = '___PROTECTED_CDATA_';
  const protectedCDataSections: string[] = [];
  xmlString = xmlString.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (match, content) => {
    protectedCDataSections.push(content);
    return `${cdataProtectionMarker}${protectedCDataSections.length - 1}___`;
  });
  
  // Now clean HTML attributes outside CDATA sections
  xmlString = xmlString
    // Fix self-closing tags that aren't properly closed (img, br, hr, input, SVG elements, etc.)
    .replace(/<(img|br|hr|input|meta|link|area|base|col|embed|param|source|track|wbr|path|circle|rect|svg|use|line|polygon|polyline|ellipse|g|defs|clipPath|mask|pattern|stop|linearGradient|radialGradient)([^>]*?)(?<!\/)>/gi, '<$1$2 />')
    // Remove comprehensive list of HTML5 boolean attributes and problematic attributes without values
    // Use negative lookahead to ensure we only match attributes without =
    .replace(/\s(allowfullscreen|allowpaymentrequest|async|autofocus|autoplay|checked|controls|default|defer|disabled|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|nomodule|novalidate|open|playsinline|readonly|required|reversed|selected|truespeed|typemustmatch|data-lazy|data-src|data-srcset|data-background|data-background-image|consumption-data|frameborder|scrolling|noresize|declare|compact|noshade|nowrap|inert)(?=\s|>|\/)/gi, ' ')
    // Remove any remaining data- attributes without values
    .replace(/\sdata-[\w-]+(?=\s|>|\/)/g, ' ')
    // Remove aria- attributes without values
    .replace(/\saria-[\w-]+(?=\s|>|\/)/g, ' ');
  
  // Restore protected CDATA sections
  xmlString = xmlString.replace(/___PROTECTED_CDATA_(\d+)___/g, (match, index) => {
    return `<![CDATA[${protectedCDataSections[parseInt(index)]}]]>`;
  });

  // STEP 6: Handle CDATA sections that contain problematic ]] sequences (without the >)
  // This must be done carefully to avoid infinite loops
  const cdataRegex = /<!\[CDATA\[([\s\S]*?)\]\]>/g;
  const cdataMatches: Array<{ match: string; content: string; start: number; end: number }> = [];
  
  let match2;
  while ((match2 = cdataRegex.exec(xmlString)) !== null) {
    cdataMatches.push({
      match: match2[0],
      content: match2[1],
      start: match2.index,
      end: match2.index + match2[0].length
    });
  }
  
  // Process CDATA sections in reverse to maintain correct indices
  for (let i = cdataMatches.length - 1; i >= 0; i--) {
    const { content, start, end } = cdataMatches[i];
    
    // Check if the content contains ]] (without > after it)
    // This indicates a problematic sequence that needs escaping
    if (content.includes(']]') && !content.includes(']]>')) {
      // Escape by splitting the CDATA section at ]] boundaries
      const escapedContent = content.replace(/\]\]/g, ']]]]><![CDATA[');
      const replacement = `<![CDATA[${escapedContent}]]>`;
      xmlString = xmlString.substring(0, start) + replacement + xmlString.substring(end);
    }
  }

  return xmlString;
}

// Helper function to extract thumbnail from RSS item - Enhanced version
function extractThumbnailFromItem(item: Element): string | undefined {
  // 1. Try standard enclosure with image type
  let thumbnail = item.querySelector("enclosure[type^='image']")?.getAttribute("url");
  
  // 2. Try media:content and media:thumbnail (RSS Media namespace)
  if (!thumbnail) {
    try {
      const mediaContent = item.querySelector("media\\:content[type^='image'], media\\:content[medium='image']") ||
                          item.querySelector("media\\:thumbnail");
      
      if (mediaContent) {
        thumbnail = mediaContent.getAttribute("url") || undefined;
      }
      
      // Also check for media:group
      if (!thumbnail) {
        const mediaGroup = item.querySelector("media\\:group");
        if (mediaGroup) {
          const groupContent = mediaGroup.querySelector("media\\:content[type^='image'], media\\:thumbnail");
          if (groupContent) {
            thumbnail = groupContent.getAttribute("url") || undefined;
          }
        }
      }
    } catch (error) {
      console.warn('Error extracting media namespace thumbnail:', error);
    }
  }
  
  // 3. Try to extract from description or content:encoded HTML
  if (!thumbnail) {
    try {
      const description = item.querySelector("description")?.textContent || 
                         item.querySelector("content\\:encoded")?.textContent || 
                         item.querySelector("content")?.textContent || "";
      
      if (description) {
        // Parse HTML content to find images
        const parser = new DOMParser();
        const doc = parser.parseFromString(description, 'text/html');
        
        // Look for img tags in the content
        const imgTag = doc.querySelector("img");
        if (imgTag) {
          thumbnail = imgTag.getAttribute("src") || 
                     imgTag.getAttribute("data-src") || 
                     imgTag.getAttribute("data-lazy-src") || undefined;
        }
        
        // Also check for Open Graph images in content
        if (!thumbnail) {
          const ogImage = doc.querySelector("meta[property='og:image']");
          if (ogImage) {
            thumbnail = ogImage.getAttribute("content") || undefined;
          }
        }
      }
    } catch (error) {
      console.warn('Error extracting thumbnail from content HTML:', error);
    }
  }
  
  // 4. Try iTunes image (common in podcast feeds)
  if (!thumbnail) {
    const itunesImage = item.querySelector("itunes\\:image");
    if (itunesImage) {
      thumbnail = itunesImage.getAttribute("href") || undefined;
    }
  }
  
  // 5. Try image element (some feeds use this)
  if (!thumbnail) {
    const imageEl = item.querySelector("image > url");
    if (imageEl) {
      thumbnail = imageEl.textContent?.trim() || undefined;
    }
  }
  
  // 6. Try Atom link rel="enclosure"
  if (!thumbnail) {
    const atomEnclosure = item.querySelector("link[rel='enclosure'][type^='image']");
    if (atomEnclosure) {
      thumbnail = atomEnclosure.getAttribute("href") || undefined;
    }
  }
  
  // 7. Try any element with 'thumbnail' or 'image' in the name
  if (!thumbnail) {
    try {
      const allElements = item.querySelectorAll("*");
      for (const element of allElements) {
        const tagName = element.tagName.toLowerCase();
        if (tagName.includes('thumbnail') || tagName.includes('image')) {
          const url = element.getAttribute('url') || 
                     element.getAttribute('href') || 
                     element.textContent?.trim();
          if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            thumbnail = url;
            break;
          }
        }
      }
    } catch (error) {
      console.warn('Error in fallback thumbnail extraction:', error);
    }
  }
  
  // Validate and clean the thumbnail URL
  if (thumbnail) {
    thumbnail = thumbnail.trim();
    // Check if it's a valid URL
    if (!thumbnail.startsWith('http://') && !thumbnail.startsWith('https://')) {
      thumbnail = undefined;
    }
  }
  
  return thumbnail || undefined;
}

/**
 * Fetches and parses an RSS feed with robust error handling for malformed XML.
 * 
 * ⚠️ DEPRECATED FOR CLIENT-SIDE USE: Use fetchAndParseRSSClient() instead
 * which leverages Web Workers for better performance.
 * 
 * This function is kept for backward compatibility and server-side rendering,
 * but client components should use the worker-based approach.
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
    
    // Add content namespace if missing
    if (text.includes('content:encoded') && !text.includes('xmlns:content')) {
      text = text.replace(
        /<rss[^>]*>/,
        match => match.replace('>', ' xmlns:content="http://purl.org/rss/1.0/modules/content/">')
      );
    }
    
    // Add iTunes namespace if missing
    if (text.includes('itunes:') && !text.includes('xmlns:itunes')) {
      text = text.replace(
        /<rss[^>]*>/,
        match => match.replace('>', ' xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">')
      );
    }

    // Fix common mismatched tags before parsing
    text = text
      // Fix unclosed <br> tags
      .replace(/<br\s*(?=[^/>]*>)/gi, '<br />')
      // Fix unclosed <img> tags
      .replace(/<img([^>]*?)(?<!\/)>/gi, '<img$1 />')
      // Fix unclosed <hr> tags  
      .replace(/<hr\s*(?=[^/>]*>)/gi, '<hr />')
      // Fix common tag mismatches (opening tag doesn't match closing tag)
      .replace(/<(em|strong|b|i|u|time|span|div|a|td|tr|th|table|p)\b([^>]*)>\s*<\/(em|strong|b|i|u|time|span|div|a|td|tr|th|table|p)>/gi, (match, opening, attrs, closing) => {
        // If opening and closing tags don't match, use the closing tag
        if (opening.toLowerCase() !== closing.toLowerCase()) {
          return `<${closing}${attrs}></${closing}>`;
        }
        return match;
      });

    // Fix unclosed CDATA sections
    text = text.replace(/<!\[CDATA\[([^\]>]*?)(?!\]\]>)/g, (match, content) => {
      // If the CDATA section is not properly closed, close it
      if (!content.includes(']]>')) {
        return `<!\[CDATA\[${content}]]>`;
      }
      return match;
    });

    // Escape unescaped ampersands in content (but preserve HTML entities and numeric character references)
    text = text.replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');

    // Clean the XML content before parsing
    const cleanedXML = cleanXMLContent(text);

    // Parse the cleaned XML
    const parser = new DOMParser();
    let xmlDoc = parser.parseFromString(cleanedXML, "text/xml");

    // Check for parsing errors
    const parseError = xmlDoc.querySelector("parsererror");
    if (parseError) {
      console.error(`XML parsing error for ${url}:`, parseError.textContent);
      
      // Try aggressive cleaning as a fallback
      if (parseError.textContent?.includes("CData section not finished") || 
          parseError.textContent?.includes("Sequence ']]>' not allowed") ||
          parseError.textContent?.includes("Specification mandates value for attribute") ||
          parseError.textContent?.includes("CDATA")) {
        console.debug(`Attempting aggressive XML cleaning for ${url}...`);
        
        // Strategy 1: More aggressive ]]> handling - escape ALL ]]> sequences first
        let aggressiveCleaned = text;
        
        // Step 1: Temporarily mark legitimate CDATA endings
        const cdataMarker = '___LEGIT_CDATA_END___';
        aggressiveCleaned = aggressiveCleaned.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (match, content) => {
          return `<![CDATA[${content}${cdataMarker}`;
        });
        
        // Step 2: Escape ALL remaining ]]> sequences (these are the problematic ones)
        aggressiveCleaned = aggressiveCleaned.replace(/\]\]>/g, ']] &gt;');
        
        // Step 3: Restore legitimate CDATA endings
        aggressiveCleaned = aggressiveCleaned.replace(new RegExp(cdataMarker, 'g'), ']]>');
        
        // Step 4: Clean up other issues - fix ALL HTML attributes without values
        aggressiveCleaned = aggressiveCleaned
          // Fix self-closing tags that aren't properly closed (img, br, hr, input, etc.)
          .replace(/<(img|br|hr|input|meta|link|area|base|col|embed|param|source|track|wbr|path|circle|rect|svg|use)([^>]*?)(?<!\/)>/gi, '<$1$2 />')
          // Fix VERY comprehensive list of HTML5 boolean attributes and common problematic attributes
          .replace(/\s(allowfullscreen|allowpaymentrequest|async|autofocus|autoplay|checked|controls|default|defer|disabled|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|nomodule|novalidate|open|playsinline|readonly|required|reversed|selected|truespeed|typemustmatch|data-lazy|data-src|data-srcset|data-background|data-background-image|consumption-data|frameborder|scrolling|noresize|declare|compact|noshade|nowrap|inert)\s*(?=[>\s\/])/gi, ' ')
          // Fix any remaining data- attributes without values (more comprehensive)
          .replace(/\sdata-[\w-]+\s*(?=[>\s\/])/g, ' ')
          // Fix aria- attributes without values
          .replace(/\saria-[\w-]+\s*(?=[>\s\/])/g, ' ')
          // Fix any other custom attributes without = sign (general catch-all)
          .replace(/\s([a-z][\w-]*)\s+(?=[a-z][\w-]*=|>|\/)/gi, ' ')
          // Escape unescaped ampersands
          .replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');
        
        // Try parsing the cleaned version
        const parser = new DOMParser();
        xmlDoc = parser.parseFromString(aggressiveCleaned, "text/xml");
        
        const secondParseError = xmlDoc.querySelector("parsererror");
        if (secondParseError) {
          console.warn(`First aggressive cleaning failed for ${url}, trying CDATA stripping...`);
          
          // Strategy 2: Strip all CDATA sections entirely
          console.warn(`Trying complete CDATA stripping for ${url}...`);
          const cdataStripped = text
            // Escape ALL ]] sequences in the entire document
            .replace(/\]\]/g, '] ]')
            // Remove CDATA start markers
            .replace(/<!\[CDATA\[/g, '')
            // Remove the > that was left from ]]> sequences
            .replace(/] ]>/g, '] ] ')
            // Fix self-closing tags that aren't properly closed
            .replace(/<(img|br|hr|input|meta|link|area|base|col|embed|param|source|track|wbr|path|circle|rect|svg|use)([^>]*?)(?<!\/)>/gi, '<$1$2 />')
            // Fix ALL common problematic HTML5 attributes without values
            .replace(/\s(allowfullscreen|allowpaymentrequest|async|autofocus|autoplay|checked|controls|default|defer|disabled|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|nomodule|novalidate|open|playsinline|readonly|required|reversed|selected|truespeed|typemustmatch|data-lazy|data-src|data-srcset|data-background|data-background-image|consumption-data|frameborder|scrolling|noresize|declare|compact|noshade|nowrap|inert)\s*(?=[>\s\/])/gi, ' ')
            .replace(/\sdata-[\w-]+\s*(?=[>\s\/])/g, ' ')
            .replace(/\saria-[\w-]+\s*(?=[>\s\/])/g, ' ')
            // Escape unescaped ampersands
            .replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');
          
          xmlDoc = parser.parseFromString(cdataStripped, "text/xml");
          const thirdParseError = xmlDoc.querySelector("parsererror");
          
          if (thirdParseError) {
            console.warn(`CDATA stripping also failed for ${url}, trying content extraction...`);
            console.warn(`CDATA stripping also failed for ${url}, trying content extraction...`);
            
            // Strategy 3: Try to extract just the content between tags
            // This is useful when the entire feed structure is broken
            try {
              // Look for item or entry tags and extract them individually
              const itemMatches = text.match(/<item[\s\S]*?<\/item>/gi) || [];
              const entryMatches = text.match(/<entry[\s\S]*?<\/entry>/gi) || [];
              const allItems = [...itemMatches, ...entryMatches];
              
              if (allItems.length > 0) {
                console.log(`Found ${allItems.length} items/entries, attempting manual extraction...`);
                
                // Create a minimal valid XML wrapper
                const channelTitle = text.match(/<channel[^>]*>[\s\S]*?<title>([^<]+)<\/title>/i)?.[1] || 
                                   text.match(/<feed[^>]*>[\s\S]*?<title>([^<]+)<\/title>/i)?.[1] ||
                                   new URL(url).hostname.replace("www.", "");
                
                const cleanedItems = allItems.map(item => {
                  let cleaned = item;
                  
                  // Temporarily mark legitimate CDATA endings
                  const marker = '___CDATA_END___';
                  cleaned = cleaned.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (match, content) => {
                    return `<![CDATA[${content}${marker}`;
                  });
                  
                  // Escape ALL remaining ]]> sequences
                  cleaned = cleaned.replace(/\]\]>/g, ']] &gt;');
                  
                  // Restore legitimate CDATA endings
                  cleaned = cleaned.replace(new RegExp(marker, 'g'), ']]>');
                  
                  // Additional cleaning - remove ALL HTML attributes without values
                  cleaned = cleaned
                    // Fix self-closing tags
                    .replace(/<(img|br|hr|input|meta|link|area|base|col|embed|param|source|track|wbr|path|circle|rect|svg|use)([^>]*?)(?<!\/)>/gi, '<$1$2 />')
                    .replace(/\s(allowfullscreen|allowpaymentrequest|async|autofocus|autoplay|checked|controls|default|defer|disabled|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|nomodule|novalidate|open|playsinline|readonly|required|reversed|selected|truespeed|typemustmatch|data-lazy|data-src|data-srcset|data-background|data-background-image|consumption-data|frameborder|scrolling|noresize|declare|compact|noshade|nowrap|inert)\s*(?=[>\s\/])/gi, ' ')
                    .replace(/\sdata-[\w-]+\s*(?=[>\s\/])/g, ' ')
                    .replace(/\saria-[\w-]+\s*(?=[>\s\/])/g, ' ')
                    .replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');
                  
                  return cleaned;
                }).join('\n');
                
                const reconstructedXML = `<?xml version="1.0" encoding="UTF-8"?>
                  <rss version="2.0">
                    <channel>
                      <title>${channelTitle}</title>
                      ${cleanedItems}
                    </channel>
                  </rss>`;
                
                xmlDoc = parser.parseFromString(reconstructedXML, "text/xml");
                
                const fourthParseError = xmlDoc.querySelector("parsererror");
                if (!fourthParseError) {
                  console.log(`Manual item extraction successful for ${url}`);
                } else {
                  console.warn(`All XML cleaning strategies failed for ${url}, returning null`);
                  return null;
                }
              } else {
                console.warn(`No items found in ${url}, returning null`);
                return null;
              }
            } catch (extractError) {
              console.error(`Content extraction failed for ${url}:`, extractError);
              return null;
            }
          } else {
            console.log(`CDATA stripping successful for ${url}`);
          }
        } else {
          console.log(`First aggressive cleaning successful for ${url}`);
        }
      } else {
        // For other parsing errors, try to extract items anyway
        const hasItems = xmlDoc.querySelector("item, entry");
        if (!hasItems) {
          return null;
        }
        console.warn(`Continuing with potentially malformed XML for ${url}`);
      }
    }

    // Try to find the channel title
    let channelTitle = xmlDoc.querySelector("channel > title")?.textContent || 
                       xmlDoc.querySelector("feed > title")?.textContent ||
                       new URL(url).hostname.replace("www.", "");
    
    // Clean the channel title from CDATA and HTML
    if (channelTitle) {
      channelTitle = channelTitle.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
      channelTitle = channelTitle.replace(/<[^>]*>/g, '');
      channelTitle = channelTitle.replace(/&amp;/g, '&')
                                .replace(/&lt;/g, '<')
                                .replace(/&gt;/g, '>')
                                .replace(/&quot;/g, '"')
                                .replace(/&#39;/g, "'")
                                .replace(/&nbsp;/g, ' ');
      channelTitle = channelTitle.replace(/\s+/g, ' ').trim();
    }

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
      let title = item.querySelector("title")?.textContent?.trim() || 
                 item.querySelector("title")?.textContent?.trim() || 
                 `Untitled Article ${index + 1}`;
      
      // Clean the title by removing HTML tags and CDATA sections
      if (title) {
        // Remove CDATA sections
        title = title.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
        // Remove HTML tags
        title = title.replace(/<[^>]*>/g, '');
        // Decode HTML entities
        title = title.replace(/&amp;/g, '&')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'")
                    .replace(/&nbsp;/g, ' ');
        // Clean up extra whitespace and normalize
        title = title.replace(/\s+/g, ' ')
                    .replace(/\n+/g, ' ')
                    .replace(/\r+/g, ' ')
                    .replace(/\t+/g, ' ')
                    .trim();
        
        // Limit title length to prevent extremely long titles
        if (title.length > 200) {
          title = title.substring(0, 200) + '...';
        }
      }
      
      // Enhanced link extraction for both RSS and Atom feeds
      let link = "";
      const linkElement = item.querySelector("link");
      if (linkElement) {
        // First try href attribute (Atom feeds)
        link = linkElement.getAttribute("href")?.trim() || "";
        // If no href, try text content (RSS feeds)
        if (!link) {
          link = linkElement.textContent?.trim() || "";
        }
        // If still no link, try alternate link
        if (!link) {
          const altLink = item.querySelector("link[rel='alternate']");
          if (altLink) {
            link = altLink.getAttribute("href")?.trim() || "";
          }
        }
      }
      // Fallback to id element if link is still empty
      if (!link) {
        link = item.querySelector("id")?.textContent?.trim() || "";
      }
      
      // Ensure link is absolute URL
      if (link && !link.startsWith('http://') && !link.startsWith('https://')) {
        try {
          // If it's a relative URL, make it absolute using the feed URL
          link = new URL(link, url).toString();
        } catch (e) {
          console.warn(`Failed to normalize relative URL: ${link}`, e);
        }
      }
      
      // Extract date from multiple possible fields with robust parsing
      const pubDateRaw = item.querySelector("pubDate")?.textContent?.trim() || 
                        item.querySelector("published")?.textContent?.trim() || 
                        item.querySelector("updated")?.textContent?.trim() ||
                        item.querySelector("dc\\:date")?.textContent?.trim() ||
                        item.querySelector("date")?.textContent?.trim();
      const pubDate = parseRSSDate(pubDateRaw) || new Date(0).toISOString(); // Use epoch time for unavailable dates
      
      let content = item.querySelector("description")?.textContent?.trim() || 
                   item.querySelector("content")?.textContent?.trim() || 
                   item.querySelector("summary")?.textContent?.trim() || 
                   "";
      
            // Clean the content by removing HTML tags and CDATA sections
      if (content) {
        // Remove CDATA sections
        content = content.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
        // Remove HTML tags
        content = content.replace(/<[^>]*>/g, '');
        // Decode HTML entities
        content = content.replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&quot;/g, '"')
                        .replace(/&#39;/g, "'")
                        .replace(/&nbsp;/g, ' ');
        // Clean up extra whitespace and normalize
        content = content.replace(/\s+/g, ' ')
                        .replace(/\n+/g, ' ')
                        .replace(/\r+/g, ' ')
                        .replace(/\t+/g, ' ')
                        .trim();
        
        // Limit content length to prevent extremely long articles
        if (content.length > 1000) {
          content = content.substring(0, 1000) + '...';
        }
      }
      
      // Extract and clean summary if available
      let summary = item.querySelector("description")?.textContent?.trim() || 
                   item.querySelector("summary")?.textContent?.trim() || 
                   "";
      
      if (summary && summary !== content) {
        // Clean the summary the same way as content
        summary = summary.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
        summary = summary.replace(/<[^>]*>/g, '');
        summary = summary.replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&quot;/g, '"')
                        .replace(/&#39;/g, "'")
                        .replace(/&nbsp;/g, ' ');
        summary = summary.replace(/\s+/g, ' ')
                        .replace(/\n+/g, ' ')
                        .replace(/\r+/g, ' ')
                        .replace(/\t+/g, ' ')
                        .trim();
        
        // Limit summary length for better display
        if (summary.length > 300) {
          summary = summary.substring(0, 300) + '...';
        }
      } else if (content) {
        // If no summary available, use a truncated version of content
        summary = content.length > 300 ? content.substring(0, 300) + '...' : content;
      }
      
      const thumbnail = extractThumbnailFromItem(item);
      
      // Use feed title as source domain for better display
      // Fall back to hostname from link if feed title is not available
      let sourceDomain = channelTitle || "Unknown Source";
      if (!channelTitle && link) {
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
      
      // Filter out invalid feeds and deduplicate
      const validFeeds = parsedFeeds.filter((feed: any) => feed && feed.url && typeof feed.url === 'string' && feed.url.trim());
      
      // Deduplicate by URL
      const seenUrls = new Set<string>();
      const uniqueFeeds = validFeeds.filter((feed: any) => {
        if (seenUrls.has(feed.url)) {
          console.warn('Removing duplicate feed:', feed.url);
          return false;
        }
        seenUrls.add(feed.url);
        return true;
      });
      
      // Ensure all feeds have proper structure
      const cleanedFeeds = uniqueFeeds.map((feed: any, index: number) => ({
        ...feed,
        id: feed.id || `feed-${index}`,
        category: feed.category || 'Uncategorized',
        tags: feed.tags || [],
        lastFetched: feed.lastFetched || 0,
        isActive: feed.isActive !== false
      }));
      
      // Save cleaned feeds back if we removed any
      if (cleanedFeeds.length !== parsedFeeds.length) {
        console.log(`Cleaned up feeds: ${parsedFeeds.length} -> ${cleanedFeeds.length}`);
        localStorage.setItem("feeds", JSON.stringify(cleanedFeeds));
      }
      
      return cleanedFeeds;
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

export function saveFeedsToStorage(feeds: FeedData[]): void {
  try {
    localStorage.setItem("feeds", JSON.stringify(feeds));
  } catch (error) {
    console.error("Error saving feeds to storage:", error);
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
  const defaultPreferences = {
    id: 'default',
    vibesFilter: {
      enabled: false,
      minVibes: -0.5,
      maxToxicity: 0.7,
      hideClickbait: false,
      hideRagebait: false
    },
    categories: loadCategoriesFromStorage(),
    syncEnabled: false,
    syncDeviceId: generateDeviceId(),
    lastSync: 0,
    language: 'en',
    autoMarkAsReadOnScroll: true // Default to enabled
  };
  
  try {
    const preferences = localStorage.getItem("userPreferences");
    if (preferences) {
      const parsed = JSON.parse(preferences);
      // Ensure vibesFilter exists in loaded preferences
      if (!parsed.vibesFilter) {
        parsed.vibesFilter = defaultPreferences.vibesFilter;
      }
      return parsed;
    }
    // Return default preferences
    return defaultPreferences;
  } catch (error) {
    console.error("Error loading user preferences:", error);
    return defaultPreferences;
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

export function filterArticlesByVibes(articles: Article[], preferences: any): Article[] {
  if (!preferences?.vibesFilter?.enabled) {
    return articles;
  }

  const { minVibes, maxToxicity, hideClickbait, hideRagebait } = preferences.vibesFilter;

  return articles.filter(article => {
    if (!article.vibes) return true;

    const { score, toxicity, isClickbait, isRagebait } = article.vibes;

    // Filter by vibes score
    if (score < minVibes) return false;

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
 * Generates OPML XML content from feeds
 * OPML is a standard format for exchanging lists of RSS feeds
 */
export function generateOPMLFromFeeds(feeds: FeedData[], categories: Category[]): string {
  const now = new Date().toUTCString();
  
  // Group feeds by category
  const feedsByCategory: Record<string, FeedData[]> = {};
  feeds.forEach(feed => {
    const category = feed.category || 'Uncategorized';
    if (!feedsByCategory[category]) {
      feedsByCategory[category] = [];
    }
    feedsByCategory[category].push(feed);
  });
  
  // Start building OPML
  let opml = `<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head>
    <title>RSS Feeds Export</title>
    <dateCreated>${now}</dateCreated>
    <dateModified>${now}</dateModified>
  </head>
  <body>
`;
  
  // Add feeds grouped by category
  Object.keys(feedsByCategory).forEach(categoryId => {
    const category = categories.find(c => c.id === categoryId);
    const categoryName = category?.name || categoryId;
    const categoryFeeds = feedsByCategory[categoryId];
    
    opml += `    <outline text="${escapeXml(categoryName)}" title="${escapeXml(categoryName)}">\n`;
    
    categoryFeeds.forEach(feed => {
      opml += `      <outline type="rss" text="${escapeXml(feed.title)}" title="${escapeXml(feed.title)}" xmlUrl="${escapeXml(feed.url)}" htmlUrl="${escapeXml(feed.url)}"`;
      
      // Add tags if available
      if (feed.tags && feed.tags.length > 0) {
        opml += ` category="${escapeXml(feed.tags.join(','))}"`;
      }
      
      opml += `/>\n`;
    });
    
    opml += `    </outline>\n`;
  });
  
  opml += `  </body>
</opml>`;
  
  return opml;
}

/**
 * Helper function to escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
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

/**
 * Provides alternative RSS sources when RSSHub feeds fail
 * This helps users find working alternatives to problematic feeds
 */
export function getAlternativeRSSSources(failedUrl: string): { title: string; url: string; description: string }[] {
  const url = new URL(failedUrl);
  
  // RSSHub alternatives for common services
  if (url.hostname === 'rsshub.app') {
    const path = url.pathname;
    
    // Twitter alternatives
    if (path.includes('/twitter/')) {
      return [
        {
          title: "Nitter RSS (Twitter Alternative)",
          url: `https://nitter.net/${path.split('/').pop()}/rss`,
          description: "Nitter provides RSS feeds for Twitter accounts"
        },
        {
          title: "RSS.app Twitter",
          url: `https://rss.app/rss/feed/${path.split('/').pop()}`,
          description: "RSS.app can create RSS feeds from Twitter accounts"
        }
      ];
    }
    
    // GitHub alternatives
    if (path.includes('/github/')) {
      return [
        {
          title: "GitHub RSS (Official)",
          url: `https://github.com/${path.split('/').pop()}.atom`,
          description: "Official GitHub RSS feeds for repositories and users"
        }
      ];
    }
    
    // General alternatives
    return [
      {
        title: "RSS.app",
        url: "https://rss.app/",
        description: "Create RSS feeds from any website"
      },
      {
        title: "Feed43",
        url: "https://feed43.com/",
        description: "Convert any web page to RSS feed"
      },
      {
        title: "RSSHub (Self-hosted)",
        url: "https://github.com/DIYgod/RSSHub",
        description: "Self-host RSSHub instance for better reliability"
      }
    ];
  }
  
  return [];
}

/**
 * Enhanced RSS fetching with better error handling and alternatives
 */
export async function fetchAndParseRSSWithFallbacks(url: string): Promise<{ data: any; alternatives?: any[] } | null> {
  try {
    const data = await fetchAndParseRSS(url);
    if (data) {
      return { data };
    }
  } catch (error) {
    console.warn(`Failed to fetch RSS from ${url}:`, error);
  }
  
  // If the original URL failed, try to find alternatives
  const alternatives = getAlternativeRSSSources(url);
  if (alternatives.length > 0) {
    console.log(`Found ${alternatives.length} alternative RSS sources for ${url}`);
    return { data: null, alternatives };
  }
  
  return null;
}

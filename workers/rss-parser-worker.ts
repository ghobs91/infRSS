// RSS Parser Web Worker - uses browser APIs for XML parsing
// This worker handles RSS feed parsing without requiring server-side libraries

interface Article {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  content: string;
  summary: string;
  sourceDomain: string;
  readStatus: 'read' | 'unread';
  tags: string[];
  vibes?: any;
}

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

/**
 * Helper function to clean XML content before parsing.
 * Handles malformed CDATA patterns and other common XML issues.
 */
function cleanXMLContent(xmlString: string): string {
  // Normalize line endings
  xmlString = xmlString.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // STEP 1: Handle malformed CDATA patterns
  xmlString = xmlString.replace(/><!\[CDATA\[><!\[CDATA\[><!\[CDATA\[>>/g, '>');
  xmlString = xmlString.replace(/><!\[CDATA\[><!\[CDATA\[>>/g, '>');
  xmlString = xmlString.replace(/><!\[CDATA\[>>/g, '>');
  xmlString = xmlString.replace(/><!\[CDATA\[>/g, '>');

  // STEP 2: Remove invalid XML characters
  xmlString = xmlString.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F]/g, '');

  // STEP 3: Fix unclosed CDATA sections
  const cdataStartCount = (xmlString.match(/<!\[CDATA\[/g) || []).length;
  const cdataEndCount = (xmlString.match(/\]\]>/g) || []).length;
  
  if (cdataStartCount > cdataEndCount) {
    xmlString = xmlString.replace(/<!\[CDATA\[([^<]*?)(?=<(?!!\[CDATA\[))/g, (match, content) => {
      if (!content.includes(']]>')) {
        return `<![CDATA[${content}]]>`;
      }
      return match;
    });
  }

  // STEP 4: Handle problematic ]]> sequences
  const cdataEndMarker = '___CDATA_END_MARKER___';
  xmlString = xmlString.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (match, content) => {
    return `<![CDATA[${content}${cdataEndMarker}`;
  });
  
  xmlString = xmlString.replace(/\]\]>/g, ']] >');
  xmlString = xmlString.replace(new RegExp(cdataEndMarker, 'g'), ']]>');
  
  // STEP 5: Remove HTML5 boolean attributes
  const cdataProtectionMarker = '___PROTECTED_CDATA_';
  const protectedCDataSections: string[] = [];
  xmlString = xmlString.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (match, content) => {
    protectedCDataSections.push(content);
    return `${cdataProtectionMarker}${protectedCDataSections.length - 1}___`;
  });
  
  xmlString = xmlString
    .replace(/<(img|br|hr|input|meta|link|area|base|col|embed|param|source|track|wbr|path|circle|rect|svg|use|line|polygon|polyline|ellipse|g|defs|clipPath|mask|pattern|stop|linearGradient|radialGradient)([^>]*?)(?<!\/)>/gi, '<$1$2 />')
    .replace(/\s(allowfullscreen|allowpaymentrequest|async|autofocus|autoplay|checked|controls|default|defer|disabled|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|nomodule|novalidate|open|playsinline|readonly|required|reversed|selected|truespeed|typemustmatch|data-lazy|data-src|data-srcset|data-background|data-background-image|consumption-data|frameborder|scrolling|noresize|declare|compact|noshade|nowrap|inert)(?=\s|>|\/)/gi, ' ')
    .replace(/\sdata-[\w-]+(?=\s|>|\/)/g, ' ')
    .replace(/\saria-[\w-]+(?=\s|>|\/)/g, ' ');
  
  xmlString = xmlString.replace(/___PROTECTED_CDATA_(\d+)___/g, (match, index) => {
    return `<![CDATA[${protectedCDataSections[parseInt(index)]}]]>`;
  });

  return xmlString;
}



/**
 * Simple XML tag extractor (regex-based, no DOMParser needed)
 */
function extractTag(xml: string, tagName: string, offset: number = 0): { content: string; end: number } | null {
  const escapedTag = tagName.replace(/:/g, '\\:');
  const openRegex = new RegExp(`<${escapedTag}[^>]*?>`, 'i');
  const closeRegex = new RegExp(`<\\/${escapedTag}>`, 'i');
  
  const searchStr = xml.substring(offset);
  const openMatch = searchStr.match(openRegex);
  
  if (!openMatch) return null;
  
  const openPos = openMatch.index! + openMatch[0].length;
  const closeMatch = searchStr.substring(openPos).match(closeRegex);
  
  if (!closeMatch) return null;
  
  const content = searchStr.substring(openPos, openPos + closeMatch.index!);
  return {
    content: content.trim(),
    end: offset + openPos + closeMatch.index! + closeMatch[0].length
  };
}

/**
 * Extract all items/entries from XML
 */
function extractItems(xml: string): string[] {
  const items: string[] = [];
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

/**
 * Extract thumbnail from item XML
 */
function extractThumbnailFromXML(itemXml: string): string | undefined {
  // Try enclosure with image type
  let match = itemXml.match(/<enclosure[^>]+type=["']image[^>]+url=["']([^"']+)["']/i);
  if (match) return match[1];
  
  match = itemXml.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]+type=["']image/i);
  if (match) return match[1];
  
  // Try media:content
  match = itemXml.match(/<media:content[^>]+url=["']([^"']+)["']/i);
  if (match) return match[1];
  
  // Try media:thumbnail
  match = itemXml.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i);
  if (match) return match[1];
  
  // Try to find img in description
  const descMatch = itemXml.match(/<description[^>]*?><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i) ||
                   itemXml.match(/<description[^>]*?>([\s\S]*?)<\/description>/i);
  
  if (descMatch) {
    const imgMatch = descMatch[1].match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch) return imgMatch[1];
  }
  
  return undefined;
}

/**
 * Clean text content (remove CDATA, HTML tags, decode entities)
 */
function cleanText(text: string): string {
  if (!text) return '';
  
  // Remove CDATA
  text = text.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
  
  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  text = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
  
  // Normalize whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}

/**
 * Parse RSS feed from XML text (without DOMParser)
 */
function parseRSSFeed(xmlText: string, feedUrl: string): { title: string; items: Article[] } | null {
  try {
    const text = xmlText;

    // Extract feed title using regex
    const titleMatch = text.match(/<(?:channel|feed)>[\s\S]*?<title[^>]*?>([\s\S]*?)<\/title>/i);
    let channelTitle = "Unknown Feed";
    if (titleMatch) {
      channelTitle = cleanText(titleMatch[1]);
    }
    if (!channelTitle || channelTitle === "Unknown Feed") {
      try {
        channelTitle = new URL(feedUrl).hostname.replace("www.", "");
      } catch {}
    }

    // Extract all items
    const itemsXml = extractItems(text);
    
    if (itemsXml.length === 0) {
      console.error(`❌ Worker found no items/entries in feed: ${feedUrl}`);
      return null;
    }

    console.log(`🔧 Worker found ${itemsXml.length} items in: ${feedUrl}`);

    const parsedItems: Article[] = itemsXml.map((itemXml, index) => {
      // Extract title
      const titleMatch = itemXml.match(/<title[^>]*?>([\s\S]*?)<\/title>/i);
      let title = titleMatch ? cleanText(titleMatch[1]) : `Untitled Article ${index + 1}`;
      
      if (title.length > 200) {
        title = title.substring(0, 200) + '...';
      }
      
      // Extract link
      let link = '';
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
      
      // Extract pubDate with robust parsing
      const pubDateMatch = itemXml.match(/<(?:pubDate|published|updated|dc:date|date)[^>]*?>([\s\S]*?)<\/(?:pubDate|published|updated|dc:date|date)>/i);
      const pubDateRaw = pubDateMatch ? cleanText(pubDateMatch[1]) : null;
      const pubDate = parseRSSDate(pubDateRaw) || new Date(0).toISOString(); // Use epoch time for unavailable dates
      
      // Extract content
      let content = '';
      const contentMatch = itemXml.match(/<(?:description|content:encoded|content|summary)[^>]*?>([\s\S]*?)<\/(?:description|content:encoded|content|summary)>/i);
      if (contentMatch) {
        content = cleanText(contentMatch[1]);
        if (content.length > 1000) {
          content = content.substring(0, 1000) + '...';
        }
      }
      
      // Extract summary
      let summary = '';
      const summaryMatch = itemXml.match(/<(?:description|summary)[^>]*?>([\s\S]*?)<\/(?:description|summary)>/i);
      if (summaryMatch) {
        summary = cleanText(summaryMatch[1]);
      }
      
      if (!summary && content) {
        summary = content.length > 300 ? content.substring(0, 300) + '...' : content;
      } else if (summary && summary.length > 300) {
        summary = summary.substring(0, 300) + '...';
      }
      
      // Extract thumbnail
      const thumbnail = extractThumbnailFromXML(itemXml);
      
      // Extract source domain
      let sourceDomain = "Unknown Source";
      if (link) {
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
        readStatus: 'unread' as const,
        tags: []
      };
    });

    console.log(`✅ Worker successfully parsed ${parsedItems.length} items from ${feedUrl}`);
    return {
      title: channelTitle,
      items: parsedItems
    };
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return null;
  }
}

// Worker message handler
self.onmessage = async (e: MessageEvent) => {
  const { type, data } = e.data;
  
  try {
    switch (type) {
      case 'parse_rss':
        const { xmlText, feedUrl } = data;
        const result = parseRSSFeed(xmlText, feedUrl);
        
        if (result) {
          postMessage({
            type: 'rss_parsed',
            data: result
          });
        } else {
          postMessage({
            type: 'error',
            error: 'Failed to parse RSS feed'
          });
        }
        break;
        
      default:
        console.warn('Unknown message type:', type);
    }
  } catch (error) {
    console.error('Worker error:', error);
    postMessage({
      type: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

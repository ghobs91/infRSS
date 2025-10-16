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
 * Extract thumbnail from RSS item - Enhanced version
 * Supports multiple formats: enclosure, media:content, media:thumbnail, 
 * content/description img tags, and various other patterns
 */
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
        // Create a temporary DOM to parse HTML content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = description;
        
        // Look for img tags in the content
        const imgTag = tempDiv.querySelector("img");
        if (imgTag) {
          thumbnail = imgTag.getAttribute("src") || 
                     imgTag.getAttribute("data-src") || 
                     imgTag.getAttribute("data-lazy-src") || undefined;
        }
        
        // Also check for Open Graph images in content
        if (!thumbnail) {
          const ogImage = tempDiv.querySelector("meta[property='og:image']");
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
  
  // 7. Try any element with 'thumbnail' in the name
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
 * Parse RSS feed from XML text
 */
function parseRSSFeed(xmlText: string, feedUrl: string): { title: string; items: Article[] } | null {
  try {
    let text = xmlText;

    // Add media namespace if missing
    if (text.includes('media:content') && !text.includes('xmlns:media')) {
      text = text.replace(
        /<rss[^>]*>/,
        match => match.replace('>', ' xmlns:media="http://search.yahoo.com/mrss/">')
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

    // Fix common tag issues
    text = text
      .replace(/<br\s*(?=[^/>]*>)/gi, '<br />')
      .replace(/<img([^>]*?)(?<!\/)>/gi, '<img$1 />')
      .replace(/<hr\s*(?=[^/>]*>)/gi, '<hr />')
      .replace(/<!\[CDATA\[([^\]>]*?)(?!\]\]>)/g, (match, content) => {
        if (!content.includes(']]>')) {
          return `<![CDATA[${content}]]>`;
        }
        return match;
      });

    // Replace HTML entities with their numeric equivalents or safe alternatives
    // This must be done BEFORE &amp; replacement to avoid double-escaping
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
      .replace(/&divide;/g, '&#247;');
    
    // Now escape remaining unescaped ampersands (after HTML entities are converted)
    text = text.replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');

    // Clean the XML
    const cleanedXML = cleanXMLContent(text);

    // Parse XML
    const parser = new DOMParser();
    let xmlDoc = parser.parseFromString(cleanedXML, "text/xml");

    // Check for parsing errors
    const parseError = xmlDoc.querySelector("parsererror");
    if (parseError) {
      console.error('XML parsing error:', parseError.textContent);
      
      // Try aggressive cleaning
      if (parseError.textContent?.includes("CData section not finished") || 
          parseError.textContent?.includes("Sequence ']]>' not allowed") ||
          parseError.textContent?.includes("Specification mandates value for attribute") ||
          parseError.textContent?.includes("Entity") ||
          parseError.textContent?.includes("not defined") ||
          parseError.textContent?.includes("CDATA")) {
        
        let aggressiveCleaned = text;
        
        // First, replace ALL HTML entities with numeric equivalents
        aggressiveCleaned = aggressiveCleaned
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
          .replace(/&frac14;/g, '&#188;')
          .replace(/&frac12;/g, '&#189;')
          .replace(/&frac34;/g, '&#190;')
          .replace(/&iexcl;/g, '&#161;')
          .replace(/&iquest;/g, '&#191;')
          .replace(/&Agrave;/g, '&#192;')
          .replace(/&Aacute;/g, '&#193;')
          .replace(/&Acirc;/g, '&#194;')
          .replace(/&Atilde;/g, '&#195;')
          .replace(/&Auml;/g, '&#196;')
          .replace(/&Aring;/g, '&#197;')
          .replace(/&AElig;/g, '&#198;')
          .replace(/&Ccedil;/g, '&#199;')
          .replace(/&Egrave;/g, '&#200;')
          .replace(/&Eacute;/g, '&#201;')
          .replace(/&Ecirc;/g, '&#202;')
          .replace(/&Euml;/g, '&#203;')
          .replace(/&Igrave;/g, '&#204;')
          .replace(/&Iacute;/g, '&#205;')
          .replace(/&Icirc;/g, '&#206;')
          .replace(/&Iuml;/g, '&#207;')
          .replace(/&ETH;/g, '&#208;')
          .replace(/&Ntilde;/g, '&#209;')
          .replace(/&Ograve;/g, '&#210;')
          .replace(/&Oacute;/g, '&#211;')
          .replace(/&Ocirc;/g, '&#212;')
          .replace(/&Otilde;/g, '&#213;')
          .replace(/&Ouml;/g, '&#214;')
          .replace(/&Oslash;/g, '&#216;')
          .replace(/&Ugrave;/g, '&#217;')
          .replace(/&Uacute;/g, '&#218;')
          .replace(/&Ucirc;/g, '&#219;')
          .replace(/&Uuml;/g, '&#220;')
          .replace(/&Yacute;/g, '&#221;')
          .replace(/&THORN;/g, '&#222;')
          .replace(/&szlig;/g, '&#223;')
          .replace(/&agrave;/g, '&#224;')
          .replace(/&aacute;/g, '&#225;')
          .replace(/&acirc;/g, '&#226;')
          .replace(/&atilde;/g, '&#227;')
          .replace(/&auml;/g, '&#228;')
          .replace(/&aring;/g, '&#229;')
          .replace(/&aelig;/g, '&#230;')
          .replace(/&ccedil;/g, '&#231;')
          .replace(/&egrave;/g, '&#232;')
          .replace(/&eacute;/g, '&#233;')
          .replace(/&ecirc;/g, '&#234;')
          .replace(/&euml;/g, '&#235;')
          .replace(/&igrave;/g, '&#236;')
          .replace(/&iacute;/g, '&#237;')
          .replace(/&icirc;/g, '&#238;')
          .replace(/&iuml;/g, '&#239;')
          .replace(/&eth;/g, '&#240;')
          .replace(/&ntilde;/g, '&#241;')
          .replace(/&ograve;/g, '&#242;')
          .replace(/&oacute;/g, '&#243;')
          .replace(/&ocirc;/g, '&#244;')
          .replace(/&otilde;/g, '&#245;')
          .replace(/&ouml;/g, '&#246;')
          .replace(/&oslash;/g, '&#248;')
          .replace(/&ugrave;/g, '&#249;')
          .replace(/&uacute;/g, '&#250;')
          .replace(/&ucirc;/g, '&#251;')
          .replace(/&uuml;/g, '&#252;')
          .replace(/&yacute;/g, '&#253;')
          .replace(/&thorn;/g, '&#254;')
          .replace(/&yuml;/g, '&#255;');
        
        const cdataMarker = '___LEGIT_CDATA_END___';
        aggressiveCleaned = aggressiveCleaned.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (match, content) => {
          return `<![CDATA[${content}${cdataMarker}`;
        });
        
        aggressiveCleaned = aggressiveCleaned.replace(/\]\]>/g, ']] &gt;');
        aggressiveCleaned = aggressiveCleaned.replace(new RegExp(cdataMarker, 'g'), ']]>');
        
        aggressiveCleaned = aggressiveCleaned
          .replace(/<(img|br|hr|input|meta|link|area|base|col|embed|param|source|track|wbr|path|circle|rect|svg|use)([^>]*?)(?<!\/)>/gi, '<$1$2 />')
          .replace(/\s(allowfullscreen|allowpaymentrequest|async|autofocus|autoplay|checked|controls|default|defer|disabled|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|nomodule|novalidate|open|playsinline|readonly|required|reversed|selected|truespeed|typemustmatch|data-lazy|data-src|data-srcset|data-background|data-background-image|consumption-data|frameborder|scrolling|noresize|declare|compact|noshade|nowrap|inert)\s*(?=[>\s\/])/gi, ' ')
          .replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');
        
        xmlDoc = parser.parseFromString(aggressiveCleaned, "text/xml");
        const secondParseError = xmlDoc.querySelector("parsererror");
        
        if (secondParseError) {
          console.warn('Aggressive cleaning failed, trying CDATA stripping...');
          const cdataStripped = text
            // First replace HTML entities
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
            .replace(/&copy;/g, '&#169;')
            .replace(/&reg;/g, '&#174;')
            .replace(/&trade;/g, '&#8482;')
            // Then handle CDATA
            .replace(/\]\]/g, '] ]')
            .replace(/<!\[CDATA\[/g, '')
            .replace(/] ]>/g, '] ] ')
            .replace(/<(img|br|hr|input|meta|link|area|base|col|embed|param|source|track|wbr|path|circle|rect|svg|use)([^>]*?)(?<!\/)>/gi, '<$1$2 />')
            .replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');
          
          xmlDoc = parser.parseFromString(cdataStripped, "text/xml");
          const thirdParseError = xmlDoc.querySelector("parsererror");
          
          if (thirdParseError) {
            return null;
          }
        }
      }
    }

    // Extract channel title
    const channelTitle = xmlDoc.querySelector("channel > title")?.textContent || 
                        xmlDoc.querySelector("feed > title")?.textContent ||
                        new URL(feedUrl).hostname.replace("www.", "");

    // Handle both RSS and Atom feeds
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
      
      // Clean the title
      if (title) {
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
      }
      
      const link = item.querySelector("link")?.textContent?.trim() || 
                  item.querySelector("link")?.getAttribute("href") ||
                  item.querySelector("id")?.textContent?.trim() || 
                  "";
      
      const pubDate = item.querySelector("pubDate")?.textContent?.trim() || 
                     item.querySelector("published")?.textContent?.trim() || 
                     item.querySelector("updated")?.textContent?.trim() || 
                     new Date().toISOString();
      
      let content = item.querySelector("description")?.textContent?.trim() || 
                   item.querySelector("content")?.textContent?.trim() || 
                   item.querySelector("summary")?.textContent?.trim() || 
                   "";
      
      // Clean the content
      if (content) {
        content = content.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
        content = content.replace(/<[^>]*>/g, '');
        content = content.replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&quot;/g, '"')
                        .replace(/&#39;/g, "'")
                        .replace(/&nbsp;/g, ' ');
        content = content.replace(/\s+/g, ' ').trim();
        
        if (content.length > 1000) {
          content = content.substring(0, 1000) + '...';
        }
      }
      
      let summary = item.querySelector("description")?.textContent?.trim() || 
                   item.querySelector("summary")?.textContent?.trim() || 
                   "";
      
      if (summary && summary !== content) {
        summary = summary.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
        summary = summary.replace(/<[^>]*>/g, '');
        summary = summary.replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&quot;/g, '"')
                        .replace(/&#39;/g, "'")
                        .replace(/&nbsp;/g, ' ');
        summary = summary.replace(/\s+/g, ' ').trim();
        
        if (summary.length > 300) {
          summary = summary.substring(0, 300) + '...';
        }
      } else if (content) {
        summary = content.length > 300 ? content.substring(0, 300) + '...' : content;
      }
      
      const thumbnail = extractThumbnailFromItem(item);
      
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

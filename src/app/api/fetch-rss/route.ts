import { NextResponse } from 'next/server';

// Use Node.js runtime for better Netlify compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Simple RSS parser for preview purposes
function parseRSSPreview(xmlText: string): { title: string; items: any[] } | null {
  try {
    // Parse the XML manually (server-side, no DOMParser)
    const rssMatch = xmlText.match(/<rss[^>]*>/i);
    const atomMatch = xmlText.match(/<feed[^>]*>/i);
    
    if (!rssMatch && !atomMatch) {
      return null;
    }

    const isAtom = !!atomMatch;
    
    // Extract feed title
    let title = 'Untitled Feed';
    const titleMatch = isAtom 
      ? xmlText.match(/<title[^>]*>([^<]+)<\/title>/i)
      : xmlText.match(/<channel[^>]*>[\s\S]*?<title[^>]*>([^<]+)<\/title>/i);
    
    if (titleMatch) {
      title = titleMatch[1].trim();
    }

    // Extract items (get first 3 for preview)
    const items: any[] = [];
    const itemTag = isAtom ? 'entry' : 'item';
    const itemRegex = new RegExp(`<${itemTag}[^>]*>([\\s\\S]*?)<\\/${itemTag}>`, 'gi');
    const matches = [...xmlText.matchAll(itemRegex)].slice(0, 3);

    for (const match of matches) {
      const itemContent = match[1];
      
      // Extract title
      const itemTitleMatch = itemContent.match(/<title[^>]*>([^<]+)<\/title>/i);
      const itemTitle = itemTitleMatch ? itemTitleMatch[1].trim() : 'Untitled';
      
      // Extract link
      let itemLink = '';
      if (isAtom) {
        const linkMatch = itemContent.match(/<link[^>]*href=["']([^"']+)["']/i);
        itemLink = linkMatch ? linkMatch[1] : '';
      } else {
        const linkMatch = itemContent.match(/<link[^>]*>([^<]+)<\/link>/i);
        itemLink = linkMatch ? linkMatch[1].trim() : '';
      }
      
      // Extract date
      const pubDateMatch = itemContent.match(/<(?:pubDate|published|updated)[^>]*>([^<]+)<\/(?:pubDate|published|updated)>/i);
      const pubDate = pubDateMatch ? pubDateMatch[1].trim() : '';

      // Extract image/thumbnail
      let imageUrl = '';
      // Try media:content (common in RSS)
      const mediaMatch = itemContent.match(/<media:content[^>]*url=["']([^"']+)["']/i);
      if (mediaMatch) {
        imageUrl = mediaMatch[1];
      } else {
        // Try media:thumbnail
        const thumbMatch = itemContent.match(/<media:thumbnail[^>]*url=["']([^"']+)["']/i);
        if (thumbMatch) {
          imageUrl = thumbMatch[1];
        } else {
          // Try enclosure tag
          const enclosureMatch = itemContent.match(/<enclosure[^>]*url=["']([^"']+)["'][^>]*type=["']image/i);
          if (enclosureMatch) {
            imageUrl = enclosureMatch[1];
          } else {
            // Try to find first image in content/description
            const imgMatch = itemContent.match(/<img[^>]*src=["']([^"']+)["']/i);
            if (imgMatch) {
              imageUrl = imgMatch[1];
            }
          }
        }
      }

      // Decode HTML entities in title
      const decodedTitle = itemTitle
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&apos;/g, "'");

      items.push({
        title: decodedTitle,
        link: itemLink,
        pubDate: pubDate,
        imageUrl: imageUrl
      });
    }

    return { title, items };
  } catch (error) {
    console.error('Error parsing RSS:', error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; InfrssBot/1.0; +https://infrss.vercel.app)'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    
    // Parse the RSS/Atom feed
    const result = parseRSSPreview(text);
    
    if (!result) {
      throw new Error('Failed to parse RSS feed');
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching RSS:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch RSS feed' },
      { status: 500 }
    );
  }
}

// Increase the response size limit for RSS feeds
export const maxDuration = 60; // Maximum execution time in seconds 
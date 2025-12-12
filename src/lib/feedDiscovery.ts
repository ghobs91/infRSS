// lib/feedDiscovery.ts
// Intelligent RSS feed discovery with multiple fallback strategies

export interface FeedDiscoveryResult {
  url: string;
  title?: string;
  type?: string; // 'rss' | 'atom' | 'json'
  confidence: number; // 0-1, higher is better
  source: string; // Where we found this feed
}

/**
 * Intelligently discovers RSS feeds from a given URL using multiple strategies:
 * 1. Direct RSS check
 * 2. Meta tags in HTML
 * 3. Parent page meta tags
 * 4. Sitemap.xml
 * 5. Common suffixes
 * 6. Parent page common suffixes
 * 7. Blog-specific meta tags
 * 8. Blog-specific common suffixes
 * 9. Third-party feed services (RSSHub, RSS.app, etc.)
 */
export async function discoverFeed(inputUrl: string): Promise<FeedDiscoveryResult[]> {
  const results: FeedDiscoveryResult[] = [];
  const seenUrls = new Set<string>();

  // Normalize the input URL
  let normalizedUrl = inputUrl.trim();
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = 'https://' + normalizedUrl;
  }

  try {
    new URL(normalizedUrl);
  } catch {
    console.error(`Invalid URL: ${inputUrl}`);
    return [];
  }

  // Helper to add a result, avoiding duplicates
  const addResult = (result: FeedDiscoveryResult) => {
    const normalizedResultUrl = normalizeUrl(result.url);
    if (!seenUrls.has(normalizedResultUrl)) {
      seenUrls.add(normalizedResultUrl);
      results.push({ ...result, url: normalizedResultUrl });
    }
  };

  // Helper to fetch with timeout
  const fetchWithTimeout = async (url: string, timeout = 10000): Promise<Response | null> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      // Use proxy for client-side requests
      const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      return response.ok ? response : null;
    } catch (error) {
      console.warn(`Failed to fetch ${url}:`, error);
      return null;
    }
  };

  // Helper to parse HTML
  const parseHtml = async (url: string): Promise<Document | null> => {
    const response = await fetchWithTimeout(url);
    if (!response) return null;
    
    try {
      const html = await response.text();
      return new DOMParser().parseFromString(html, 'text/html');
    } catch {
      return null;
    }
  };

  // Helper to check if URL is a valid RSS/Atom feed
  const isValidFeed = async (url: string): Promise<{ valid: boolean; title?: string; type?: string }> => {
    const response = await fetchWithTimeout(url);
    if (!response) return { valid: false };
    
    try {
      const text = await response.text();
      const trimmed = text.trim();
      
      // Check for RSS
      if (trimmed.includes('<rss') || trimmed.includes('<channel>')) {
        const titleMatch = trimmed.match(/<title[^>]*>([^<]+)<\/title>/i);
        return { 
          valid: true, 
          title: titleMatch?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, '').trim(),
          type: 'rss'
        };
      }
      
      // Check for Atom
      if (trimmed.includes('<feed') && trimmed.includes('xmlns="http://www.w3.org/2005/Atom"')) {
        const titleMatch = trimmed.match(/<title[^>]*>([^<]+)<\/title>/i);
        return { 
          valid: true, 
          title: titleMatch?.[1]?.trim(),
          type: 'atom'
        };
      }
      
      // Check for JSON Feed
      if (trimmed.startsWith('{') && text.includes('"version":') && text.includes('"items":')) {
        try {
          const json = JSON.parse(text);
          if (json.version && json.items) {
            return { 
              valid: true, 
              title: json.title,
              type: 'json'
            };
          }
        } catch {}
      }
      
      return { valid: false };
    } catch {
      return { valid: false };
    }
  };

  console.log(`🔍 Starting intelligent feed discovery for: ${normalizedUrl}`);

  // Strategy 1: Check if the URL itself is already a feed
  console.log('📋 Strategy 1: Checking if URL is already a feed...');
  const directCheck = await isValidFeed(normalizedUrl);
  if (directCheck.valid) {
    addResult({
      url: normalizedUrl,
      title: directCheck.title,
      type: directCheck.type,
      confidence: 1.0,
      source: 'Direct URL'
    });
    console.log('✅ Found feed directly!');
  }

  // Strategy 2: Search meta tags in the main page
  console.log('📋 Strategy 2: Searching meta tags in main page...');
  const doc = await parseHtml(normalizedUrl);
  if (doc) {
    const metaTags = [
      ...Array.from(doc.querySelectorAll('link[type="application/rss+xml"]')),
      ...Array.from(doc.querySelectorAll('link[type="application/atom+xml"]')),
      ...Array.from(doc.querySelectorAll('link[type="application/feed+json"]')),
      ...Array.from(doc.querySelectorAll('link[rel="alternate"][type*="rss"]')),
      ...Array.from(doc.querySelectorAll('link[rel="alternate"][type*="atom"]')),
      ...Array.from(doc.querySelectorAll('link[rel="alternate"][type*="feed"]')),
    ];

    for (const tag of metaTags) {
      const href = tag.getAttribute('href');
      const title = tag.getAttribute('title');
      if (href) {
        try {
          const absoluteUrl = new URL(href, normalizedUrl).toString();
          const feedCheck = await isValidFeed(absoluteUrl);
          if (feedCheck.valid) {
            addResult({
              url: absoluteUrl,
              title: title || feedCheck.title,
              type: feedCheck.type,
              confidence: 0.95,
              source: 'Meta tags'
            });
            console.log(`✅ Found feed in meta tags: ${absoluteUrl}`);
          }
        } catch {
          console.warn(`Invalid href in meta tag: ${href}`);
        }
      }
    }

    // Also check for links in the page
    const feedLinks = Array.from(doc.querySelectorAll('a[href*="/feed"], a[href*="/rss"], a[href*="/atom"], a[href$=".xml"], a[href$=".rss"]'));
    for (const link of feedLinks.slice(0, 5)) { // Limit to first 5
      const href = link.getAttribute('href');
      if (href) {
        try {
          const absoluteUrl = new URL(href, normalizedUrl).toString();
          const feedCheck = await isValidFeed(absoluteUrl);
          if (feedCheck.valid) {
            addResult({
              url: absoluteUrl,
              title: feedCheck.title || link.textContent?.trim(),
              type: feedCheck.type,
              confidence: 0.85,
              source: 'Page links'
            });
            console.log(`✅ Found feed in page links: ${absoluteUrl}`);
          }
        } catch {
          console.warn(`Invalid href in link: ${href}`);
        }
      }
    }
  }

  // Strategy 3: Search meta tags in parent pages
  console.log('📋 Strategy 3: Searching meta tags in parent pages...');
  try {
    const urlObj = new URL(normalizedUrl);
    const segments = urlObj.pathname.split('/').filter(Boolean);
    
    for (let i = segments.length - 1; i > 0; i--) {
      const parentPath = segments.slice(0, i).join('/');
      const parentUrl = `${urlObj.origin}/${parentPath}`;
      
      console.log(`  Checking parent: ${parentUrl}`);
      const parentDoc = await parseHtml(parentUrl);
      if (parentDoc) {
        const parentMetaTags = [
          ...Array.from(parentDoc.querySelectorAll('link[type="application/rss+xml"]')),
          ...Array.from(parentDoc.querySelectorAll('link[type="application/atom+xml"]')),
          ...Array.from(parentDoc.querySelectorAll('link[rel="alternate"][type*="rss"]')),
          ...Array.from(parentDoc.querySelectorAll('link[rel="alternate"][type*="atom"]')),
        ];

        for (const tag of parentMetaTags) {
          const href = tag.getAttribute('href');
          if (href) {
            try {
              const absoluteUrl = new URL(href, parentUrl).toString();
              const feedCheck = await isValidFeed(absoluteUrl);
              if (feedCheck.valid) {
                addResult({
                  url: absoluteUrl,
                  title: tag.getAttribute('title') || feedCheck.title,
                  type: feedCheck.type,
                  confidence: 0.90,
                  source: `Parent page meta tags (${parentPath})`
                });
                console.log(`✅ Found feed in parent page meta tags: ${absoluteUrl}`);
              }
            } catch {
              console.warn(`Invalid href in parent meta tag: ${href}`);
            }
          }
        }
      }
    }
  } catch (error) {
    console.warn('Error during parent page search:', error);
  }

  // Strategy 4: Check sitemap.xml
  console.log('📋 Strategy 4: Checking sitemap.xml...');
  try {
    const urlObj = new URL(normalizedUrl);
    const sitemapUrl = `${urlObj.origin}/sitemap.xml`;
    
    const response = await fetchWithTimeout(sitemapUrl);
    if (response) {
      const xml = await response.text();
      // Look for feed-like URLs in sitemap
      const feedPatterns = [
        /<loc>([^<]*(?:feed|rss|atom)[^<]*)<\/loc>/gi,
        /<loc>([^<]*\.(?:xml|rss|atom))<\/loc>/gi
      ];
      
      for (const pattern of feedPatterns) {
        const matches = xml.matchAll(pattern);
        for (const match of matches) {
          const url = match[1];
          if (url) {
            const feedCheck = await isValidFeed(url);
            if (feedCheck.valid) {
              addResult({
                url,
                title: feedCheck.title,
                type: feedCheck.type,
                confidence: 0.80,
                source: 'Sitemap.xml'
              });
              console.log(`✅ Found feed in sitemap: ${url}`);
            }
          }
        }
      }
    }
  } catch (error) {
    console.warn('Error checking sitemap:', error);
  }

  // Strategy 5: Try common suffixes on the main URL
  console.log('📋 Strategy 5: Trying common feed suffixes...');
  const commonSuffixes = [
    '/feed',
    '/feed/',
    '/rss',
    '/rss.xml',
    '/atom.xml',
    '/feed.xml',
    '/index.xml',
    '?feed=rss',
    '?feed=rss2',
    '?feed=atom',
    '/feeds/posts/default', // Blogger
    '/feeds/posts/default?alt=rss', // Blogger RSS
  ];

  const urlObj = new URL(normalizedUrl);
  const baseUrl = normalizedUrl.replace(/\/$/, ''); // Remove trailing slash

  for (const suffix of commonSuffixes) {
    const testUrl = baseUrl + suffix;
    const feedCheck = await isValidFeed(testUrl);
    if (feedCheck.valid) {
      addResult({
        url: testUrl,
        title: feedCheck.title,
        type: feedCheck.type,
        confidence: 0.85,
        source: `Common suffix (${suffix})`
      });
      console.log(`✅ Found feed with suffix: ${testUrl}`);
    }
  }

  // Strategy 6: Try common suffixes on parent URLs
  console.log('📋 Strategy 6: Trying common suffixes on parent pages...');
  try {
    const segments = urlObj.pathname.split('/').filter(Boolean);
    
    for (let i = segments.length - 1; i > 0; i--) {
      const parentPath = segments.slice(0, i).join('/');
      const parentBase = `${urlObj.origin}/${parentPath}`.replace(/\/$/, '');
      
      for (const suffix of commonSuffixes.slice(0, 6)) { // Try fewer on parent pages
        const testUrl = parentBase + suffix;
        const feedCheck = await isValidFeed(testUrl);
        if (feedCheck.valid) {
          addResult({
            url: testUrl,
            title: feedCheck.title,
            type: feedCheck.type,
            confidence: 0.75,
            source: `Parent page suffix (${parentPath}${suffix})`
          });
          console.log(`✅ Found feed with parent suffix: ${testUrl}`);
        }
      }
    }
  } catch (error) {
    console.warn('Error checking parent page suffixes:', error);
  }

  // Strategy 7: Search for blog-specific meta tags
  console.log('📋 Strategy 7: Searching blog-specific meta tags...');
  if (doc) {
    const blogMetaTags = [
      doc.querySelector('meta[name="blog-channel-url"]'),
      doc.querySelector('meta[name="blog-feed-url"]'),
      doc.querySelector('meta[property="og:see_also"]'),
      doc.querySelector('meta[name="syndication-source"]'),
    ];

    for (const meta of blogMetaTags) {
      if (meta) {
        const content = meta.getAttribute('content');
        if (content) {
          try {
            const absoluteUrl = new URL(content, normalizedUrl).toString();
            const feedCheck = await isValidFeed(absoluteUrl);
            if (feedCheck.valid) {
              addResult({
                url: absoluteUrl,
                title: feedCheck.title,
                type: feedCheck.type,
                confidence: 0.88,
                source: 'Blog meta tags'
              });
              console.log(`✅ Found feed in blog meta tags: ${absoluteUrl}`);
            }
          } catch {
            console.warn(`Invalid blog meta content: ${content}`);
          }
        }
      }
    }
  }

  // Strategy 8: Try blog-specific common suffixes
  console.log('📋 Strategy 8: Trying blog-specific suffixes...');
  const blogSuffixes = [
    '/blog/feed',
    '/blog/rss',
    '/blog/rss.xml',
    '/blog/atom.xml',
    '/blog/feed.xml',
    '/wp-rss2.php', // WordPress
    '/wp-feed.php', // WordPress
    '/blog/?feed=rss',
    '/blog/?feed=rss2',
    '/articles/feed',
    '/news/feed',
    '/posts/feed',
  ];

  for (const suffix of blogSuffixes) {
    const testUrl = `${urlObj.origin}${suffix}`;
    const feedCheck = await isValidFeed(testUrl);
    if (feedCheck.valid) {
      addResult({
        url: testUrl,
        title: feedCheck.title,
        type: feedCheck.type,
        confidence: 0.80,
        source: `Blog suffix (${suffix})`
      });
      console.log(`✅ Found feed with blog suffix: ${testUrl}`);
    }
  }

  // Strategy 9: Check third-party feed services
  console.log('📋 Strategy 9: Checking third-party feed services...');
  const thirdPartyFeeds = await checkThirdPartyFeeds(normalizedUrl);
  for (const feed of thirdPartyFeeds) {
    addResult(feed);
    console.log(`✅ Found third-party feed: ${feed.url}`);
  }

  // Sort results by confidence (highest first)
  results.sort((a, b) => b.confidence - a.confidence);

  console.log(`🎉 Discovery complete! Found ${results.length} potential feeds`);
  return results;
}

/**
 * Check for feeds from third-party services
 */
async function checkThirdPartyFeeds(url: string): Promise<FeedDiscoveryResult[]> {
  const results: FeedDiscoveryResult[] = [];
  
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace(/^www\./, '');
    
    // RSSHub routes for popular services
    const rsshubRoutes: Record<string, string> = {
      'twitter.com': `/twitter/user/${urlObj.pathname.split('/')[1]}`,
      'x.com': `/twitter/user/${urlObj.pathname.split('/')[1]}`,
      'youtube.com': `/youtube/channel/${urlObj.searchParams.get('channel_id') || urlObj.pathname.split('/')[2]}`,
      'reddit.com': `/reddit${urlObj.pathname}`,
      'medium.com': `/medium/${urlObj.pathname.split('/')[1]}`,
      'github.com': `/github/repos/${urlObj.pathname}`,
      'instagram.com': `/instagram/user/${urlObj.pathname.split('/')[1]}`,
      'tiktok.com': `/tiktok/user/${urlObj.pathname.split('/')[1]}`,
    };

    if (rsshubRoutes[domain]) {
      results.push({
        url: `https://rsshub.app${rsshubRoutes[domain]}`,
        title: `RSSHub - ${domain}`,
        confidence: 0.70,
        source: 'RSSHub (Third-party)'
      });
    }

    // Prefer direct feed discovery and structured third-party sources (like RSSHub).
    // Do NOT use RSS.app's generated-feed fallback here — prefer direct URL formats.
    // Keep OpenRSS as a low-confidence fallback.
    results.push({
      url: `https://openrss.org/${encodeURIComponent(url)}`,
      title: 'OpenRSS - Generated Feed',
      confidence: 0.45,
      source: 'OpenRSS (Third-party generator)'
    });

  } catch (error) {
    console.warn('Error generating third-party feed URLs:', error);
  }

  return results;
}

/**
 * Normalize URL for comparison (remove trailing slash, lowercase, etc.)
 */
function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.toString().replace(/\/$/, '').toLowerCase();
  } catch {
    return url.replace(/\/$/, '').toLowerCase();
  }
}

/**
 * Get a user-friendly description of the discovery result
 */
export function getDiscoveryResultDescription(result: FeedDiscoveryResult): string {
  const confidence = Math.round(result.confidence * 100);
  return `Found via ${result.source} (${confidence}% confidence)`;
}

/**
 * Quick discovery function that returns the best feed found
 */
export async function discoverBestFeed(url: string): Promise<string | null> {
  const results = await discoverFeed(url);
  return results.length > 0 ? results[0].url : null;
}

// Wikipedia API service to fetch ownership information about entities

interface WikipediaSearchResult {
  title: string;
  description?: string;
  extract?: string;
}

interface OwnershipInfo {
  owner?: string;
  parentCompany?: string;
  error?: string;
}

// In-memory cache for Wikipedia lookups to avoid repeated API calls
const ownershipCache = new Map<string, OwnershipInfo>();

// LocalStorage key for persistent cache
const CACHE_KEY = 'wikipedia_ownership_cache';
const CACHE_VERSION = 'v1'; // Increment to invalidate old cache

// Wikipedia API access token
const WIKIPEDIA_ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyOTlkOGM5NTcyYzljYzM1ODcwY2E3ZjMxNjAwMmExMSIsImp0aSI6IjQ2Njc4YjUwNDdiNWM3YmYzMzg2OTQ3YTcwZDBlMmZhZDdkN2Y1ZDVhMzE4ZjNkNTEwOTcwZTJkYzFlZjU4YjY1MDg5OTAxMjRlZTQ0ZjQ5IiwiaWF0IjoxNzY0MzMzMzk5LjU2NjI2NSwibmJmIjoxNzY0MzMzMzk5LjU2NjI2OCwiZXhwIjozMzMyMTI0MjE5OS41NjM2MDYsInN1YiI6IjgwODQyMjU1IiwiaXNzIjoiaHR0cHM6Ly9tZXRhLndpa2ltZWRpYS5vcmciLCJyYXRlbGltaXQiOnsicmVxdWVzdHNfcGVyX3VuaXQiOjUwMDAsInVuaXQiOiJIT1VSIn0sInNjb3BlcyI6WyJiYXNpYyJdfQ.W7GDZR_CyAJWF-Cj2ISwdetJ3JAoHSHiLRNY6-QXBUC6RXtJjgYkuiW2VIYxIs2FKHJfDulPGS1WomHZbG9mNsU3B0-_ja7pSNijMS4l9BHIexqbBd-MwTyaqUKwijT04t6gRMz31__Eo9ibjnxK_7L463lqRsxj6cjcUFQ8aqwZug-mSIhS-GousvEmOE4TQ-poKaitXIIoPnHmC2fLdvkd43XWFu-zzwO234x4qm9UHXB_KSjDttHzk5s5ruwwwW4WI9mLjKvYZPYle5b0-ohO5PLR_oHbCcgA4HsG-UhAJ4lpY3ZJ_torT_zuG5SClRdb1IAzg3yBLiFJI7hKmjiCoLf44no3GXwHVFDFxYIjZ2x7gWNm3ClhOzqr9hCiBdpmLfx_MDZQ3F9hAXN3mZZuWwfeB1gkyMYKjRV9H1IHfnKhLzEMdoSzMHPf_1Ef2nPsSsuNgGlpKzPmSgQIlznzwKcqIeTWiyCnaKG6jIUjKT3QK0XZcTRx6B9A50lUyvYoxiK6QacolsQFxrICmp5Q6iSJ503gmEVW8vkPbqqKSr_c1pVIK7B4-1CyFxh00Lxo-vyqDicIlGHVO9eGDvvRq7HjOeSlMT2e2UmIHqYJsbxuJEbGdQOQlPoz-ygcHOAkNiUn5dY0CNkBxTibuUZTQCN4Tmp9EZ-8Mgoo7RA';

/**
 * Load ownership cache from localStorage
 */
function loadCacheFromStorage(): void {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(CACHE_KEY);
    if (stored) {
      const { version, data, timestamp } = JSON.parse(stored);
      
      // Check if cache is valid (same version and less than 30 days old)
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      if (version === CACHE_VERSION && timestamp > thirtyDaysAgo) {
        let validEntries = 0;
        Object.entries(data).forEach(([key, value]) => {
          const info = value as OwnershipInfo;
          // Only load successful ownership results (those with an actual owner)
          if (info.owner && !info.error) {
            ownershipCache.set(key, info);
            validEntries++;
          }
        });
        if (validEntries > 0) {
          console.log(`📦 Loaded ${validEntries} ownership entries from cache`);
        }
      } else {
        // Clear old cache
        localStorage.removeItem(CACHE_KEY);
        console.log('🗑️  Cleared outdated ownership cache');
      }
    }
  } catch (error) {
    console.error('Error loading ownership cache:', error);
    // Clear corrupted cache
    localStorage.removeItem(CACHE_KEY);
  }
}

/**
 * Save ownership cache to localStorage
 */
function saveCacheToStorage(): void {
  if (typeof window === 'undefined') return;
  
  try {
    const data: Record<string, OwnershipInfo> = {};
    // Only save successful ownership results to localStorage
    ownershipCache.forEach((value, key) => {
      if (value.owner && !value.error) {
        data[key] = value;
      }
    });
    
    const cacheData = {
      version: CACHE_VERSION,
      timestamp: Date.now(),
      data,
    };
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error saving ownership cache:', error);
  }
}

// Load cache on module initialization
if (typeof window !== 'undefined') {
  loadCacheFromStorage();
}

/**
 * Extract ownership information from Wikipedia page content
 * Looks for patterns like "owned by", "subsidiary of", "parent company", etc.
 */
function extractOwnershipFromText(text: string): string | null {
  if (!text) return null;

  // Common ownership patterns
  const patterns = [
    /(?:owned by|subsidiary of|acquired by|part of|belongs to)\s+([A-Z][a-zA-Z\s&,\.]+?)(?:\.|,|\s+is|\s+was|\s+in|\s+on)/i,
    /parent\s+(?:company|organization|corporation)(?:\s+is)?\s+([A-Z][a-zA-Z\s&,\.]+?)(?:\.|,|\s+is|\s+was)/i,
    /(?:a|an)\s+([A-Z][a-zA-Z\s&,\.]+?)\s+(?:subsidiary|company|brand)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      // Clean up the extracted text
      let owner = match[1].trim();
      // Remove common trailing words
      owner = owner.replace(/\s+(Inc|LLC|Ltd|Corporation|Corp|Company|Group|Holdings)\.?$/i, ' $1');
      return owner;
    }
  }

  return null;
}

/**
 * Search Wikipedia for an entity and get its page summary
 */
async function searchWikipedia(entityName: string): Promise<WikipediaSearchResult | null> {
  try {
    // Use the REST API search endpoint
    const searchUrl = `https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=${encodeURIComponent(entityName)}&limit=1`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'Authorization': `Bearer ${WIKIPEDIA_ACCESS_TOKEN}`,
        'User-Agent': 'InfRSS/1.0 (https://github.com/yourusername/infrss)',
      },
    });

    if (!response.ok) {
      console.warn(`Wikipedia search failed for "${entityName}": ${response.status}`);
      return null;
    }

    const data = await response.json();
    
    if (!data.pages || data.pages.length === 0) {
      return null;
    }

    const page = data.pages[0];
    return {
      title: page.title,
      description: page.description,
      extract: page.excerpt,
    };
  } catch (error) {
    console.error(`Error searching Wikipedia for "${entityName}":`, error);
    return null;
  }
}

/**
 * Get detailed page content from Wikipedia
 */
async function getPageSummary(title: string): Promise<string | null> {
  try {
    // Use the page summary endpoint
    const summaryUrl = `https://api.wikimedia.org/core/v1/wikipedia/en/page/${encodeURIComponent(title)}/bare`;
    
    const response = await fetch(summaryUrl, {
      headers: {
        'Authorization': `Bearer ${WIKIPEDIA_ACCESS_TOKEN}`,
        'User-Agent': 'InfRSS/1.0 (https://github.com/yourusername/infrss)',
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.extract || null;
  } catch (error) {
    console.error(`Error fetching Wikipedia page for "${title}":`, error);
    return null;
  }
}

/**
 * Get the HTML content of a Wikipedia page to parse infobox data
 */
async function getPageHTML(title: string): Promise<string | null> {
  try {
    const htmlUrl = `https://api.wikimedia.org/core/v1/wikipedia/en/page/${encodeURIComponent(title)}/html`;
    
    const response = await fetch(htmlUrl, {
      headers: {
        'Authorization': `Bearer ${WIKIPEDIA_ACCESS_TOKEN}`,
        'User-Agent': 'InfRSS/1.0 (https://github.com/yourusername/infrss)',
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.text();
  } catch (error) {
    console.error(`Error fetching Wikipedia HTML for "${title}":`, error);
    return null;
  }
}

/**
 * Extract company type and parent from Wikipedia infobox
 */
function extractInfoboxData(html: string): { isSubsidiary: boolean; parent?: string } {
  if (!html) return { isSubsidiary: false };

  // Look for "Company type" or "Type" field with "Subsidiary" value
  const typePatterns = [
    /<th[^>]*>(?:Company )?[Tt]ype<\/th>\s*<td[^>]*>([^<]*(?:<[^>]+>[^<]*<\/[^>]+>)*[^<]*)<\/td>/i,
    /<tr[^>]*>\s*<th[^>]*>(?:Company )?[Tt]ype<\/th>\s*<td[^>]*>([^<]*(?:<[^>]+>[^<]*<\/[^>]+>)*[^<]*)<\/td>/i,
  ];

  let isSubsidiary = false;
  for (const pattern of typePatterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      const typeText = match[1].replace(/<[^>]+>/g, '').trim();
      if (/subsidiary/i.test(typeText)) {
        isSubsidiary = true;
        break;
      }
    }
  }

  // If it's a subsidiary, look for parent company
  let parent: string | undefined;
  if (isSubsidiary) {
    const parentPatterns = [
      /<th[^>]*>Parent<\/th>\s*<td[^>]*>(?:<[^>]*>)?([^<]+)/i,
      /<tr[^>]*>\s*<th[^>]*>Parent<\/th>\s*<td[^>]*>(?:<a[^>]*>)?([^<]+)/i,
      /<th[^>]*>Parent\s+company<\/th>\s*<td[^>]*>(?:<a[^>]*>)?([^<]+)/i,
    ];

    for (const pattern of parentPatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        parent = match[1].trim();
        // Clean up common HTML entities and extra whitespace
        parent = parent
          .replace(/&amp;/g, '&')
          .replace(/&nbsp;/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        break;
      }
    }
  }

  return { isSubsidiary, parent };
}

/**
 * Extract entity name from feed title or URL
 * Removes common suffixes like "Blog", "News", "RSS", etc.
 */
function extractEntityName(feedTitle: string): string {
  let entityName = feedTitle;
  
  // Remove common feed-related suffixes
  entityName = entityName.replace(/\s+(-|–|—|\|)\s+.*$/, ''); // Remove everything after dash or pipe
  entityName = entityName.replace(/\s+(Blog|News|RSS|Feed|Official|Website|Portal|Home|Latest|Updates|Articles)$/i, '');
  entityName = entityName.replace(/\s+(Inc\.|LLC|Ltd\.|Corp\.|Co\.)$/i, ' $1');
  entityName = entityName.trim();
  
  return entityName;
}

/**
 * Get ownership information for an entity behind a feed
 */
export async function getEntityOwnership(feedTitle: string): Promise<OwnershipInfo> {
  // Check cache first
  if (ownershipCache.has(feedTitle)) {
    console.log(`💾 Using cached ownership for "${feedTitle}"`);
    return ownershipCache.get(feedTitle)!;
  }

  const entityName = extractEntityName(feedTitle);
  
  try {
    // Search for the entity on Wikipedia
    const searchResult = await searchWikipedia(entityName);
    
    if (!searchResult) {
      const result: OwnershipInfo = { error: 'Not found on Wikipedia' };
      // Don't cache "not found" errors - might be temporary or search term issue
      ownershipCache.set(feedTitle, result);
      // Don't persist to localStorage
      return result;
    }

    // First, check if it's a subsidiary by getting the HTML page
    const pageHTML = await getPageHTML(searchResult.title);
    if (pageHTML) {
      const infoboxData = extractInfoboxData(pageHTML);
      
      if (infoboxData.isSubsidiary && infoboxData.parent) {
        // If it's a subsidiary and we found the parent, use that
        console.log(`📊 "${entityName}" is a subsidiary of "${infoboxData.parent}"`);
        const result: OwnershipInfo = { 
          owner: infoboxData.parent,
          parentCompany: infoboxData.parent 
        };
        ownershipCache.set(feedTitle, result);
        saveCacheToStorage(); // Save successful result
        return result;
      }
    }

    // Fallback to text-based extraction
    // Try to extract ownership from the search excerpt first
    let owner = searchResult.extract ? extractOwnershipFromText(searchResult.extract) : null;
    
    // If not found in excerpt, get the full page summary
    if (!owner) {
      const pageSummary = await getPageSummary(searchResult.title);
      if (pageSummary) {
        owner = extractOwnershipFromText(pageSummary);
      }
    }

    const result: OwnershipInfo = owner 
      ? { owner, parentCompany: owner }
      : { error: 'Ownership information not found' };
    
    // Only cache and persist successful ownership lookups
    if (owner) {
      ownershipCache.set(feedTitle, result);
      saveCacheToStorage();
    } else {
      // Store in memory cache but don't persist to localStorage
      // This allows retry on next session
      ownershipCache.set(feedTitle, result);
    }
    return result;
  } catch (error) {
    console.error(`Error getting ownership for "${feedTitle}":`, error);
    const result: OwnershipInfo = { error: 'Failed to fetch ownership info' };
    // Don't cache API errors - should retry later
    ownershipCache.set(feedTitle, result);
    // Don't persist to localStorage
    return result;
  }
}

/**
 * Batch fetch ownership information for multiple feeds
 */
export async function batchGetOwnership(feedTitles: string[]): Promise<Map<string, OwnershipInfo>> {
  const results = new Map<string, OwnershipInfo>();
  
  // Process in batches to respect rate limits
  const BATCH_SIZE = 5;
  const DELAY_MS = 100; // Small delay between batches
  
  for (let i = 0; i < feedTitles.length; i += BATCH_SIZE) {
    const batch = feedTitles.slice(i, i + BATCH_SIZE);
    
    const batchPromises = batch.map(async (title) => {
      const info = await getEntityOwnership(title);
      return { title, info };
    });
    
    const batchResults = await Promise.all(batchPromises);
    batchResults.forEach(({ title, info }) => {
      results.set(title, info);
    });
    
    // Add delay between batches
    if (i + BATCH_SIZE < feedTitles.length) {
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    }
  }
  
  return results;
}

/**
 * Clear the ownership cache (both memory and localStorage)
 */
export function clearOwnershipCache(): void {
  ownershipCache.clear();
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CACHE_KEY);
    console.log('🗑️  Cleared ownership cache');
  }
}

/**
 * Get cache statistics
 */
export function getCacheStats(): { size: number; storageSize?: string } {
  const stats = { size: ownershipCache.size, storageSize: undefined as string | undefined };
  
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(CACHE_KEY);
      if (stored) {
        const sizeInKB = (new Blob([stored]).size / 1024).toFixed(2);
        stats.storageSize = `${sizeInKB} KB`;
      }
    } catch {
      // Ignore errors
    }
  }
  
  return stats;
}

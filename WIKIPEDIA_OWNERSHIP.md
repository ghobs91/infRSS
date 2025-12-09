# Wikipedia Ownership Integration

## Overview
This update integrates Wikipedia's Core REST API to automatically fetch and display ownership information for each feed in the RSS reader. The ownership information appears next to the feed name in the sidebar.

## Implementation Details

### New Files Created

#### 1. `/src/lib/wikipediaOwnership.ts`
Core service that handles Wikipedia API integration:

**Key Functions:**
- `getEntityOwnership(feedTitle: string)`: Fetches ownership info for a single feed
- `batchGetOwnership(feedTitles: string[])`: Efficiently fetches ownership for multiple feeds with rate limiting
- `extractOwnershipFromText(text: string)`: Uses regex patterns to extract ownership information from Wikipedia content
- `searchWikipedia(entityName: string)`: Searches Wikipedia for entity pages
- `getPageSummary(title: string)`: Retrieves detailed page content

**Features:**
- Persistent localStorage caching (30-day expiration)
- In-memory caching for current session
- Rate limiting with batching (5 feeds per batch, 100ms delay)
- Intelligent entity name extraction (removes "Blog", "News", "RSS" suffixes)
- Multiple ownership pattern matching (owned by, subsidiary of, parent company, etc.)
- Cache versioning (automatically clears on updates)

#### 2. `/src/app/test-wiki/page.tsx`
Test page for validating Wikipedia API integration:
- Navigate to `/test-wiki` to test the ownership lookup
- Includes pre-configured test feeds (TechCrunch, BBC News, CNN, etc.)
- Custom input field for testing any feed name

### Modified Files

#### 1. `/src/lib/types.ts`
Added ownership fields to `FeedData` interface:
```typescript
owner?: string;
ownershipInfo?: {
  owner?: string;
  parentCompany?: string;
  error?: string;
};
```

#### 2. `/src/lib/feedContext.tsx`
- Imports `batchGetOwnership` function
- Updated `FeedData` interface to include ownership fields
- Fetches ownership information during feed refresh
- Logs ownership findings to console

Key changes in `refreshFeeds()`:
```typescript
// Fetch ownership information for all feeds
const feedNames = feedsData.map(f => f.name);
const ownershipData = await batchGetOwnership(feedNames);

// Add ownership info to feeds
feedsData.forEach(feed => {
  const ownershipInfo = ownershipData.get(feed.name);
  if (ownershipInfo && ownershipInfo.owner) {
    feed.owner = ownershipInfo.owner;
  }
});
```

#### 3. `/src/components/FeedSidebar.tsx`
- Updated `Feed` interface to include ownership fields
- Displays owner name below feed name
- Added tooltip showing full owner name on hover
- Styled owner label with smaller font and reduced opacity

Layout changes:
- Feed name and owner are wrapped in a flex container
- Owner label is shown in gray text below the feed name
- Truncation applied to prevent overflow

#### 4. `/src/app/globals.css`
CSS updates for better multi-line feed display:
- Changed `sidebar-item` alignment from `center` to `flex-start`
- Added `min-height: 40px` to accommodate two-line items
- Added `margin-top: 2px` to `sidebar-item-icon` for better alignment

## Wikipedia API Usage

### Endpoints Used
1. **Search API**: `https://api.wikimedia.org/core/v1/wikipedia/en/search/page`
   - Used to find Wikipedia pages for entities
   - Returns page excerpts with basic info

2. **Page HTML API**: `https://api.wikimedia.org/core/v1/wikipedia/en/page/{title}/html`
   - Used to get the full HTML page with infobox data
   - Parses "Company type" and "Parent" fields from infobox
   - Primary method for subsidiary detection

3. **Page Summary API**: `https://api.wikimedia.org/core/v1/wikipedia/en/page/{title}/bare`
   - Used as fallback for detailed page content
   - Provides fuller text for ownership extraction

### Rate Limiting & Best Practices
- Batched requests: 5 feeds per batch
- 100ms delay between batches
- User-Agent header included: `InfRSS/1.0`
- **Persistent caching in localStorage**: Results cached for 30 days
- In-memory caching for current session
- Cache automatically loaded on app startup
- Cache version tracking (clears on incompatible updates)
- Graceful error handling (shows "Not found" or "Ownership information not found")

## Ownership Detection Methods

### 1. Infobox Parsing (Primary)
The system first checks Wikipedia's infobox structure:
- Looks for "Company type" field with value "Subsidiary"
- If subsidiary detected, extracts "Parent" field value
- Most accurate method as it uses structured data

### 2. Text Pattern Matching (Fallback)
If infobox method fails, looks for these patterns in Wikipedia text:
- "owned by [Company]"
- "subsidiary of [Company]"
- "acquired by [Company]"
- "part of [Company]"
- "parent company is [Company]"
- "a [Company] subsidiary"

## Example Results

For these feeds, ownership information is displayed:
- **TechCrunch** → "Yahoo Inc." (detected as subsidiary via infobox)
- **The Verge** → "Vox Media" (detected as subsidiary via infobox)
- **Ars Technica** → "Condé Nast" (detected as subsidiary via infobox)
- **BBC News** → "British Broadcasting Corporation"
- **CNN** → "Warner Bros. Discovery" (detected as subsidiary via infobox)
- **Engadget** → "Yahoo Inc." (detected as subsidiary via infobox)
- **Wired** → "Condé Nast" (detected as subsidiary via infobox)

## Testing

1. **Test Page**: Visit `http://localhost:3000/test-wiki`
   - Click pre-configured feed buttons
   - Enter custom feed names
   - View JSON results
   - **View cache statistics** (shows number of cached entries)
   - **Clear cache button** to test fresh lookups

2. **Console Logs**: Check browser console for:
   - "📦 Loaded X ownership entries from cache"
   - "🔍 Fetching ownership information from Wikipedia..."
   - "💾 Using cached ownership for [Feed]"
   - "📊 Found owner for [Feed]: [Owner]"

3. **Sidebar Display**: 
   - Owner names appear below feed names
   - Hover over feed items to see full owner name in tooltip

4. **Cache Testing**:
   - Refresh the page - ownership loads instantly from cache
   - Check localStorage key: `wikipedia_ownership_cache`
   - Clear cache and verify API calls are made again

## Performance Considerations

- **First Load**: Adds ~2-5 seconds to feed loading time for ownership lookup
- **Subsequent Loads**: Instant (uses localStorage cache)
- **Cache Duration**: 30 days before expiration
- **Storage Size**: ~1-5 KB for typical feed collections
- **Failed Lookups**: Cached to avoid repeat failed requests
- **Network Errors**: Gracefully handled; feed functionality unaffected

## Future Enhancements

Potential improvements:
1. **Manual Override**: Allow users to edit/correct ownership info
2. **More Data Sources**: Add Wikidata, DBpedia, or other APIs
3. **Display Options**: Toggle visibility of ownership labels
4. **Company Logos**: Show company logos instead of/alongside text
5. **Filtering**: Filter feeds by parent company
6. **Ownership Hierarchy**: Show full ownership chain (e.g., "TechCrunch → Verizon → AT&T")
7. **Cache Management UI**: View and manage cached entries in settings

## API Documentation

For more information on the Wikipedia Core REST API:
- Documentation: https://api.wikimedia.org/wiki/Core_REST_API
- API Reference: https://api.wikimedia.org/wiki/Core_REST_API/Reference
- Rate Limits: https://api.wikimedia.org/wiki/Rate_limits

## Troubleshooting

**Ownership not showing:**
1. Check browser console for errors
2. Verify entity name is correct (not too generic)
3. Check if Wikipedia has a page for the entity
4. Test manually at `/test-wiki`

**API Rate Limiting:**
- Increase `DELAY_MS` in `wikipediaOwnership.ts`
- Reduce `BATCH_SIZE` for slower processing

**Incorrect Ownership:**
- Wikipedia data may be outdated
- Pattern matching may need adjustment
- Consider adding manual overrides

## Notes

- Wikipedia data may not be 100% accurate or up-to-date
- Not all feeds will have ownership information
- Some feeds represent independent entities or individuals
- The system respects Wikipedia's API rate limits and terms of use

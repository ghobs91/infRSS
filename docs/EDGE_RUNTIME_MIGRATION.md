# Edge Runtime and Web Workers Migration

## Overview
This document describes the migration of the RSS reader application to use Next.js Edge Runtime for API routes and Web Workers for RSS feed parsing, eliminating the need for a Node.js server instance.

## Changes Made

### 1. API Routes - Edge Runtime Migration

#### `/src/app/api/proxy/route.ts`
- Added `export const runtime = 'edge';` to run the proxy endpoint on Edge Runtime
- No server-side Node.js dependencies needed
- Minimal overhead for CORS proxying

#### `/src/app/api/fetch-rss/route.ts`
- Added `export const runtime = 'edge';` to run the RSS fetch endpoint on Edge Runtime
- Fully serverless operation

### 2. Web Worker for RSS Parsing

#### `/workers/rss-parser-worker.ts` (New)
- Created a dedicated Web Worker for RSS feed parsing
- Uses browser's native `DOMParser` API instead of server-side XML parsing libraries
- Handles all XML cleaning and CDATA processing in a separate thread
- Includes comprehensive error handling for malformed RSS feeds
- Key features:
  - Cleans malformed CDATA patterns
  - Handles invalid XML characters
  - Fixes unclosed tags and attributes
  - Extracts thumbnails from media elements
  - Parses both RSS and Atom feed formats

#### `/src/lib/useRSSParserWorker.ts` (New)
- React hook for managing the RSS parser worker lifecycle
- Provides `parseRSSWithWorker()` function for parsing XML
- Handles worker initialization, communication, and cleanup
- Includes timeout protection (15 seconds)
- Graceful fallback when worker unavailable (e.g., development mode)

#### `/src/lib/rssUtilsClient.ts` (New)
- Client-side RSS utilities that integrate with Web Workers
- `fetchAndParseRSSClient()` - Fetches XML from proxy and parses using worker
- `parseRSSInline()` - Fallback parser that runs in main thread
- Maintains compatibility with existing code

### 3. Component Updates

#### `/src/app/page.tsx`
- Updated to use `fetchAndParseRSSClient()` instead of `fetchAndParseRSS()`
- Integrated `useRSSParserWorker()` hook
- RSS parsing now happens in Web Worker, keeping UI responsive
- Fixed React Hook dependency warnings

#### `/src/app/manage/page.tsx`
- Updated to use `fetchAndParseRSSClient()` for feed discovery and validation
- Integrated `useRSSParserWorker()` hook
- Feed management operations now use worker-based parsing

### 4. Build System Updates

#### `/scripts/build-worker.mjs`
- Added build configuration for RSS parser worker
- Builds both transformer and RSS parser workers
- Output: `/public/workers/rss-parser-worker.js`

#### `/scripts/dev-worker.mjs`
- Added watch mode for RSS parser worker during development
- Enables hot reloading of worker code

### 5. Legacy Code

#### `/src/lib/rssUtils.ts`
- Marked `fetchAndParseRSS()` as deprecated for client-side use
- Added re-export of `fetchAndParseRSSClient` for easier migration
- Preserved server-side functions for backward compatibility
- Comprehensive documentation explaining the new architecture

## Architecture Benefits

### Edge Runtime
1. **No Server Instance**: Eliminates need for a persistent Node.js server
2. **Lower Latency**: Edge functions run closer to users globally
3. **Better Scalability**: Automatic scaling without server management
4. **Cost Efficient**: Pay only for actual usage, not idle server time

### Web Workers
1. **Non-Blocking UI**: RSS parsing runs in separate thread
2. **Better Performance**: Parallel processing of multiple feeds
3. **Browser-Native**: Uses `DOMParser` API, no external dependencies
4. **Reduced Bundle Size**: Parsing code not in main bundle

## Usage Example

```typescript
import { fetchAndParseRSSClient } from '@/lib/rssUtilsClient';
import { useRSSParserWorker } from '@/lib/useRSSParserWorker';

function MyComponent() {
  const { parseRSSWithWorker } = useRSSParserWorker();
  
  const loadFeed = async (url: string) => {
    // Fetches XML via proxy, parses in Web Worker
    const feed = await fetchAndParseRSSClient(url, parseRSSWithWorker);
    console.log(feed?.title, feed?.items.length);
  };
  
  return <button onClick={() => loadFeed('https://example.com/feed.xml')}>Load Feed</button>;
}
```

## Development Mode Notes

- Web Workers are disabled in development mode with Turbopack
- Falls back to inline parsing in main thread
- Production builds use workers for optimal performance

## Testing

The build completed successfully with the following output:
- All routes compiled without errors
- Edge runtime properly configured for API routes
- Workers built and included in bundle
- No breaking changes to existing functionality

## Future Improvements

1. **WASM Parser**: Consider using a WASM-based XML parser for even better performance
2. **Service Worker Integration**: Cache parsed feeds in service worker for offline support
3. **Streaming Parser**: Implement streaming XML parsing for large feeds
4. **Worker Pool**: Create a pool of workers for parallel feed processing

## Migration Guide

For other components still using `fetchAndParseRSS()`:

1. Import the new utilities:
   ```typescript
   import { fetchAndParseRSSClient } from '@/lib/rssUtilsClient';
   import { useRSSParserWorker } from '@/lib/useRSSParserWorker';
   ```

2. Add the hook to your component:
   ```typescript
   const { parseRSSWithWorker } = useRSSParserWorker();
   ```

3. Replace calls to `fetchAndParseRSS()`:
   ```typescript
   // Old
   const feed = await fetchAndParseRSS(url);
   
   // New
   const feed = await fetchAndParseRSSClient(url, parseRSSWithWorker);
   ```

4. Update React Hook dependencies if using `useCallback` or `useEffect`

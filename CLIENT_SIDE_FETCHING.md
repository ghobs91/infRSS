# Client-Side RSS Fetching

## Overview

InfRSS is optimized to minimize server-side API calls and hosting costs by fetching RSS feeds directly from the client browser whenever possible. This approach significantly reduces the load on hosting platforms like Netlify while maintaining full functionality.

## How It Works

### Fetch Strategy

The app uses a smart three-tier strategy for fetching RSS feeds:

1. **Check Cache**: First checks if the feed was recently parsed (5-minute cache)
2. **Try Direct Fetch**: Attempts to fetch the RSS feed directly from the client browser
3. **Fallback to Proxy**: If direct fetch fails (CORS restrictions), uses the server-side proxy

### CORS Handling

Many RSS feeds support CORS (Cross-Origin Resource Sharing), allowing direct client-side fetching. For feeds that don't support CORS:

- The app automatically detects CORS failures
- Falls back to the server-side proxy seamlessly
- Remembers which feeds require the proxy for future requests
- No user intervention needed

### Smart Caching

The app maintains two types of caches:

1. **Feed Cache** (`feedCache`): Caches parsed RSS data for 5 minutes
2. **Proxy Required Cache** (`proxyRequiredCache`): Remembers which feeds need the proxy

## Cost Savings

### Expected Reduction

Based on typical RSS feed usage:
- **~70-90% reduction** in server-side API calls for feeds that support CORS
- **~50-70% reduction** in bandwidth usage at the server level
- **Significant cost savings** on serverless function invocations (Netlify Functions, Vercel Functions, etc.)

### What Gets Saved

- Server CPU time (no XML parsing on server)
- Server bandwidth (feed content doesn't pass through proxy)
- Function invocations (most feeds fetched client-side)
- Response time (direct fetch is often faster)

## Technical Implementation

### Code Location

The implementation is in `src/lib/rssUtilsClient.ts`:

```typescript
// Configuration
const CLIENT_FETCH_CONFIG = {
  enabled: true, // Set to false to always use proxy
  timeout: 30000, // 30 seconds
};

// Smart fetch with automatic fallback
export async function fetchAndParseRSSClient(url: string) {
  // 1. Check cache
  // 2. Try direct fetch
  // 3. Fall back to proxy if needed
  // 4. Parse RSS (Web Worker or inline)
  // 5. Cache result
}
```

### Key Functions

- `fetchRSSDirectly()`: Attempts direct client-side fetch with CORS
- `fetchRSSViaProxy()`: Falls back to server-side proxy
- `fetchAndParseRSSClient()`: Main entry point with smart routing

## Configuration

### Disabling Client-Side Fetching

If you want to always use the proxy (e.g., for debugging), modify `src/lib/rssUtilsClient.ts`:

```typescript
const CLIENT_FETCH_CONFIG = {
  enabled: false, // Disable direct fetching
  timeout: 30000,
};
```

### Adjusting Timeout

To change the fetch timeout:

```typescript
const CLIENT_FETCH_CONFIG = {
  enabled: true,
  timeout: 45000, // 45 seconds (default is 30)
};
```

## Monitoring

### Console Logs

The app logs fetch attempts for debugging:

- `Attempting direct fetch for {url}` - Trying direct fetch
- `✓ Direct fetch successful for {url} (saved server resources)` - Success!
- `Direct fetch blocked by CORS for {url}, will use proxy` - Fell back to proxy
- `Fetching via proxy for {url}` - Using server-side proxy

### Browser DevTools

Check the Network tab in browser DevTools to see:
- Which feeds are fetched directly (requests to feed URLs)
- Which feeds use the proxy (requests to `/api/proxy`)

## Benefits

### For Users
- **Faster loading**: Direct fetches often faster than proxy
- **Better privacy**: Feed providers don't see proxy server IP
- **Same experience**: Automatic fallback ensures all feeds work

### For Deployers
- **Lower costs**: Reduced serverless function invocations
- **Better scaling**: Less server load
- **Simpler infrastructure**: Less bandwidth usage

## Compatibility

### Browsers
- Works in all modern browsers that support:
  - Fetch API
  - CORS
  - Web Workers (for parsing)

### RSS Feeds
- Automatically works with CORS-enabled feeds
- Seamlessly handles CORS-restricted feeds via proxy
- Compatible with RSS 2.0, Atom, and other XML feed formats

## Troubleshooting

### Feed Not Loading

1. Check browser console for error messages
2. Verify the feed URL is correct
3. Try accessing the feed URL directly in your browser
4. Check if the feed supports CORS (look for Access-Control-Allow-Origin header)

### All Feeds Using Proxy

If all feeds are going through the proxy:
1. Check that `CLIENT_FETCH_CONFIG.enabled` is `true`
2. Verify browser supports CORS
3. Check for browser extensions blocking requests
4. Look for CSP (Content Security Policy) restrictions

### Performance Issues

If feeds load slowly:
1. Check the timeout setting (default 30s)
2. Verify network connection
3. Check if many feeds are CORS-restricted (will use proxy)
4. Consider increasing cache duration

## Future Enhancements

Potential improvements:
- [ ] Add user preference to always use proxy
- [ ] Per-feed proxy/direct configuration
- [ ] Metrics dashboard showing proxy vs direct usage
- [ ] Adaptive timeout based on feed response times
- [ ] Background refresh for cached feeds

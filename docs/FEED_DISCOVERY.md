# Intelligent RSS Feed Discovery

## Overview

The Intelligent RSS Feed Discovery system automatically finds RSS feeds from any website URL. Users no longer need to manually locate the feed URL - just paste any website URL, and the system will intelligently search for and find the RSS feed.

## Discovery Strategies

The system employs 9 different strategies to find RSS feeds, executed in order of confidence:

### 1. **Direct URL Check**
- **Confidence**: 100%
- **What it does**: Checks if the provided URL is already a valid RSS/Atom feed
- **Example**: User provides `https://blog.example.com/feed.xml` which is already a feed

### 2. **Meta Tags in HTML**
- **Confidence**: 95%
- **What it does**: Searches for RSS feed links in the HTML `<head>` section
- **Looks for**:
  - `<link type="application/rss+xml" href="...">`
  - `<link type="application/atom+xml" href="...">`
  - `<link rel="alternate" type="application/rss+xml" href="...">`
  - Links in page content with keywords like `/feed`, `/rss`, `/atom`

### 3. **Parent Page Meta Tags**
- **Confidence**: 90%
- **What it does**: Navigates up the URL path to check parent pages for feed links
- **Example**: For `https://blog.example.com/posts/article-1`, checks:
  - `https://blog.example.com/posts/`
  - `https://blog.example.com/`

### 4. **Sitemap.xml**
- **Confidence**: 80%
- **What it does**: Checks the site's sitemap for feed URLs
- **Looks for**: URLs containing keywords like `feed`, `rss`, `atom` or ending in `.xml`, `.rss`

### 5. **Common Feed Suffixes**
- **Confidence**: 85%
- **What it does**: Tests common feed URL patterns
- **Tests**:
  - `/feed`
  - `/feed/`
  - `/rss`
  - `/rss.xml`
  - `/atom.xml`
  - `/feed.xml`
  - `/index.xml`
  - `?feed=rss`
  - `?feed=rss2`
  - `?feed=atom`
  - `/feeds/posts/default` (Blogger)

### 6. **Parent Page Common Suffixes**
- **Confidence**: 75%
- **What it does**: Applies common suffixes to parent URLs
- **Example**: For `https://blog.example.com/2024/`, tries `https://blog.example.com/feed`

### 7. **Blog-Specific Meta Tags**
- **Confidence**: 88%
- **What it does**: Searches for blog-specific metadata
- **Looks for**:
  - `<meta name="blog-channel-url">`
  - `<meta name="blog-feed-url">`
  - `<meta property="og:see_also">`
  - `<meta name="syndication-source">`

### 8. **Blog-Specific Suffixes**
- **Confidence**: 80%
- **What it does**: Tests blog-specific URL patterns
- **Tests**:
  - `/blog/feed`
  - `/blog/rss`
  - `/blog/rss.xml`
  - `/blog/atom.xml`
  - `/wp-rss2.php` (WordPress)
  - `/articles/feed`
  - `/news/feed`
  - `/posts/feed`

### 9. **Third-Party Feed Services**
- **Confidence**: 45-70%
- **What it does**: Generates feed URLs from third-party services
- **Services**:
  - **RSSHub** (70%): For social media (Twitter, YouTube, Reddit, GitHub, etc.)
  - **RSS.app** (50%): General feed generator
  - **OpenRSS** (45%): Alternative feed generator

## Supported Feed Types

The system can detect and parse:

- **RSS 2.0**: Standard RSS feeds
- **RSS 1.0**: Older RSS format
- **Atom**: Modern feed format
- **JSON Feed**: JSON-based feed format

## Usage

### Basic Usage

1. Navigate to the "Manage Feeds" page
2. Enter any website URL in the input field:
   - Blog homepage: `https://blog.example.com`
   - Article page: `https://blog.example.com/posts/article`
   - Main website: `https://example.com`
3. Click "Add Feed" or press Enter
4. The system will automatically discover and add the feed

### What Happens Behind the Scenes

1. **URL Normalization**: The system normalizes the URL (adds https:// if needed)
2. **Multi-Strategy Search**: Executes all 9 discovery strategies in parallel
3. **Confidence Sorting**: Results are sorted by confidence level
4. **Feed Validation**: Each discovered feed is validated by attempting to parse it
5. **Best Match Selection**: The highest-confidence working feed is automatically selected
6. **User Feedback**: Shows discovery progress and results

### Examples

#### Example 1: Blog Homepage
```
Input: https://techcrunch.com
Discovery:
✓ Meta tags (95%) → https://techcrunch.com/feed/
✓ Common suffix (85%) → https://techcrunch.com/rss
Result: Adds the highest-confidence working feed
```

#### Example 2: Article URL
```
Input: https://medium.com/@user/some-article
Discovery:
✓ Parent page meta tags (90%) → https://medium.com/@user/feed
✓ Common suffix on parent (75%) → https://medium.com/@user/rss
Result: Adds the feed from parent page
```

#### Example 3: Social Media
```
Input: https://twitter.com/username
Discovery:
✓ Third-party RSSHub (70%) → https://rsshub.app/twitter/user/username
Result: Adds RSSHub feed for the Twitter profile
```

## Technical Details

### File Structure

```
src/lib/feedDiscovery.ts       # Main discovery logic
src/app/manage/page.tsx        # Integration in UI
```

### Key Functions

#### `discoverFeed(url: string): Promise<FeedDiscoveryResult[]>`
Main discovery function that returns all found feeds sorted by confidence.

```typescript
interface FeedDiscoveryResult {
  url: string;           // Feed URL
  title?: string;        // Feed title (if available)
  type?: string;         // 'rss' | 'atom' | 'json'
  confidence: number;    // 0-1, higher is better
  source: string;        // Where we found this feed
}
```

#### `discoverBestFeed(url: string): Promise<string | null>`
Quick function that returns only the best feed URL found.

#### `getDiscoveryResultDescription(result: FeedDiscoveryResult): string`
Generates user-friendly description of discovery result.

### Performance Considerations

- **Parallel Execution**: All strategies run in parallel for speed
- **Timeouts**: Each HTTP request has a 10-second timeout
- **Caching**: Results are not cached (fresh discovery each time)
- **Rate Limiting**: Uses the existing proxy API which handles rate limiting

### Error Handling

- Invalid URLs are caught and reported immediately
- Failed HTTP requests are logged but don't stop other strategies
- Parsing errors are handled gracefully with fallbacks
- User receives informative error messages

## User Experience

### Loading States

1. **"Starting intelligent feed discovery..."** - Initial state
2. **"🔍 Searching for RSS feeds..."** - Discovery in progress
3. **"✅ Found X potential feed(s)! Testing..."** - Feeds found, validating
4. **"Testing feed X/Y: [source]..."** - Validating each feed
5. **"✅ Successfully found working feed!"** - Success

### Success Messages

When a feed is successfully added:
```
✅ Successfully added "Blog Title"!
Found via Meta tags (95% confidence)
```

### Error Messages

When no feed is found:
```
Could not find any RSS feeds at this URL.
Please try a different URL or check if the site has an RSS feed.
```

When feeds are found but can't be parsed:
```
Found 3 potential feed(s), but couldn't parse them:
1. https://example.com/feed (Meta tags)
2. https://example.com/rss (Common suffix)
3. https://example.com/atom.xml (Sitemap)

The site may have an invalid or empty feed.
```

## Future Enhancements

Potential improvements for future versions:

1. **Feed Preview**: Show preview of articles before adding
2. **Multiple Feed Selection**: Let users choose from multiple discovered feeds
3. **Discovery Cache**: Cache discovery results to avoid repeated searches
4. **Custom Discovery Rules**: Let users add custom discovery patterns
5. **Discovery Analytics**: Track which strategies work best
6. **Batch Discovery**: Discover feeds from multiple URLs at once
7. **Smart Suggestions**: Suggest related feeds based on discovered ones

## Troubleshooting

### Feed Not Found
- Verify the website actually has an RSS feed
- Try the homepage instead of a specific page
- Check if the site requires authentication
- Try third-party feed generators (RSSHub, RSS.app)

### Feed Found But Won't Parse
- The feed may be malformed or invalid XML
- Try accessing the feed URL directly in a browser
- Report the issue with the feed URL for investigation

### Slow Discovery
- Discovery checks multiple strategies which takes time
- Slow websites will slow down discovery
- Network issues can cause timeouts

## Contributing

To add new discovery strategies:

1. Add the strategy to `discoverFeed()` function
2. Assign appropriate confidence level (0-1)
3. Provide descriptive source label
4. Test with various website types
5. Update this documentation

## Related Documentation

- [RSS Parsing](./XML_PARSING_IMPROVEMENTS.md)
- [Feed Migration](./RSSHUB_MIGRATION.md)
- [OPML Export](./OPML_EXPORT.md)

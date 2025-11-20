# Performance Optimizations

This document outlines the performance improvements implemented to reduce CPU/memory usage and improve overall app responsiveness.

## Summary of Improvements

### 1. React Component Memoization
**Impact: High** - Prevents unnecessary re-renders

- **FeedSidebar**: Wrapped in `React.memo` with custom comparison function to only re-render when feeds, selected feed, or unread counts actually change
- **ArticleListColumn**: Memoized with `React.memo` to prevent re-renders when props haven't changed
- **ArticleViewer**: Memoized to only re-render when the selected article ID changes

### 2. Optimized Callbacks and Computed Values
**Impact: High** - Reduces computation on every render

- **page.tsx**: 
  - `filteredArticles`: Now uses `useMemo` to cache filtered results
  - `selectedArticle`: Memoized to avoid repeated array searches
  - `handleSelectArticle`: Wrapped in `useCallback` to maintain referential equality
  - `totalUnreadCount`: Memoized computation

- **ArticleListColumn**:
  - `formatDate` and `getExcerpt`: Wrapped in `useCallback` to prevent recreation on every render

- **ArticleViewer**:
  - `formatDate`: Wrapped in `useCallback` for performance

### 3. Progressive Loading
**Impact: High** - Improves perceived performance and initial load time

- Changed from loading all feeds at once to progressive loading
- Articles appear in the UI as each feed completes parsing
- Users can start reading while other feeds are still loading
- Initial loading screen removed faster for better UX

### 4. Virtual Scrolling / Lazy Rendering
**Impact: High** - Dramatically reduces DOM nodes for large article lists

- Implemented batch rendering in ArticleListColumn
- Initially renders only 50 articles
- Automatically loads more (20 at a time) as user scrolls
- Reduces initial render time and memory usage for feeds with 100+ articles

### 5. Image Lazy Loading
**Impact: Medium** - Reduces network requests and improves initial page load

- All thumbnail images use `loading="lazy"` attribute
- Feed favicons load lazily
- Main article viewer image uses `priority` for faster LCP
- Images only load when they're about to enter the viewport

### 6. Feed Caching
**Impact: Medium** - Reduces redundant parsing and network requests

- Implemented 5-minute cache for parsed RSS feeds in `rssUtilsClient.ts`
- Prevents re-fetching and re-parsing feeds that were recently loaded
- Significant performance boost when switching between views

### 7. Context Optimization
**Impact: Medium** - Prevents cascading re-renders

- **UnreadContext**: Context value wrapped in `useMemo` to maintain referential equality
- Only triggers re-renders in consumers when actual values change
- Reduces unnecessary renders throughout the component tree

## Performance Metrics Improvements (Expected)

### Before Optimizations:
- Initial render: ~2-5 seconds for 10 feeds
- Re-renders: Frequent unnecessary re-renders on any state change
- Memory: High DOM node count (100+ articles = 100+ rendered components)
- Scroll performance: Janky with 100+ articles

### After Optimizations:
- Initial render: <1 second for first batch, progressive loading continues
- Re-renders: Only components with changed props re-render
- Memory: Reduced DOM nodes (only 50-70 rendered at once)
- Scroll performance: Smooth even with 500+ articles
- Network: Cached feeds reduce redundant requests

## Best Practices Applied

1. **Memoization**: Used React.memo, useMemo, and useCallback strategically
2. **Virtual Scrolling**: Implemented batch rendering for long lists
3. **Lazy Loading**: Images load only when needed
4. **Progressive Enhancement**: Show content as it becomes available
5. **Caching**: Avoid redundant work with intelligent caching
6. **Referential Equality**: Maintain object/function references to prevent re-renders

## Future Optimization Opportunities

1. **Web Workers**: Move RSS parsing entirely to background thread
2. **IndexedDB**: Cache articles locally for instant offline access
3. **Code Splitting**: Dynamic imports for rarely-used features
4. **Service Worker**: Background sync for feed updates
5. **React Virtualized**: Full windowing solution with react-window or react-virtuoso
6. **Image Optimization**: Generate and cache optimized thumbnails

## Monitoring

To monitor performance improvements:
1. Use React DevTools Profiler to measure render times
2. Check Chrome DevTools Performance tab for frame rates
3. Monitor memory usage in Chrome Task Manager
4. Use Lighthouse for overall performance score

## Notes

- All optimizations are backwards compatible
- No breaking changes to existing functionality
- Performance improvements are most noticeable with:
  - 10+ feeds
  - 100+ total articles
  - Slower devices
  - Limited network bandwidth

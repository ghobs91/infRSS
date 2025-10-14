# XML Parsing Improvements

## Overview
Enhanced the RSS feed parser to handle common XML parsing errors seen in real-world RSS feeds from major publishers.

## Issues Addressed

### 1. **HTML Attributes Without Values**
Many RSS feeds contain HTML content with boolean attributes that don't have values (e.g., `<video allowfullscreen>`, `<div hidden>`, `<script async>`). These break XML parsing because XML requires all attributes to have values.

**Examples of fixed attributes:**
- `allowfullscreen`
- `hidden`
- `async`
- `autoplay`
- `checked`
- `disabled`
- `selected`
- `readonly`
- `required`
- `multiple`
- `itemscope`
- `data-lazy`
- `consumption-data`
- All `data-*` attributes

### 2. **Unclosed Self-Closing Tags**
HTML tags like `<img>`, `<br>`, `<hr>`, `<input>` that aren't properly self-closed (e.g., `<img src="...">` instead of `<img src="..." />`).

**Fixed tags:**
- `img`
- `br`
- `hr`
- `input`
- `meta`
- `link`
- `area`
- `base`
- `col`
- `embed`
- `param`
- `source`
- `track`
- `wbr`

### 3. **Mismatched Opening/Closing Tags**
Tags that are opened but not properly closed, causing parsing errors like:
- `Opening and ending tag mismatch: br line 79 and description`
- `Opening and ending tag mismatch: img line 63 and div`

## Implementation

The fixes are applied in three fallback strategies:

### Strategy 1: Aggressive Cleaning
```typescript
aggressiveCleaned = aggressiveCleaned
  // Fix self-closing tags
  .replace(/<(img|br|hr|input|meta|link|area|base|col|embed|param|source|track|wbr)([^>]*?)(?<!\/)>/gi, '<$1$2 />')
  // Remove attributes without values
  .replace(/\s(allowfullscreen|hidden|async|...)\s*([>\s])/gi, ' $2')
  // Fix data- attributes
  .replace(/\sdata-[a-z-]+\s*([>\s])/g, ' $1')
```

### Strategy 2: CDATA Stripping
If aggressive cleaning fails, the parser strips all CDATA sections and applies the same fixes.

### Strategy 3: Manual Content Extraction
If both previous strategies fail, the parser manually extracts items/entries and reconstructs a valid XML structure.

## Benefits

1. **More Reliable Feed Parsing** - Handles malformed XML from major publishers
2. **Better Error Recovery** - Multiple fallback strategies
3. **Reduced Failed Feeds** - Significantly fewer parsing errors
4. **Improved User Experience** - More feeds work out of the box

## Affected Feeds

This update improves parsing for feeds from:
- The Verge
- Toyota
- Facebook/Meta
- White House
- Railway Age
- Nvidia
- Brave
- Fairphone
- Microsoft
- Samsung
- Unity
- PlayStation
- Xbox
- And many more...

## Testing

To test the improvements:
1. Run `npm run dev`
2. Add feeds that previously failed (examples in the error logs)
3. Verify that articles load correctly

## Performance Impact

- Minimal performance impact
- Regex operations are fast and only run on feeds with parsing errors
- Fallback strategies only execute when needed

## Future Improvements

Potential enhancements:
- Add more self-closing tag types
- Detect and fix more HTML attribute issues
- Implement caching for cleaned XML
- Add metrics for tracking which strategies succeed most often

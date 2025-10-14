# XML Parsing Fix: "Sequence ']]>' not allowed in content"

## Problem
Many RSS feeds were failing with the error:
```
XML parsing error: "Sequence ']]>' not allowed in content"
```

This error occurs when the XML sequence `]]>` appears in the content outside of a CDATA section, or when CDATA sections are malformed.

## Root Cause
According to XML specifications, the sequence `]]>` is reserved as the closing delimiter for CDATA sections. When this sequence appears in regular XML content (not inside a CDATA section), it breaks XML parsing because the parser interprets it as the end of a CDATA section that was never started.

Common causes:
1. Feed generators that don't properly escape content containing `]]>`
2. Nested or malformed CDATA sections
3. Content copied from other sources that contains these sequences

## Solution Implemented

The fix implements a multi-layered approach in `/src/lib/rssUtils.ts`:

### Layer 1: Pre-emptive ]]> Protection (in `cleanXMLContent`)
```typescript
// Protect legitimate CDATA endings
const cdataEndMarker = '___CDATA_END_MARKER___';
xmlString = xmlString.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (match, content) => {
  return `<![CDATA[${content}${cdataEndMarker}`;
});

// Escape ALL remaining ]]> sequences (the problematic ones)
xmlString = xmlString.replace(/\]\]>/g, ']] >');

// Restore legitimate CDATA endings
xmlString = xmlString.replace(new RegExp(cdataEndMarker, 'g'), ']]>');
```

This approach:
1. **Temporarily marks** all legitimate CDATA section endings with a unique marker
2. **Escapes** all remaining `]]>` sequences by adding a space: `]] >`
3. **Restores** the legitimate CDATA endings back to their original form

### Layer 2: Aggressive Cleaning Fallback
If the initial cleaning fails, the parser attempts more aggressive strategies:

1. **Entity encoding**: Replaces `]]>` with `]] &gt;` (encoding the `>` as an HTML entity)
2. **CDATA stripping**: Removes all CDATA sections entirely and escapes problematic sequences
3. **Manual extraction**: Extracts individual `<item>` or `<entry>` elements and reconstructs a valid XML document

### Layer 3: Item-by-Item Cleaning
For severely malformed feeds, the parser:
1. Extracts individual feed items using regex
2. Cleans each item separately
3. Reconstructs a minimal valid RSS XML structure
4. Attempts parsing again

## Testing
To test this fix with the problematic feed:
```bash
# The feed should now parse successfully
curl "http://localhost:3000/api/proxy?url=https%3A%2F%2Fwww.gsma.com%2Fnewsroom%2Ffeed%2F"
```

## Benefits
- ✅ Handles malformed CDATA sections gracefully
- ✅ Preserves legitimate CDATA content
- ✅ Falls back through multiple strategies
- ✅ Provides detailed logging for debugging
- ✅ Doesn't break feeds that were already working

## Edge Cases Handled
1. `]]>` in regular content (most common)
2. Nested CDATA sections
3. Unclosed CDATA sections
4. Multiple `]]>` sequences in a single item
5. Mix of CDATA and non-CDATA content with `]]>` sequences

## Performance Impact
Minimal - the cleaning process adds a few milliseconds per feed, but only for feeds that need cleaning. Most well-formed feeds will parse on the first attempt without any additional processing.

## Future Improvements
- Consider implementing a cache for known-problematic feeds
- Add telemetry to track which cleaning strategies are most effective
- Potentially pre-process feeds on the server side to reduce client-side processing

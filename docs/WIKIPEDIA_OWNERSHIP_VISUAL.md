# Wikipedia Ownership Integration - Visual Example

## Before
```
📰 Sidebar
├─ 📱 Today (25)
└─ 📂 Articles
    ├─ 🔵 TechCrunch (5)
    ├─ 🔵 The Verge (8)
    ├─ 🔵 Ars Technica (3)
    ├─ 🔵 BBC News (12)
    └─ 🔵 CNN (7)
```

## After
```
📰 Sidebar
├─ 📱 Today (25)
└─ 📂 Articles
    ├─ 🔵 TechCrunch
    │      Verizon Media
    │   (5)
    ├─ 🔵 The Verge
    │      Vox Media
    │   (8)
    ├─ 🔵 Ars Technica
    │      Condé Nast
    │   (3)
    ├─ 🔵 BBC News
    │      British Broadcasting Corporation
    │   (12)
    └─ 🔵 CNN
           Warner Bros. Discovery
       (7)
```

## What Users See

### Feed Sidebar Display
Each feed now shows:
1. **Feed Icon/Favicon** (left)
2. **Feed Name** (main text, bold)
3. **Owner Name** (smaller gray text below feed name)
4. **Unread Count** (right, badge)

### Hover Tooltip
When hovering over a feed item:
```
"Owned by: Verizon Media"
```

### Console Logs During Load
```
🔍 Fetching ownership information from Wikipedia...
📊 Found owner for "TechCrunch": Verizon Media
📊 Found owner for "The Verge": Vox Media
📊 Found owner for "Ars Technica": Condé Nast
📊 Found owner for "BBC News": British Broadcasting Corporation
📊 Found owner for "CNN": Warner Bros. Discovery
```

## API Flow

```
User Opens App
    ↓
Load Feeds from Storage
    ↓
Extract Feed Names
    ↓
Batch Wikipedia Lookup
    ↓ (batches of 5, 100ms delay)
    ├─→ Search Wikipedia for "TechCrunch"
    │       ↓
    │   Get Page Summary
    │       ↓
    │   Extract Ownership Pattern
    │       ↓
    │   "Verizon Media" ✓
    │
    ├─→ Search Wikipedia for "The Verge"
    │       ↓
    │   Get Page Summary
    │       ↓
    │   Extract Ownership Pattern
    │       ↓
    │   "Vox Media" ✓
    │
    └─→ ... (continue for all feeds)
    ↓
Display Feeds with Owner Labels
```

## Styling Details

### Feed Item Layout
```css
.sidebar-item {
  display: flex;
  align-items: flex-start;  /* Changed from center */
  gap: 12px;
  padding: 10px 12px;
  min-height: 40px;         /* New: accommodate 2 lines */
}

.sidebar-item-icon {
  margin-top: 2px;          /* New: align with text */
}
```

### Owner Label
```javascript
{feed.owner && (
  <div style={{ 
    fontSize: '0.65rem',      // Smaller than feed name
    marginTop: '2px',         // Small gap from feed name
    opacity: 0.5,             // Muted appearance
    fontWeight: 400           // Normal weight
  }}>
    {feed.owner}
  </div>
)}
```

## Example Feeds with Ownership

| Feed Name | Owner/Parent Company | Source |
|-----------|---------------------|--------|
| TechCrunch | Verizon Media | Wikipedia |
| The Verge | Vox Media | Wikipedia |
| Ars Technica | Condé Nast | Wikipedia |
| Wired | Condé Nast | Wikipedia |
| Engadget | Yahoo! Inc. | Wikipedia |
| The Guardian | Guardian Media Group | Wikipedia |
| BBC News | British Broadcasting Corporation | Wikipedia |
| CNN | Warner Bros. Discovery | Wikipedia |
| CNBC | NBCUniversal | Wikipedia |
| Bloomberg | Bloomberg L.P. | Wikipedia |
| Forbes | Forbes Global Media Holdings | Wikipedia |
| Business Insider | Axel Springer | Wikipedia |

## Testing Instructions

1. **Start Dev Server**: `npm run dev`
2. **Open Browser**: http://localhost:3000
3. **Add Test Feeds**: Use the manage page to add feeds
4. **Check Sidebar**: Owner names should appear below feed names
5. **View Console**: See ownership lookup logs
6. **Test Page**: Visit http://localhost:3000/test-wiki for direct testing

## Performance Impact

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Initial Load Time | ~2s | ~4-7s | +2-5s (one-time) |
| Subsequent Loads | ~2s | ~2s | No change (cached) |
| API Calls | 0 | N (number of feeds) | +N per session |
| Memory Usage | Baseline | +~10KB | Minimal |

## Error Handling

### No Wikipedia Page Found
```
Feed: "My Personal Blog"
Owner: (not displayed)
Console: "Not found on Wikipedia"
```

### Ownership Pattern Not Matched
```
Feed: "Independent News Site"
Owner: (not displayed)
Console: "Ownership information not found"
```

### API Error
```
Feed: "TechCrunch"
Owner: (not displayed)
Console: "Failed to fetch ownership info"
```

All errors are graceful - feed display is never blocked by ownership lookup failures.

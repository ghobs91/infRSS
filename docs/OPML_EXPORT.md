# OPML Export Feature

## Overview
The application now supports exporting your RSS feeds to OPML (Outline Processor Markup Language) format, a standard format for exchanging lists of RSS feeds between different RSS readers.

## What is OPML?
OPML is an XML-based format that allows users to:
- Export their feed subscriptions from one RSS reader
- Import them into another RSS reader
- Share feed collections with others
- Backup their feed lists

## Features

### Export Functionality
- **Location**: Manage page (`/manage`)
- **Button**: "Export to OPML" button in the Feeds tab
- **Output**: Downloads a file named `feeds-export-YYYY-MM-DD.opml`
- **Content**: All your subscribed feeds, organized by category

### What Gets Exported
The OPML export includes:
- Feed title
- Feed URL (xmlUrl)
- HTML URL (for browser access)
- Category organization
- Tags (as category attribute)
- Export date and time

### OPML Structure
The exported file follows the OPML 2.0 standard:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head>
    <title>RSS Feeds Export</title>
    <dateCreated>Wed, 15 Oct 2025 08:00:00 GMT</dateCreated>
    <dateModified>Wed, 15 Oct 2025 08:00:00 GMT</dateModified>
  </head>
  <body>
    <outline text="Category Name" title="Category Name">
      <outline type="rss" text="Feed Title" title="Feed Title" 
               xmlUrl="https://example.com/feed" htmlUrl="https://example.com"
               category="tag1,tag2"/>
    </outline>
  </body>
</opml>
```

## Implementation Details

### Files Added/Modified

#### New API Endpoint
- **File**: `src/app/api/export-opml/route.ts`
- **Method**: POST
- **Input**: JSON with feeds and categories
- **Output**: OPML XML file for download

#### Utility Functions
- **File**: `src/lib/rssUtils.ts`
- **New Functions**:
  - `generateOPMLFromFeeds()`: Generates OPML XML from feeds
  - `escapeXml()`: Properly escapes XML special characters

#### UI Updates
- **File**: `src/app/manage/page.tsx`
- **New Handler**: `handleExportOPML()` - Triggers the export process
- **New Button**: Export button with download icon

### How It Works

1. **User clicks "Export to OPML"**
   - Button is only enabled if there are feeds to export

2. **Request is sent to API**
   - Sends current feeds and categories as JSON
   - Uses POST method to `/api/export-opml`

3. **Server generates OPML**
   - Groups feeds by category
   - Creates properly formatted XML
   - Escapes special characters

4. **File is downloaded**
   - Browser receives the OPML as a blob
   - Automatic download is triggered
   - Filename includes current date

## Usage

### Exporting Feeds
1. Navigate to the Manage page (`/manage`)
2. Ensure you have at least one feed subscribed
3. Click the "Export to OPML" button
4. The file will automatically download

### Importing to Other Readers
Most RSS readers support OPML import:
- **Feedly**: Settings → Import
- **NewsBlur**: Settings → Import from OPML
- **The Old Reader**: Settings → Import/Export
- **Inoreader**: Settings → Import/Export

## Benefits

1. **Portability**: Easily move your feeds between RSS readers
2. **Backup**: Keep a backup of your feed subscriptions
3. **Sharing**: Share your curated feed list with others
4. **Compatibility**: Works with virtually all RSS readers
5. **Organization**: Preserves category structure and tags

## Future Enhancements

Possible improvements:
- [ ] Selective export (choose which feeds/categories to export)
- [ ] Multiple export formats (JSON, CSV)
- [ ] Direct sync with cloud services
- [ ] Scheduled automatic backups
- [ ] Version history of exports

## Technical Notes

### XML Escaping
The implementation properly escapes XML special characters:
- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;`
- `'` → `&apos;`

### Category Grouping
Feeds are automatically grouped by their assigned category in the OPML output, making the exported file well-organized and easy to understand.

### Standards Compliance
The implementation follows the OPML 2.0 specification, ensuring compatibility with all major RSS readers.

## Troubleshooting

### Export button is disabled
- **Cause**: No feeds are currently subscribed
- **Solution**: Add at least one feed first

### Download doesn't start
- **Cause**: Browser popup blocker
- **Solution**: Allow downloads from the site

### File won't import into other reader
- **Cause**: Possible formatting issue
- **Solution**: Open the OPML file in a text editor to verify it's valid XML

## Related Documentation
- [Feed Migration](./feedMigration.ts) - Migrating feeds from other readers
- [RSS Utils](../src/lib/rssUtils.ts) - RSS utility functions
- [Feed Types](../src/lib/types.ts) - TypeScript type definitions

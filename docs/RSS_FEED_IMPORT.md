# RSS Feed Import from awesome-rss-feeds

This document describes the RSS feed data imported from the [awesome-rss-feeds](https://github.com/plenaryapp/awesome-rss-feeds) repository.

## Overview

We have successfully imported **768 RSS feeds** organized into:
- **34 categories** (512 feeds)
- **25 countries** (256 feeds)

## Categories

The following categories are available with their feed counts:

### Recommended Topics
- **Android** (18 feeds) - Android news, reviews, and community
- **Android Development** (31 feeds) - Android app development resources
- **Apple** (16 feeds) - Apple products, news, and ecosystem
- **Architecture** (14 feeds) - Architecture and building design
- **Beauty** (11 feeds) - Beauty tips, products, and tutorials
- **Books** (7 feeds) - Book reviews and literary content
- **Business & Economy** (15 feeds) - Business news and economics
- **Cars** (18 feeds) - Automotive news and reviews
- **Cricket** (20 feeds) - Cricket news and analysis
- **DIY** (11 feeds) - Do-it-yourself projects and tutorials
- **Fashion** (9 feeds) - Fashion trends and style
- **Food** (20 feeds) - Recipes, cooking tips, and food culture
- **Football** (5 feeds) - Football/soccer news
- **Funny** (14 feeds) - Humor and entertainment
- **Gaming** (16 feeds) - Video game news and reviews
- **History** (10 feeds) - Historical content and podcasts
- **Interior Design** (23 feeds) - Home decor and interior design
- **iOS Development** (18 feeds) - iOS app development resources
- **Movies** (11 feeds) - Film news and reviews
- **Music** (8 feeds) - Music news and industry updates
- **News** (10 feeds) - World news from major outlets
- **Personal Finance** (28 feeds) - Money management and investing
- **Photography** (12 feeds) - Photography tips and inspiration
- **Programming** (48 feeds) - Software development and coding
- **Science** (22 feeds) - Scientific research and news
- **Space** (7 feeds) - Space exploration and astronomy
- **Sports** (6 feeds) - General sports news
- **Startups** (22 feeds) - Startup culture and entrepreneurship
- **Tech** (26 feeds) - Technology news and reviews
- **Television** (6 feeds) - TV shows and entertainment
- **Tennis** (7 feeds) - Tennis news and coverage
- **Travel** (5 feeds) - Travel tips and destination guides
- **UI/UX** (11 feeds) - User interface and experience design
- **Web Development** (7 feeds) - Web development tutorials and news

### Countries
News sources from 25 countries including:
- Australia (16 feeds)
- Bangladesh (8 feeds)
- Brazil (7 feeds)
- Canada (10 feeds)
- France (11 feeds)
- Germany (5 feeds)
- Hong Kong (5 feeds)
- India (36 feeds)
- Indonesia (4 feeds)
- Iran (7 feeds)
- Ireland (6 feeds)
- Italy (12 feeds)
- Japan (7 feeds)
- Mexico (15 feeds)
- Myanmar (3 feeds)
- Nigeria (10 feeds)
- Pakistan (7 feeds)
- Philippines (20 feeds)
- Poland (8 feeds)
- Russia (13 feeds)
- South Africa (11 feeds)
- Spain (9 feeds)
- Ukraine (12 feeds)
- United Kingdom (5 feeds)
- United States (9 feeds)

## API Usage

### GET /api/suggest
Returns a list of all available categories and countries.

**Example Response:**
```json
{
  "categories": [
    {
      "slug": "android",
      "name": "Android",
      "feedCount": 18
    },
    ...
  ],
  "countries": [
    {
      "slug": "australia",
      "name": "Australia",
      "feedCount": 16
    },
    ...
  ]
}
```

### POST /api/suggest
Returns feed suggestions based on a topic.

**Request Body:**
```json
{
  "topic": "programming"
}
```

**Example Response:**
```json
[
  {
    "title": "Better Programming - Medium",
    "url": "https://medium.com/feed/better-programming",
    "score": 1.0,
    "category": "programming"
  },
  {
    "title": "Code as Craft",
    "url": "https://codeascraft.com/feed/atom/",
    "score": 0.98,
    "category": "programming"
  },
  ...
]
```

### Supported Query Types

1. **Exact Category Match**: `"programming"`, `"tech"`, `"food"`
2. **Exact Country Match**: `"india"`, `"canada"`, `"australia"`
3. **Partial Matches**: `"android dev"` → Android Development
4. **Aliases**: 
   - `"code"` or `"coding"` → Programming
   - `"finance"` or `"money"` → Personal Finance
   - `"cooking"` or `"recipes"` → Food
   - `"design"` → UI/UX
   - `"frontend"` → Web Development
   - `"mobile"` → Android
   - `"startup"` → Startups
   - And many more...

## Maintenance

### Re-importing Feeds

To update the feed data from the latest version of awesome-rss-feeds:

```bash
node scripts/import-awesome-feeds.mjs
```

This will:
1. Fetch all OPML files from the repository
2. Parse the feed data
3. Generate a new `src/lib/feedData.ts` file
4. Organize feeds by category and country with scoring

### Testing

Test the suggest API:

```bash
# Make sure dev server is running
npm run dev

# In another terminal
node scripts/test-suggest-api.mjs
```

## Feed Scoring

Feeds are scored based on their position within each category:
- First feed: 1.0
- Each subsequent feed: -0.02 from previous
- Minimum score: 0.5

This ensures that feeds maintain their relative importance within categories while all feeds remain relevant.

## Data Source

All feed data is sourced from:
- **Repository**: [plenaryapp/awesome-rss-feeds](https://github.com/plenaryapp/awesome-rss-feeds)
- **License**: Check the repository for license details
- **Updates**: The repository is actively maintained by the Plenary team

## Contributing

To add new feeds or categories:
1. Contribute to the upstream awesome-rss-feeds repository
2. Run the import script to update local data
3. Test the new feeds with the suggest API

---

**Last Updated**: November 27, 2025  
**Total Feeds**: 768  
**Categories**: 34  
**Countries**: 25

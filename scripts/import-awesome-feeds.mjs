#!/usr/bin/env node

/**
 * Script to import RSS feeds from awesome-rss-feeds repository
 * Downloads OPML files and converts them to the format used by the suggest API
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Categories from awesome-rss-feeds that we want to import
const categories = [
  { name: 'Android', slug: 'android' },
  { name: 'Android Development', slug: 'android-development' },
  { name: 'Apple', slug: 'apple' },
  { name: 'Architecture', slug: 'architecture' },
  { name: 'Beauty', slug: 'beauty' },
  { name: 'Books', slug: 'books' },
  { name: 'Business & Economy', slug: 'business-economy' },
  { name: 'Cars', slug: 'cars' },
  { name: 'Cricket', slug: 'cricket' },
  { name: 'Interior design', slug: 'interior-design' },
  { name: 'DIY', slug: 'diy' },
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Food', slug: 'food' },
  { name: 'Football', slug: 'football' },
  { name: 'Funny', slug: 'funny' },
  { name: 'Gaming', slug: 'gaming' },
  { name: 'History', slug: 'history' },
  { name: 'iOS Development', slug: 'ios-development' },
  { name: 'Movies', slug: 'movies' },
  { name: 'Music', slug: 'music' },
  { name: 'News', slug: 'news' },
  { name: 'Personal finance', slug: 'personal-finance' },
  { name: 'Photography', slug: 'photography' },
  { name: 'Programming', slug: 'programming' },
  { name: 'Science', slug: 'science' },
  { name: 'Space', slug: 'space' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Startups', slug: 'startups' },
  { name: 'Tech', slug: 'tech' },
  { name: 'Television', slug: 'television' },
  { name: 'Tennis', slug: 'tennis' },
  { name: 'Travel', slug: 'travel' },
  { name: 'UI - UX', slug: 'ui-ux' },
  { name: 'Web Development', slug: 'web-development' }
];

// Country sources
const countries = [
  { name: 'Australia', slug: 'australia', code: 'AU' },
  { name: 'Bangladesh', slug: 'bangladesh', code: 'BD' },
  { name: 'Brazil', slug: 'brazil', code: 'BR' },
  { name: 'Canada', slug: 'canada', code: 'CA' },
  { name: 'Germany', slug: 'germany', code: 'DE' },
  { name: 'Spain', slug: 'spain', code: 'ES' },
  { name: 'France', slug: 'france', code: 'FR' },
  { name: 'United Kingdom', slug: 'united-kingdom', code: 'GB' },
  { name: 'Hong Kong SAR China', slug: 'hong-kong', code: 'HK' },
  { name: 'Indonesia', slug: 'indonesia', code: 'ID' },
  { name: 'Ireland', slug: 'ireland', code: 'IE' },
  { name: 'India', slug: 'india', code: 'IN' },
  { name: 'Iran', slug: 'iran', code: 'IR' },
  { name: 'Italy', slug: 'italy', code: 'IT' },
  { name: 'Japan', slug: 'japan', code: 'JP' },
  { name: 'Myanmar (Burma)', slug: 'myanmar', code: 'MM' },
  { name: 'Mexico', slug: 'mexico', code: 'MX' },
  { name: 'Nigeria', slug: 'nigeria', code: 'NG' },
  { name: 'Philippines', slug: 'philippines', code: 'PH' },
  { name: 'Pakistan', slug: 'pakistan', code: 'PK' },
  { name: 'Poland', slug: 'poland', code: 'PL' },
  { name: 'Russia', slug: 'russia', code: 'RU' },
  { name: 'Ukraine', slug: 'ukraine', code: 'UA' },
  { name: 'United States', slug: 'united-states', code: 'US' },
  { name: 'South Africa', slug: 'south-africa', code: 'ZA' }
];

/**
 * Parse XML/OPML text to extract feed information
 */
function parseOPML(opmlText) {
  const feeds = [];
  
  // Simple regex-based parsing (for production, consider using a proper XML parser)
  const outlineRegex = /<outline[^>]*>/gi;
  const matches = opmlText.match(outlineRegex) || [];
  
  for (const match of matches) {
    const titleMatch = match.match(/title="([^"]*)"/i);
    const xmlUrlMatch = match.match(/xmlUrl="([^"]*)"/i);
    const htmlUrlMatch = match.match(/htmlUrl="([^"]*)"/i);
    const textMatch = match.match(/text="([^"]*)"/i);
    
    const xmlUrl = xmlUrlMatch ? xmlUrlMatch[1] : null;
    
    if (xmlUrl && xmlUrl.startsWith('http')) {
      const title = titleMatch ? titleMatch[1] : (textMatch ? textMatch[1] : 'Untitled Feed');
      feeds.push({
        title: title.replace(/&amp;/g, '&').replace(/&#039;/g, "'").replace(/&quot;/g, '"'),
        url: xmlUrl,
        htmlUrl: htmlUrlMatch ? htmlUrlMatch[1] : null
      });
    }
  }
  
  return feeds;
}

/**
 * Fetch OPML file from GitHub
 */
async function fetchOPML(categorySlug) {
  const url = `https://raw.githubusercontent.com/plenaryapp/awesome-rss-feeds/master/recommended/without_category/${encodeURIComponent(categorySlug)}.opml`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Failed to fetch ${categorySlug}: ${response.status}`);
      return null;
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${categorySlug}:`, error.message);
    return null;
  }
}

/**
 * Fetch country OPML file from GitHub
 */
async function fetchCountryOPML(countrySlug) {
  const url = `https://raw.githubusercontent.com/plenaryapp/awesome-rss-feeds/master/countries/without_category/${encodeURIComponent(countrySlug)}.opml`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Failed to fetch country ${countrySlug}: ${response.status}`);
      return null;
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching country ${countrySlug}:`, error.message);
    return null;
  }
}

/**
 * Generate TypeScript code for the feeds
 */
function generateTypeScriptCode(feedsByCategory, feedsByCountry) {
  let code = `// Auto-generated feed data from awesome-rss-feeds repository
// Generated on: ${new Date().toISOString()}
// Source: https://github.com/plenaryapp/awesome-rss-feeds

export interface Feed {
  title: string;
  url: string;
  score: number;
  category?: string;
  country?: string;
}

// Recommended category-based feeds
export const TOPIC_BASED_FEEDS: Record<string, Feed[]> = {\n`;

  // Add category-based feeds
  for (const [category, feeds] of Object.entries(feedsByCategory)) {
    if (feeds.length === 0) continue;
    
    code += `  "${category}": [\n`;
    feeds.forEach((feed, index) => {
      const score = Math.max(0.5, 1.0 - (index * 0.02)); // Decreasing score based on position
      code += `    { title: ${JSON.stringify(feed.title)}, url: ${JSON.stringify(feed.url)}, score: ${score.toFixed(2)}, category: ${JSON.stringify(category)} },\n`;
    });
    code += `  ],\n`;
  }

  code += `};\n\n`;

  // Add country-based feeds
  code += `// Country-based news feeds\n`;
  code += `export const COUNTRY_BASED_FEEDS: Record<string, Feed[]> = {\n`;

  for (const [country, feeds] of Object.entries(feedsByCountry)) {
    if (feeds.length === 0) continue;
    
    code += `  "${country}": [\n`;
    feeds.forEach((feed, index) => {
      const score = Math.max(0.5, 1.0 - (index * 0.02));
      code += `    { title: ${JSON.stringify(feed.title)}, url: ${JSON.stringify(feed.url)}, score: ${score.toFixed(2)}, country: ${JSON.stringify(country)} },\n`;
    });
    code += `  ],\n`;
  }

  code += `};\n\n`;

  // Add fallback feeds (use top feeds from various categories)
  code += `// Fallback feeds when no specific match is found\n`;
  code += `export const FALLBACK_FEEDS: Feed[] = [\n`;
  
  const fallbackCategories = ['tech', 'news', 'programming', 'science', 'business-economy'];
  fallbackCategories.forEach(cat => {
    const feeds = feedsByCategory[cat] || [];
    feeds.slice(0, 2).forEach((feed, index) => {
      code += `  { title: ${JSON.stringify(feed.title)}, url: ${JSON.stringify(feed.url)}, score: ${(0.95 - index * 0.05).toFixed(2)} },\n`;
    });
  });
  
  code += `];\n`;

  return code;
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting import from awesome-rss-feeds repository...\n');

  const feedsByCategory = {};
  const feedsByCountry = {};

  // Fetch category feeds
  console.log('📦 Fetching category feeds...');
  for (const category of categories) {
    process.stdout.write(`  - ${category.name}... `);
    const opmlText = await fetchOPML(category.name);
    
    if (opmlText) {
      const feeds = parseOPML(opmlText);
      feedsByCategory[category.slug] = feeds;
      console.log(`✓ (${feeds.length} feeds)`);
    } else {
      feedsByCategory[category.slug] = [];
      console.log('✗ (failed)');
    }
    
    // Rate limiting - wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Fetch country feeds
  console.log('\n🌍 Fetching country feeds...');
  for (const country of countries) {
    process.stdout.write(`  - ${country.name}... `);
    const opmlText = await fetchCountryOPML(country.name);
    
    if (opmlText) {
      const feeds = parseOPML(opmlText);
      feedsByCountry[country.slug] = feeds;
      console.log(`✓ (${feeds.length} feeds)`);
    } else {
      feedsByCountry[country.slug] = [];
      console.log('✗ (failed)');
    }
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Generate TypeScript code
  console.log('\n📝 Generating TypeScript code...');
  const tsCode = generateTypeScriptCode(feedsByCategory, feedsByCountry);

  // Write to file
  const outputPath = path.join(__dirname, '..', 'src', 'lib', 'feedData.ts');
  await fs.writeFile(outputPath, tsCode, 'utf-8');
  console.log(`✓ Wrote feed data to ${outputPath}`);

  // Statistics
  const totalCategoryFeeds = Object.values(feedsByCategory).reduce((sum, feeds) => sum + feeds.length, 0);
  const totalCountryFeeds = Object.values(feedsByCountry).reduce((sum, feeds) => sum + feeds.length, 0);
  
  console.log('\n📊 Import Statistics:');
  console.log(`  - Categories: ${Object.keys(feedsByCategory).length}`);
  console.log(`  - Category feeds: ${totalCategoryFeeds}`);
  console.log(`  - Countries: ${Object.keys(feedsByCountry).length}`);
  console.log(`  - Country feeds: ${totalCountryFeeds}`);
  console.log(`  - Total feeds: ${totalCategoryFeeds + totalCountryFeeds}`);
  
  console.log('\n✨ Import completed successfully!');
  console.log('\nNext steps:');
  console.log('  1. Review the generated file: src/lib/feedData.ts');
  console.log('  2. Update src/app/api/suggest/route.ts to use the new feed data');
  console.log('  3. Test the suggest API with various queries');
}

main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});

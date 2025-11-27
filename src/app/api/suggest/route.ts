import { NextRequest, NextResponse } from "next/server";
import { TOPIC_BASED_FEEDS, COUNTRY_BASED_FEEDS, FALLBACK_FEEDS } from "@/lib/feedData";

// GET endpoint to list all available categories and countries
export async function GET() {
  const categories = Object.keys(TOPIC_BASED_FEEDS).sort();
  const countries = Object.keys(COUNTRY_BASED_FEEDS).sort();
  
  return NextResponse.json({
    categories: categories.map(cat => ({
      slug: cat,
      name: cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      feedCount: TOPIC_BASED_FEEDS[cat]?.length || 0
    })),
    countries: countries.map(country => ({
      slug: country,
      name: country.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      feedCount: COUNTRY_BASED_FEEDS[country]?.length || 0
    }))
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic } = body;
    
    if (!topic || typeof topic !== 'string' || topic.trim() === '') {
      return NextResponse.json(
        { error: "Topic is required and must be a non-empty string" },
        { status: 400 }
      );
    }
    
    console.log(`Received request for topic: "${topic}"`);
    
    const normalizedTopic = topic.toLowerCase().trim();
    
    // Check for exact or partial matches in topic-based feeds
    // Try exact match first
    if (TOPIC_BASED_FEEDS[normalizedTopic]) {
      console.log(`Found exact topic match: ${normalizedTopic}`);
      return NextResponse.json(TOPIC_BASED_FEEDS[normalizedTopic]);
    }
    
    // Try country-based feeds
    if (COUNTRY_BASED_FEEDS[normalizedTopic]) {
      console.log(`Found exact country match: ${normalizedTopic}`);
      return NextResponse.json(COUNTRY_BASED_FEEDS[normalizedTopic]);
    }
    
    // Try partial matches for topics
    for (const [key, feeds] of Object.entries(TOPIC_BASED_FEEDS)) {
      // Check if the key is in the topic or vice versa
      if (normalizedTopic.includes(key) || key.includes(normalizedTopic)) {
        console.log(`Found partial topic match: ${key} for "${normalizedTopic}"`);
        return NextResponse.json(feeds);
      }
    }
    
    // Try partial matches for countries
    for (const [key, feeds] of Object.entries(COUNTRY_BASED_FEEDS)) {
      if (normalizedTopic.includes(key) || key.includes(normalizedTopic)) {
        console.log(`Found partial country match: ${key} for "${normalizedTopic}"`);
        return NextResponse.json(feeds);
      }
    }
    
    // Check for common aliases and synonyms
    const aliases: Record<string, string> = {
      'code': 'programming',
      'coding': 'programming',
      'developer': 'programming',
      'design': 'ui-ux',
      'frontend': 'web-development',
      'backend': 'programming',
      'technology': 'tech',
      'finance': 'personal-finance',
      'money': 'personal-finance',
      'cooking': 'food',
      'recipes': 'food',
      'automobile': 'cars',
      'auto': 'cars',
      'soccer': 'football',
      'video games': 'gaming',
      'film': 'movies',
      'cinema': 'movies',
      'television': 'television',
      'tv': 'television',
      'music': 'music',
      'android dev': 'android-development',
      'ios dev': 'ios-development',
      'mobile': 'android',
      'startup': 'startups',
      'business': 'business-economy',
      'economy': 'business-economy',
      'economics': 'business-economy'
    };
    
    for (const [alias, category] of Object.entries(aliases)) {
      if (normalizedTopic.includes(alias) && TOPIC_BASED_FEEDS[category]) {
        console.log(`Found alias match: ${alias} -> ${category}`);
        return NextResponse.json(TOPIC_BASED_FEEDS[category]);
      }
    }
    
    // If no match, return fallback feeds
    console.log("No specific topic match, returning fallback feeds");
    return NextResponse.json(FALLBACK_FEEDS);
    
  } catch (error) {
    console.error("Suggestion API error:", error);
    return NextResponse.json(FALLBACK_FEEDS);
  }
}

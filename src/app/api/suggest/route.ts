import { NextRequest, NextResponse } from "next/server";

// Fallback feeds when API fails
const FALLBACK_FEEDS = [
  { title: "TechCrunch", url: "https://techcrunch.com/feed/", score: 0.9 },
  { title: "The Verge", url: "https://www.theverge.com/rss/index.xml", score: 0.85 },
  { title: "Wired", url: "https://www.wired.com/feed/rss", score: 0.8 },
  { title: "Ars Technica", url: "https://arstechnica.com/feed/", score: 0.75 },
  { title: "Engadget", url: "https://www.engadget.com/rss.xml", score: 0.7 }
];

// Direct feed suggestions based on common topics
const TOPIC_BASED_FEEDS: Record<string, { title: string; url: string; score: number }[]> = {
  "tech": [
    { title: "TechCrunch", url: "https://techcrunch.com/feed/", score: 0.95 },
    { title: "The Verge", url: "https://www.theverge.com/rss/index.xml", score: 0.9 },
    { title: "Wired", url: "https://www.wired.com/feed/rss", score: 0.85 },
    { title: "Ars Technica", url: "https://arstechnica.com/feed/", score: 0.8 },
    { title: "Engadget", url: "https://www.engadget.com/rss.xml", score: 0.75 }
  ],
  "programming": [
    { title: "Dev.to", url: "https://dev.to/feed/", score: 0.95 },
    { title: "Hacker News", url: "https://hnrss.org/frontpage", score: 0.9 },
    { title: "CSS-Tricks", url: "https://css-tricks.com/feed/", score: 0.85 },
    { title: "Smashing Magazine", url: "https://www.smashingmagazine.com/feed/", score: 0.8 },
    { title: "A List Apart", url: "https://alistapart.com/main/feed/", score: 0.75 }
  ],
  "news": [
    { title: "BBC News", url: "http://feeds.bbci.co.uk/news/rss.xml", score: 0.95 },
    { title: "Reuters", url: "https://www.reutersagency.com/feed/", score: 0.9 },
    { title: "The Guardian", url: "https://www.theguardian.com/international/rss", score: 0.85 },
    { title: "NPR News", url: "https://feeds.npr.org/1001/rss.xml", score: 0.8 },
    { title: "AP News", url: "https://apnews.com/rss", score: 0.75 }
  ],
  "science": [
    { title: "Scientific American", url: "https://www.scientificamerican.com/feed/", score: 0.95 },
    { title: "Science Daily", url: "https://www.sciencedaily.com/rss/all.xml", score: 0.9 },
    { title: "Nature", url: "https://www.nature.com/nature.rss", score: 0.85 },
    { title: "Science News", url: "https://www.sciencenews.org/feed", score: 0.8 },
    { title: "Phys.org", url: "https://phys.org/rss-feed/", score: 0.75 }
  ],
  "cooking": [
    { title: "Bon Appétit", url: "https://www.bonappetit.com/feed/rss", score: 0.95 },
    { title: "Serious Eats", url: "https://www.seriouseats.com/feeds/latest", score: 0.9 },
    { title: "Smitten Kitchen", url: "https://smittenkitchen.com/feed/", score: 0.85 },
    { title: "The Kitchn", url: "https://www.thekitchn.com/main.rss", score: 0.8 },
    { title: "Minimalist Baker", url: "https://minimalistbaker.com/feed/", score: 0.75 }
  ],
  "travel": [
    { title: "Lonely Planet", url: "https://www.lonelyplanet.com/feeds/news/latest", score: 0.95 },
    { title: "Atlas Obscura", url: "https://www.atlasobscura.com/feeds/latest", score: 0.9 },
    { title: "Travel + Leisure", url: "https://www.travelandleisure.com/feeds/all", score: 0.85 },
    { title: "Nomadic Matt", url: "https://www.nomadicmatt.com/travel-blog/feed/", score: 0.8 },
    { title: "The Points Guy", url: "https://thepointsguy.com/feed/", score: 0.75 }
  ],
  "sports": [
    { title: "ESPN", url: "https://www.espn.com/espn/rss/news", score: 0.95 },
    { title: "Bleacher Report", url: "https://bleacherreport.com/articles/feed", score: 0.9 },
    { title: "The Athletic", url: "https://theathletic.com/feeds/rss/", score: 0.85 },
    { title: "SB Nation", url: "https://www.sbnation.com/rss/current", score: 0.8 },
    { title: "BBC Sport", url: "http://feeds.bbci.co.uk/sport/rss.xml", score: 0.75 }
  ],
  "gaming": [
    { title: "IGN", url: "https://feeds.ign.com/ign/all", score: 0.95 },
    { title: "Kotaku", url: "https://kotaku.com/rss", score: 0.9 },
    { title: "PC Gamer", url: "https://www.pcgamer.com/rss/", score: 0.85 },
    { title: "Polygon", url: "https://www.polygon.com/rss/index.xml", score: 0.8 },
    { title: "Rock Paper Shotgun", url: "https://www.rockpapershotgun.com/feed", score: 0.75 }
  ],
  "movies": [
    { title: "IndieWire", url: "https://www.indiewire.com/feed/", score: 0.95 },
    { title: "Variety", url: "https://variety.com/feed/", score: 0.9 },
    { title: "The Hollywood Reporter", url: "https://www.hollywoodreporter.com/feed/", score: 0.85 },
    { title: "/Film", url: "https://www.slashfilm.com/feed/", score: 0.8 },
    { title: "Collider", url: "https://collider.com/feed/", score: 0.75 }
  ],
  "books": [
    { title: "Book Riot", url: "https://bookriot.com/feed/", score: 0.95 },
    { title: "Literary Hub", url: "https://lithub.com/feed/", score: 0.9 },
    { title: "The Millions", url: "https://themillions.com/feed", score: 0.85 },
    { title: "Electric Literature", url: "https://electricliterature.com/feed/", score: 0.8 },
    { title: "Publishers Weekly", url: "https://www.publishersweekly.com/pw/feeds/recent/index.xml", score: 0.75 }
  ]
};

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
    
    // Check if we have direct topic-based suggestions
    const normalizedTopic = topic.toLowerCase().trim();
    for (const [key, feeds] of Object.entries(TOPIC_BASED_FEEDS)) {
      if (normalizedTopic.includes(key)) {
        console.log(`Using direct topic-based suggestions for: ${key}`);
        return NextResponse.json(feeds);
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

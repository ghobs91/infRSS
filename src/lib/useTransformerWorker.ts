// lib/useTransformerWorker.ts

interface FeedData {
    title: string;
    url: string;
    score?: number;
  }
  
  // Fallback feed suggestions when API fails
  const FALLBACK_FEEDS: FeedData[] = [
    { title: "TechCrunch", url: "https://techcrunch.com/feed/" },
    { title: "The Verge", url: "https://www.theverge.com/rss/index.xml" },
    { title: "Wired", url: "https://www.wired.com/feed/rss" },
    { title: "Ars Technica", url: "https://arstechnica.com/feed/" },
    { title: "Engadget", url: "https://www.engadget.com/rss.xml" }
  ];
  
  // Direct topic-based suggestions for common topics
  const TOPIC_BASED_FEEDS: Record<string, FeedData[]> = {
    "tech": [
      { title: "TechCrunch", url: "https://techcrunch.com/feed/" },
      { title: "The Verge", url: "https://www.theverge.com/rss/index.xml" },
      { title: "Wired", url: "https://www.wired.com/feed/rss" },
      { title: "Ars Technica", url: "https://arstechnica.com/feed/" },
      { title: "Engadget", url: "https://www.engadget.com/rss.xml" }
    ],
    "programming": [
      { title: "Dev.to", url: "https://dev.to/feed/" },
      { title: "CSS-Tricks", url: "https://css-tricks.com/feed/" },
      { title: "Smashing Magazine", url: "https://www.smashingmagazine.com/feed/" },
      { title: "JavaScript Weekly", url: "https://javascriptweekly.com/rss/" },
      { title: "React Blog", url: "https://reactjs.org/feed.xml" }
    ],
    "news": [
      { title: "BBC News", url: "http://feeds.bbci.co.uk/news/rss.xml" },
      { title: "Reuters", url: "https://www.reutersagency.com/feed/" },
      { title: "The Guardian", url: "https://www.theguardian.com/international/rss" },
      { title: "NPR News", url: "https://feeds.npr.org/1001/rss.xml" },
      { title: "CNN", url: "https://rss.cnn.com/rss/cnn_topstories.rss" }
    ],
    "science": [
      { title: "Scientific American", url: "https://www.scientificamerican.com/feed/" },
      { title: "Science Daily", url: "https://www.sciencedaily.com/rss/all.xml" },
      { title: "Nature", url: "https://www.nature.com/nature.rss" },
      { title: "Science News", url: "https://www.sciencenews.org/feed" },
      { title: "New Scientist", url: "https://www.newscientist.com/feed/" }
    ]
  };
  
  export async function suggestFeedsWithWorker(topic: string, feeds: FeedData[]): Promise<FeedData[]> {
    // Check if we have direct topic-based suggestions
    const normalizedTopic = topic.toLowerCase().trim();
    for (const [key, topicFeeds] of Object.entries(TOPIC_BASED_FEEDS)) {
      if (normalizedTopic.includes(key)) {
        console.log(`Using direct topic-based suggestions for: ${key}`);
        return topicFeeds;
      }
    }
    
    try {
      // Add a timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      console.log(`Fetching suggestions for topic: ${topic}`);
      const response = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, feeds }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.warn(`API responded with status: ${response.status}`);
        return FALLBACK_FEEDS;
      }
      
      const data = await response.json();
      console.log(`Received ${data.length} suggestions from API`);
      
      if (data.length === 0) {
        console.warn("API returned empty suggestions array");
        return FALLBACK_FEEDS;
      }
      
      return data;
    } catch (err) {
      console.error("suggestFeedsWithWorker error:", err);
      return FALLBACK_FEEDS;
    }
  }
  
  
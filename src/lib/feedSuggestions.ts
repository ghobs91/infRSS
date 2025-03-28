// lib/feedSuggestions.ts
interface FeedData {
    title: string;
    url: string;
  }
  
  const PRIMARY_SOURCE_FEEDS: FeedData[] = [
    { title: "Paul Graham's Essays", url: "http://www.aaronsw.com/2002/feeds/pgessays.rss" },
    { title: "Steve Yegge's Blog", url: "https://steve-yegge.blogspot.com/feeds/posts/default" },
    { title: "Julia Evans", url: "https://jvns.ca/atom.xml" },
    { title: "Overreacted (Dan Abramov)", url: "https://overreacted.io/rss.xml" },
    { title: "Guido van Rossum", url: "https://gvanrossum.github.io/feed.xml" },
  ];
  
  function cosineSimilarity(a: number[], b: number[]): number {
    const dot = a.reduce((acc, val, i) => acc + val * b[i], 0);
    const magA = Math.sqrt(a.reduce((acc, val) => acc + val * val, 0));
    const magB = Math.sqrt(b.reduce((acc, val) => acc + val * val, 0));
    return dot / (magA * magB);
  }
  
  export async function suggestFeedsByTopic(topic: string): Promise<FeedData[]> {
    // ⛔ Ensure this only runs in browser
    if (typeof window === "undefined") return [];
  
    const { pipeline, env } = await import("@xenova/transformers");
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (env.backends as any).onnx = "wasm";
    env.allowLocalModels = false;
    env.useBrowserCache = true;
  
    const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    const topicEmbedding = (await embedder(topic))[0][0];
  
    const scored = await Promise.all(
      PRIMARY_SOURCE_FEEDS.map(async (feed) => {
        const embedding = (await embedder(feed.title))[0][0];
        const score = cosineSimilarity(topicEmbedding, embedding);
        return { ...feed, score };
      })
    );
  
    return scored.sort((a, b) => b.score - a.score).slice(0, 5);
  }
  
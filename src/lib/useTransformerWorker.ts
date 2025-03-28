// lib/useTransformerWorker.ts

interface FeedData {
    title: string;
    url: string;
  }
  
  export async function suggestFeedsWithWorker(topic: string, feeds: FeedData[]): Promise<FeedData[]> {
    try {
      const response = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, feeds }),
      });
      if (!response.ok) throw new Error("Failed to fetch suggestions");
      return await response.json();
    } catch (err) {
      console.error("suggestFeedsWithWorker error:", err);
      return [];
    }
  }
  
  
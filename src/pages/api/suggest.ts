// pages/api/suggest.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { pipeline, env } from "@xenova/transformers";

(env.backends as any).onnx = "wasm";
env.allowLocalModels = false;
env.useBrowserCache = true;

let embedder: any = null;

async function loadEmbedder() {
  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return embedder;
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((acc, val, i) => acc + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((acc, val) => acc + val * val, 0));
  const magB = Math.sqrt(b.reduce((acc, val) => acc + val * val, 0));
  return dot / (magA * magB);
}

function extractFeedUrlsFromHtml(html: string): string[] {
  const matches = [...html.matchAll(/https?:\/\/[^\s"']+\.(rss|xml)/gi)];
  return matches.map((m) => m[0]).slice(0, 10);
}

async function fetchHTMLForTopic(topic: string): Promise<string> {
  const query = encodeURIComponent(`${topic} site:medium.com OR site:substack.com OR site:dev.to OR inurl:rss`);
  const searchUrl = `https://www.google.com/search?q=${query}`;

  const response = await fetch(searchUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    },
  });
  return await response.text();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { topic } = req.body;
    const html = await fetchHTMLForTopic(topic);
    const feedUrls = extractFeedUrlsFromHtml(html);

    const feeds: { title: string; url: string }[] = [];
    for (const url of feedUrls) {
      try {
        const response = await fetch(url);
        const xml = await response.text();
        const title = xml.match(/<title>(.*?)<\/title>/)?.[1] || url;
        feeds.push({ title, url });
      } catch (err) {
        console.warn("Failed to fetch feed:", url);
      }
    }

    const embedder = await loadEmbedder();
    const topicEmbedding = (await embedder(topic))[0][0];

    const results = await Promise.all(
      feeds.map(async (feed) => {
        const embedding = (await embedder(feed.title))[0][0];
        const score = cosineSimilarity(topicEmbedding, embedding);
        return { ...feed, score };
      })
    );

    res.status(200).json(results.sort((a, b) => b.score - a.score).slice(0, 5));
  } catch (error) {
    console.error("Suggestion API error:", error);
    res.status(500).json({ error: "Failed to process suggestions." });
  }
}

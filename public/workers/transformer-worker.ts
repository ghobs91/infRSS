import { pipeline, env } from "@xenova/transformers";

// Configure environment
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

self.onmessage = async (e: MessageEvent) => {
  const { topic, feeds } = e.data;
  const embedder = await loadEmbedder();
  const topicEmbedding = (await embedder(topic))[0][0];

  const results = await Promise.all(
    feeds.map(async (feed: { title: string; url: string }) => {
      const embedding = (await embedder(feed.title))[0][0];
      const score = cosineSimilarity(topicEmbedding, embedding);
      return { ...feed, score };
    })
  );

  postMessage(results.sort((a, b) => b.score - a.score).slice(0, 5));
};
import { pipeline, env } from "@xenova/transformers";

// Configure environment
(env.backends as any).onnx = "wasm";
env.allowLocalModels = false;
env.useBrowserCache = true;

let embedder: any = null;
let vibesClassifier: any = null;
let summarizer: any = null;
let textClassifier: any = null;

async function loadEmbedder() {
  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return embedder;
}

async function loadVibesClassifier() {
  if (!vibesClassifier) {
    vibesClassifier = await pipeline("sentiment-analysis", "Xenova/distilbert-base-uncased-finetuned-sst-2-english");
  }
  return vibesClassifier;
}

async function loadSummarizer() {
  if (!summarizer) {
    summarizer = await pipeline("summarization", "Xenova/facebook/bart-large-cnn");
  }
  return summarizer;
}

async function loadTextClassifier() {
  if (!textClassifier) {
    textClassifier = await pipeline("text-classification", "Xenova/facebook/bart-large-mnli");
  }
  return textClassifier;
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((acc, val, i) => acc + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((acc, val) => acc + val * val, 0));
  const magB = Math.sqrt(b.reduce((acc, val) => acc + val * val, 0));
  return dot / (magA * magB);
}

async function analyzeVibes(text: string) {
  const classifier = await loadVibesClassifier();
  const result = await classifier(text);
  
  // Convert vibes score to -1 to 1 scale
  let score = 0;
  if (result[0].label === 'POSITIVE') {
    score = result[0].score;
  } else {
    score = -result[0].score;
  }
  
  return {
    score: score * 2 - 1, // Convert 0-1 to -1 to 1
    label: score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral',
    confidence: result[0].score
  };
}

async function detectClickbaitAndToxicity(text: string) {
  const classifier = await loadTextClassifier();
  
  // Check for clickbait patterns
  const clickbaitPatterns = [
    "you won't believe",
    "shocking",
    "amazing",
    "incredible",
    "mind-blowing",
    "this will change everything",
    "the truth about",
    "what they don't want you to know"
  ];
  
  let isClickbait = false;
  let isRagebait = false;
  
  const lowerText = text.toLowerCase();
  for (const pattern of clickbaitPatterns) {
    if (lowerText.includes(pattern)) {
      isClickbait = true;
      break;
    }
  }
  
  // Check for ragebait patterns
  const ragebaitPatterns = [
    "outrageous",
    "disgusting",
    "horrifying",
    "terrifying",
    "shocking truth",
    "you'll be furious",
    "this is unacceptable"
  ];
  
  for (const pattern of ragebaitPatterns) {
    if (lowerText.includes(pattern)) {
      isRagebait = true;
      break;
    }
  }
  
  // Simple toxicity detection based on aggressive language
  const toxicWords = ['hate', 'kill', 'destroy', 'terrible', 'awful', 'horrible'];
  let toxicityScore = 0;
  for (const word of toxicWords) {
    if (lowerText.includes(word)) {
      toxicityScore += 0.1;
    }
  }
  
  return {
    isClickbait,
    isRagebait,
    toxicity: Math.min(toxicityScore, 1)
  };
}

async function generateSummary(text: string, maxLength: number = 150) {
  try {
    const summarizer = await loadSummarizer();
    const result = await summarizer(text, {
      max_length: maxLength,
      min_length: 50,
      do_sample: false
    });
    return result[0].summary_text;
  } catch (error) {
    console.error('Error generating summary:', error);
    // Fallback: return first few sentences
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    return sentences.slice(0, 2).join('. ') + '.';
  }
}

self.onmessage = async (e: MessageEvent) => {
  const { type, data } = e.data;
  
  try {
    switch (type) {
      case 'suggest_feeds':
        const { topic, feeds } = data;
        const embedder = await loadEmbedder();
        const topicEmbedding = (await embedder(topic))[0][0];

        const results = await Promise.all(
          feeds.map(async (feed: { title: string; url: string }) => {
            const embedding = (await embedder(feed.title))[0][0];
            const score = cosineSimilarity(topicEmbedding, embedding);
            return { ...feed, score };
          })
        );

        postMessage({
          type: 'feed_suggestions',
          data: results.sort((a, b) => b.score - a.score).slice(0, 5)
        });
        break;
        
      case 'analyze_article':
        const { title, content } = data;
        const fullText = `${title}. ${content}`;
        
        // Analyze vibes
        const vibes = await analyzeVibes(fullText);
        
        // Detect clickbait and toxicity
        const clickbaitToxicity = await detectClickbaitAndToxicity(fullText);
        
        // Generate summary
        const summary = await generateSummary(content);
        
        const analysis = {
          vibes: {
            ...vibes,
            ...clickbaitToxicity
          },
          summary
        };
        
        postMessage({
          type: 'article_analysis',
          data: analysis
        });
        break;
        
      case 'batch_analyze':
        const { articles } = data;
        const analyses = await Promise.all(
          articles.map(async (article: any) => {
            const fullText = `${article.title}. ${article.content}`;
            const vibes = await analyzeVibes(fullText);
            const clickbaitToxicity = await detectClickbaitAndToxicity(fullText);
            const summary = await generateSummary(article.content);
            
            return {
              articleId: article.id,
              analysis: {
                vibes: {
                  ...vibes,
                  ...clickbaitToxicity
                },
                summary
              }
            };
          })
        );
        
        postMessage({
          type: 'batch_analysis',
          data: analyses
        });
        break;
        
      default:
        console.warn('Unknown message type:', type);
    }
  } catch (error) {
    console.error('Worker error:', error);
    postMessage({
      type: 'error',
      error: error.message
    });
  }
};
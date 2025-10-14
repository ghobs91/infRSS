// Simple in-memory rate limiting
const WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30;
const RSSHUB_MAX_REQUESTS_PER_WINDOW = 10; // More conservative for RSSHub

interface RateLimitWindow {
  timestamp: number;
  count: number;
}

const rateLimit = new Map<string, RateLimitWindow>();

export function checkRateLimit(hostname: string): { isLimited: boolean; retryAfter?: string } {
  const now = Date.now();
  const window = rateLimit.get(hostname);
  
  // Use stricter limits for RSSHub
  const maxRequests = hostname === 'rsshub.app' ? RSSHUB_MAX_REQUESTS_PER_WINDOW : MAX_REQUESTS_PER_WINDOW;

  // Clean up old entries
  if (window && now - window.timestamp > WINDOW_MS) {
    rateLimit.delete(hostname);
  }

  // If no window exists or it's expired, create a new one
  if (!window || now - window.timestamp > WINDOW_MS) {
    rateLimit.set(hostname, { timestamp: now, count: 1 });
    return { isLimited: false };
  }

  // If within window, check count
  if (window.count >= maxRequests) {
    const retryAfter = Math.ceil((window.timestamp + WINDOW_MS - now) / 1000);
    return { 
      isLimited: true, 
      retryAfter: `${retryAfter} seconds`
    };
  }

  // Increment count
  window.count++;
  return { isLimited: false };
}

// Retry logic with exponential backoff
export async function fetchWithRetry(
  url: string, 
  options: RequestInit, 
  maxRetries = 3
): Promise<Response> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      // Don't retry 404s or rate limits
      if (response.status === 404 || response.status === 429) {
        return response;
      }
      
      // Retry 503s and other 5xx errors
      if (response.status >= 500) {
        const backoffMs = Math.min(1000 * Math.pow(2, attempt), 10000);
        await new Promise(resolve => setTimeout(resolve, backoffMs));
        continue;
      }
      
      return response;
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
      const backoffMs = Math.min(1000 * Math.pow(2, attempt), 10000);
      await new Promise(resolve => setTimeout(resolve, backoffMs));
    }
  }
  
  throw new Error(`Failed after ${maxRetries} retries`);
}
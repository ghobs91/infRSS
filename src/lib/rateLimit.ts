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
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      // Don't retry 404s or rate limits - return immediately
      if (response.status === 404 || response.status === 429) {
        return response;
      }
      
      // Don't retry client errors (4xx) except 408 (timeout) and 429 (rate limit, handled above)
      if (response.status >= 400 && response.status < 500 && response.status !== 408) {
        return response;
      }
      
      // Retry 503s, 408s, and other 5xx errors
      if (response.status >= 500 || response.status === 408) {
        if (attempt < maxRetries - 1) {
          const backoffMs = Math.min(1000 * Math.pow(2, attempt), 10000);
          console.log(`Attempt ${attempt + 1}/${maxRetries} failed with status ${response.status} for ${url}. Retrying in ${backoffMs}ms...`);
          await new Promise(resolve => setTimeout(resolve, backoffMs));
          continue;
        }
        // Last attempt - return the error response
        return response;
      }
      
      // Success - return the response
      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Don't retry on AbortError (timeout)
      if (lastError.name === 'AbortError') {
        console.log(`Request aborted (timeout) for ${url}`);
        throw lastError;
      }
      
      // Log the error and retry
      if (attempt < maxRetries - 1) {
        const backoffMs = Math.min(1000 * Math.pow(2, attempt), 10000);
        console.log(`Attempt ${attempt + 1}/${maxRetries} failed for ${url}: ${lastError.message}. Retrying in ${backoffMs}ms...`);
        await new Promise(resolve => setTimeout(resolve, backoffMs));
      } else {
        // Last attempt - throw with detailed error
        console.error(`All ${maxRetries} attempts failed for ${url}. Last error: ${lastError.message}`);
        throw new Error(`Failed to fetch ${url} after ${maxRetries} retries. Last error: ${lastError.message}`);
      }
    }
  }
  
  // This should never be reached, but TypeScript needs it
  throw lastError || new Error(`Failed after ${maxRetries} retries`);
}
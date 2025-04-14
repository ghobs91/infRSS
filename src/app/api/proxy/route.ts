import { NextResponse } from 'next/server';
import { Agent } from 'https';

// Increase the timeout for RSS feeds
const TIMEOUT = 60000; // 60 seconds

// List of domains that need insecure connections due to SSL issues
const INSECURE_DOMAINS = [
  'energy.gov',
  'investor.irobot.com',
  'www.cmcsa.com'
];

// Create a secure HTTPS agent that uses system CA certificates
const secureHttpsAgent = new Agent({
  rejectUnauthorized: true, // Enable certificate verification
  keepAlive: true,
  timeout: TIMEOUT,
  // Use system CA certificates
  ca: process.env.NODE_EXTRA_CA_CERTS || undefined,
});

// Create an insecure HTTPS agent for problematic domains
const insecureHttpsAgent = new Agent({
  rejectUnauthorized: false, // Disable certificate verification
  keepAlive: true,
  timeout: TIMEOUT,
});

// Helper function to determine if a URL should use insecure connection
function shouldUseInsecureConnection(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return INSECURE_DOMAINS.some(domain => urlObj.hostname.includes(domain));
  } catch (error) {
    console.error('Error parsing URL:', error);
    return false;
  }
}

// Helper function to fetch with timeout and retries
async function fetchWithTimeout(url: string, timeout = TIMEOUT, retries = 2): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // Determine which agent to use based on the domain
    const useInsecure = shouldUseInsecureConnection(url);
    const agent = url.startsWith('https') 
      ? (useInsecure ? insecureHttpsAgent : secureHttpsAgent) 
      : undefined;
    
    console.log(`Fetching ${url} with ${useInsecure ? 'insecure' : 'secure'} connection`);
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; InfrssBot/1.0; +https://infrss.vercel.app)',
        'Accept': 'application/rss+xml, application/xml, application/atom+xml, text/xml, */*',
        'Cache-Control': 'no-cache',
      },
      // @ts-expect-error - The agent property is not in the type definition
      agent,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    // If we have retries left and it's a connection error, retry
    if (retries > 0 && (error instanceof Error) && 
        (error.message.includes('ECONNRESET') || 
         error.message.includes('fetch failed') ||
         error.message.includes('UNABLE_TO_VERIFY_LEAF_SIGNATURE') ||
         error.name === 'AbortError')) {
      console.log(`Retrying fetch for ${url} after error (${retries} retries left):`, error.message);
      // Exponential backoff: wait longer between each retry
      const backoffTime = (3 - retries) * 1000; // 1s, 2s, 3s
      await new Promise(resolve => setTimeout(resolve, backoffTime));
      return fetchWithTimeout(url, timeout, retries - 1);
    }
    
    throw error;
  }
}

async function handleFetch(url: string) {
  try {
    // Try to fetch the URL
    const response = await fetchWithTimeout(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type') || '';
    
    // Handle different content types
    if (contentType.startsWith('image/')) {
      // For images, return the blob with caching
      const blob = await response.blob();
      return new NextResponse(blob, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        },
      });
    } else if (contentType.includes('html') || contentType.includes('xml') || 
               contentType.includes('rss') || contentType.includes('atom') || 
               contentType.includes('text/plain')) {
      // For HTML/XML/RSS content, return as text
      const text = await response.text();
      return new NextResponse(JSON.stringify({ data: text }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        },
      });
    } else {
      // For other content types, return error
      return new NextResponse('Unsupported content type', { status: 400 });
    }
  } catch (error) {
    console.error('Error in handleFetch:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return new NextResponse('Request timed out', { status: 504 });
      }
      
      // Handle SSL certificate errors
      if (error.message.includes('UNABLE_TO_VERIFY_LEAF_SIGNATURE') || 
          error.message.includes('unable to verify the first certificate')) {
        console.error('SSL certificate error for URL:', url);
        
        // Check if this domain should be added to the insecure domains list
        try {
          const urlObj = new URL(url);
          const hostname = urlObj.hostname;
          if (!INSECURE_DOMAINS.some(domain => hostname.includes(domain))) {
            console.log(`Consider adding ${hostname} to INSECURE_DOMAINS list`);
          }
        } catch (e) {
          console.error('Error parsing URL for SSL error:', e);
        }
        
        return new NextResponse(
          JSON.stringify({
            error: 'SSL certificate verification failed',
            url: url,
            message: 'The site\'s SSL certificate could not be verified. This might be due to an invalid or self-signed certificate.'
          }), 
          { 
            status: 502,
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
      }
      
      // Handle connection reset errors
      if (error.message.includes('ECONNRESET') || 
          error.message.includes('read ECONNRESET') ||
          error.message.includes('fetch failed')) {
        return new NextResponse('Connection reset by server', { status: 502 });
      }
      
      return new NextResponse(`Failed to fetch: ${error.message}`, { status: 500 });
    }
    
    throw error;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing URL parameter', { status: 400 });
  }

  try {
    return await handleFetch(url);
  } catch (error) {
    console.error('Proxy error for URL:', url, error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return new NextResponse('Request timed out', { status: 504 });
      }
      
      // Handle SSL certificate errors
      if (error.message.includes('UNABLE_TO_VERIFY_LEAF_SIGNATURE') || 
          error.message.includes('unable to verify the first certificate')) {
        return new NextResponse('SSL certificate verification failed', { status: 502 });
      }
      
      // Handle connection reset errors
      if (error.message.includes('ECONNRESET') || 
          error.message.includes('read ECONNRESET')) {
        return new NextResponse('Connection reset by server', { status: 502 });
      }
      
      return new NextResponse(`Failed to fetch: ${error.message}`, { status: 500 });
    }
    
    return new NextResponse('Failed to fetch resource', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const url = body.url;

    if (!url) {
      return new NextResponse('Missing URL in request body', { status: 400 });
    }

    return await handleFetch(url);
  } catch (error) {
    console.error('Proxy error:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return new NextResponse('Request timed out', { status: 504 });
      }
      
      // Handle SSL certificate errors
      if (error.message.includes('UNABLE_TO_VERIFY_LEAF_SIGNATURE') || 
          error.message.includes('unable to verify the first certificate')) {
        return new NextResponse('SSL certificate verification failed', { status: 502 });
      }
      
      // Handle connection reset errors
      if (error.message.includes('ECONNRESET') || 
          error.message.includes('read ECONNRESET')) {
        return new NextResponse('Connection reset by server', { status: 502 });
      }
      
      return new NextResponse(`Failed to fetch: ${error.message}`, { status: 500 });
    }
    
    return new NextResponse('Failed to fetch resource', { status: 500 });
  }
}

// Increase the response size limit for RSS feeds
export const config = {
  api: {
    responseLimit: '8mb',
  },
}; 
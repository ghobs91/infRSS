import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, fetchWithRetry } from '@/lib/rateLimit';

// Use Edge Runtime for minimal proxying without server instance
export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    console.log('Missing url parameter');
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  // Validate the URL
  let validatedUrl: URL;
  try {
    validatedUrl = new URL(targetUrl);
  } catch {
    console.log('Invalid URL format:', targetUrl);
    return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
  }

  // Only allow HTTP and HTTPS protocols
  if (!['http:', 'https:'].includes(validatedUrl.protocol)) {
    console.log('Invalid protocol:', validatedUrl.protocol);
    return NextResponse.json({ error: 'Only HTTP and HTTPS protocols are allowed' }, { status: 400 });
  }

  // Check if this is an RSSHub URL and provide helpful error messages
  const isRSSHub = validatedUrl.hostname === 'rsshub.app';
  
  try {
    // Check rate limit for the target hostname
    const rateLimitResult = checkRateLimit(validatedUrl.hostname);
    if (rateLimitResult.isLimited) {
      return NextResponse.json({
        error: 'Rate limit exceeded for this RSS source',
        status: 429,
        suggestion: 'Please wait before making more requests to this feed',
        retryAfter: rateLimitResult.retryAfter
      }, { status: 429 });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout

    const response = await fetchWithRetry(validatedUrl.toString(), {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RSSReader/1.0)',
        'Accept': 'text/xml,application/xml,application/rss+xml,application/atom+xml,text/html,*/*',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.log('Target server error:', response.status, 'for URL:', validatedUrl.toString());
      
      // Handle RSSHub-specific errors
      if (isRSSHub) {
        if (response.status === 404) {
          return NextResponse.json({ 
            error: 'RSSHub feed not found. This feed may have been removed or the URL format has changed.',
            status: response.status,
            suggestion: 'Try checking RSSHub documentation for the correct feed format or use a different RSS source.',
            url: validatedUrl.toString()
          }, { status: 404 });
        }
        
        if (response.status === 429) {
          // Provide specific alternatives for Twitter feeds
          const isTwitterFeed = validatedUrl.pathname.includes('/twitter/');
          const suggestion = isTwitterFeed 
            ? 'RSSHub Twitter feeds are currently rate limited. Consider using Nitter (nitter.net/{username}/rss) or RSS.app as alternatives. Twitter feeds through RSSHub may be unreliable due to X/Twitter API restrictions.'
            : 'Wait a few minutes before retrying, or consider using a different RSS source.';
            
          return NextResponse.json({ 
            error: 'RSSHub rate limit exceeded. Please try again later.',
            status: response.status,
            suggestion,
            retryAfter: isTwitterFeed ? 'Consider using alternatives' : '5 minutes',
            alternatives: isTwitterFeed ? [
              { name: 'Nitter', example: 'https://nitter.net/{username}/rss' },
              { name: 'RSS.app', example: 'https://rss.app (requires setup)' }
            ] : undefined
          }, { status: 429 });
        }
      }
      
      return NextResponse.json({ 
        error: `Target server responded with status ${response.status}`,
        status: response.status,
        url: validatedUrl.toString()
      }, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'text/plain';
    const data = await response.text();

    // Validate that we actually got RSS/XML content (not HTML)
    const trimmedData = data.trim();
    const isHTML = (trimmedData.startsWith('<!DOCTYPE html') || 
                   trimmedData.startsWith('<html') || 
                   trimmedData.startsWith('<HTML')) &&
                   !trimmedData.includes('<rss') && 
                   !trimmedData.includes('<feed');
    
    if (isHTML) {
      console.warn('Server returned HTML instead of RSS/XML:', data.substring(0, 200));
      return NextResponse.json({ 
        error: 'The URL returned a webpage instead of an RSS feed',
        status: 422,
        suggestion: 'Please verify this is a valid RSS feed URL. You may need to look for a feed icon or RSS link on the website.',
        url: validatedUrl.toString()
      }, { status: 422 });
    }
    
    // Additional validation for RSSHub feeds
    if (isRSSHub && (!data.includes('<rss') && !data.includes('<feed'))) {
      console.warn('RSSHub returned non-RSS content:', data.substring(0, 200));
      return NextResponse.json({ 
        error: 'RSSHub returned invalid RSS content',
        status: 422,
        suggestion: 'The feed may be temporarily unavailable or have changed format.'
      }, { status: 422 });
    }

    return new NextResponse(data, {
      status: 200,
      headers: { 
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error, 'for URL:', validatedUrl.toString());
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json({ 
          error: 'Request timeout - the server took too long to respond',
          status: 408,
          suggestion: 'Try again later or check if the RSS source is experiencing issues.',
          url: validatedUrl.toString()
        }, { status: 408 });
      }
      
      // Handle network timeouts and connection errors
      if (error.message.includes('fetch') || error.message.includes('timeout') || error.message.includes('connect')) {
        return NextResponse.json({ 
          error: 'Network error - server may be unreachable or too slow',
          details: error.message,
          status: 504,
          suggestion: 'Check your internet connection and try again.',
          url: validatedUrl.toString()
        }, { status: 504 });
      }
    }
    
    return NextResponse.json({ 
      error: 'Internal server error',
      status: 500,
      details: error instanceof Error ? error.message : 'Unknown error',
      url: validatedUrl.toString()
    }, { status: 500 });
  }
} 
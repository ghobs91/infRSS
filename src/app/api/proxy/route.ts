import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, fetchWithRetry } from '@/lib/rateLimit';

// Use Node.js runtime for better Netlify compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 second timeout (client has 30s)

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
      // Only log 404s as debug, other errors as warnings
      if (response.status === 404) {
        console.debug('Feed not found (404):', validatedUrl.toString());
      } else {
        console.log('Target server error:', response.status, 'for URL:', validatedUrl.toString());
      }
      
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
            ? 'RSSHub Twitter feeds are currently rate limited. Consider using Nitter (nitter.net/{username}/rss) as an alternative. Twitter feeds through RSSHub may be unreliable due to X/Twitter API restrictions.'
            : 'Wait a few minutes before retrying, or consider using a different RSS source.';
            
          return NextResponse.json({ 
            error: 'RSSHub rate limit exceeded. Please try again later.',
            status: response.status,
            suggestion,
            retryAfter: isTwitterFeed ? 'Consider using alternatives' : '5 minutes',
            alternatives: isTwitterFeed ? [
              { name: 'Nitter', example: 'https://nitter.net/{username}/rss' },
              { name: 'RSS.app', example: 'https://rss.app (requires manual setup)' }
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
    
    // More lenient HTML detection - only reject if it's clearly an HTML document AND has no RSS/Atom content
    const looksLikeHTML = (trimmedData.startsWith('<!DOCTYPE html') || 
                          trimmedData.startsWith('<html') || 
                          trimmedData.startsWith('<HTML'));
    
    // Case-insensitive check for RSS/Atom content
    const hasRSSContent = /<rss/i.test(data) || 
                         /<feed/i.test(data) || 
                         /<channel/i.test(data) || 
                         /<entry/i.test(data) ||
                         /<?xml/i.test(data);
    
    const isHTML = looksLikeHTML && !hasRSSContent;
    
    if (isHTML) {
      console.warn('Server returned HTML instead of RSS/XML:', data.substring(0, 200));
      return NextResponse.json({ 
        error: 'The URL returned a webpage instead of an RSS feed',
        status: 422,
        suggestion: 'Please verify this is a valid RSS feed URL. You may need to look for a feed icon or RSS link on the website.',
        url: validatedUrl.toString()
      }, { status: 422 });
    }
    
    // Additional validation for RSSHub feeds - be more lenient
    if (isRSSHub && !hasRSSContent) {
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
          suggestion: 'The feed server is taking too long to respond. Try again later or check if the RSS source is online.',
          url: validatedUrl.toString()
        }, { status: 408 });
      }
      
      // Handle specific fetch errors
      if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
        return NextResponse.json({ 
          error: 'DNS resolution failed - the domain could not be found',
          details: error.message,
          status: 502,
          suggestion: 'The domain may not exist or may be temporarily unavailable. Please verify the URL is correct.',
          url: validatedUrl.toString()
        }, { status: 502 });
      }
      
      if (error.message.includes('ECONNREFUSED')) {
        return NextResponse.json({ 
          error: 'Connection refused - the server is not accepting connections',
          details: error.message,
          status: 502,
          suggestion: 'The server is not responding. It may be down or blocking requests.',
          url: validatedUrl.toString()
        }, { status: 502 });
      }
      
      if (error.message.includes('ETIMEDOUT') || error.message.includes('timeout')) {
        return NextResponse.json({ 
          error: 'Connection timeout - the server is too slow or unreachable',
          details: error.message,
          status: 504,
          suggestion: 'The server is not responding in time. Try again later.',
          url: validatedUrl.toString()
        }, { status: 504 });
      }
      
      if (error.message.includes('ECONNRESET') || error.message.includes('socket hang up')) {
        return NextResponse.json({ 
          error: 'Connection reset - the server closed the connection unexpectedly',
          details: error.message,
          status: 502,
          suggestion: 'The server had an issue processing the request. Try again in a few moments.',
          url: validatedUrl.toString()
        }, { status: 502 });
      }
      
      if (error.message.includes('SSL') || error.message.includes('TLS') || error.message.includes('certificate')) {
        return NextResponse.json({ 
          error: 'SSL/TLS error - there is an issue with the server\'s security certificate',
          details: error.message,
          status: 502,
          suggestion: 'The server may have an invalid or expired SSL certificate. Contact the website administrator.',
          url: validatedUrl.toString()
        }, { status: 502 });
      }
      
      // Handle retry errors with more context
      if (error.message.includes('retries')) {
        return NextResponse.json({ 
          error: 'Multiple attempts failed - the server is not responding reliably',
          details: error.message,
          status: 503,
          suggestion: 'The feed server is experiencing issues. Please try again in a few minutes, or check if the feed URL is correct.',
          url: validatedUrl.toString()
        }, { status: 503 });
      }
      
      // General network errors
      if (error.message.includes('fetch') || error.message.includes('network')) {
        return NextResponse.json({ 
          error: 'Network error - unable to reach the server',
          details: error.message,
          status: 502,
          suggestion: 'There was a network issue connecting to the feed. Check your internet connection and try again.',
          url: validatedUrl.toString()
        }, { status: 502 });
      }
    }
    
    return NextResponse.json({ 
      error: 'Internal server error',
      status: 500,
      details: error instanceof Error ? error.message : 'Unknown error',
      suggestion: 'An unexpected error occurred. Please try again or contact support if the issue persists.',
      url: validatedUrl.toString()
    }, { status: 500 });
  }
} 
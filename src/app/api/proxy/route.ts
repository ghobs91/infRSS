import { NextRequest, NextResponse } from 'next/server';

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

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const response = await fetch(validatedUrl.toString(), {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RSSReader/1.0)',
        'Accept': 'text/xml,application/xml,application/rss+xml,application/atom+xml,text/html,*/*',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.log('Target server error:', response.status);
      return NextResponse.json({ 
        error: `Target server responded with status ${response.status}`,
        status: response.status 
      }, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'text/plain';
    const data = await response.text();

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
    console.error('Proxy error:', error);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json({ error: 'Request timeout' }, { status: 408 });
      }
      
      // Handle network timeouts and connection errors
      if (error.message.includes('fetch') || error.message.includes('timeout') || error.message.includes('connect')) {
        return NextResponse.json({ 
          error: 'Network error - server may be unreachable or too slow',
          details: error.message
        }, { status: 504 });
      }
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
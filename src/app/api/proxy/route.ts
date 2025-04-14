import { NextResponse } from 'next/server';

async function fetchWithTimeout(url: string, timeout = 15000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; InfrssBot/1.0; +https://infrss.vercel.app)'
      }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

async function handleFetch(url: string) {
  const response = await fetchWithTimeout(url);
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
  } else if (contentType.includes('html') || contentType.includes('xml')) {
    // For HTML/XML content, return as text
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
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return new NextResponse('Request timed out', { status: 504 });
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
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return new NextResponse('Request timed out', { status: 504 });
      }
      return new NextResponse(`Failed to fetch: ${error.message}`, { status: 500 });
    }
    return new NextResponse('Failed to fetch resource', { status: 500 });
  }
} 
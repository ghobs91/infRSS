import { NextResponse } from 'next/server';

// Use Node.js runtime for better Netlify compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; InfrssBot/1.0; +https://infrss.vercel.app)'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return NextResponse.json({ data: text });
  } catch (error) {
    console.error('Error fetching RSS:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch RSS feed' },
      { status: 500 }
    );
  }
}

// Increase the response size limit for RSS feeds
export const config = {
  api: {
    responseLimit: '8mb',
  },
}; 
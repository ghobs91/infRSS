// app/api/export-opml/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateOPMLFromFeeds } from '@/lib/rssUtils';
import type { FeedData, Category } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { feeds, categories } = await request.json();
    
    if (!feeds || !Array.isArray(feeds)) {
      return NextResponse.json(
        { error: 'Invalid feeds data' },
        { status: 400 }
      );
    }
    
    if (!categories || !Array.isArray(categories)) {
      return NextResponse.json(
        { error: 'Invalid categories data' },
        { status: 400 }
      );
    }
    
    // Generate OPML
    const opmlContent = generateOPMLFromFeeds(feeds as FeedData[], categories as Category[]);
    
    // Return as downloadable file
    return new NextResponse(opmlContent, {
      headers: {
        'Content-Type': 'application/xml',
        'Content-Disposition': `attachment; filename="feeds-export-${new Date().toISOString().split('T')[0]}.opml"`,
      },
    });
  } catch (error) {
    console.error('Error generating OPML:', error);
    return NextResponse.json(
      { error: 'Failed to generate OPML file' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { aggregateFeeds, FeedItem } from '@/lib/rss';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const allFeeds = await aggregateFeeds();

  // Pagination logic
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedFeeds = allFeeds.slice(startIndex, endIndex);

  return NextResponse.json({
    data: paginatedFeeds,
    meta: {
      page,
      limit,
      total: allFeeds.length,
      hasMore: endIndex < allFeeds.length
    }
  });
}

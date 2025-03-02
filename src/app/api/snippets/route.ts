import { createSnippet, getSnippets, getUserSnippets } from '@/services/snippets';
import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  const res = auth();
  const userId = (await res).userId;
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get('limit') || '10');
  const cursor = url.searchParams.get('cursor') || undefined;
  const userOnly = url.searchParams.get('userOnly') === 'true';

  try {
    if (userOnly) {
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const snippets = await getUserSnippets(userId, limit, cursor);
      return NextResponse.json(snippets);
    } else {
      const snippets = await getSnippets(limit, cursor);
      return NextResponse.json(snippets);
    }
  } catch (error) {
    console.error('Error fetching snippets:', error);
    return NextResponse.json({ error: 'Failed to fetch snippets' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const res = auth();
  const userId = (await res).userId;
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { title, language, code } = await request.json();
    
    if (!title || !language || !code) {
      return NextResponse.json({ error: 'Title, language, and code are required' }, { status: 400 });
    }

    const userName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    const snippet = await createSnippet(userId, title, language, code, userName);
    return NextResponse.json(snippet);
  } catch (error) {
    console.error('Error creating snippet:', error);
    return NextResponse.json({ error: 'Failed to create snippet' }, { status: 500 });
  }
} 
import { getExecutions, saveExecution } from '@/services/codeExecutions';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  const res = auth();
  const userId = (await res).userId;
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const cursor = url.searchParams.get('cursor') || undefined;

    const executions = await getExecutions(userId, limit, cursor);
    return NextResponse.json(executions);
  } catch (error) {
    console.error('Error fetching executions:', error);
    return NextResponse.json({ error: 'Failed to fetch executions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const res = auth();
  const userId = (await res).userId;
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { language, code, output, error } = await request.json();
    
    if (!language || !code) {
      return NextResponse.json({ error: 'Language and code are required' }, { status: 400 });
    }

    const execution = await saveExecution(userId, language, code, output, error);
    return NextResponse.json(execution);
  } catch (error) {
    console.error('Error saving execution:', error);
    return NextResponse.json({ error: 'Failed to save execution' }, { status: 500 });
  }
} 
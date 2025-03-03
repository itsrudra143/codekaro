import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// GET /api/code-executions - Get all code executions for the current user
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const codeExecutions = await prisma.codeExecution.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(codeExecutions);
  } catch (error) {
    console.error('Error fetching code executions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/code-executions - Create a new code execution
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { language, code, output, error } = body;

    if (!language || !code) {
      return NextResponse.json({ error: 'Language and code are required' }, { status: 400 });
    }

    const codeExecution = await prisma.codeExecution.create({
      data: {
        userId,
        language,
        code,
        output,
        error,
      },
    });

    return NextResponse.json(codeExecution);
  } catch (error) {
    console.error('Error creating code execution:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
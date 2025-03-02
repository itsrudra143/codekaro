import prisma from '@/lib/prisma';

export async function createSnippet(
  userId: string,
  title: string,
  language: string,
  code: string,
  userName: string
) {
  return prisma.snippet.create({
    data: {
      userId,
      title,
      language,
      code,
      userName,
    },
  });
}

export async function getSnippets(limit: number = 10, cursor?: string) {
  const snippets = await prisma.snippet.findMany({
    take: limit,
    ...(cursor
      ? {
          skip: 1,
          cursor: {
            id: cursor,
          },
        }
      : {}),
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          stars: true,
          comments: true,
        },
      },
    },
  });

  const nextCursor = snippets.length === limit ? snippets[snippets.length - 1].id : undefined;

  return {
    snippets,
    nextCursor,
  };
}

export async function getUserSnippets(userId: string, limit: number = 10, cursor?: string) {
  const snippets = await prisma.snippet.findMany({
    where: {
      userId,
    },
    take: limit,
    ...(cursor
      ? {
          skip: 1,
          cursor: {
            id: cursor,
          },
        }
      : {}),
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          stars: true,
          comments: true,
        },
      },
    },
  });

  const nextCursor = snippets.length === limit ? snippets[snippets.length - 1].id : undefined;

  return {
    snippets,
    nextCursor,
  };
}

export async function getSnippet(id: string) {
  return prisma.snippet.findUnique({
    where: { id },
    include: {
      comments: {
        orderBy: {
          createdAt: 'desc',
        },
      },
      _count: {
        select: {
          stars: true,
        },
      },
    },
  });
} 
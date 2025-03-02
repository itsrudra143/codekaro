import prisma from '@/lib/prisma';

export async function saveExecution(
  userId: string,
  language: string,
  code: string,
  output?: string,
  error?: string
) {
  return prisma.codeExecution.create({
    data: {
      userId,
      language,
      code,
      output,
      error,
    },
  });
}

export async function getExecutions(userId: string, limit: number = 10, cursor?: string) {
  const executions = await prisma.codeExecution.findMany({
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
  });

  const nextCursor = executions.length === limit ? executions[executions.length - 1].id : undefined;

  return {
    executions,
    nextCursor,
  };
} 
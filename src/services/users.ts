import prisma from '@/lib/prisma';

export async function syncUser(userId: string, email: string, name: string) {
  const existingUser = await prisma.user.findUnique({
    where: { userId },
  });

  if (!existingUser) {
    return prisma.user.create({
      data: {
        userId,
        email,
        name,
        isPro: false,
      },
    });
  }

  return existingUser;
}

export async function getUser(userId: string) {
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { userId },
  });

  return user;
} 
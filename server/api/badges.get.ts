import prisma from '../utils/prisma'

export default defineEventHandler(async () => {
  const badges = await prisma.badge.findMany({
    orderBy: { order: 'asc' },
    include: {
      userBadges: {
        where: { status: 'CONQUERED' },
        select: { user: { select: { username: true } } },
        take: 1,
      },
    },
  })

  return badges
})

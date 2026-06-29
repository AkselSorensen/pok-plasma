import prisma from '../utils/prisma'

export default defineEventHandler(async () => {
  const users = await prisma.user.findMany({
    orderBy: { totalPoints: 'desc' },
    select: {
      id: true,
      username: true,
      guildRank: true,
      portalRank: true,
      portalCleared: true,
      portalSuccessRate: true,
      pvpWins: true,
      totalPoints: true,
      avatarUrl: true,
      userBadges: {
        where: { status: 'CONQUERED' },
        select: { badgeId: true },
      },
    },
  })

  return {
    users: users.map((u, i) => ({
      ...u,
      badgeCount: u.userBadges.length,
      rank: i + 1,
      userBadges: undefined,
    })),
    total: users.length,
  }
})

import prisma from '../utils/prisma'

export default defineEventHandler(async () => {
  const users = await prisma.user.findMany({
    orderBy: [{ totalPoints: 'desc' }, { totalDeposited: 'desc' }],
    select: {
      id: true,
      username: true,
      guildRank: true,
      portalRank: true,
      portalCleared: true,
      portalSuccessRate: true,
      pvpWins: true,
      totalPoints: true,
      totalDeposited: true,
      avatarUrl: true,
      userBadges: {
        where: { status: 'CONQUERED' },
        select: { badgeId: true },
      },
    },
  })

  return {
    users: users.map((u, i) => ({
      id: u.id,
      username: u.username,
      guildRank: u.guildRank,
      portalRank: u.portalRank,
      portalCleared: u.portalCleared,
      portalSuccessRate: u.portalSuccessRate,
      pvpWins: u.pvpWins,
      totalPoints: u.totalPoints,
      totalDeposited: Number(u.totalDeposited),
      avatarUrl: u.avatarUrl,
      badgeCount: u.userBadges.length,
      rank: i + 1,
    })),
    total: users.length,
  }
})

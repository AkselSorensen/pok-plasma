import prisma from '../utils/prisma'

export default defineEventHandler(async () => {
  const [guild, memberCount, activeEvents, topMembers] = await Promise.all([
    prisma.guild.findFirst(),
    prisma.user.count(),
    prisma.event.count({ where: { status: 'ACTIVE' } }),
    prisma.user.findMany({
      orderBy: { totalPoints: 'desc' },
      take: 5,
      select: { id: true, username: true, guildRank: true, totalPoints: true, avatarUrl: true },
    }),
  ])

  const recentActivities = await prisma.activity.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  return {
    guild: guild ? {
      ...guild,
      treasury: Number(guild.treasury),
    } : null,
    memberCount,
    activeEvents,
    topMembers: topMembers.map((m, i) => ({ ...m, rank: i + 1 })),
    recentActivities,
  }
})

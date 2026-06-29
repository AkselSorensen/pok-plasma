import prisma from './prisma'

export async function getUser(event: any) {
  const token = getCookie(event, 'pokoplasma_session')
  if (!token) return null

  const session = await prisma.session.findUnique({
    where: { token },
    select: {
      expiresAt: true,
      user: {
        select: {
          id: true,
          username: true,
          discordUsername: true,
          discordAvatar: true,
          guildRank: true,
          role: true,
          totalPoints: true,
          totalDeposited: true,
        },
      },
    },
  })

  if (!session || session.expiresAt < new Date()) {
    if (session) await prisma.session.delete({ where: { token } })
    deleteCookie(event, 'pokoplasma_session')
    return null
  }

  return session.user
}

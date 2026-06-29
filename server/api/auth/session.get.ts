import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'pokoplasma_session')
  if (!token) {
    return { user: null }
  }

  const session = await prisma.session.findUnique({
    where: { token },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          discordUsername: true,
          discordAvatar: true,
          guildRank: true,
          role: true,
          totalPoints: true,
        },
      },
    },
  })

  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.session.delete({ where: { id: session.id } })
    }
    deleteCookie(event, 'pokoplasma_session')
    return { user: null }
  }

  return { user: session.user }
})

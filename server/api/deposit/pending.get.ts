import prisma from '../../utils/prisma'
import { getUser } from '../../utils/getUser'

export default defineEventHandler(async (event) => {
  const user = await getUser(event)
  if (!user || (user.role !== 'ADMIN' && user.role !== 'MODERATOR')) {
    throw createError({ statusCode: 403, message: 'Accès refusé' })
  }

  const [pending, reviewed] = await Promise.all([
    prisma.deposit.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, username: true } } },
    }),
    prisma.deposit.findMany({
      where: { status: { in: ['APPROVED', 'REJECTED'] } },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { user: { select: { id: true, username: true } } },
    }),
  ])

  return { pending, reviewed }
})

import prisma from '../../utils/prisma'
import { getUser } from '../../utils/getUser'

export default defineEventHandler(async (event) => {
  const user = await getUser(event)
  if (!user) throw createError({ statusCode: 401, message: 'Non authentifié' })

  const deposits = await prisma.deposit.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })

  return deposits
})

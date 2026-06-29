import prisma from '../../utils/prisma'
import { getUser } from '../../utils/getUser'

export default defineEventHandler(async (event) => {
  const user = await getUser(event)
  if (!user) throw createError({ statusCode: 401, message: 'Non authentifié' })

  const body = await readBody(event)
  const amount = BigInt(body.amount || 0)
  if (amount <= 0) throw createError({ statusCode: 400, message: 'Montant invalide' })

  const deposit = await prisma.deposit.create({
    data: {
      userId: user.id,
      amount,
      proof: body.proof || null,
    },
  })

  await prisma.activity.create({
    data: {
      type: 'deposit',
      message: `${user.username} a déposé ₽${amount.toString()} (en attente)`,
      userId: user.id,
      userName: user.username,
    },
  })

  return deposit
})

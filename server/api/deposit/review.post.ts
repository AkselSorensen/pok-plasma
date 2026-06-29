import prisma from '../../utils/prisma'
import { getUser } from '../../utils/getUser'

export default defineEventHandler(async (event) => {
  const user = await getUser(event)
  if (!user || (user.role !== 'ADMIN' && user.role !== 'MODERATOR')) {
    throw createError({ statusCode: 403, message: 'Accès refusé' })
  }

  const body = await readBody(event)
  const { depositId, action } = body // action: 'approve' | 'reject'

  const deposit = await prisma.deposit.findUnique({
    where: { id: depositId },
    include: { user: true },
  })
  if (!deposit || deposit.status !== 'PENDING') {
    throw createError({ statusCode: 400, message: 'Dépôt déjà traité' })
  }

  if (action === 'approve') {
    // Approuver: ajouter à la bourse + créditer le membre
    await prisma.$transaction([
      prisma.deposit.update({
        where: { id: depositId },
        data: { status: 'APPROVED', reviewedBy: user.id },
      }),
      prisma.guild.update({
        where: { id: 'plasma-main' },
        data: { treasury: { increment: deposit.amount } },
      }),
      prisma.user.update({
        where: { id: deposit.userId },
        data: {
          totalDeposited: { increment: deposit.amount },
          totalPoints: { increment: Number(deposit.amount / 1000n) },
        },
      }),
      prisma.activity.create({
        data: {
          type: 'deposit',
          message: `Dépôt de ₽${deposit.amount.toString()} approuvé pour ${deposit.user.username}`,
          userName: deposit.user.username,
        },
      }),
    ])
  } else {
    await prisma.deposit.update({
      where: { id: depositId },
      data: { status: 'REJECTED', reviewedBy: user.id },
    })
  }

  return { success: true }
})

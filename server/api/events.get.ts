import prisma from '../utils/prisma'

export default defineEventHandler(async () => {
  const events = await prisma.event.findMany({
    orderBy: [{ status: 'asc' }, { startsAt: 'asc' }],
    include: { _count: { select: { participations: true } } },
  })
  return events
})

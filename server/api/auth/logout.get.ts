import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'pokoplasma_session')
  if (token) {
    await prisma.session.deleteMany({ where: { token } })
    deleteCookie(event, 'pokoplasma_session')
  }
  return sendRedirect(event, '/login')
})

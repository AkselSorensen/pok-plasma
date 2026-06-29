import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  // Ne pas protéger les routes d'auth et l'API
  const path = getRequestURL(event).pathname
  if (path.startsWith('/api/auth/') || path === '/login') {
    return
  }

  // Vérifier la session
  const token = getCookie(event, 'pokoplasma_session')
  if (!token) {
    if (path.startsWith('/api/')) {
      throw createError({ statusCode: 401, message: 'Non authentifié' })
    }
    return sendRedirect(event, '/login')
  }

  const session = await prisma.session.findUnique({
    where: { token },
    select: { expiresAt: true, userId: true },
  })

  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.session.delete({ where: { token } })
    }
    deleteCookie(event, 'pokoplasma_session')
    if (path.startsWith('/api/')) {
      throw createError({ statusCode: 401, message: 'Session expirée' })
    }
    return sendRedirect(event, '/login')
  }
})

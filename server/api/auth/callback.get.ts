import prisma from '../../utils/prisma'
import { randomBytes } from 'node:crypto'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const code = query.code as string

  if (!code) {
    return sendRedirect(event, '/login?error=no_code')
  }

  try {
    // 1. Échange le code contre un token Discord
    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: config.discordClientId || '',
        client_secret: config.discordClientSecret || '',
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${getRequestURL(event).origin}/api/auth/callback`,
      }),
    })

    if (!tokenRes.ok) {
      const err = await tokenRes.text()
      console.error('Discord token error:', err)
      return sendRedirect(event, '/login?error=token_failed')
    }

    const tokenData = await tokenRes.json()
    const accessToken = tokenData.access_token

    // 2. Récupère les infos utilisateur Discord
    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!userRes.ok) {
      return sendRedirect(event, '/login?error=user_failed')
    }

    const discordUser = await userRes.json()

    // 3. Crée ou met à jour l'utilisateur dans la DB
    const user = await prisma.user.upsert({
      where: { discordId: discordUser.id },
      update: {
        discordUsername: discordUser.username,
        discordAvatar: discordUser.avatar
          ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
          : null,
        username: discordUser.global_name || discordUser.username,
      },
      create: {
        discordId: discordUser.id,
        discordUsername: discordUser.username,
        discordAvatar: discordUser.avatar
          ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
          : null,
        username: discordUser.global_name || discordUser.username,
        guildId: 'plasma-main',
      },
    })

    // 4. Crée une session
    const token = randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    })

    // 5. Set le cookie de session
    setCookie(event, 'pokoplasma_session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      expires: expiresAt,
    })

    return sendRedirect(event, '/')

  } catch (e) {
    console.error('Auth callback error:', e)
    return sendRedirect(event, '/login?error=server_error')
  }
})

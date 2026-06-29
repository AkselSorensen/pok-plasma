import { PrismaClient, PortalRank, EventType, EventStatus, BadgeStatus } from '@prisma/client'
import { createHash, randomBytes } from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ─── 1. GUILDE ───
  const guild = await prisma.guild.upsert({
    where: { id: 'plasma-main' },
    update: {},
    create: {
      id: 'plasma-main',
      name: 'Team Plasma',
      level: 42,
      treasury: BigInt(1842500),
      globalRank: 3,
    },
  })
  console.log(`✓ Guilde: ${guild.name} (Nv.${guild.level})`)

  // ─── 2. BADGES (8 badges d'Unys) ───
  const badgesData = [
    { name: 'Badge Basic', gymLeader: 'Rachis', type: 'Plante', icon: '💚', difficulty: 'D', order: 1 },
    { name: 'Badge Toxic', gymLeader: 'Strykna', type: 'Poison', icon: '💙', difficulty: 'C', order: 2 },
    { name: 'Badge Insecte', gymLeader: 'Aloé', type: 'Insecte', icon: '🩶', difficulty: 'C', order: 3 },
    { name: 'Badge Volt', gymLeader: 'Ludvignac', type: 'Électrik', icon: '⚡', difficulty: 'B', order: 4 },
    { name: 'Badge Quatuor', gymLeader: 'Artie', type: 'Sol', icon: '🟤', difficulty: 'A', order: 5 },
    { name: 'Badge Air', gymLeader: 'Antonine', type: 'Vol', icon: '🟣', difficulty: 'A', order: 6 },
    { name: 'Badge Mine', gymLeader: 'Bardane', type: 'Glace', icon: '🔶', difficulty: 'B', order: 7 },
    { name: 'Badge Glaive', gymLeader: 'Rachel', type: 'Dragon', icon: '🔷', difficulty: 'S', order: 8 },
  ]

  const badges = []
  for (const b of badgesData) {
    const badge = await prisma.badge.upsert({
      where: { id: `badge-${b.order}` },
      update: b,
      create: { id: `badge-${b.order}`, ...b },
    })
    badges.push(badge)
  }
  console.log(`✓ ${badges.length} badges créés`)

  // ─── 3. MEMBRES ───
  const membersData = [
    { username: 'ShadowKing', guildRank: 'Champion', portalRank: PortalRank.S, portalCleared: 45, pvpWins: 284, totalPoints: 284500 },
    { username: 'PlasmaWarrior', guildRank: 'Elite 4', portalRank: PortalRank.S, portalCleared: 38, pvpWins: 271, totalPoints: 271200 },
    { username: 'NeoAksel', guildRank: 'Elite 4', portalRank: PortalRank.B, portalCleared: 23, pvpWins: 142, totalPoints: 259800 },
    { username: 'Ghetsis_Simp', guildRank: 'Membre', portalRank: PortalRank.A, portalCleared: 31, pvpWins: 198, totalPoints: 245100 },
    { username: 'ZekromFan', guildRank: 'Membre', portalRank: PortalRank.A, portalCleared: 27, pvpWins: 165, totalPoints: 238400 },
  ]

  const users = []
  for (const m of membersData) {
    const user = await prisma.user.upsert({
      where: { username: m.username },
      update: m,
      create: {
        ...m,
        guildId: guild.id,
        passwordHash: createHash('sha256').update(randomBytes(32).toString('hex')).digest('hex'),
      },
    })
    users.push(user)
  }
  console.log(`✓ ${users.length} membres créés`)

  // ─── 4. ASSIGNER LES BADGES ───
  // ShadowKing a tous les badges conquis
  for (let i = 0; i < 8; i++) {
    await prisma.userBadge.upsert({
      where: { userId_badgeId: { userId: users[0].id, badgeId: badges[i].id } },
      update: { status: BadgeStatus.CONQUERED },
      create: { userId: users[0].id, badgeId: badges[i].id, status: BadgeStatus.CONQUERED, conqueredAt: new Date() },
    })
  }

  // PlasmaWarrior a 7 badges
  for (let i = 0; i < 7; i++) {
    await prisma.userBadge.upsert({
      where: { userId_badgeId: { userId: users[1].id, badgeId: badges[i].id } },
      update: { status: BadgeStatus.CONQUERED },
      create: { userId: users[1].id, badgeId: badges[i].id, status: BadgeStatus.CONQUERED, conqueredAt: new Date() },
    })
  }

  // NeoAksel a 4 badges conquis, 2 en cours, 2 locked
  for (let i = 0; i < 4; i++) {
    await prisma.userBadge.upsert({
      where: { userId_badgeId: { userId: users[2].id, badgeId: badges[i].id } },
      update: { status: BadgeStatus.CONQUERED },
      create: { userId: users[2].id, badgeId: badges[i].id, status: BadgeStatus.CONQUERED, conqueredAt: new Date() },
    })
  }
  await prisma.userBadge.upsert({
    where: { userId_badgeId: { userId: users[2].id, badgeId: badges[4].id } },
    update: {},
    create: { userId: users[2].id, badgeId: badges[4].id, status: BadgeStatus.IN_PROGRESS },
  })
  await prisma.userBadge.upsert({
    where: { userId_badgeId: { userId: users[2].id, badgeId: badges[5].id } },
    update: {},
    create: { userId: users[2].id, badgeId: badges[5].id, status: BadgeStatus.IN_PROGRESS },
  })
  console.log('✓ Badges assignés')

  // ─── 5. ÉVÉNEMENTS ───
  const eventsData = [
    {
      id: 'event-airdrop',
      title: 'Tonnerre de Tonneaux',
      type: EventType.AIRDROP,
      description: "Des tonneaux de loot s'écrasent sur la map. Clic droit pour rafler le butin avant les autres, du commun au légendaire.",
      location: 'Route 10',
      status: EventStatus.ACTIVE,
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 45 * 60 * 1000),
    },
    {
      id: 'event-recolte',
      title: 'Moisson Plasma',
      type: EventType.RECOLTE,
      description: 'Casse un max de cultures avant la fin du chrono. Le top est récompensé. À tes faux!',
      location: 'Verges de Nacré',
      status: EventStatus.ACTIVE,
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
    },
    {
      id: 'event-fishing',
      title: 'PokéFishing Cup',
      type: EventType.FISHING,
      description: "Pêche les Pokémon les plus gros: c'est la taille de ta prise qui fait la différence. Bonus shiny et légendaire.",
      location: 'Lac Courage',
      status: EventStatus.ACTIVE,
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 5 * 60 * 60 * 1000),
    },
    {
      id: 'event-teamhunt',
      title: 'Neo Plasma vs Plasma White',
      type: EventType.TEAMHUNT,
      description: "Chasse pour ton camp, l'équipe gagnante rafle tout. Que le meilleur Plasma gagne!",
      location: 'Tour Ghetsis',
      status: EventStatus.ACTIVE,
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
    },
    {
      id: 'event-megaraid',
      title: 'Raid du Légendaire Noir',
      type: EventType.MEGARAID,
      description: 'Un boss surpuissant débarque. Abats-le pour repartir avec des raid balls. Zekrom vous attend.',
      location: 'Grotte Aurore',
      status: EventStatus.UPCOMING,
      startsAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
    },
  ]

  for (const e of eventsData) {
    await prisma.event.upsert({
      where: { id: e.id },
      update: e,
      create: { ...e, guildId: guild.id },
    })
  }
  console.log(`✓ ${eventsData.length} événements créés`)

  // ─── 6. ACTIVITÉS ───
  const activitiesData = [
    { type: 'event', message: 'Airdrop : ShadowKing a looté Légendaire', userName: 'ShadowKing' },
    { type: 'raid', message: 'MegaRaid vaincu par NeoAksel + 3', userName: 'NeoAksel' },
    { type: 'portal', message: 'PlasmaWarrior → Rang S aux Portails', userName: 'PlasmaWarrior' },
    { type: 'portal', message: 'Portail Rang A nettoyé par Ghetsis_Simp', userName: 'Ghetsis_Simp' },
    { type: 'event', message: 'Fishing : ZekromFan a attrapé un shiny!', userName: 'ZekromFan' },
  ]

  for (const a of activitiesData) {
    await prisma.activity.create({ data: a })
  }
  console.log(`✓ ${activitiesData.length} activités créées`)

  // ─── 7. SAISON ───
  await prisma.season.upsert({
    where: { id: 'season-3' },
    update: { isActive: true },
    create: { id: 'season-3', name: 'Saison 3', isActive: true },
  })

  // Classement de la saison
  const rankings = [
    { userId: users[0].id, points: 284500, rank: 1 },
    { userId: users[1].id, points: 271200, rank: 2 },
    { userId: users[2].id, points: 259800, rank: 3 },
    { userId: users[3].id, points: 245100, rank: 4 },
    { userId: users[4].id, points: 238400, rank: 5 },
  ]

  for (const r of rankings) {
    await prisma.seasonRanking.upsert({
      where: { seasonId_userId: { seasonId: 'season-3', userId: r.userId } },
      update: r,
      create: { seasonId: 'season-3', ...r },
    })
  }
  console.log(`✓ Classement saisonnier créé`)

  console.log('✅ Seed terminé !')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

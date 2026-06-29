import { d as defineEventHandler, a as prisma } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@prisma/client';

const dashboard_get = defineEventHandler(async () => {
  const [guild, memberCount, activeEvents, topMembers] = await Promise.all([
    prisma.guild.findFirst(),
    prisma.user.count(),
    prisma.event.count({ where: { status: "ACTIVE" } }),
    prisma.user.findMany({
      orderBy: { totalPoints: "desc" },
      take: 5,
      select: { id: true, username: true, guildRank: true, totalPoints: true, avatarUrl: true }
    })
  ]);
  const recentActivities = await prisma.activity.findMany({
    orderBy: { createdAt: "desc" },
    take: 5
  });
  return {
    guild,
    memberCount,
    activeEvents,
    topMembers: topMembers.map((m, i) => ({ ...m, rank: i + 1 })),
    recentActivities
  };
});

export { dashboard_get as default };
//# sourceMappingURL=dashboard.get.mjs.map

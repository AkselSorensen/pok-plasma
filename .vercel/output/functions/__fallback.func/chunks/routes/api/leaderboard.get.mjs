import { d as defineEventHandler, a as prisma } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@prisma/client';

const leaderboard_get = defineEventHandler(async () => {
  const users = await prisma.user.findMany({
    orderBy: { totalPoints: "desc" },
    select: {
      id: true,
      username: true,
      guildRank: true,
      portalRank: true,
      portalCleared: true,
      portalSuccessRate: true,
      pvpWins: true,
      totalPoints: true,
      avatarUrl: true,
      userBadges: {
        where: { status: "CONQUERED" },
        select: { badgeId: true }
      }
    }
  });
  return {
    users: users.map((u, i) => ({
      ...u,
      badgeCount: u.userBadges.length,
      rank: i + 1,
      userBadges: void 0
    })),
    total: users.length
  };
});

export { leaderboard_get as default };
//# sourceMappingURL=leaderboard.get.mjs.map

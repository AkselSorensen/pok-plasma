import { d as defineEventHandler, a as prisma } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@prisma/client';

const badges_get = defineEventHandler(async () => {
  const badges = await prisma.badge.findMany({
    orderBy: { order: "asc" },
    include: {
      userBadges: {
        where: { status: "CONQUERED" },
        select: { user: { select: { username: true } } },
        take: 1
      }
    }
  });
  return badges;
});

export { badges_get as default };
//# sourceMappingURL=badges.get.mjs.map

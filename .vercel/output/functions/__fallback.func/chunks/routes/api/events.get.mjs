import { d as defineEventHandler, a as prisma } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@prisma/client';

const events_get = defineEventHandler(async () => {
  const events = await prisma.event.findMany({
    orderBy: [{ status: "asc" }, { startsAt: "asc" }],
    include: { _count: { select: { participations: true } } }
  });
  return events;
});

export { events_get as default };
//# sourceMappingURL=events.get.mjs.map

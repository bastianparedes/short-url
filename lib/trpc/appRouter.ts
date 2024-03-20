import { initTRPC } from '@trpc/server';
import { z } from 'zod';

import { getLongUrl, insertUrl } from '../drizzle/functions';

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

const appRouter = router({
  insertUrl: publicProcedure
    .input(
      z.object({
        longUrl: z.string()
      })
    )
    .mutation(async ({ input }) => insertUrl(input)),
  getLongUrl: publicProcedure
    .input(
      z.object({
        shortPath: z.string()
      })
    )
    .mutation(async ({ input }) => getLongUrl(input))
});

export { appRouter };

import { initTRPC, TRPCError } from '@trpc/server';
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
    .mutation(async ({ input }) => {
      try {
        const url = new URL(input.longUrl);
        return await insertUrl(url.toString());
      } catch (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid Url',
          cause: error
        });
      }
    }),
  getLongUrl: publicProcedure
    .input(
      z.object({
        shortPath: z.string()
      })
    )
    .mutation(async ({ input }) => getLongUrl(input))
});

export { appRouter };

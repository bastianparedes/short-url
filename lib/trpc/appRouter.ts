import { initTRPC } from '@trpc/server';
import { z } from 'zod';

import {} from '../drizzle/functions';

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

const appRouter = router({});

export { appRouter };

import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const appRouter = router({
  // A simple query endpoint
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});

// Export the TYPE of the router. 
// This is the magic that gives the frontend type-safety without importing server code!
export type AppRouter = typeof appRouter;
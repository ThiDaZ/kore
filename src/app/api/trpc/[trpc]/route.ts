import { appRouter } from "@/src/server/api/routers/_app";
import { createTRPCContext } from "@/src/server/api/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export const runtime = 'nodejs';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };

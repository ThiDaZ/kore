import { initTRPC } from '@trpc/server';

// Initialize tRPC
const t = initTRPC.create();

// Create context (can be expanded later for auth, db, etc.)
export const createTRPCContext = async () => ({});

// Export reusable router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
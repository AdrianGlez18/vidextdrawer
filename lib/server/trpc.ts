import { initTRPC } from '@trpc/server';

export const createContext = () => {
  return {};
}; 

export type Context = ReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

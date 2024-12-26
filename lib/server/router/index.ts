import { createTRPCRouter } from '../trpc';
import { imageRouter } from './image';

export const appRouter = createTRPCRouter({
  image: imageRouter,
});

export type AppRouter = typeof appRouter;

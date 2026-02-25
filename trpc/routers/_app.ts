import { createTRPCRouter } from '../init';
import { courseRouter } from '@/modules/courses/server/procedure';
export const appRouter = createTRPCRouter({
  courses: courseRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

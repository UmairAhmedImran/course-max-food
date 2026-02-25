import { AppRouter } from '@/trpc/routers/_app';
import { inferRouterOutputs } from '@trpc/server';

export type CourseGetOne =
  inferRouterOutputs<AppRouter>['courses']['getOne'];

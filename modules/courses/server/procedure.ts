import { db } from '@/db';
import { courses } from '@/db/schema';
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from '@/trpc/init';
import { courseInsertSchema } from '../schema';
import z from 'zod';
import { eq } from 'drizzle-orm';

export const courseRouter = createTRPCRouter({
  getAll: baseProcedure.query(async () => {
    const data = await db.select().from(courses);

    return data;
  }),

  getOne: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [exisitingCourse] = await db
        .select()
        .from(courses)
        .where(eq(courses.id, input.id));
      return exisitingCourse;
    }),

  create: protectedProcedure
    .input(courseInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const [createdCourse] = await db
        .insert(courses)
        .values({
          ...input,
          profileId: ctx.auth.sub,
        })
        .returning();

      return createdCourse;
    }),
});

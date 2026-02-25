import { db } from '@/db';
import { courses } from '@/db/schema';
import {
  createTRPCRouter,
  protectedProcedure,
} from '@/trpc/init';
import { courseInsertSchema } from '../schema';
import z from 'zod';
import { and, eq, count, desc } from 'drizzle-orm';

export const courseRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).default(5),
          page: z.number().min(1).default(1),
        })
        .default({ limit: 5, page: 1 })
    )
    .query(async ({ ctx, input }) => {
      const { limit, page } = input;
      const offset = (page - 1) * limit;

      const data = await db
        .select()
        .from(courses)
        .orderBy(desc(courses.createdAt))
        .limit(limit)
        .offset(offset);

      const [{ value: totalCount }] = await db
        .select({ value: count() })
        .from(courses);

      return {
        items: data.map((course) => ({
          ...course,
          isOwner: course.profileId === ctx.auth.sub,
        })),
        totalCount,
        pageCount: Math.ceil(totalCount / limit),
      };
    }),

  getOne: protectedProcedure
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
  update: protectedProcedure
    .input(
      courseInsertSchema.extend({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [updatedCourse] = await db
        .update(courses)
        .set({
          title: input.title,
          description: input.description,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(courses.id, input.id),
            eq(courses.profileId, ctx.auth.sub),
          ),
        )
        .returning();

      return updatedCourse;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [deletedCourse] = await db
        .delete(courses)
        .where(
          and(
            eq(courses.id, input.id),
            eq(courses.profileId, ctx.auth.sub),
          ),
        )
        .returning();

      return deletedCourse;
    }),
});

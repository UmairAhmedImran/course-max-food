import z from 'zod';
export const courseInsertSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' }),
  description: z
    .string()
    .min(1, { message: 'description is required' }),
});

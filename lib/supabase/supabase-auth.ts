import {
  pgSchema,
  uuid,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';

const authSchema = pgSchema('auth');

export const authUsers = authSchema.table('users', {
  id: uuid('id').primaryKey(),
  email: varchar('email', { length: 255 }),
  createdAt: timestamp('created_at'),
});

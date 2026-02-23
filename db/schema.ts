import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(),
  fullName: varchar('full_name', { length: 255 }),
  avatarUrl: text('avatar_url'),
  email: varchar('email', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const courses = pgTable(
  'courses',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    profileId: uuid('profile_id')
      .notNull()
      .references(() => profiles.id, {
        onDelete: 'cascade',
      }),
    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    profileIdx: index('courses_profile_idx').on(
      table.profileId,
    ),
  }),
);

export const profilesRelations = relations(
  profiles,
  ({ many }) => ({
    courses: many(courses),
  }),
);

export const coursesRelations = relations(
  courses,
  ({ one }) => ({
    profile: one(profiles, {
      fields: [courses.profileId],
      references: [profiles.id],
    }),
  }),
);

import { InferModel } from 'drizzle-orm';
import { integer, pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';
 
export const GuestbookTable = pgTable('guestbook', {
	id: serial('id').primaryKey(),
	body: varchar('body', { length: 256 }).notNull(),
  created_by: varchar('created_by', { length: 256 }).notNull(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const viewsTable = pgTable('views', {
	slug: varchar('slug', { length: 256 }).primaryKey(),
  count: integer('count').notNull(),
});
 
export type GuestBookTable = InferModel<typeof GuestbookTable>;
export type ViewsTable = InferModel<typeof viewsTable>;
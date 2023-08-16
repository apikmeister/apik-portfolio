import { InferModel } from 'drizzle-orm';
import { int, mysqlTable, serial, varchar, timestamp } from 'drizzle-orm/mysql-core';
 
export const GuestbookTable = mysqlTable('guestbook', {
	id: serial('id').primaryKey(),
	body: varchar('body', { length: 256 }).notNull(),
  created_by: varchar('created_by', { length: 256 }).notNull(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const viewsTable = mysqlTable('viewstable', {
	slug: varchar('slug', { length: 256 }).primaryKey(),
  count: int('count').notNull(),
});
 
export type GuestBookTable = InferModel<typeof GuestbookTable>;
export type ViewsTable = InferModel<typeof viewsTable>;
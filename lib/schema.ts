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

export const AlbumsTable = pgTable('albums', {
  id: serial('id').primaryKey(),
  album_id: varchar('album_id', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 1024 }),
  date: timestamp('date').notNull(),
  thumbnail: varchar('thumbnail', { length: 255 }).notNull(),
});

export const ImagesTable = pgTable('images', {
  id: serial('id').primaryKey(),
  album_id: varchar('album_id', { length: 50 }).references(() => AlbumsTable.album_id).notNull(),
  image_url: varchar('image_url', { length: 255 }).notNull(),
});

export type AlbumsTable = InferModel<typeof AlbumsTable>;
export type ImagesTable = InferModel<typeof ImagesTable>;
export type GuestBookTable = InferModel<typeof GuestbookTable>;
export type ViewsTable = InferModel<typeof viewsTable>;
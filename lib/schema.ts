import { InferModel } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const GuestbookTable = pgTable("guestbook", {
  id: serial("id").primaryKey(),
  body: varchar("body", { length: 256 }).notNull(),
  created_by: varchar("created_by", { length: 256 }).notNull(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const viewsTable = pgTable("views", {
  slug: varchar("slug", { length: 256 }).primaryKey(),
  count: integer("count").notNull(),
});

export const AlbumsTable = pgTable("albums", {
  id: serial("id").primaryKey(),
  album_id: varchar("album_id", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 1024 }),
  date: timestamp("date").notNull(),
  thumbnail: varchar("thumbnail", { length: 255 }).notNull(),
  access_level: varchar("access_level", { length: 50 })
    .default("private")
    .notNull(),
  shareable_link: varchar("shareable_link", { length: 255 }).unique(),
  downloadable: boolean('downloadable').default(false).notNull(),
});

export const AlbumSharesTable = pgTable("album_shares", {
  id: serial("id").primaryKey(),
  album_id: varchar("album_id", { length: 50 })
    .references(() => AlbumsTable.album_id)
    .notNull(),
  shared_with: varchar("shared_with", { length: 255 }).notNull(),
  shared_at: timestamp("shared_at").defaultNow(),
});

export const ImagesTable = pgTable("images", {
  id: serial("id").primaryKey(),
  album_id: varchar("album_id", { length: 50 })
    .references(() => AlbumsTable.album_id)
    .notNull(),
  image_url: varchar("image_url", { length: 255 }).notNull(),
});

export type AlbumsTable = InferModel<typeof AlbumsTable>;
export type AlbumSharesTable = InferModel<typeof AlbumSharesTable>;
export type ImagesTable = InferModel<typeof ImagesTable>;
export type GuestBookTable = InferModel<typeof GuestbookTable>;
export type ViewsTable = InferModel<typeof viewsTable>;

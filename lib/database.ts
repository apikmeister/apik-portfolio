import { Generated, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

interface GuestbookTable {
  id: Generated<number>;
  email: string;
  body: string;
  created_by: string;
  updated_at?: string;
}

interface ViewsTable {
  slug: string;
  count: number;
}

interface AlbumsTable {
  id: Generated<number>;
  album_id: string;
  name: string;
  description?: string;
  date: string;
  thumbnail: string;
  access_level: string;
  shareable_link?: string;
  downloadable: boolean;
}

interface AlbumSharesTable {
  id: Generated<number>;
  album_id: string;
  shared_with: string;
  shared_at: string;
}

interface ImagesTable {
  id: Generated<number>;
  album_id: string;
  image_url: string;
}

interface Database {
  guestbook: GuestbookTable;
  views: ViewsTable;
  albums: AlbumsTable;
  album_shares: AlbumSharesTable;
  images: ImagesTable;
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    })
  })
});
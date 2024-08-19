"use server";

import { v4 as uuidv4 } from "uuid";
import { type Session } from "next-auth";
import { queryBuilder } from "lib/database";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { auth } from "./auth";
import { sql } from "kysely";

export async function increment(slug: string) {
  noStore();

  await queryBuilder
    .insertInto("views")
    .values({ slug, count: 1 })
    .onConflict((oc) =>
      oc
        .column("slug")
        .doUpdateSet({ count: sql`${sql.ref("views.count")} + 1` })
    )
    .execute();
}

async function getSession(): Promise<Session> {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function saveGuestbookEntry(formData: FormData) {
  const session = await getSession();
  const email = session.user?.email as string;
  const created_by = session.user?.name as string;
  const entry = formData.get("entry")?.toString() || "";
  const body = entry.slice(0, 500);

  await queryBuilder
    .insertInto("guestbook")
    .values({ email, body, created_by })
    .execute();

  revalidatePath("/guestbook");
}

export async function getGuestbookEntries() {
  noStore();

  return await queryBuilder
    .selectFrom("guestbook")
    .selectAll()
    .orderBy("updated_at", "desc")
    .limit(100)
    .execute();
}

export async function getAlbumById(albumId: string, providedLink?: string) {
  let session = await auth();
  let userEmail = session?.user?.email;

  const album = await queryBuilder
    .selectFrom("albums")
    .selectAll()
    .where("album_id", "=", albumId)
    .executeTakeFirst();

  if (!userEmail) {
    return album;
  }

  userEmail = userEmail as string;

  if (!album) {
    return null;
  }

  if (session?.user?.email === "afiq.mohamad90@gmail.com") {
    return album;
  }

  if (album.access_level === "public") {
    return album;
  }

  if (album.access_level === "link") {
    if (album.shareable_link === providedLink) {
      return album;
    } else {
      return null;
    }
  }

  if (album.access_level === "private" && userEmail) {
    const shared = await queryBuilder
      .selectFrom("album_shares")
      .selectAll()
      .where("album_id", "=", albumId)
      .where("shared_with", "=", userEmail)
      .executeTakeFirst();

    if (shared) {
      return album;
    }
  }

  return null;
}

export async function getAllAlbums() {
  const totalAlbums = await queryBuilder
    .selectFrom("albums")
    .select(({ fn }) => [fn.count("id").as("count")])
    .executeTakeFirstOrThrow();

  return Number(totalAlbums.count);
}

export async function getAlbumPagination(
  albumPerPage: number,
  currPage: number
) {
  let session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return await queryBuilder
      .selectFrom("albums")
      .selectAll()
      .where("access_level", "=", "public")
      .offset((currPage - 1) * albumPerPage)
      .limit(albumPerPage)
      .execute();
  }

  if (userEmail === "afiq.mohamad90@gmail.com") {
    return await queryBuilder
      .selectFrom("albums")
      .selectAll()
      .offset((currPage - 1) * albumPerPage)
      .limit(albumPerPage)
      .execute();
  }

  return await queryBuilder
    .selectFrom("albums")
    .leftJoin("album_shares", "albums.album_id", "album_shares.album_id")
    .selectAll()
    .where((eb) =>
      eb.or([
        eb("albums.access_level", "=", "public"),
        eb.and([
          eb("albums.access_level", "=", "private"),
          eb("album_shares.shared_with", "=", userEmail),
        ]),
      ])
    )
    .offset((currPage - 1) * albumPerPage)
    .limit(albumPerPage)
    .execute();
}

export async function getImageByAlbumId(albumId: string) {
  return await queryBuilder
    .selectFrom("images")
    .select(["image_url"])
    .where("album_id", "=", albumId)
    .execute();
}

export async function canDownloadAlbum(albumId: string) {
  const isDownloadable = await queryBuilder
    .selectFrom("albums")
    .select(["downloadable"])
    .where("album_id", "=", albumId)
    .executeTakeFirst();

  return Boolean(isDownloadable);
}

export async function generateShareableLink(albumId: string) {
  const shareableLink = uuidv4();

  await queryBuilder
    .updateTable("albums")
    .set({ shareable_link: shareableLink, access_level: "link" })
    .where("album_id", "=", albumId)
    .execute();

  return shareableLink;
}

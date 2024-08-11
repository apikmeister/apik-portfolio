"use server";

import { getServerSession } from "next-auth/next";
import { type Session } from "next-auth";
import { queryBuilder } from "lib/database";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { authOptions } from "./auth";
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
  const session = await getServerSession(authOptions);
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

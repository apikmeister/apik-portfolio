import type { Metadata } from "next";
import { queryBuilder } from "lib/database";
import { SignIn, SignOut } from "./buttons";
import Form from "./form";
import { auth } from "@/lib/auth";
import { getGuestbookEntries } from "@/lib/actions";
import { Suspense } from "react";

async function getGuestbook() {
  const data = await queryBuilder
    .selectFrom("guestbook")
    .select(["id", "body", "created_by", "updated_at"])
    .orderBy("updated_at", "desc")
    .limit(100)
    .execute();
  return data;
}

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Sign my guestbook and leave your mark.",
};

export default async function GuestbookPage() {
  return (
    <section className="h-screen">
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        sign my guestbook
      </h1>
      <Suspense>
        <GuestbookForm />
        <GuestbookEntries />
      </Suspense>
    </section>
  );
}

async function GuestbookEntries() {
  let entries = await getGuestbookEntries();

  if (entries.length === 0) {
    return null;
  }

  return entries.map((entry) => (
    <div key={entry.id} className="flex flex-col space-y-1 mb-4">
      <div className="w-full text-sm break-words">
        <span className="text-neutral-600 dark:text-neutral-400 mr-1">
          {entry.created_by}:
        </span>
        {entry.body}
      </div>
    </div>
  ));
}

async function GuestbookForm() {
  let session = await auth();

  return session?.user ? (
    <>
      <Form />
      <SignOut />
    </>
  ) : (
    <SignIn />
  );
}

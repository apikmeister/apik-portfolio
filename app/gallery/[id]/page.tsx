import { GalleryLayout } from "@/components";
import { getAlbumById } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface GalleryPageProps {
  params: { id: string };
  searchParams: { shared: string}
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata | undefined> {
  const album = await getAlbumById(params.id);
  if (!album) {
    return;
  }

  const title = album.name;
  const description =
    album.description ||
    `View the ${album.name} album with a collection of stunning photos.`;
  const ogImage = album.thumbnail
    ? `https://apik.me${album.thumbnail}`
    : `https://apik.me/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://apik.me/gallery/${album.id}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const GalleryPage = async ({ params, searchParams }: GalleryPageProps) => {
  let album = await getAlbumById(params.id, searchParams.shared);

  if (!album) {
    return notFound();
  }

  let session = await auth();

  return (
    <div className="p-4">
      <GalleryLayout
        albumId={album.album_id}
        isAdmin={
          session?.user?.email === "afiq.mohamad90@gmail.com" ? true : false
        }
        sharedAccessLink={searchParams.shared}
      />
    </div>
  );
};

export default GalleryPage;

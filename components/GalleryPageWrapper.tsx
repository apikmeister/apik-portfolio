"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAlbumById } from "@/lib/actions";
import GalleryLayout from "./GalleryLayout";
import { Album } from "./GalleryList";

interface GalleryPageWrapper {
  albumId: string;
  isAdmin: boolean;
}

export const GalleryLayoutWrapper = ({
  albumId,
  isAdmin,
}: GalleryPageWrapper) => {
  const searchParams = useSearchParams();
  const providedLink = searchParams.get("shared") || undefined;
  console.log('GalleryLayoutWrapper', albumId, providedLink);
  const [album, setAlbum] = useState<Album | null>(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      const fetchedAlbum = await getAlbumById(albumId, providedLink);
      setAlbum(fetchedAlbum);
    };

    fetchAlbum();
  }, [albumId, providedLink]);

  if (!album) {
    return <p>Album not found or access denied.</p>;
  }

  return <GalleryLayout albumId={albumId} isAdmin={isAdmin} />;
};

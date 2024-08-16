import GalleryList from "@/components/GalleryList";
import { albums } from "@/data/albums";

interface GalleryPageProps {
  searchParams: { page?: string };
}

export default function GalleryPage({ searchParams }: GalleryPageProps) {
  const ALBUMS_PER_PAGE = 8;

  const currentPage = parseInt(searchParams.page || "1", 10);
  const totalPages = Math.ceil(albums.length / ALBUMS_PER_PAGE);

  const startIdx = (currentPage - 1) * ALBUMS_PER_PAGE;
  const paginatedAlbums = albums.slice(startIdx, startIdx + ALBUMS_PER_PAGE);

  return (
    <GalleryList
      albums={paginatedAlbums}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}

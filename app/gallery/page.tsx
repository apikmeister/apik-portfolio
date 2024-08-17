import GalleryList from "@/components/GalleryList";
import { getAlbumPagination, getAllAlbums } from "@/lib/actions";

interface GalleryPageProps {
  searchParams: { page?: string };
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const ALBUMS_PER_PAGE = 8;

  const currentPage = parseInt(searchParams.page || "1", 10);
  
  const totalAlbums = await getAllAlbums();
  const totalPages = Math.ceil(totalAlbums / ALBUMS_PER_PAGE);

  const paginatedAlbums = await getAlbumPagination(ALBUMS_PER_PAGE, currentPage);

  return (
    <GalleryList
      albums={paginatedAlbums}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}

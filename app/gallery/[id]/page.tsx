import { GalleryLayout } from "@/components";
import { albums } from "@/data/albums";
import { notFound } from "next/navigation";

interface GalleryPageProps {
  params: { id: string };
}

const GalleryPage = ({ params }: GalleryPageProps) => {
  const album = albums.find((a) => a.id === params.id);

  if (!album) {
    return notFound();
  }

  return (
    <div className="p-4">
      <GalleryLayout albumId={album.id} />
    </div>
  );
};

export default GalleryPage;

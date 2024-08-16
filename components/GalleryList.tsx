import Link from "next/link";
import React from "react";

interface Album {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  images: string[];
}

interface GalleryListProps {
  albums: Album[];
  currentPage: number;
  totalPages: number;
}

const GalleryList = ({ albums, currentPage, totalPages }: GalleryListProps) => {
  return (
    <div>
      <h1>Albums</h1>
      <section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:p-6">
        {albums.map((album) => (
          <div
            key={album.id}
            className="group relative overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-md"
          >
            <Link
              href={`/gallery/${album.id}`}
              className="absolute inset-0 z-10"
              prefetch={false}
            >
              <span className="sr-only">View Album</span>
            </Link>
            <img
              src={album.thumbnail}
              alt={`${album.name} thumbnail`}
              width={400}
              height={400}
              className="aspect-square w-full object-cover transition-all group-hover:scale-105"
            />
            <div className="bg-background p-4">
              <h3 className="text-lg font-semibold">{album.name}</h3>
              <p className="text-sm text-muted-foreground">August 2023</p>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-6">
        <Link href={`?page=${currentPage - 1}`} passHref>
          <button
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-primary text-white rounded ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary-dark"
            }`}
          >
            Previous
          </button>
        </Link>

        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>

        <Link href={`?page=${currentPage + 1}`} passHref>
          <button
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-primary text-white rounded ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary-dark"
            }`}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GalleryList;
"use client";

import { useEffect, useState } from "react";
import { BlurFade } from "@/components";
import { CameraIcon, Download } from "lucide-react";
import { getImagesWithExif } from "@/lib/utils/exifUtils";
import Link from "next/link";
import { generateShareableLink, getAlbumById } from "@/lib/actions";
import { Album } from "./GalleryList";
import { formatDateMonth } from "@/lib/utils/dateFormat";
import { auth } from "@/lib/auth";

interface ExifData {
  Model?: string;
  FNumber?: number;
  ExposureTime?: number;
  ISOSpeedRatings?: number;
  FocalLength?: number;
}

interface ImageWithExif {
  src: string;
  alt: string;
  exifData: ExifData;
}

interface GalleryLayoutProps {
  albumId: string;
  isAdmin: boolean;
  sharedAccessLink?: string;
}

const downloadGalleryAsZip = async (albumId: string, imageUrls: string[]) => {
  const response = await fetch("/api/download-gallery", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ albumId, imageUrls }),
  });

  if (!response.ok) {
    console.error("Failed to download ZIP file");
    return;
  }

  const blob = await response.blob();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${albumId}.zip`;
  link.click();
};

const GalleryLayout = ({ albumId, isAdmin, sharedAccessLink }: GalleryLayoutProps) => {
  const [album, setAlbum] = useState<Album | null>(null);
  const [imagesWithExif, setImagesWithExif] = useState<ImageWithExif[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [downloadable, setDownloadable] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [shareableLink, setShareableLink] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumData = await getAlbumById(albumId, sharedAccessLink);
        if (albumData) {
          setAlbum(albumData);
          const images = await getImagesWithExif(albumId, sharedAccessLink);
          setImagesWithExif(images);
          setDownloadable(albumData.downloadable);
        }
      } catch (error) {
        console.error("Error fetching images with EXIF data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [albumId]);

  const handleDownloadClick = async () => {
    setIsDownloading(true);
    try {
      await downloadGalleryAsZip(
        albumId,
        imagesWithExif.map((image) => image.src)
      );
    } catch (error) {
      console.error("Failed to download ZIP file", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCreateShareableLink = async () => {
    try {
      const { origin } = window.location;
      const shareableToken = await generateShareableLink(albumId);
      const link = `${origin}/gallery/${albumId}?shared=${shareableToken}`;
      setShareableLink(link);
    } catch (error) {
      console.error("Failed to generate album link", error);
    }
  };

  const handleCopyLink = () => {
    if (shareableLink) {
      navigator.clipboard
        .writeText(shareableLink)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy the link", error);
        });
    }
  };

  if (loading) {
    return (
      <section
        id="photos"
        className="h-screen grid grid-cols-2 sm:grid-cols-3 gap-4"
      >
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="w-full h-[200px] bg-gray-200 animate-pulse rounded-lg"
          ></div>
        ))}
      </section>
    );
  }

  return (
    <section>
      <div className="py-4">
        <div className="flex flex-row justify-between">
          <h1 className="font-bold">{album?.name}</h1>
          <p className="text-slate-500 text-xs">
            {formatDateMonth(album!.date) || "Unknown Date"}
          </p>
        </div>
        <div className="flex flex-row justify-between w-full">
          <p className="max-w-[50%] text-sm text-slate-500">
            {album?.description}
          </p>
          {isAdmin && (
            <>
              <button onClick={handleCreateShareableLink}>Share</button>
              {shareableLink && (
                <div>
                  <p>Shareable Link: {shareableLink}</p>
                  <button onClick={handleCopyLink}>Copy Link</button>
                </div>
              )}
            </>
          )}
          {downloadable && (
            <button
              onClick={handleDownloadClick}
              className={`mt-4 bg-primary text-white text-sm py-2 rounded ${
                isDownloading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isDownloading}
            >
              {isDownloading ? "Downloading..." : "Download Album (.zip)"}
            </button>
          )}
        </div>
      </div>
      <section id="photos" className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {imagesWithExif.map((image, idx) => (
          <BlurFade key={image.src} delay={0.25 + idx * 0.05} inView>
            <div className="relative group overflow-hidden rounded-lg">
              <img
                className={`w-full h-full object-cover`}
                src={image.src}
                alt={image.alt}
              />
              <div className="absolute inset-0 bg-black/70 p-2 sm:p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <p className="text-[0.5rem] sm:text-sm text-muted-foreground">
                      ISO{" "}
                      {image.exifData?.ISOSpeedRatings?.toString() || "Unknown"}
                      , {formatShutterSpeed(image.exifData?.ExposureTime)},{" "}
                      {formatAperture(image.exifData?.FNumber)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CameraIcon className="h-2 w-2 sm:h-4 sm:w-4" />
                    <span className="text-[0.5rem] sm:text-sm text-muted-foreground">
                      {image.exifData?.Model || "Unknown"},{" "}
                      {formatFocalLength(image.exifData?.FocalLength)}
                    </span>
                  </div>
                </div>
                {downloadable && (
                  <Link
                    href={image.src}
                    download
                    className="absolute bottom-4 right-4 bg-primary text-white px-3 py-1 rounded"
                  >
                    <Download />
                  </Link>
                )}
              </div>
            </div>
          </BlurFade>
        ))}
      </section>
    </section>
  );
};

export default GalleryLayout;

const formatAperture = (fNumber?: number): string => {
  return fNumber ? `f/${fNumber}` : "Unknown";
};

const formatShutterSpeed = (exposureTime?: number): string => {
  if (!exposureTime) return "Unknown";
  const denominator = Math.round(1 / exposureTime);
  return `1/${denominator}s`;
};

const formatFocalLength = (focalLength?: number): string => {
  return focalLength ? `${focalLength}mm` : "Unknown";
};

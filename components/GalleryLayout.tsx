"use client";

import { useEffect, useState } from "react";
import { BlurFade } from "@/components";
import { CameraIcon } from "lucide-react";
import { getImagesWithExif } from "@/lib/utils/exifUtils";

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
}

const GalleryLayout = ({ albumId }: GalleryLayoutProps) => {
  const [imagesWithExif, setImagesWithExif] = useState<ImageWithExif[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getImagesWithExif(albumId);
        setImagesWithExif(data);
      } catch (error) {
        console.error("Error fetching images with EXIF data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [albumId]);

  if (loading) {
    return (
      <section id="photos" className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
    <section id="photos" className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {imagesWithExif.map((image, idx) => (
        <BlurFade key={image.src} delay={0.25 + idx * 0.05} inView>
          <div className="relative group overflow-hidden rounded-lg">
            <img
              className={`w-full h-full object-cover`}
              src={image.src}
              alt={image.alt}
            />
            <div className="absolute inset-0 bg-black/70 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    ISO {image.exifData?.ISOSpeedRatings?.toString() || "Unknown"},{" "}
                    {formatShutterSpeed(image.exifData?.ExposureTime)},{" "}
                    {formatAperture(image.exifData?.FNumber)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CameraIcon className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">
                    {image.exifData?.Model || "Unknown"},{" "}
                    {formatFocalLength(image.exifData?.FocalLength)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
      ))}
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

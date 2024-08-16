import { albums } from '@/data/albums';
import EXIF from 'exif-js';

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
  isLandscape: boolean;
  exifData: ExifData;
}

const fetchExifData = async (imageSrc: string): Promise<ExifData> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      //@ts-ignore
      EXIF.getData(img, function () {
        //@ts-ignore
        const exifData: ExifData = EXIF.getAllTags(this);
        resolve(exifData);
      });
    };
    img.onerror = (error) => {
      reject(error);
    };
  });
};

export const getImagesWithExif = async (albumId: string): Promise<ImageWithExif[]> => {
  const album = albums.find((album) => album.id === albumId);

  if (!album) {
    throw new Error(`Album with id ${albumId} not found`);
  }

  const imagesWithExif = await Promise.all(
    album.images.map(async (imageSrc) => {
      const exifData = await fetchExifData(imageSrc);
      return {
        src: imageSrc,
        alt: `Image from ${album.name}`,
        isLandscape: true, // Update based on your logic or image data
        exifData,
      };
    })
  );

  return imagesWithExif;
};

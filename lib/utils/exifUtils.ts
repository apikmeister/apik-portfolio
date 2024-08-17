import EXIF from 'exif-js';
import { getAlbumById, getImageByAlbumId } from '../actions';

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

const fetchExifData = async (imageSrc: string): Promise<ExifData> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(imageSrc)}`;
    img.src = proxyUrl;
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
  const album = await getAlbumById(albumId);

  if (!album) {
    throw new Error(`Album with id ${albumId} not found`);
  }

  const images = await getImageByAlbumId(album.album_id);

  if (!images || images.length === 0) {
    return [];
  }

  const imagesWithExif = await Promise.all(
    images.map(async (image) => {
      const exifData = await fetchExifData(image.image_url);
      return {
        src: image.image_url,
        alt: `Image from ${album.name}`,
        exifData,
      };
    })
  );

  return imagesWithExif;
};

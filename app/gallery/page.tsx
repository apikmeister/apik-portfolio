import { MasonryGrid } from '@/components'
import { albums } from '@/data/albums'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const GalleryList = () => {
  return (
    <div>
      {/* <GalleryLayout / */}
      <h1>Albums</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link href={`/gallery/${album.id}`}>
              <div>
                <Image
                  src={album.thumbnail}
                  alt={`${album.name} thumbnail`}
                  width={150}
                  height={150}
                />
                <h2>{album.name}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GalleryList

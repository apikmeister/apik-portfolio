import Image from "next/image";
import React from "react";

const MasonryGrid = () => {
  return (
    <div className="columns-2 sm:columns-3 gap-4 my-8">
      <div className="relative h-40 mb-4">
        <Image
          alt="Me speaking on stage at React Summit about the future of Next.js"
          src='/images/vertical_car1.jpg'
          fill
          sizes="(max-width: 768px) 213px, 33vw"
          priority
          className="rounded-lg object-cover"
        />
      </div>
      <div className="relative h-80 mb-4 sm:mb-0">
        <Image
          alt="Me, Lydia, and Delba filming the Next.js Conf keynote"
          src='/images/horizontal_pavi.jpg'
          fill
          sizes="(max-width: 768px) 213px, 33vw"
          priority
          className="rounded-lg object-cover object-[-16px] sm:object-center"
        />
      </div>
      <div className="relative h-40 sm:h-80 sm:mb-4">
        <Image
          alt="Me standing on stage at Reactathon delivering the keynote"
          src='/images/vertical_car2.jpg'
          fill
          sizes="(max-width: 768px) 213px, 33vw"
          priority
          className="rounded-lg object-cover object-top sm:object-center"
        />
      </div>
      <div className="relative h-40 mb-4 sm:mb-0">
        <Image
          alt="Me standing on stage at SmashingConf giving a talk about my optimism for the web"
          src='/images/vertical_car3.jpg'
          fill
          sizes="(max-width: 768px) 213px, 33vw"
          priority
          className="rounded-lg object-cover"
        />
      </div>
      <div className="relative h-40 mb-4">
        <Image
          alt="Me and Guillermo Rauch on stage for Vercel Ship, answering questions from the Next.js community"
          src='/images/vertical_car1.jpg'
          fill
          sizes="(max-width: 768px) 213px, 33vw"
          priority
          className="rounded-lg object-cover"
        />
      </div>
      <div className="relative h-80">
        <Image
          alt="My badge on top of a pile of badges from a Vercel meetup we held"
          src='/images/horizontal_pavi.jpg'
          fill
          sizes="(min-width: 768px) 213px, 33vw"
          priority
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default MasonryGrid;

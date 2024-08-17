import React from "react";
import Marquee from "./Marquee";

const logos = [
  {
    name: "Dodge SRT Hellcat Redeye",
    img: "https://cdn.apik.me/carousel-showcase/DSC_0032.jpg",
  },
  {
    name: "Nakai-San Eating",
    img: "https://cdn.apik.me/carousel-showcase/DSC_0222.jpg",
  },
  {
    name: "Porsche 911 GT3RS Weissach Package",
    img: "https://cdn.apik.me/carousel-showcase/DSC_0276.jpg",
  },
  {
    name: "Porsche 911 Carrera GTS",
    img: "https://cdn.apik.me/carousel-showcase/DSC_0281-2-expand.jpg",
  },
  {
    name: "Porsche 911 GT3 Matte Black",
    img: "https://cdn.apik.me/carousel-showcase/DSC_0379.jpg",
  },
  {
    name: "Drift Action",
    img: "https://cdn.apik.me/carousel-showcase/DSC_0698.jpg",
  },
  {
    name: "Lamborghini Murcielago SV",
    img: "https://cdn.apik.me/carousel-showcase/DSC_0765.jpg",
  },
  {
    name: "Night Drift Action",
    img: "https://cdn.apik.me/carousel-showcase/DSC_0805-Enhanced-NR-Edit.jpg",
  },
  {
    name: "Stanced BMW",
    img: "https://cdn.apik.me/carousel-showcase/DSC_0857-Enhanced-NR.jpg",
  },
  {
    name: "AMG GT Black Series",
    img: "https://cdn.apik.me/carousel-showcase/TSS04451.jpg",
  },
  {
    name: "Honda NSX-R",
    img: "https://cdn.apik.me/carousel-showcase/TSS05698.jpg",
  },
];

const firstRow = logos.slice(0, logos.length / 2);
const secondRow = logos.slice(logos.length / 2);

const Showcase = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h4 className="mb-8 tracking-tighter">moments captured, still or alive.</h4>
      <div className="relative flex h-[500px] w-screen max-w-none flex-col items-center justify-center overflow-hidden md:shadow-xl">
        <Marquee className="[--duration:20s]">
          {firstRow.map((data, idx) => (
            <div
              key={idx}
              className="aspect-[9/16] w-[225px] flex items-center justify-center"
            >
              <img
                src={data.img}
                alt={data.name}
                className="h-full w-full object-cover rounded-xl transition-all duration-300 hover:scale-105"
              />
            </div>
          ))}
        </Marquee>
        <Marquee reverse className="[--duration:20s]">
          {secondRow.map((data, idx) => (
            <div
              key={idx}
              className="aspect-[9/16] w-[225px] flex items-center justify-center"
            >
              <img
                src={data.img}
                alt={data.name}
                className="h-full w-full object-cover rounded-xl transition-all duration-300 hover:scale-105"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Showcase;

"use client";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from 'next/link'

function Info() {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-800 to-rose-500 blur-3xl w-56 h-40 skew-y-[15deg] top-80 -z-10 rounded-full" />
      <div className="h-screen flex sm:flex-row flex-col items-center justify-evenly md:justify-around overflow-hidden">
        <div className=" flex flex-col gap-y-3">
          <h1 className="sm:text-2xl md:text-4xl font-bold text-slate-700 dark:text-slate-200">Hi, I'm Afiq 👋</h1>
          <p className="text-slate-800 dark:text-slate-400 text-xs sm:text-sm w-[15rem] sm:w-[24rem]">
            A mobile computing student learning to give a big impact in the tech
            industry. I love to learn new things and always open to new
            opportunities.
          </p>
          <Link
            href="https://www.apik.me"
            className="flex group gap-2 items-center duration-200 text-zinc-600 dark:text-zinc-400 cursor-pointer no-underline dark:hover:text-zinc-500 hover:text-zinc-700"
          >
            Read More{" "}
            <span className="group-hover:translate-x-1 duration-200">
              <MoveRight />
            </span>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Image
            className="rounded-md"
            src="https://res.cloudinary.com/dk9x6bja3/image/upload/v1692215780/apik_hxbvly.jpg"
            alt="apik"
            width={300}
            height={300}
          />
        </div>
      </div>
    </section>
  );
}

export default Info;

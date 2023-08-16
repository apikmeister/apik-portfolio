"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import DarkModeToggler from "./DarkModeToggler";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion } from "framer-motion";

const navItems = {
  "/": {
    name: "Home",
  },
  "/blog": {
    name: "Blog",
  },
  "/guestbook": {
    name: "GuestBook",
  },
};

const Header = () => {
  let pathname = usePathname() || "/";
  if (pathname.includes("/blog/")) {
    pathname = "/blog";
  }

  return (
    <header className="w-full flex justify-center items-center">
      <LayoutGroup>
        <nav className="relative w-full max-w-7xl flex items-center justify-center space-x-2 font-bold px-10 mx-auto mt-4">
          <ul className="flex gap-5 py-2 px-4">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = path === pathname;
              return (
                <Link
                  key={path}
                  href={path}
                  className={clsx(
                    "transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle",
                    {
                      "text-neutral-500": !isActive,
                    }
                  )}
                >
                  <span className="relative py-1 px-2">
                    {name}
                    {path === pathname ? (
                      <motion.div
                        className="absolute h-[1px] top-7 mx-2 inset-0 bg-neutral-400 dark:bg-neutral-800 z-[-1] dark:bg-gradient-to-r from-transparent to-neutral-900"
                        layoutId="sidebar"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    ) : null}
                  </span>
                </Link>
              );
            })}
          </ul>
          <ul>
            <DarkModeToggler />
          </ul>
        </nav>
      </LayoutGroup>
    </header>
  );
};

export default Header;

"use client";

import clsx from "clsx";
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
  // "/projects": {
  //   name: "Projects",
  // },
  "/gallery": {
    name: "Gallery",
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

  if (pathname.includes("/gallery/")) {
    pathname = "/gallery";
  }

  if (pathname.includes("/projects/")) {
    pathname = "/guestbook";
  }

  return (
    <header className="w-full flex justify-center items-center">
      <LayoutGroup>
        <nav className="relative w-full max-w-7xl flex items-center justify-center space-x-2 font-bold px-10 mx-auto mt-4">
          <ul className="flex gap-5 py-2 px-4">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = path === pathname;
              return (
                <li>
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
                          className="absolute h-[1px] top-7 mx-2 inset-0 bg-neutral-800 dark:bg-neutral-400 z-[-1] dark:bg-gradient-to-r from-transparent"
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
                </li>
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

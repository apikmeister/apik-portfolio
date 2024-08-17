import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 flex flex-col gap-5 items-center justify-center py-10 border-t border-zinc-600 w-full">
        <h1 className="text-sm sm:text-base">
        &copy; {new Date().getFullYear()} Muhammad Afiq. All rights reserved.
        </h1>
    </footer>
  );
};

export default Footer;

"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

const DarkModeToggler = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  if (currentTheme === "dark") {
    document.documentElement.classList.add("dark");
    return (
      <SunIcon
        className="w-7 h-7"
        role="button"
        onClick={() => setTheme("light")}
      />
    );
  } else {
    document.documentElement.classList.remove("dark");
    return (
      <MoonIcon
        className="w-7 h-7"
        role="button"
        onClick={() => setTheme("dark")}
      />
    );
  }
};

export default DarkModeToggler;

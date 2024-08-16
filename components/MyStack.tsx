import React from "react";
import IconCloud from "./IconCloud";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "dotnet",
  "tailwindcss",
  "python",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "postgresql",
  "firebase",
  "kotlin",
  "vercel",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "figma",
];

const MyStack = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-8 font-bold text-xl">My Stacks</h2>
      <div className="max-w-[32rem] pb-[40px]">
        <IconCloud iconSlugs={slugs} />
      </div>
    </div>
  );
};

export default MyStack;

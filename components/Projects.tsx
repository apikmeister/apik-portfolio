import { Repos, TopRepos } from "@/lib/types";
import Link from "next/link";
import { GitFork, MoveRight, Star } from "lucide-react";

export default function Projects(repos: TopRepos) {
  return (
    <div className="flex flex-col items-center justify-center h-full md:h-screen">
      <h2 className="mb-8 font-bold text-xl">My Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-center">
        {repos.Repos.map((repo: Repos) => (
          <div
            key={repo.name}
            className="transition ease-in-out border-[1px] bg-[F9FAFC] hover:bg-[#F8FAFC] dark:bg-[#101010] dark:hover:bg-black/20 hover:border-gray-400 dark:border-slate-700 dark:hover:border-slate-500 rounded-lg px-3 pt-2 pb-4 h-48 w-40 flex flex-col justify-between"
          >
            <div className="mb-1 text-center flex gap-2 flex-col">
              <Link href={repo.url} className="line-clamp-2 cursor-pointer">
                {repo.name}
              </Link>
              <p className="text-xs dark:text-gray-200">{repo.description}</p>
            </div>
            <div className="flex justify-around">
              <div className="flex gap-2 items-center">
                <GitFork size={20} /> {repo.forks}
              </div>
              <div className="flex gap-2 items-center">
                <Star size={20} /> {repo.stars}
              </div>
            </div>
          </div>
        )).slice(0, 4)}
        <Link
          href="https://github.com/apikmeister"
          className="flex group gap-2 items-center duration-200 text-zinc-600 dark:text-zinc-400 cursor-pointer no-underline dark:hover:text-zinc-500 hover:text-zinc-700"
        >
          Visit My Github{" "}
          <span className="group-hover:translate-x-1 duration-200">
            <MoveRight />
          </span>
        </Link>
      </div>
    </div>
  );
}

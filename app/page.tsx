import { About, Info, MasonryGrid, Projects, Skills } from "@/components";
import { getRepos } from "@/lib/repos";
import { Repos, TopRepos } from "@/lib/types";

export default async function Home() {

  const repos = await getRepos();
  return (
    <div className="mx-10 md:mx-5">
      <Info />
      {/* <MasonryGrid /> */}
      <About />
      {/* <Education /> */}
      {/* <Skills /> */}
      <Projects Repos={repos} />
      {/* <Contact /> */}
    </div>
  );
}

export async function getStaticProps() {
  const topRepos = await getRepos();
  return {
    repos: topRepos,
  };
}

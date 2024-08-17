import { About, IconCloud, Info, MasonryGrid, MyStack, Projects, Skills } from "@/components";
import { getRepos } from "@/lib/repos";

export default async function Home() {
  const repos = await getRepos();
  return (
    <div className="mx-10 md:mx-5">
      <Info />
      <About />
      <MyStack />
      {/* <Education /> */}
      {/* <Skills /> */}
      <Projects Repos={repos} />
      {/* <Contact /> */}
    </div>
  );
}

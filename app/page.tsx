import { About, Info, MyStack, Projects } from "@/components";
import Showcase from "@/components/Showcase";
import { getRepos } from "@/lib/repos";

export default async function Home() {
  const repos = await getRepos();
  return (
    <>
      <div className="min-w-0 px-2 md:px-0 max-w-4xl mb-10 mx-4 lg:mx-auto md:mx-5">
        <Info />
        <About />
        <MyStack />
        {/* <Education /> */}
        {/* <Skills /> */}
        <Projects Repos={repos} />
        {/* <Contact /> */}
      </div>
      <Showcase />
    </>
  );
}

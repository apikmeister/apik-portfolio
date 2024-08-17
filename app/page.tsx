import { About, Info, MyStack, Projects } from "@/components";
import Showcase from "@/components/Showcase";
import { getRepos } from "@/lib/repos";

export default async function Home() {
  const repos = await getRepos();
  return (
    <>
      <div className="">
        <Info />
        <About />
        <MyStack />
        {/* <Education /> */}
        <Projects Repos={repos} />
        {/* <Contact /> */}
      </div>
      <Showcase />
    </>
  );
}

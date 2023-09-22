import { allBlogs } from "contentlayer/generated";
import { PostCard } from "@/components";

export default function Home() {
  const posts = allBlogs.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">
        Coming really soon..
      </h1>
      {/* {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))} */}
    </div>
  );
}
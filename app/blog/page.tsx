import { allBlogs } from "contentlayer/generated";
import { PostCard } from "@/components";
import Link from "next/link";
import { Suspense } from "react";
import ViewCounter from './view-counter';
import { getViewsCount } from "lib/metrics";
import { getBlogPosts } from "lib/blog";

export default function BlogList() {
  let allBlogs = getBlogPosts();

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        read my blog
      </h1>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
              <Suspense fallback={<p className="h-6" />}>
                <Views slug={post.slug} />
              </Suspense>
            </div>
          </Link>
        ))}
    </section>
  );
}

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();

  return <ViewCounter allViews={views} slug={slug} />;
}

// export default function Home() {
//   const posts = allBlogs.sort(
//     (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
//   );

//   return (
//     <div className="mx-auto max-w-xl py-8">
//       <h1 className="mb-8 text-center text-2xl font-black">
//         My Blog Posts
//       </h1>
//       {posts.map((post, idx) => (
//         <PostCard key={idx} {...post} />
//       ))}
//     </div>
//   );
// }
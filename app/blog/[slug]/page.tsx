import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getBlogPosts } from "@/lib/blog";
import { Suspense, cache } from "react";
import { getViewsCount } from "@/lib/metrics";
import ViewCounter from "../view-counter";
import { MDXContent } from "@/components/mdx-content";
import { increment } from "@/lib/actions";
import { formatDate } from "@/lib/utils/dateFormat";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    excerpt: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? `https://apik.me${image}`
    : `https://apik.me/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://apik.me/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}



export default function PostLayout({ params }: any) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) notFound();

  return (
    <section className="mx-auto max-w-xl py-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://apik.me${post.metadata.image}`
              : `https://apik.me/og?title=${post.metadata.title}`,
            url: `https://apik.me/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Afiq",
            },
          }),
        }}
      />
      <div className="mb-8 text-center">
        <time
          dateTime={post.metadata.publishedAt}
          className="mb-1 text-xs text-gray-600"
        >
          {formatDate(post.metadata.publishedAt)}
        </time>
        <Suspense fallback={<p className="h-5" />}>
          <Views slug={post.slug} />
        </Suspense>
        <p>{post.metadata.readTime} min read</p>
        <h1 className="text-3xl font-bold">{post.metadata.title}</h1>
        <p>{post.metadata.excerpt}</p>
      </div>
      <article className="prose dark:prose-invert">
        <MDXContent source={post.content} />
      </article>
    </section>
  );
}

let incrementViews = cache(increment);

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();
  incrementViews(slug);

  return <ViewCounter allViews={views} slug={slug} />;
}

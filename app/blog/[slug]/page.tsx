import { notFound } from "next/navigation";
import type { MDXComponents } from "mdx/types";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { promises as fs } from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { type MDXRemoteSerializeResult } from "next-mdx-remote";
import { getBlogPosts } from "@/lib/blog";
import { Suspense, cache } from "react";
import { getViewsCount } from "@/lib/metrics";
import ViewCounter from "../view-counter";
import { MDXContent } from "@/components/mdx-content";
import { increment } from "@/lib/actions";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  // const post = allBlogs.find((post) => post._raw.flattenedPath === params.slug);
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    excerpt: description,
    image,
    // slug
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


function formatDate(date: string) {
  const currentDate = new Date();
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = '';

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = 'Today';
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return `${fullDate} (${formattedDate})`;
}

// const mdxComponents: MDXComponents = {
//   a: ({ href, children }) => <Link href={href as string} className="underline-offset-2">{children}</Link>,
//   Image: (props) => <Image className="rounded-lg mx-auto" {...props} />,
// };

export default function PostLayout({ params }: any) {
  // const post = allBlogs.find((post) => post._raw.flattenedPath === params.slug);
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) notFound();

  // const MDXContent = useMDXComponent(post.body.code);

  return (
    <section className="mx-auto max-w-xl py-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://apik.me${post.metadata.image}`
              : `https://apik.me/og?title=${post.metadata.title}`,
            url: `https://apik.me/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Afiq',
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
};

let incrementViews = cache(increment);

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();
  incrementViews(slug);

  return <ViewCounter allViews={views} slug={slug} />;
}


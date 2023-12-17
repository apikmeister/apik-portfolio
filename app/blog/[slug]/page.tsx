import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { useMDXComponent } from "next-contentlayer/hooks";
import type { MDXComponents } from "mdx/types";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const post = allBlogs.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    excerpt: description,
    image,
    slug
  } = post;
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
      url: `https://apik.me/blog/${slug}`,
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
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate} (${formattedDate})`;
}

const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string} className="underline-offset-2">{children}</Link>,
  Image: (props) => <Image className="rounded-lg" {...props} />,
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allBlogs.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <time
          dateTime={post.publishedAt}
          className="mb-1 text-xs text-gray-600"
        >
          {/* {new Intl.DateTimeFormat("en-US").format(new Date(post.publishedAt))} */}
          {formatDate(post.publishedAt)}
        </time>
        <p>{post.readTime} min read</p>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p>{post.excerpt}</p>
      </div>
      <article className="prose dark:prose-invert">
        <MDXContent components={mdxComponents} code={post.body.code} />
      </article>
    </div>
  );
};

export default PostLayout;

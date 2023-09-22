import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { useMDXComponent } from "next-contentlayer/hooks";
import type { MDXComponents } from "mdx/types";
import { Metadata } from "next";
import Link from "next/link";

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

const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allBlogs.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <time
          dateTime={post.publishedAt}
          className="mb-1 text-xs text-gray-600"
        >
          {new Intl.DateTimeFormat("en-US").format(new Date(post.publishedAt))}
        </time>
        <p>{post.readTime} min read</p>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p>{post.excerpt}</p>
      </div>
      <MDXContent components={mdxComponents} code={post.body.code} />
    </article>
  );
};

export default PostLayout;

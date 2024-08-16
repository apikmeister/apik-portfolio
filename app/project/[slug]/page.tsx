import ViewCounter from "@/app/blog/view-counter";
import { MDXContent } from "@/components/mdx-content";
import { increment } from "@/lib/actions";
import { getProjectPosts } from "@/lib/blog";
import { getViewsCount } from "@/lib/metrics";
import { formatDate } from "@/lib/utils/dateFormat";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { cache, Suspense } from "react";

interface ProjectPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  let project = getProjectPosts().find((project) => project.slug === params.slug);
  if (!project) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    excerpt: description,
    image,
  } = project.metadata;
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
      url: `https://apik.me/blog/${project.slug}`,
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

const ProjectLayout = ({ params }: ProjectPageProps) => {
  let project = getProjectPosts().find(
    (project) => project.slug === params.slug
  );
  if (!project) notFound();
  return (
    <section className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <time
          dateTime={project.metadata.publishedAt}
          className="mb-1 text-xs text-gray-600"
        >
          {formatDate(project.metadata.publishedAt)}
        </time>
        <Suspense fallback={<p className="h-5" />}>
          <Views slug={project.slug} />
        </Suspense>
        <p>{project.metadata.readTime} min read</p>
        <h1 className="text-3xl font-bold">{project.metadata.title}</h1>
        <p>{project.metadata.excerpt}</p>
      </div>
      <article className="prose dark:prose-invert">
        <MDXContent source={project.content} />
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

export default ProjectLayout;

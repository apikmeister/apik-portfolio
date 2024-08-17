import { Views } from '@/components/Views';
import { getProjectPosts } from '@/lib/blog';
import Link from 'next/link';
import React, { Suspense } from 'react'

const ProjectPage = () => {
    let allProject = getProjectPosts();
  return (
    <section className='h-screen'>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        read my blog
      </h1>
      {allProject
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((project) => (
          <Link
            key={project.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${project.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {project.metadata.title}
              </p>
              <Suspense fallback={<p className="h-6" />}>
                <Views slug={project.slug} />
              </Suspense>
            </div>
          </Link>
        ))}
    </section>
  )
}

export default ProjectPage

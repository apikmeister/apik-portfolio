import { Post } from "contentlayer/generated";
import Link from "next/link";

export default function PostCard(post: Post) {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link
          href={post.url}
          className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
        >
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
        {new Intl.DateTimeFormat("en-US").format(new Date(post.date))}
      </time>
    </div>
  );
}
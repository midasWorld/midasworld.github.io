import Link from "next/link";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { PostMeta } from "@/lib/types";

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="block group p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-red-400 dark:hover:border-red-500 hover:shadow-md transition-all bg-white dark:bg-gray-800"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
          {CATEGORY_LABELS[post.category] ?? post.category}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">{post.date}</span>
      </div>
      <h2 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors mb-1 line-clamp-2">
        {post.title}
      </h2>
      {post.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {post.description}
        </p>
      )}
    </Link>
  );
}

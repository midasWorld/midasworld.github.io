import Link from "next/link";
import { CATEGORY_LABELS, PARENT_CATEGORY_LABELS } from "@/lib/constants";
import type { PostMeta } from "@/lib/types";

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  const parentLabel = PARENT_CATEGORY_LABELS[post.parentCategory];
  const subLabel = CATEGORY_LABELS[post.category] ?? post.category;

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="block group p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-red-400 dark:hover:border-red-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-white dark:bg-gray-800"
    >
      <div className="flex items-center gap-1.5 mb-3 text-xs text-gray-400 dark:text-gray-500">
        {parentLabel && <span>{parentLabel}</span>}
        {parentLabel && <span>/</span>}
        <span className="font-medium px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
          {subLabel}
        </span>
        <span className="ml-auto">{post.date}</span>
      </div>
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors mb-1.5 line-clamp-2 leading-snug">
        {post.title}
      </h2>
      {post.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{post.description}</p>
      )}
    </Link>
  );
}

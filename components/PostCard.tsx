import Link from "next/link";
import { CATEGORY_LABELS, PARENT_CATEGORY_LABELS } from "@/lib/constants";
import type { PostMeta } from "@/lib/types";
import { humanizeDate } from "@/lib/utils";

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  const parentLabel = PARENT_CATEGORY_LABELS[post.parentCategory];
  const subLabel = CATEGORY_LABELS[post.category] ?? post.category;

  return (
    <Link
      href={post.parentCategory === "private" ? `/private/${post.slug}` : `/posts/${post.slug}`}
      className="block group p-5 border border-[var(--border-base)] hover:border-[var(--border-card-hover)] hover:-translate-y-0.5 transition-all duration-200 bg-[var(--bg-card)]"
      style={{ borderRadius: 'var(--card-radius)' }}
    >
      <div className="flex items-center gap-1.5 mb-3 text-xs text-[var(--text-muted)]">
        {parentLabel && <span>{parentLabel}</span>}
        {parentLabel && <span>/</span>}
        <span className="font-medium px-2 py-0.5 rounded-full bg-[var(--bg-badge)] text-[var(--text-badge)]">
          {subLabel}
        </span>
      </div>
      <h2 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--text-accent)] transition-colors mb-2 line-clamp-2 leading-snug">
        {post.title}
      </h2>
      {post.description && (
        <p className="text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed mb-4">
          {post.description}
        </p>
      )}
      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <span>{humanizeDate(post.date)}</span>
        <span>·</span>
        <span>{post.readingTime}분 읽기</span>
      </div>
    </Link>
  );
}

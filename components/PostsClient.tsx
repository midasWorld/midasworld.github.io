"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { PostMeta } from "@/lib/types";

interface PostsClientProps {
  posts: PostMeta[];
}

export function PostsClient({ posts }: PostsClientProps) {
  const searchParams = useSearchParams();
  const sub = searchParams.get("sub");

  const filtered = useMemo(
    () => posts.filter((p) => !sub || p.category === sub),
    [posts, sub]
  );

  const heading = sub ? (CATEGORY_LABELS[sub] ?? sub) : '포스트';

  return (
    <>
      <div className="flex items-end justify-between mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">{heading}</h1>
        <span className="text-sm text-[var(--text-muted)]">{filtered.length}개</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-[var(--text-muted)] py-20">포스트가 없습니다.</p>
      )}
    </>
  );
}

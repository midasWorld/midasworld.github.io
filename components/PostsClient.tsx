"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import type { PostMeta } from "@/lib/types";

interface PostsClientProps {
  posts: PostMeta[];
}

export function PostsClient({ posts }: PostsClientProps) {
  const searchParams = useSearchParams();
  const sub = searchParams.get("sub");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (sub && p.category !== sub) return false;
      return true;
    });
  }, [posts, sub]);

  return (
    <>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{filtered.length}개의 포스트</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-20">포스트가 없습니다.</p>
      )}
    </>
  );
}

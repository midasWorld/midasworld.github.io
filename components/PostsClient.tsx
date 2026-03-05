"use client";

import { useState, useMemo } from "react";
import { PostCard } from "@/components/PostCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import type { CategorySelection } from "@/components/CategoryFilter";
import type { PostMeta } from "@/lib/types";

interface PostsClientProps {
  posts: PostMeta[];
}

export function PostsClient({ posts }: PostsClientProps) {
  const [selected, setSelected] = useState<CategorySelection>({ parent: null, sub: null });

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (selected.parent && p.parentCategory !== selected.parent) return false;
      if (selected.sub && p.category !== selected.sub) return false;
      return true;
    });
  }, [posts, selected]);

  return (
    <>
      <CategoryFilter selected={selected} onChange={setSelected} />
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

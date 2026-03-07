import { Suspense } from "react";
import { getPublicPosts } from "@/lib/posts";
import { PostsClient } from "@/components/PostsClient";

export default function PostsPage() {
  const posts = getPublicPosts();
  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <Suspense fallback={<p className="text-sm text-[var(--text-muted)]">로딩 중...</p>}>
        <PostsClient posts={posts} />
      </Suspense>
    </div>
  );
}

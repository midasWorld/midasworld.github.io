import { Suspense } from "react";
import { getPublicPosts } from "@/lib/posts";
import { PostsClient } from "@/components/PostsClient";

export default function PostsPage() {
  const posts = getPublicPosts();
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">포스트</h1>
      <Suspense fallback={<p className="text-sm text-gray-400">로딩 중...</p>}>
        <PostsClient posts={posts} />
      </Suspense>
    </div>
  );
}

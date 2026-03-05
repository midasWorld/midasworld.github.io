import { getPrivatePosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { PrivateGate } from "@/components/PrivateGate";

export default function PrivatePage() {
  const posts = getPrivatePosts();

  return (
    <PrivateGate>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-8">Private Notes</h1>
        {posts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 dark:text-gray-500">비공개 포스트가 없습니다.</p>
        )}
      </div>
    </PrivateGate>
  );
}

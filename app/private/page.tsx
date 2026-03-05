import { getPrivatePosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export default function PrivatePage() {
  const posts = getPrivatePosts();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Private Notes</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          이 페이지는 비밀번호로 보호됩니다.
        </p>
      </div>
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
  );
}

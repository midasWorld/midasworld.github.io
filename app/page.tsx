import Link from "next/link";
import { getPublicPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export default function Home() {
  const recentPosts = getPublicPosts().slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">최근 포스트</h2>
          <Link href="/posts" className="text-sm text-red-600 dark:text-red-400 hover:underline">
            전체 보기 →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

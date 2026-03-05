import Link from "next/link";
import { getPublicPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export default function Home() {
  const recentPosts = getPublicPosts().slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* About section */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white text-2xl font-bold">
            M
          </div>
          <div>
            <h1 className="text-2xl font-bold">midasworld</h1>
            <p className="text-gray-500 dark:text-gray-400">Backend Developer</p>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
          서버 개발 관련 학습 내용을 정리하는 기술 블로그입니다.
          Database, Node.js, Spring, Docker 등 백엔드 개발 전반을 다룹니다.
        </p>
      </section>

      {/* Recent posts */}
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

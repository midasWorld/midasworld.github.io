import { notFound } from "next/navigation";
import { getPrivatePostBySlug, getPrivatePosts } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamicParams = false;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getPrivatePosts();
  if (posts.length === 0) return [{ slug: "__empty__" }];
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "__empty__") return {};
  const post = getPrivatePostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | midasworld (Private)`,
  };
}

export default async function PrivatePostPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "__empty__") notFound();

  const post = getPrivatePostBySlug(slug);
  if (!post) notFound();

  const htmlContent = await markdownToHtml(post.content);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/private"
        className="text-sm text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors mb-8 inline-block"
      >
        ← Private 목록으로
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            {post.category}
          </span>
          <span className="text-xs text-gray-400">{post.date}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {post.title}
        </h1>
      </header>

      <article
        className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-red-600 dark:prose-a:text-red-400 prose-img:rounded-lg prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}

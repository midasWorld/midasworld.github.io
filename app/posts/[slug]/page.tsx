import { notFound } from "next/navigation";
import { getPostBySlug, getAllPublicSlugs } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";
import { CATEGORY_LABELS, PARENT_CATEGORY_LABELS } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPublicSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | midasworld`,
    description: post.description,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const htmlContent = await markdownToHtml(post.content);
  const parentLabel = PARENT_CATEGORY_LABELS[post.parentCategory];
  const subLabel = CATEGORY_LABELS[post.category] ?? post.category;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/posts" className="text-sm text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors mb-8 inline-block">
        ← 목록으로
      </Link>

      <header className="mb-8">
        {/* 브레드크럼: 개발 / Database */}
        <div className="flex items-center gap-1.5 mb-3 text-xs text-gray-400 dark:text-gray-500">
          {parentLabel && <span>{parentLabel}</span>}
          {parentLabel && <span>/</span>}
          <span className="font-medium px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
            {subLabel}
          </span>
          <span className="ml-2">{post.date}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">{post.title}</h1>
        {post.description && (
          <p className="text-gray-500 dark:text-gray-400">{post.description}</p>
        )}
      </header>

      <article
        className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-red-600 dark:prose-a:text-red-400 prose-img:rounded-lg prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}

import { notFound } from "next/navigation";
import { getPostBySlug, getAllPublicSlugs, getAdjacentPosts } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";
import { CATEGORY_LABELS, PARENT_CATEGORY_LABELS } from "@/lib/constants";
import { humanizeDate } from "@/lib/utils";
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
  const { prev, next } = getAdjacentPosts(slug);

  return (
    <div className="max-w-3xl mx-auto px-6 py-14">
      <Link
        href="/posts"
        className="text-sm text-[var(--text-muted)] hover:text-[var(--text-accent)] transition-colors mb-10 inline-block"
      >
        ← 목록으로
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-1.5 mb-4 text-xs text-[var(--text-muted)]">
          {parentLabel && <span>{parentLabel}</span>}
          {parentLabel && <span>/</span>}
          <span className="font-medium px-2 py-0.5 rounded-full bg-[var(--bg-badge)] text-[var(--text-badge)]">
            {subLabel}
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-[var(--text-muted)] mb-4 leading-relaxed">{post.description}</p>
        )}
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <time>{humanizeDate(post.date)}</time>
          <span>·</span>
          <span>{post.readingTime}분 읽기</span>
        </div>
      </header>

      <article
        className="font-display prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-[var(--text-accent)] prose-img:rounded-lg prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Prev / Next */}
      <nav className="flex justify-between mt-16 pt-8 border-t border-[var(--border-base)] gap-8">
        {prev ? (
          <Link href={`/posts/${prev.slug}`} className="group max-w-[48%]">
            <span className="text-xs text-[var(--text-muted)] mb-1 block">← 이전 글</span>
            <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-accent)] transition-colors line-clamp-2">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link href={`/posts/${next.slug}`} className="group max-w-[48%] text-right ml-auto">
            <span className="text-xs text-[var(--text-muted)] mb-1 block">다음 글 →</span>
            <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-accent)] transition-colors line-clamp-2">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}

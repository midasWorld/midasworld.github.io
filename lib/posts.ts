import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CATEGORIES } from "@/lib/constants";
import type { PostMeta, Post } from "@/lib/types";

export type { PostMeta, Post } from "@/lib/types";
export { CATEGORIES } from "@/lib/constants";
export type { Category } from "@/lib/constants";

const CONTENT_DIR = path.join(process.cwd(), "content");

function getPostFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

export function getPublicPosts(category?: string): PostMeta[] {
  const cats = category ? [category] : CATEGORIES;
  const posts: PostMeta[] = [];

  for (const cat of cats) {
    const catDir = path.join(CONTENT_DIR, "public", cat);
    const files = getPostFiles(catDir);

    for (const file of files) {
      const filePath = path.join(catDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      const slug = file.replace(/\.md$/, "");

      posts.push({
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        category: data.category ?? cat,
      });
    }
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  for (const cat of CATEGORIES) {
    const filePath = path.join(CONTENT_DIR, "public", cat, `${slug}.md`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        category: data.category ?? cat,
        content,
      };
    }
  }
  return null;
}

export function getAllPublicSlugs(): string[] {
  return getPublicPosts().map((p) => p.slug);
}

export function getPrivatePosts(): PostMeta[] {
  const privateDirs = ["stock", "exam"];
  const posts: PostMeta[] = [];

  for (const dir of privateDirs) {
    const dirPath = path.join(CONTENT_DIR, "private", dir);
    const files = getPostFiles(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      const slug = file.replace(/\.md$/, "");

      posts.push({
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        category: dir,
      });
    }
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPrivatePostBySlug(slug: string): Post | null {
  const privateDirs = ["stock", "exam"];

  for (const dir of privateDirs) {
    const filePath = path.join(CONTENT_DIR, "private", dir, `${slug}.md`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        category: dir,
        content,
      };
    }
  }
  return null;
}

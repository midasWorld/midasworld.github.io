import fs from "fs";
import path from "path";
import crypto from "crypto";
import matter from "gray-matter";
import { PARENT_CATEGORIES, SUB_CATEGORIES } from "@/lib/constants";
import type { PostMeta, Post } from "@/lib/types";

function deriveKey(password: string): Buffer {
  return crypto.scryptSync(password, "midasworld-salt-v1", 32);
}

function decryptEnc(filePath: string): string {
  const password = process.env.STATICRYPT_PASSWORD;
  if (!password) return "";
  const data = fs.readFileSync(filePath);
  const iv = data.subarray(0, 16);
  const authTag = data.subarray(16, 32);
  const ciphertext = data.subarray(32);
  const key = deriveKey(password);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf-8");
}

export type { PostMeta, Post } from "@/lib/types";
export { PARENT_CATEGORIES, SUB_CATEGORIES, CATEGORIES, CATEGORY_LABELS } from "@/lib/constants";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readPost(filePath: string, slug: string, parentCat: string, subCat: string): PostMeta {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const wordCount = content.trim().split(/\s+/).length;
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    parentCategory: data.parentCategory ?? parentCat,
    category: data.category ?? subCat,
    readingTime: Math.max(1, Math.ceil(wordCount / 200)),
  };
}

/** 공개 포스트 목록. parentCategory/category로 필터링 가능 */
export function getPublicPosts(opts?: { parent?: string; category?: string }): PostMeta[] {
  const parents = opts?.parent ? [opts.parent] : PARENT_CATEGORIES;
  const posts: PostMeta[] = [];

  for (const parent of parents) {
    const subs = opts?.category ? [opts.category] : (SUB_CATEGORIES[parent] ?? []);

    for (const sub of subs) {
      const dir = path.join(CONTENT_DIR, "public", parent, sub);
      if (!fs.existsSync(dir)) continue;

      for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
        const slug = file.replace(/\.md$/, "");
        posts.push(readPost(path.join(dir, file), slug, parent, sub));
      }
    }
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  for (const parent of PARENT_CATEGORIES) {
    for (const sub of SUB_CATEGORIES[parent] ?? []) {
      const filePath = path.join(CONTENT_DIR, "public", parent, sub, `${slug}.md`);
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(raw);
        return {
          slug,
          title: data.title ?? slug,
          description: data.description ?? "",
          date: data.date ?? "",
          parentCategory: data.parentCategory ?? parent,
          category: data.category ?? sub,
          readingTime: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)),
          content,
        };
      }
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
    if (!fs.existsSync(dirPath)) continue;

    for (const file of fs.readdirSync(dirPath).filter((f) => f.endsWith(".md.enc"))) {
      const filePath = path.join(dirPath, file);
      const raw = decryptEnc(filePath);
      if (!raw) continue;
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md\.enc$/, "");
      const wordCount = content.trim().split(/\s+/).length;
      posts.push({
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        parentCategory: "private",
        category: dir,
        readingTime: Math.max(1, Math.ceil(wordCount / 200)),
      });
    }
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAdjacentPosts(slug: string): { prev: PostMeta | null; next: PostMeta | null } {
  const posts = getPublicPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  // posts is sorted newest-first; prev = older (idx+1), next = newer (idx-1)
  return {
    prev: idx + 1 < posts.length ? posts[idx + 1] : null,
    next: idx - 1 >= 0 ? posts[idx - 1] : null,
  };
}

export function getPostCountByCategory(): Record<string, number> {
  const posts = getPublicPosts();
  const counts: Record<string, number> = {};
  for (const post of posts) {
    counts[post.category] = (counts[post.category] ?? 0) + 1;
  }
  return counts;
}

export function getPrivatePostBySlug(slug: string): Post | null {
  for (const dir of ["stock", "exam"]) {
    const filePath = path.join(CONTENT_DIR, "private", dir, `${slug}.md.enc`);
    if (fs.existsSync(filePath)) {
      const raw = decryptEnc(filePath);
      if (!raw) return null;
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        parentCategory: "private",
        category: dir,
        readingTime: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)),
        content,
      };
    }
  }
  return null;
}

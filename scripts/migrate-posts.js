#!/usr/bin/env node
/**
 * Migrates Jekyll posts → content/public/<category>/<slug>.md
 * Converts Jekyll front matter to Next.js compatible format.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const CATEGORIES = [
  "database", "java", "spring", "node", "docker",
  "server", "network", "git", "algorithm", "nest",
  "javascript", "etc",
];

let migrated = 0;

for (const category of CATEGORIES) {
  const postsDir = path.join(ROOT, category, "_posts");
  if (!fs.existsSync(postsDir)) continue;

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const srcPath = path.join(postsDir, file);
    const content = fs.readFileSync(srcPath, "utf-8");

    // Extract date from filename: YYYY-MM-DD-slug.md
    const match = file.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
    if (!match) continue;

    const [, date, slug] = match;

    // Parse Jekyll front matter
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!fmMatch) continue;

    const rawFm = fmMatch[1];
    const body = fmMatch[2];

    // Extract title
    const titleMatch = rawFm.match(/^title:\s*(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : slug;

    // Extract description (multi-line or single-line)
    const descMatch = rawFm.match(/^description:\s*>\n([\s\S]*?)(?=\n\w|\n---)/m) ||
      rawFm.match(/^description:\s*(.+)$/m);
    let description = "";
    if (descMatch) {
      description = descMatch[1].replace(/\n\s*/g, " ").trim();
    }

    // Build new front matter
    const newFm = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
date: "${date}"
category: "${category}"
---
`;

    const dest = path.join(ROOT, "content", "public", category, `${date}-${slug}.md`);
    fs.writeFileSync(dest, newFm + body);
    migrated++;
    console.log(`✓ ${category}/${date}-${slug}.md`);
  }
}

console.log(`\nMigrated ${migrated} posts.`);

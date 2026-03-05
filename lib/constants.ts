/** 1차 카테고리 */
export const PARENT_CATEGORIES = ["dev"] as const;
export type ParentCategory = (typeof PARENT_CATEGORIES)[number];

export const PARENT_CATEGORY_LABELS: Record<string, string> = {
  dev: "개발",
};

/** 1차 → 2차 카테고리 매핑 */
export const SUB_CATEGORIES: Record<string, readonly string[]> = {
  dev: [
    "database", "java", "spring", "node", "docker",
    "server", "network", "git", "algorithm", "nest",
    "javascript", "etc",
  ],
};

/** 2차 카테고리 레이블 */
export const CATEGORY_LABELS: Record<string, string> = {
  database: "Database",
  java: "Java",
  spring: "Spring",
  node: "Node.js",
  docker: "Docker",
  server: "Server",
  network: "Network",
  git: "Git",
  algorithm: "Algorithm",
  nest: "NestJS",
  javascript: "JavaScript",
  etc: "Etc",
};

/** 전체 2차 카테고리 목록 (기존 호환) */
export const CATEGORIES = Object.values(SUB_CATEGORIES).flat() as string[];

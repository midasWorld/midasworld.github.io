export const CATEGORIES = [
  "database", "java", "spring", "node", "docker",
  "server", "network", "git", "algorithm", "nest",
  "javascript", "etc",
] as const;

export type Category = (typeof CATEGORIES)[number];

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

"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  PARENT_CATEGORIES,
  PARENT_CATEGORY_LABELS,
  SUB_CATEGORIES,
  CATEGORY_LABELS,
} from "@/lib/constants";

interface SidebarProps {
  counts: Record<string, number>;
}

export function Sidebar({ counts }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentSub = searchParams.get("sub");

  function handleCategoryClick(sub: string) {
    if (pathname !== "/posts") {
      router.push(`/posts?sub=${sub}`);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      if (currentSub === sub) {
        params.delete("sub");
      } else {
        params.set("sub", sub);
      }
      router.push(`/posts?${params.toString()}`);
    }
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 min-h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 h-screen overflow-y-auto">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-100 dark:border-gray-800">
        <Link
          href="/"
          className="block font-bold text-xl text-red-600 dark:text-red-400 hover:opacity-80 transition-opacity"
        >
          midasworld
        </Link>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Backend Developer</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 space-y-6">
        <div>
          <Link
            href="/posts"
            className={`block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${
              pathname === "/posts" && !currentSub
                ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30"
                : "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            }`}
          >
            Posts
          </Link>
        </div>

        {PARENT_CATEGORIES.map((parent) => (
          <div key={parent}>
            <p className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {PARENT_CATEGORY_LABELS[parent] ?? parent}
            </p>
            <ul className="space-y-0.5">
              {(SUB_CATEGORIES[parent] ?? []).map((sub) => {
                const isActive = currentSub === sub && pathname === "/posts";
                const count = counts[sub] ?? 0;
                return (
                  <li key={sub}>
                    <button
                      onClick={() => handleCategoryClick(sub)}
                      className={`w-full text-left flex items-center justify-between rounded-md text-sm transition-colors ${
                        isActive
                          ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border-l-2 border-red-600 dark:border-red-400 pl-1.5 pr-2 py-1.5"
                          : "px-2 py-1.5 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }`}
                    >
                      <span>{CATEGORY_LABELS[sub] ?? sub}</span>
                      {count > 0 && (
                        <span className="text-xs text-gray-400 dark:text-gray-500">{count}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        )}
      </div>
    </aside>
  );
}

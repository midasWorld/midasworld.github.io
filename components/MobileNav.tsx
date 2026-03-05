"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  PARENT_CATEGORIES,
  PARENT_CATEGORY_LABELS,
  SUB_CATEGORIES,
  CATEGORY_LABELS,
} from "@/lib/constants";

interface MobileNavProps {
  counts: Record<string, number>;
}

export function MobileNav({ counts }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  const currentSub = searchParams.get("sub");

  function handleCategoryClick(sub: string) {
    setIsOpen(false);
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
    <>
      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4">
        <Link href="/" className="font-bold text-lg text-red-600 dark:text-red-400">
          midasworld
        </Link>
        <div className="flex items-center gap-1">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          )}
          <button
            onClick={() => setIsOpen(true)}
            className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="font-bold text-xl text-red-600 dark:text-red-400"
          >
            midasworld
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          <div>
            <Link
              href="/posts"
              onClick={() => setIsOpen(false)}
              className="block px-2 py-1.5 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
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
      </div>
    </>
  );
}

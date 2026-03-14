"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  PARENT_CATEGORIES,
  PARENT_CATEGORY_LABELS,
  SUB_CATEGORIES,
  CATEGORY_LABELS,
} from "@/lib/constants";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";

interface SidebarProps {
  counts: Record<string, number>;
}

export function Sidebar({ counts }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

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
    <aside className="hidden lg:flex flex-col w-64 shrink-0 min-h-screen border-r border-[var(--border-base)] bg-[var(--bg-sidebar)] sticky top-0 h-screen overflow-y-auto">
      {/* Header */}
      <div className="px-6 py-6 border-b border-[var(--border-base)]">
        <Link
          href="/"
          className="block font-bold text-xl font-display text-[var(--text-accent)] hover:opacity-80 transition-opacity"
        >
          midasworld
        </Link>
        <p className="text-xs text-[var(--text-muted)] mt-1">Backend Developer</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 space-y-6">
        <div>
          <Link
            href="/posts"
            className={`block px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${
              pathname === "/posts" && !currentSub
                ? "text-[var(--text-accent)] bg-[var(--bg-active)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-accent)] hover:bg-[var(--bg-hover)]"
            }`}
          >
            Posts
          </Link>
        </div>

        {PARENT_CATEGORIES.map((parent) => (
          <div key={parent}>
            <p className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
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
                          ? "text-[var(--text-accent)] bg-[var(--bg-active)] border-l-2 border-[var(--border-accent)] pl-1.5 pr-2 py-1.5"
                          : "px-2 py-1.5 text-[var(--text-muted)] hover:text-[var(--text-accent)] hover:bg-[var(--bg-hover)]"
                      }`}
                    >
                      <span>{CATEGORY_LABELS[sub] ?? sub}</span>
                      {count > 0 && (
                        <span className="text-xs text-[var(--text-muted)]">{count}</span>
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
      <div className="px-6 py-4 border-t border-[var(--border-base)] space-y-3">
        <a
          href="https://github.com/midasworld"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-accent)] transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GitHub
        </a>
        <div className="flex items-center gap-1">
          <ThemeToggleButton className="text-[var(--text-muted)]" />
          <Link
            href="/private"
            className="p-1.5 rounded-md hover:bg-[var(--bg-hover)] transition-colors text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            aria-label="Private notes"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </Link>
        </div>
        <p className="text-xs text-[var(--text-muted)]">© {new Date().getFullYear()} midasworld</p>
      </div>
    </aside>
  );
}

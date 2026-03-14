"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  PARENT_CATEGORIES,
  PARENT_CATEGORY_LABELS,
  SUB_CATEGORIES,
  CATEGORY_LABELS,
} from "@/lib/constants";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";

interface MobileNavProps {
  counts: Record<string, number>;
}

export function MobileNav({ counts }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

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
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[var(--bg-sidebar)] backdrop-blur border-b border-[var(--border-base)] flex items-center justify-between px-4">
        <Link href="/" className="font-bold text-lg font-display text-[var(--text-accent)]">
          midasworld
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggleButton />
          <button
            onClick={() => setIsOpen(true)}
            className="p-1.5 rounded-md hover:bg-[var(--bg-hover)] transition-colors text-[var(--text-secondary)]"
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
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-64 bg-[var(--bg-sidebar)] shadow-xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-4 border-b border-[var(--border-base)] flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="font-bold text-xl font-display text-[var(--text-accent)]"
          >
            midasworld
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-md hover:bg-[var(--bg-hover)] text-[var(--text-muted)]"
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
              href="/private"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Private
            </Link>
          </div>
          <div>
            <Link
              href="/posts"
              onClick={() => setIsOpen(false)}
              className="block px-2 py-1.5 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-accent)] hover:bg-[var(--bg-hover)] transition-colors"
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
      </div>
    </>
  );
}

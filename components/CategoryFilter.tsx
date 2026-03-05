"use client";

import { PARENT_CATEGORIES, PARENT_CATEGORY_LABELS, SUB_CATEGORIES, CATEGORY_LABELS } from "@/lib/constants";

export interface CategorySelection {
  parent: string | null;
  sub: string | null;
}

interface CategoryFilterProps {
  selected: CategorySelection;
  onChange: (sel: CategorySelection) => void;
}

const btn = (active: boolean) =>
  `px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
    active
      ? "bg-red-600 text-white"
      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400"
  }`;

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const subs = selected.parent ? SUB_CATEGORIES[selected.parent] ?? [] : [];

  function selectParent(parent: string | null) {
    onChange({ parent, sub: null });
  }

  function selectSub(sub: string | null) {
    onChange({ ...selected, sub });
  }

  return (
    <div className="space-y-3 mb-6">
      {/* 1차 카테고리 */}
      <div className="flex flex-wrap gap-2">
        <button className={btn(selected.parent === null)} onClick={() => selectParent(null)}>
          전체
        </button>
        {PARENT_CATEGORIES.map((p) => (
          <button key={p} className={btn(selected.parent === p)} onClick={() => selectParent(p)}>
            {PARENT_CATEGORY_LABELS[p] ?? p}
          </button>
        ))}
      </div>

      {/* 2차 카테고리 (1차 선택 시) */}
      {selected.parent && subs.length > 0 && (
        <div className="flex flex-wrap gap-2 pl-2 border-l-2 border-red-200 dark:border-red-800">
          <button className={btn(selected.sub === null)} onClick={() => selectSub(null)}>
            전체
          </button>
          {subs.map((s) => (
            <button key={s} className={btn(selected.sub === s)} onClick={() => selectSub(s)}>
              {CATEGORY_LABELS[s] ?? s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

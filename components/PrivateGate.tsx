"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "private_auth";

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function PrivateGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    setAuthed(stored === "true");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const hash = await hashPassword(password);
      const expected = process.env.NEXT_PUBLIC_PRIVATE_HASH;
      if (expected && hash === expected) {
        sessionStorage.setItem(STORAGE_KEY, "true");
        setAuthed(true);
      } else {
        setError("비밀번호가 올바르지 않습니다.");
      }
    } finally {
      setLoading(false);
    }
  }

  // Checking sessionStorage
  if (authed === null) {
    return null;
  }

  if (!authed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-4 p-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <h2 className="text-lg font-bold text-center text-gray-900 dark:text-gray-100">
            Private Notes
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            비밀번호를 입력하세요
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:border-red-400 dark:focus:border-red-500 transition-colors"
            autoFocus
          />
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors font-medium"
          >
            {loading ? "확인 중..." : "입력"}
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}

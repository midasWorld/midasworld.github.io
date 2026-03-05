import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { getPostCountByCategory } from "@/lib/posts";

const notoSans = Noto_Sans_KR({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "midasworld",
  description: "서버 개발 학습 블로그",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const counts = getPostCountByCategory();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${notoSans.variable} font-sans antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider>
          <div className="flex min-h-screen">
            <Suspense fallback={<div className="hidden lg:block w-64 shrink-0" />}>
              <Sidebar counts={counts} />
            </Suspense>
            <Suspense fallback={null}>
              <MobileNav counts={counts} />
            </Suspense>
            <main className="flex-1 min-w-0 pt-14 lg:pt-0">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

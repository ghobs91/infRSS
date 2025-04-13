"use client";
import Link from "next/link";
import { useState } from "react";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className={`border-r border-[var(--card-border)] w-64 p-4 space-y-4 hidden md:block shadow-sm bg-[var(--card-bg)]`}>
            <h1 className="text-2xl font-semibold mb-6 text-[var(--primary)]">📡 FeedReader</h1>
            <nav className="space-y-2">
              <Link
                href="/"
                className="block py-2 px-3 rounded hover:bg-[var(--accent)] text-[var(--primary)] font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/manage"
                className="block py-2 px-3 rounded hover:bg-[var(--accent)] text-[var(--primary)] font-medium transition-colors"
              >
                Manage Subscriptions
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {/* Mobile header */}
            <div className="md:hidden p-4 border-b border-[var(--card-border)] flex items-center justify-between bg-[var(--card-bg)]">
              <h1 className="text-xl font-semibold text-[var(--primary)]">FeedReader</h1>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-[var(--text-primary)] text-xl focus:outline-none"
              >
                ☰
              </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
              <div className="md:hidden border-b border-[var(--card-border)] px-4 pb-4 bg-[var(--card-bg)]">
                <Link href="/" className="block py-2 text-[var(--primary)] hover:underline">
                  Home
                </Link>
                <Link href="/manage" className="block py-2 text-[var(--primary)] hover:underline">
                  Manage Subscriptions
                </Link>
              </div>
            )}

            <div className="p-6 max-w-4xl mx-auto">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}

"use client";
import "./globals.css";
import "../styles/scroll-fix.css";
import { Navigation } from "@/components/Navigation";
import { UnreadProvider } from "@/lib/unreadContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        <div className="min-h-screen">
          <UnreadProvider>
            <Navigation />
            <div className="pt-16">
              {children}
            </div>
          </UnreadProvider>
        </div>
      </body>
    </html>
  );
}

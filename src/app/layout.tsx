"use client";
import "./globals.css";
import "../styles/scroll-fix.css";
import { UnreadProvider } from "@/lib/unreadContext";
import { ViewProvider } from "@/lib/viewContext";
import { Navigation } from "@/components/Navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>InfRSS - RSS Reader</title>
        <meta name="description" content="An intelligent, offline-friendly RSS reader" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#ff6b35" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="icon" href="/icons/favicon.ico" />
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        <UnreadProvider>
          <ViewProvider>
            <Navigation />
            {children}
          </ViewProvider>
        </UnreadProvider>
      </body>
    </html>
  );
}

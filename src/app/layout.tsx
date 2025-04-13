"use client";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

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
          <Navigation />
          <div className="pt-16">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

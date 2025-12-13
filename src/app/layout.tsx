"use client";
import "./globals.css";
import "../styles/scroll-fix.css";
import { UnreadProvider } from "@/lib/unreadContext";
import { ViewProvider } from "@/lib/viewContext";
import { FeedProvider } from "@/lib/feedContext";
import { Navigation } from "@/components/Navigation";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useState, createContext, useContext } from "react";

// Context for drawer state
const DrawerContext = createContext<{
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}>({
  isDrawerOpen: false,
  setIsDrawerOpen: () => {},
});

export const useDrawer = () => useContext(DrawerContext);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>InfRSS - RSS Reader</title>
        <meta name="description" content="An intelligent, offline-friendly RSS reader" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#ff6b35" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="icon" href="/icons/favicon.ico" />
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)]" suppressHydrationWarning>
        <ErrorBoundary>
          <UnreadProvider>
            <FeedProvider>
              <ViewProvider>
                <DrawerContext.Provider value={{ isDrawerOpen, setIsDrawerOpen }}>
                  <Navigation onDrawerStateChange={setIsDrawerOpen} />
                  {children}
                </DrawerContext.Provider>
              </ViewProvider>
            </FeedProvider>
          </UnreadProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

// app/layout.tsx
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "FeedReader",
  description: "Offline-first RSS reader with intelligent feed detection",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="hidden md:block w-64 bg-gray-100 p-4 border-r">
            <h1 className="text-2xl font-bold mb-6">📡 FeedReader</h1>
            <nav className="space-y-2">
              <Link
                href="/"
                className="block px-3 py-2 rounded-lg hover:bg-gray-200 text-gray-800"
              >
                Home
              </Link>
              <Link
                href="/manage"
                className="block px-3 py-2 rounded-lg hover:bg-gray-200 text-gray-800"
              >
                Manage Subscriptions
              </Link>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {/* Mobile hamburger nav */}
            <div className="md:hidden p-4 border-b flex items-center justify-between">
              <h1 className="text-xl font-semibold">FeedReader</h1>
              <MobileNav />
            </div>
            <div className="p-4">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}

function MobileNav() {
  return (
    <nav className="space-x-4">
      <Link href="/" className="text-blue-600 hover:underline">
        Home
      </Link>
      <Link href="/manage" className="text-blue-600 hover:underline">
        Manage
      </Link>
    </nav>
  );
}

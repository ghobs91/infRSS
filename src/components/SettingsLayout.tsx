"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RssIcon, ActivityIcon, SearchIcon } from '@/components/ui/icons';

interface SettingsLayoutProps {
  children: ReactNode;
}

interface NavItem {
  href: string;
  icon: ReactNode;
  label: string;
  description: string;
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      href: '/manage',
      icon: <RssIcon />,
      label: 'Feeds',
      description: 'Manage your subscriptions'
    },
    {
      href: '/discover',
      icon: <SearchIcon />,
      label: 'Discover',
      description: 'Find new feeds'
    },
    {
      href: '/health',
      icon: <ActivityIcon />,
      label: 'Health',
      description: 'Monitor feed status'
    }
  ];

  return (
    <div className="settings-layout">
      <div className="flex min-h-screen">
        {/* Sidebar Navigation - Desktop Only */}
        <aside className="hidden md:flex md:w-64 lg:w-72 xl:w-80 border-r border-[var(--border)] bg-[var(--sidebar-bg)] flex-col fixed left-0 top-16 bottom-0 overflow-y-auto">
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Settings</h2>
              <p className="text-sm text-[var(--text-secondary)]">Manage your RSS feeds and preferences</p>
            </div>
            
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-[var(--accent)] text-[var(--primary)]'
                        : 'text-[var(--text-primary)] hover:bg-[var(--accent)]'
                    }`}
                  >
                    <div className={`mt-0.5 ${isActive ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'}`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold ${isActive ? 'text-[var(--primary)]' : 'text-[var(--text-primary)]'}`}>
                        {item.label}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 lg:ml-72 xl:ml-80 bg-[var(--background)]">
          <div className="mx-auto max-w-5xl px-4 md:px-8 py-6 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

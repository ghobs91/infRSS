"use client";

import { ReactNode } from 'react';
import { useDrawer } from '@/app/layout';
import { SettingsDrawer } from '@/components/SettingsDrawer';

interface SettingsLayoutProps {
  children: ReactNode;
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  const { isDrawerOpen, setIsDrawerOpen } = useDrawer();

  return (
    <div className="settings-layout">
      <div className="flex min-h-screen">
        {/* Sidebar - shown when drawer is open */}
        {isDrawerOpen && (
          <div className="hidden md:block w-[300px] flex-shrink-0">
            <SettingsDrawer onClose={() => setIsDrawerOpen(false)} />
          </div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 bg-[var(--background)]">
          <div className="mx-auto max-w-5xl px-4 md:px-8 py-6 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

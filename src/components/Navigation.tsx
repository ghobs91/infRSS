import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LiquidGlass } from '@/components/ui/liquid-glass';
import { Drawer } from '@/components/ui/drawer';
import { IconButton } from '@/components/ui/icon-button';
import { CloseIcon, HomeIcon, PlusIcon, RssIcon, SearchIcon, SettingsIcon } from '@/components/ui/icons';

export const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Detect if we're on a mobile device based on screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical tablet breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Navigation Drawer - Desktop only */}
      {!isMobile && (
        <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">Menu</h2>
              <IconButton
                icon={<CloseIcon />}
                label="Close"
                variant="ghost"
                onClick={closeDrawer}
              />
            </div>

            <nav className="flex-1">
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/" 
                    className={`flex items-center gap-4 p-4 rounded-3xl transition-all duration-400 font-medium ${
                      pathname === '/' 
                        ? 'glass-card text-[var(--primary)] scale-105 shadow-lg' 
                        : 'text-[var(--text-primary)] hover:glass-button'
                    }`}
                    onClick={closeDrawer}
                  >
                    <HomeIcon />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/manage" 
                    className={`flex items-center gap-4 p-4 rounded-3xl transition-all duration-400 font-medium ${
                      pathname === '/manage' 
                        ? 'glass-card text-[var(--primary)] scale-105 shadow-lg' 
                        : 'text-[var(--text-primary)] hover:glass-button'
                    }`}
                    onClick={closeDrawer}
                  >
                    <PlusIcon />
                    <span>Manage Feeds</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/health" 
                    className={`flex items-center gap-4 p-4 rounded-3xl transition-all duration-400 font-medium ${
                      pathname === '/health' 
                        ? 'glass-card text-[var(--primary)] scale-105 shadow-lg' 
                        : 'text-[var(--text-primary)] hover:glass-button'
                    }`}
                    onClick={closeDrawer}
                  >
                    <RssIcon />
                    <span>Feed Health</span>
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-auto pt-4 border-t border-[var(--border)]">
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <RssIcon />
                <span className="text-sm">Infrss Reader</span>
              </div>
            </div>
          </div>
        </Drawer>
      )}

      {/* Bottom Tab Bar - Mobile only */}
      {isMobile && (
        <nav className="fixed bottom-6 left-6 right-6 z-50">
          <LiquidGlass className="rounded-[32px] flex items-center justify-between px-2 py-2 shadow-2xl border border-white/10 bg-[#1C1C1E]/75">
            <Link 
              href="/" 
              className={`flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-[24px] transition-all duration-300 min-w-[70px] ${
                pathname === '/' 
                  ? 'bg-[#FF6B35] text-white shadow-lg translate-y-[-2px]' 
                  : 'text-[#8E8E93] hover:text-white'
              }`}
            >
              <HomeIcon />
              <span className="text-[10px] font-medium">Home</span>
            </Link>
            
            <Link 
              href="/manage" 
              className={`flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-[24px] transition-all duration-300 min-w-[70px] ${
                pathname === '/manage' 
                  ? 'bg-[#FF6B35] text-white shadow-lg translate-y-[-2px]' 
                  : 'text-[#8E8E93] hover:text-white'
              }`}
            >
              <RssIcon />
              <span className="text-[10px] font-medium">Subscriptions</span>
            </Link>
            
            <Link 
              href="/discover" 
              className={`flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-[24px] transition-all duration-300 min-w-[70px] ${
                pathname === '/discover' 
                  ? 'bg-[#FF6B35] text-white shadow-lg translate-y-[-2px]' 
                  : 'text-[#8E8E93] hover:text-white'
              }`}
            >
              <SearchIcon />
              <span className="text-[10px] font-medium">Discover</span>
            </Link>
            
            <Link 
              href="/health" 
              className={`flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-[24px] transition-all duration-300 min-w-[70px] ${
                pathname === '/health' 
                  ? 'bg-[#FF6B35] text-white shadow-lg translate-y-[-2px]' 
                  : 'text-[#8E8E93] hover:text-white'
              }`}
            >
              <SettingsIcon />
              <span className="text-[10px] font-medium">Settings</span>
            </Link>
          </LiquidGlass>
        </nav>
      )}
    </>
  );
};
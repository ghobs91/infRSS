import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Drawer } from '@/components/ui/drawer';
import { IconButton } from '@/components/ui/icon-button';
import { MenuIcon, CloseIcon, HomeIcon, PlusIcon, RssIcon, GridIcon, ListIcon, SearchIcon, SettingsIcon } from '@/components/ui/icons';
import { useUnread } from '@/lib/unreadContext';
import { useView } from '@/lib/viewContext';

export const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { viewMode, toggleViewMode } = useView();

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

  // Add scroll event listener to detect when page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Get the page title based on the current path
  const getPageTitle = () => {
    switch (pathname) {
      case '/':
        return 'Home';
      case '/manage':
        return 'Manage Feeds';
      case '/health':
        return 'Feed Health';
      default:
        return 'Infrss Reader';
    }
  };

  return (
    <>
      {/* Top Navigation Bar - Desktop only, hidden on mobile */}
      {!isMobile && (
        <header className={`glass-nav fixed top-0 left-0 right-0 h-16 z-30 transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : 'shadow-sm'
        }`}>
        <div className="h-full flex items-center px-4 justify-between">
          <div className="flex items-center">
            <IconButton
              icon={<MenuIcon />}
              label="Menu"
              variant="ghost"
              onClick={toggleDrawer}
            />
            <h1 className="text-xl font-semibold text-[var(--text-primary)] ml-2">
              {getPageTitle()}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {/* View Toggle - Only show on home page */}
            {pathname === '/' && (
              <IconButton
                icon={viewMode === 'magazine' ? <GridIcon /> : <ListIcon />}
                label={viewMode === 'magazine' ? 'Cards View' : 'Magazine View'}
                variant="ghost"
                onClick={toggleViewMode}
              />
            )}
            {/* Unread Counter */}
            <UnreadCounter />
          </div>
        </div>
      </header>
      )}

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
        <nav className="glass-tab-bar fixed bottom-0 left-0 right-0 z-40">
          <div className="flex items-center justify-around safe-area-inset">
            <Link 
              href="/" 
              className={`liquid-glass-tab flex flex-col items-center justify-center gap-1 px-5 py-2 ${
                pathname === '/' 
                  ? 'active text-[var(--primary)]' 
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              <HomeIcon />
              <span className="text-[11px] font-semibold">Home</span>
            </Link>
            
            <Link 
              href="/manage" 
              className={`liquid-glass-tab flex flex-col items-center justify-center gap-1 px-5 py-2 ${
                pathname === '/manage' 
                  ? 'active text-[var(--primary)]' 
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              <RssIcon />
              <span className="text-[11px] font-semibold">Subscriptions</span>
            </Link>
            
            <button 
              className="liquid-glass-tab flex flex-col items-center justify-center gap-1 px-5 py-2 text-[var(--text-secondary)]"
              onClick={() => {/* TODO: implement search */}}
            >
              <SearchIcon />
              <span className="text-[11px] font-semibold">Discover</span>
            </button>
            
            <Link 
              href="/health" 
              className={`liquid-glass-tab flex flex-col items-center justify-center gap-1 px-5 py-2 ${
                pathname === '/health' 
                  ? 'active text-[var(--primary)]' 
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              <SettingsIcon />
              <span className="text-[11px] font-semibold">Settings</span>
            </Link>
          </div>
        </nav>
      )}
    </>
  );
};

// Add UnreadCounter component at the bottom of the file
const UnreadCounter = () => {
  const { unreadCount } = useUnread();
  if (unreadCount === 0) return null;
  return (
    <div className="relative">
      <span className="inline-flex items-center justify-center glass-card px-5 py-2.5 rounded-full text-[var(--primary)] text-sm font-bold shadow-lg animate-[scaleIn_0.3s_ease-out] transition-all duration-300">
        {unreadCount}
      </span>
    </div>
  );
}; 
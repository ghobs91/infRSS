import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Drawer } from '@/components/ui/drawer';
import { IconButton } from '@/components/ui/icon-button';
import { MenuIcon, CloseIcon, HomeIcon, PlusIcon, RssIcon } from '@/components/ui/icons';
import { useUnread } from '@/lib/unreadContext';

export const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
      default:
        return 'Infrss Reader';
    }
  };

  return (
    <>
      {/* Top Navigation Bar - Show hamburger on desktop, hide on mobile */}
      <header className={`glass-nav fixed top-0 left-0 right-0 h-16 z-30 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : 'shadow-sm'
      } ${isMobile ? 'md:flex' : ''}`}>
        <div className="h-full flex items-center px-4 justify-between">
          <div className="flex items-center">
            {!isMobile && (
              <IconButton
                icon={<MenuIcon />}
                label="Menu"
                variant="ghost"
                onClick={toggleDrawer}
              />
            )}
            <h1 className={`text-xl font-semibold text-[var(--text-primary)] ${!isMobile ? 'ml-2' : ''}`}>
              {getPageTitle()}
            </h1>
          </div>
          {/* Unread Counter */}
          <UnreadCounter />
        </div>
      </header>

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
                    className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 ${
                      pathname === '/' 
                        ? 'glass-card text-[var(--primary)] scale-[1.02]' 
                        : 'text-[var(--text-primary)] hover:bg-[var(--background-hover)]'
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
                    className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 ${
                      pathname === '/manage' 
                        ? 'glass-card text-[var(--primary)] scale-[1.02]' 
                        : 'text-[var(--text-primary)] hover:bg-[var(--background-hover)]'
                    }`}
                    onClick={closeDrawer}
                  >
                    <PlusIcon />
                    <span>Manage Feeds</span>
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
        <nav className="glass-tab-bar fixed bottom-0 left-0 right-0 z-30 safe-area-bottom">
          <div className="flex items-center justify-around h-20 px-4">
            <Link 
              href="/" 
              className={`flex flex-col items-center justify-center gap-1 px-6 py-2 rounded-2xl transition-all duration-300 ${
                pathname === '/' 
                  ? 'glass-card text-[var(--primary)] scale-110' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:scale-105'
              }`}
            >
              <HomeIcon />
              <span className="text-xs font-medium">Home</span>
            </Link>
            
            <Link 
              href="/manage" 
              className={`flex flex-col items-center justify-center gap-1 px-6 py-2 rounded-2xl transition-all duration-300 ${
                pathname === '/manage' 
                  ? 'glass-card text-[var(--primary)] scale-110' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:scale-105'
              }`}
            >
              <PlusIcon />
              <span className="text-xs font-medium">Feeds</span>
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
      <span className="inline-flex items-center justify-center glass-card px-4 py-2 rounded-full text-[var(--primary)] text-sm font-semibold shadow-md animate-[scaleIn_0.3s_ease-out]">
        {unreadCount}
      </span>
    </div>
  );
}; 
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Drawer } from '@/components/ui/drawer';
import { IconButton } from '@/components/ui/icon-button';
import { MenuIcon, CloseIcon, HomeIcon, PlusIcon, RssIcon } from '@/components/ui/icons';

export const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
        return 'Articles';
      case '/manage':
        return 'Manage Feeds';
      default:
        return 'Infrss Reader';
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <header className={`fixed top-0 left-0 right-0 h-16 z-30 bg-[var(--card-bg)] bg-opacity-95 backdrop-blur-sm transition-all duration-200 ${
        isScrolled ? 'shadow-sm' : ''
      }`}>
        <div className="h-full flex items-center px-4">
          <IconButton
            icon={<MenuIcon />}
            label="Menu"
            variant="ghost"
            onClick={toggleDrawer}
          />
          <h1 className="ml-2 text-xl font-semibold text-[var(--text-primary)]">{getPageTitle()}</h1>
        </div>
      </header>

      {/* Navigation Drawer */}
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
                  className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    pathname === '/' 
                      ? 'bg-[var(--background-hover)] text-[var(--primary)]' 
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
                  className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    pathname === '/manage' 
                      ? 'bg-[var(--background-hover)] text-[var(--primary)]' 
                      : 'text-[var(--text-primary)] hover:bg-[var(--background-hover)]'
                  }`}
                  onClick={closeDrawer}
                >
                  <PlusIcon />
                  <span>Add Feeds</span>
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
    </>
  );
}; 
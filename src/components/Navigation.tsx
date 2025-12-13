import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Drawer } from '@/components/ui/drawer';
import { IconButton } from '@/components/ui/icon-button';
import { CloseIcon, HomeIcon, PlusIcon, RssIcon, SearchIcon, SettingsIcon, MenuIcon, ActivityIcon } from '@/components/ui/icons';

interface NavigationProps {
  onDrawerStateChange?: (isOpen: boolean) => void;
}

export const Navigation = ({ onDrawerStateChange }: NavigationProps = {}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const pathname = usePathname();

  // Notify parent of drawer state changes
  useEffect(() => {
    if (onDrawerStateChange) {
      onDrawerStateChange(isDrawerOpen);
    }
  }, [isDrawerOpen, onDrawerStateChange]);

  // Detect if we're on a mobile/tablet device based on screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // 1024px for tablet breakpoint
      setIsMobile(mobile);
      
      // Set sidebar open by default on desktop, closed on mobile/tablet (only on first load)
      if (!hasInitialized) {
        setIsDrawerOpen(!mobile);
        setHasInitialized(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [hasInitialized]);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* Desktop Header with Hamburger Menu */}
      {!isMobile && (
        <nav className="fixed top-0 left-0 right-0 h-16 glass-nav z-50 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <IconButton
              icon={<MenuIcon />}
              label="Toggle Menu"
              variant="ghost"
              onClick={toggleDrawer}
            />
            <Image src="/icons/icon-192.png" alt="InfRSS" width={32} height={32} className="rounded-lg" />
            <span className="text-lg font-bold text-[var(--text-primary)]">InfRSS</span>
          </div>
        </nav>
      )}

      {/* Bottom Tab Bar - Mobile only */}
      {isMobile && (
        <nav className="fixed bottom-6 left-6 right-6 z-50">
          <div className="glass-tab-bar rounded-[32px] flex items-center justify-between px-2 py-2">
            <Link 
              href="/" 
              className={`flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-[24px] transition-all duration-300 min-w-[70px] ${
                pathname === '/' 
                  ? 'bg-[var(--primary)] text-white shadow-lg translate-y-[-2px]' 
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
                  ? 'bg-[var(--primary)] text-white shadow-lg translate-y-[-2px]' 
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
                  ? 'bg-[var(--primary)] text-white shadow-lg translate-y-[-2px]' 
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
                  ? 'bg-[var(--primary)] text-white shadow-lg translate-y-[-2px]' 
                  : 'text-[#8E8E93] hover:text-white'
              }`}
            >
              <SettingsIcon />
              <span className="text-[10px] font-medium">Settings</span>
            </Link>
          </div>
        </nav>
      )}
    </>
  );
};
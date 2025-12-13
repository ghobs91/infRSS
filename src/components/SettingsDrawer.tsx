import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconButton } from '@/components/ui/icon-button';
import { CloseIcon, HomeIcon, PlusIcon, RssIcon, SearchIcon, ActivityIcon } from '@/components/ui/icons';

interface SettingsDrawerProps {
  onClose: () => void;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ onClose }) => {
  const pathname = usePathname();

  return (
    <div className="sidebar h-full overflow-y-auto">
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Settings</h2>
          <IconButton
            icon={<CloseIcon />}
            label="Close"
            variant="ghost"
            onClick={onClose}
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
              >
                <PlusIcon />
                <span>Manage</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/discover" 
                className={`flex items-center gap-4 p-4 rounded-3xl transition-all duration-400 font-medium ${
                  pathname === '/discover' 
                    ? 'glass-card text-[var(--primary)] scale-105 shadow-lg' 
                    : 'text-[var(--text-primary)] hover:glass-button'
                }`}
              >
                <SearchIcon />
                <span>Discover</span>
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
              >
                <ActivityIcon />
                <span>Health</span>
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
    </div>
  );
};

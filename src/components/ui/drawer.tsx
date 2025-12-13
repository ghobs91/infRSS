import React, { useEffect, useRef } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right';
  persistent?: boolean; // Don't close on outside click
}

export const Drawer: React.FC<DrawerProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  position = 'left',
  persistent = false
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer when clicking outside (only if not persistent)
  useEffect(() => {
    if (persistent) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, persistent]);

  // Prevent scrolling when drawer is open (only if not persistent)
  useEffect(() => {
    if (persistent) return;
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, persistent]);

  // For persistent drawers, don't show if closed
  if (persistent && !isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop - only show if not persistent */}
      {isOpen && !persistent && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 transition-all duration-400 animate-[fadeIn_0.4s_ease-out]"
          aria-hidden="true"
        />
      )}
      
      {/* Drawer */}
      <div
        ref={drawerRef}
        className={persistent ? 
          "h-full w-full bg-[var(--sidebar-bg)] overflow-y-auto border-r border-white/10" :
          `fixed top-0 ${position === 'left' ? 'left-0' : 'right-0'} h-full w-80 glass-nav shadow-2xl z-50 transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] rounded-r-[32px] ${
            isOpen ? 'translate-x-0 opacity-100 scale-100' : position === 'left' ? '-translate-x-full opacity-0 scale-95' : 'translate-x-full opacity-0 scale-95'
          }`
        }
      >
        <div className={persistent ? "p-6 h-full" : "p-8 h-full overflow-y-auto"}>
          {children}
        </div>
      </div>
    </>
  );
}; 
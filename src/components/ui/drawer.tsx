import React, { useEffect, useRef } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right';
}

export const Drawer: React.FC<DrawerProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  position = 'left' 
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer when clicking outside
  useEffect(() => {
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
  }, [isOpen, onClose]);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 transition-all duration-400 animate-[fadeIn_0.4s_ease-out]"
          aria-hidden="true"
        />
      )}
      
      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 ${position === 'left' ? 'left-0' : 'right-0'} h-full w-80 glass-nav shadow-2xl z-50 transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] rounded-r-[32px] ${
          isOpen ? 'translate-x-0 opacity-100 scale-100' : position === 'left' ? '-translate-x-full opacity-0 scale-95' : 'translate-x-full opacity-0 scale-95'
        }`}
      >
        <div className="p-8 h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}; 
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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300"
          aria-hidden="true"
        />
      )}
      
      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 ${position === 'left' ? 'left-0' : 'right-0'} h-full w-72 glass-nav shadow-2xl z-50 transform transition-all duration-300 ease-out ${
          isOpen ? 'translate-x-0 opacity-100' : position === 'left' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}; 
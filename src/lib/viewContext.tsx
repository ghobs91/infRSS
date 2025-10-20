"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type ViewMode = 'magazine' | 'cards';

interface ViewContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewModeState] = useState<ViewMode>('magazine');
  const [isClient, setIsClient] = useState(false);

  // Load view mode from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    const savedViewMode = localStorage.getItem('viewMode') as ViewMode;
    if (savedViewMode === 'magazine' || savedViewMode === 'cards') {
      setViewModeState(savedViewMode);
    }
  }, []);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    if (isClient) {
      localStorage.setItem('viewMode', mode);
    }
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'magazine' ? 'cards' : 'magazine');
  };

  return (
    <ViewContext.Provider value={{ viewMode, setViewMode, toggleViewMode }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = (): ViewContextType => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
};

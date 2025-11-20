import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';

interface UnreadContextType {
  unreadCount: number;
  readLinks: Set<string>;
  previouslyReadLinks: Set<string>; // Articles that were read in a previous session
  markAsRead: (link: string) => void;
  toggleReadStatus: (link: string) => void;
  setTotalArticles: (count: number) => void;
  autoMarkAsReadOnScroll: boolean;
  toggleAutoMarkAsRead: () => void;
}

const UnreadContext = createContext<UnreadContextType | undefined>(undefined);

export const useUnread = () => {
  const ctx = useContext(UnreadContext);
  if (!ctx) {
    throw new Error('useUnread must be used within UnreadProvider');
  }
  return ctx;
};

const READ_KEY = 'infrss_read_links';
const PREVIOUSLY_READ_KEY = 'infrss_previously_read_links';
const PREFERENCES_KEY = 'userPreferences';

export const UnreadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [readLinks, setReadLinks] = useState<Set<string>>(new Set());
  const [previouslyReadLinks, setPreviouslyReadLinks] = useState<Set<string>>(new Set());
  const [unreadCount, setUnreadCount] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);
  const [autoMarkAsReadOnScroll, setAutoMarkAsReadOnScroll] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Load read links and preferences from localStorage
  useEffect(() => {
    const previouslyStored = localStorage.getItem(PREVIOUSLY_READ_KEY);
    
    // Load previously read links from last session
    if (previouslyStored) {
      setPreviouslyReadLinks(new Set(JSON.parse(previouslyStored)));
    }
    
    // Start with empty read links for new session
    // Don't load old read links - they're now in previouslyReadLinks
    setReadLinks(new Set());

    const prefs = localStorage.getItem(PREFERENCES_KEY);
    if (prefs) {
      try {
        const parsed = JSON.parse(prefs);
        if (parsed.autoMarkAsReadOnScroll !== undefined) {
          setAutoMarkAsReadOnScroll(parsed.autoMarkAsReadOnScroll);
        }
      } catch (error) {
        console.error('Error parsing preferences:', error);
      }
    }
    
    setIsInitialLoad(false);
  }, []);

  // Save read links to localStorage and update previously read on app close/reload
  useEffect(() => {
    if (isInitialLoad) return;
    
    localStorage.setItem(READ_KEY, JSON.stringify(Array.from(readLinks)));
    // Calculate unread count by subtracting both current and previously read articles
    const allReadLinks = new Set([...Array.from(readLinks), ...Array.from(previouslyReadLinks)]);
    setUnreadCount(Math.max(totalArticles - allReadLinks.size, 0));
  }, [readLinks, previouslyReadLinks, totalArticles, isInitialLoad]);

  // Before the app unloads, save current read links as previously read for next session
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(PREVIOUSLY_READ_KEY, JSON.stringify(Array.from(readLinks)));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [readLinks]);

  // Save preferences to localStorage
  useEffect(() => {
    const prefs = localStorage.getItem(PREFERENCES_KEY);
    let currentPrefs = {};
    if (prefs) {
      try {
        currentPrefs = JSON.parse(prefs);
      } catch (error) {
        console.error('Error parsing existing preferences:', error);
      }
    }
    
    const updatedPrefs = {
      ...currentPrefs,
      autoMarkAsReadOnScroll
    };
    
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updatedPrefs));
  }, [autoMarkAsReadOnScroll]);

  const markAsRead = useCallback((link: string) => {
    setReadLinks(prev => {
      if (prev.has(link)) return prev; // No change needed
      const next = new Set(prev);
      next.add(link);
      return next;
    });
  }, []);

  const toggleReadStatus = useCallback((link: string) => {
    setReadLinks(prev => {
      const next = new Set(prev);
      if (next.has(link)) {
        next.delete(link);
        return next;
      } else {
        next.add(link);
        return next;
      }
    });
  }, []);

  const toggleAutoMarkAsRead = useCallback(() => {
    setAutoMarkAsReadOnScroll(prev => !prev);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    unreadCount, 
    readLinks, 
    previouslyReadLinks,
    markAsRead, 
    toggleReadStatus, 
    setTotalArticles,
    autoMarkAsReadOnScroll,
    toggleAutoMarkAsRead
  }), [
    unreadCount, 
    readLinks, 
    previouslyReadLinks,
    markAsRead, 
    toggleReadStatus, 
    setTotalArticles,
    autoMarkAsReadOnScroll,
    toggleAutoMarkAsRead
  ]);

  return (
    <UnreadContext.Provider value={contextValue}>
      {children}
    </UnreadContext.Provider>
  );
}; 
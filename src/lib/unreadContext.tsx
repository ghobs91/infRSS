import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface UnreadContextType {
  unreadCount: number;
  readLinks: Set<string>;
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
const PREFERENCES_KEY = 'userPreferences';

export const UnreadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [readLinks, setReadLinks] = useState<Set<string>>(new Set());
  const [unreadCount, setUnreadCount] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);
  const [autoMarkAsReadOnScroll, setAutoMarkAsReadOnScroll] = useState(true);

  // Load read links and preferences from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(READ_KEY);
    if (stored) {
      setReadLinks(new Set(JSON.parse(stored)));
    }

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
  }, []);

  // Save read links to localStorage
  useEffect(() => {
    localStorage.setItem(READ_KEY, JSON.stringify(Array.from(readLinks)));
    setUnreadCount(Math.max(totalArticles - readLinks.size, 0));
  }, [readLinks, totalArticles]);

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

  return (
    <UnreadContext.Provider value={{ 
      unreadCount, 
      readLinks, 
      markAsRead, 
      toggleReadStatus, 
      setTotalArticles,
      autoMarkAsReadOnScroll,
      toggleAutoMarkAsRead
    }}>
      {children}
    </UnreadContext.Provider>
  );
}; 
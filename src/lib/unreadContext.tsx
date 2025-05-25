import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface UnreadContextType {
  unreadCount: number;
  readLinks: Set<string>;
  markAsRead: (link: string) => void;
  setTotalArticles: (count: number) => void;
}

const UnreadContext = createContext<UnreadContextType | undefined>(undefined);

export const useUnread = () => {
  const ctx = useContext(UnreadContext);
  if (!ctx) throw new Error('useUnread must be used within UnreadProvider');
  return ctx;
};

const READ_KEY = 'infrss_read_links';

export const UnreadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [readLinks, setReadLinks] = useState<Set<string>>(new Set());
  const [unreadCount, setUnreadCount] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);

  // Load read links from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(READ_KEY);
    if (stored) {
      setReadLinks(new Set(JSON.parse(stored)));
    }
  }, []);

  // Save read links to localStorage
  useEffect(() => {
    localStorage.setItem(READ_KEY, JSON.stringify(Array.from(readLinks)));
    setUnreadCount(Math.max(totalArticles - readLinks.size, 0));
  }, [readLinks, totalArticles]);

  const markAsRead = useCallback((link: string) => {
    setReadLinks(prev => {
      if (prev.has(link)) return prev;
      const next = new Set(prev);
      next.add(link);
      return next;
    });
  }, []);

  return (
    <UnreadContext.Provider value={{ unreadCount, readLinks, markAsRead, setTotalArticles }}>
      {children}
    </UnreadContext.Provider>
  );
}; 
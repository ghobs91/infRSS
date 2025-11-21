import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';

interface UnreadContextType {
  unreadCount: number;
  readArticleIds: Set<string>;
  previouslyReadArticleIds: Set<string>; // Articles that were read in a previous session
  markAsRead: (articleId: string) => void;
  toggleReadStatus: (articleId: string) => void;
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

const READ_KEY = 'infrss_read_article_ids';
const PREVIOUSLY_READ_KEY = 'infrss_previously_read_article_ids';
const PREFERENCES_KEY = 'userPreferences';

export const UnreadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [readArticleIds, setReadArticleIds] = useState<Set<string>>(new Set());
  const [previouslyReadArticleIds, setPreviouslyReadArticleIds] = useState<Set<string>>(new Set());
  const [unreadCount, setUnreadCount] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);
  const [autoMarkAsReadOnScroll, setAutoMarkAsReadOnScroll] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Load read article IDs and preferences from localStorage
  useEffect(() => {
    const previouslyStored = localStorage.getItem(PREVIOUSLY_READ_KEY);
    
    // Load previously read article IDs from last session
    if (previouslyStored) {
      setPreviouslyReadArticleIds(new Set(JSON.parse(previouslyStored)));
    }
    
    // Start with empty read article IDs for new session
    // Don't load old read IDs - they're now in previouslyReadArticleIds
    setReadArticleIds(new Set());

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

  // Save read article IDs to localStorage and update previously read on app close/reload
  useEffect(() => {
    if (isInitialLoad) return;
    
    localStorage.setItem(READ_KEY, JSON.stringify(Array.from(readArticleIds)));
    // Calculate unread count by subtracting both current and previously read articles
    const allReadArticleIds = new Set([...Array.from(readArticleIds), ...Array.from(previouslyReadArticleIds)]);
    setUnreadCount(Math.max(totalArticles - allReadArticleIds.size, 0));
  }, [readArticleIds, previouslyReadArticleIds, totalArticles, isInitialLoad]);

  // Before the app unloads, save current read article IDs as previously read for next session
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(PREVIOUSLY_READ_KEY, JSON.stringify(Array.from(readArticleIds)));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [readArticleIds]);

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

  const markAsRead = useCallback((articleId: string) => {
    setReadArticleIds(prev => {
      if (prev.has(articleId)) return prev; // No change needed
      const next = new Set(prev);
      next.add(articleId);
      return next;
    });
  }, []);

  const toggleReadStatus = useCallback((articleId: string) => {
    setReadArticleIds(prev => {
      const next = new Set(prev);
      if (next.has(articleId)) {
        next.delete(articleId);
        return next;
      } else {
        next.add(articleId);
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
    readArticleIds, 
    previouslyReadArticleIds,
    markAsRead, 
    toggleReadStatus, 
    setTotalArticles,
    autoMarkAsReadOnScroll,
    toggleAutoMarkAsRead
  }), [
    unreadCount, 
    readArticleIds, 
    previouslyReadArticleIds,
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
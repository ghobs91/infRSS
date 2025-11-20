import React, { memo } from 'react';
import Image from 'next/image';

interface Feed {
  id: string;
  name: string;
  url: string;
  unreadCount?: number;
  favicon?: string;
}

interface FeedSidebarProps {
  feeds: Feed[];
  selectedFeed: string | null;
  onSelectFeed: (feedId: string | null) => void;
  unreadCount: number;
}

const FeedSidebarComponent: React.FC<FeedSidebarProps> = ({
  feeds,
  selectedFeed,
  onSelectFeed,
  unreadCount,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="text-2xl">📰</span>
          <span>InfRSS</span>
        </div>
      </div>

      <div className="sidebar-nav">
        {/* Main Navigation */}
        <div className="sidebar-section">
          <div
            className={`sidebar-item ${selectedFeed === null ? 'active' : ''}`}
            onClick={() => onSelectFeed(null)}
          >
            <div className="sidebar-item-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3h6v6H3V3zm0 8h6v6H3v-6zm8-8h6v6h-6V3zm0 8h6v6h-6v-6z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="sidebar-item-text">Today</span>
            {unreadCount > 0 && (
              <span className="sidebar-item-count">{unreadCount}</span>
            )}
          </div>

          <div className="sidebar-item">
            <div className="sidebar-item-icon">⭐</div>
            <span className="sidebar-item-text">Starred</span>
          </div>

          <div className="sidebar-item">
            <div className="sidebar-item-icon">📁</div>
            <span className="sidebar-item-text">Archived</span>
          </div>
        </div>

        {/* Articles Section */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">Articles</div>
          
          {feeds.length === 0 ? (
            <div className="sidebar-item opacity-50">
              <span className="sidebar-item-text">No feeds yet</span>
            </div>
          ) : (
            feeds.map((feed) => (
              <div
                key={feed.id}
                className={`sidebar-item ${selectedFeed === feed.id ? 'active' : ''}`}
                onClick={() => onSelectFeed(feed.id)}
              >
                <div className="sidebar-item-icon">
                  {feed.favicon ? (
                    <Image
                      src={feed.favicon}
                      alt={feed.name}
                      width={20}
                      height={20}
                      unoptimized
                      loading="lazy"
                      className="rounded"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                      {feed.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <span className="sidebar-item-text">{feed.name}</span>
                {feed.unreadCount && feed.unreadCount > 0 && (
                  <span className="sidebar-item-count">{feed.unreadCount}</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const FeedSidebar = memo(FeedSidebarComponent, (prevProps, nextProps) => {
  return (
    prevProps.selectedFeed === nextProps.selectedFeed &&
    prevProps.unreadCount === nextProps.unreadCount &&
    prevProps.feeds.length === nextProps.feeds.length &&
    prevProps.feeds.every((feed, idx) => 
      feed.id === nextProps.feeds[idx]?.id &&
      feed.unreadCount === nextProps.feeds[idx]?.unreadCount
    )
  );
});

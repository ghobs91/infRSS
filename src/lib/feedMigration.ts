// lib/feedMigration.ts

export interface FeedMigration {
  originalUrl: string;
  alternatives: FeedAlternative[];
  status: 'available' | 'deprecated' | 'rate_limited';
}

export interface FeedAlternative {
  title: string;
  url: string;
  description: string;
  reliability: 'high' | 'medium' | 'low';
  setupRequired: boolean;
  setupInstructions?: string;
}

/**
 * Migration guide for common RSSHub feed issues
 */
export const FEED_MIGRATION_GUIDE: Record<string, FeedMigration> = {
  'twitter-user': {
    originalUrl: 'rsshub.app/twitter/user/*',
    alternatives: [
      {
        title: 'Nitter RSS',
        url: 'https://nitter.net/{username}/rss',
        description: 'Nitter provides RSS feeds for Twitter accounts',
        reliability: 'medium',
        setupRequired: false
      },
      {
        title: 'RSS.app Twitter',
        url: 'https://rss.app/rss/feed/{username}',
        description: 'RSS.app can create RSS feeds from Twitter accounts',
        reliability: 'high',
        setupRequired: true,
        setupInstructions: 'Visit RSS.app, enter Twitter profile URL, and generate RSS feed'
      },
      {
        title: 'Self-hosted RSSHub',
        url: 'https://github.com/DIYgod/RSSHub',
        description: 'Deploy your own RSSHub instance for better reliability',
        reliability: 'high',
        setupRequired: true,
        setupInstructions: 'Deploy RSSHub to Vercel, Railway, or your own server'
      }
    ],
    status: 'deprecated'
  },
  
  'github-trending': {
    originalUrl: 'rsshub.app/github/trending/*',
    alternatives: [
      {
        title: 'GitHub Trending RSS',
        url: 'https://github.com/trending.atom',
        description: 'Official GitHub trending repositories RSS feed',
        reliability: 'high',
        setupRequired: false
      },
      {
        title: 'GitHub Blog RSS',
        url: 'https://github.blog/feed/',
        description: 'Official GitHub blog RSS feed',
        reliability: 'high',
        setupRequired: false
      }
    ],
    status: 'available'
  },
  
  'github-user': {
    originalUrl: 'rsshub.app/github/user/*',
    alternatives: [
      {
        title: 'GitHub User Activity',
        url: 'https://github.com/{username}.atom',
        description: 'Official GitHub user activity RSS feed',
        reliability: 'high',
        setupRequired: false
      },
      {
        title: 'GitHub Repository',
        url: 'https://github.com/{username}/{repo}.atom',
        description: 'Official GitHub repository RSS feed',
        reliability: 'high',
        setupRequired: false
      }
    ],
    status: 'available'
  }
};

/**
 * Get migration suggestions for a failed RSSHub feed
 */
export function getFeedMigrationSuggestions(failedUrl: string): FeedMigration | null {
  const url = new URL(failedUrl);
  
  if (url.hostname !== 'rsshub.app') {
    return null;
  }
  
  const path = url.pathname;
  
  // Check for Twitter user feeds
  if (path.match(/^\/twitter\/user\/[^\/]+/)) {
    const username = path.split('/').pop();
    const migration = { ...FEED_MIGRATION_GUIDE['twitter-user'] };
    migration.originalUrl = failedUrl;
    migration.alternatives = migration.alternatives.map(alt => ({
      ...alt,
      url: alt.url.replace('{username}', username || '')
    }));
    return migration;
  }
  
  // Check for GitHub trending feeds
  if (path.match(/^\/github\/trending/)) {
    return { ...FEED_MIGRATION_GUIDE['github-trending'], originalUrl: failedUrl };
  }
  
  // Check for GitHub user feeds
  if (path.match(/^\/github\/user\/[^\/]+/)) {
    const username = path.split('/').pop();
    const migration = { ...FEED_MIGRATION_GUIDE['github-user'] };
    migration.originalUrl = failedUrl;
    migration.alternatives = migration.alternatives.map(alt => ({
      ...alt,
      url: alt.url.replace('{username}', username || '')
    }));
    return migration;
  }
  
  // Generic RSSHub alternatives
  return {
    originalUrl: failedUrl,
    alternatives: [
      {
        title: 'Self-hosted RSSHub',
        url: 'https://github.com/DIYgod/RSSHub',
        description: 'Deploy your own RSSHub instance for better reliability',
        reliability: 'high',
        setupRequired: true,
        setupInstructions: 'Deploy RSSHub to Vercel, Railway, or your own server'
      },
      {
        title: 'RSS.app',
        url: 'https://rss.app/',
        description: 'Create RSS feeds from any website',
        reliability: 'high',
        setupRequired: true,
        setupInstructions: 'Visit RSS.app and create a custom RSS feed'
      },
      {
        title: 'Feed43',
        url: 'https://feed43.com/',
        description: 'Convert any web page to RSS feed',
        reliability: 'medium',
        setupRequired: true,
        setupInstructions: 'Use Feed43 to create RSS from HTML pages'
      }
    ],
    status: 'deprecated'
  };
}

/**
 * Generate a migration report for multiple failed feeds
 */
export function generateMigrationReport(failedUrls: string[]): {
  totalFeeds: number;
  migrations: FeedMigration[];
  recommendations: string[];
} {
  const migrations = failedUrls
    .map(url => getFeedMigrationSuggestions(url))
    .filter(Boolean) as FeedMigration[];
  
  const recommendations: string[] = [];
  
  if (migrations.length > 0) {
    recommendations.push(`Found ${migrations.length} feeds that need migration`);
    
    const twitterFeeds = migrations.filter(m => m.originalUrl.includes('/twitter/'));
    if (twitterFeeds.length > 0) {
      recommendations.push(`${twitterFeeds.length} Twitter feeds can be replaced with Nitter or RSS.app alternatives`);
    }
    
    const githubFeeds = migrations.filter(m => m.originalUrl.includes('/github/'));
    if (githubFeeds.length > 0) {
      recommendations.push(`${githubFeeds.length} GitHub feeds can use official GitHub RSS feeds`);
    }
    
    if (migrations.some(m => m.status === 'rate_limited')) {
      recommendations.push('Some feeds are rate-limited - consider self-hosting RSSHub');
    }
  }
  
  return {
    totalFeeds: failedUrls.length,
    migrations,
    recommendations
  };
}

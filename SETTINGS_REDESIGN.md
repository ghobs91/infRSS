# Settings Pages Redesign

## Overview
Updated the manage, health, and discover pages to follow a consistent settings-style design with sidebar navigation, inspired by modern app settings interfaces (like Folo app).

## Changes Made

### 1. Fixed Content Going Under Navbar
- Added `.settings-layout` CSS class in `globals.css`
- Applies `padding-top: 64px` on desktop to account for fixed navbar
- On mobile: no top padding, but adds bottom padding for tab bar

### 2. Created Shared Settings Layout Component
**File:** `src/components/SettingsLayout.tsx`

Features:
- **Desktop:** Left sidebar with navigation items
  - Feeds (Manage subscriptions)
  - Discover (Find new feeds)  
  - Health (Monitor feed status)
- **Mobile:** Uses existing bottom tab bar (no sidebar)
- Consistent spacing and styling across all settings pages
- Active state highlighting for current page
- Icons with descriptions for each section

### 3. Updated Pages

#### Manage Page (`src/app/manage/page.tsx`)
- Wrapped in `SettingsLayout` component
- Simplified header (removed heavy card styling)
- Now follows settings page design pattern

#### Health Page (`src/app/health/page.tsx`)
- Wrapped in `SettingsLayout` component
- Simplified header
- Consistent with other settings pages

#### Discover Page (`src/app/discover/page.tsx`)
- Wrapped in `SettingsLayout` component
- Removed mobile-specific back button (now handled by layout)
- Simplified header
- Maintains all functionality (search, categories, countries)

### 4. Added New Icons
**File:** `src/components/ui/icons.tsx`

Added icons for settings navigation:
- `CategoryIcon` - For category management
- `HeartIcon` - For favorites/preferences  
- `ActivityIcon` - For health/activity monitoring

### 5. CSS Updates
**File:** `src/app/globals.css`

```css
/* Settings page layout styles */
.settings-layout {
  padding-top: 64px; /* Account for fixed navbar on desktop */
  min-height: 100vh;
}

@media (max-width: 768px) {
  .settings-layout {
    padding-top: 0;
    padding-bottom: 120px;
  }
}
```

## Design Principles

### Sidebar Navigation (Desktop)
- Fixed position on the left side
- Width: 256px (md), 288px (lg), 320px (xl)
- Light background with subtle borders
- Hover states for better interactivity
- Active state with accent color

### Content Area
- Max width: 1280px (5xl)
- Responsive padding
- Clean, spacious layout
- Proper spacing for mobile and desktop

### Mobile Behavior
- Sidebar hidden on mobile (< 768px)
- Uses existing bottom tab bar for navigation
- Full-width content
- Bottom padding to avoid tab bar overlap

## Benefits

1. **Consistent UX:** All settings/management pages now have the same layout
2. **Better Navigation:** Desktop users get persistent sidebar navigation
3. **No Navbar Overlap:** Content properly positioned below fixed navbar
4. **Mobile-Friendly:** Maintains existing mobile navigation pattern
5. **Scalable:** Easy to add new settings sections in the future
6. **Modern Design:** Follows contemporary app design patterns

## Screenshots Needed

To document this update, consider taking screenshots of:
- Desktop view with sidebar navigation
- Each settings page (Manage, Discover, Health)
- Mobile view showing proper spacing
- Active/hover states in the sidebar

## Future Enhancements

Potential additions to the settings layout:
- User profile settings
- Appearance/theme preferences  
- Notification settings
- Export/import preferences
- Keyboard shortcuts configuration

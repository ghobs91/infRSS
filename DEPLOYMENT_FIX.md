# Netlify Deployment Fix

## Problem
All 101 RSS feeds were failing with "404 Not Found" errors when deployed to Netlify. The issue was caused by:

1. **Missing Netlify configuration** - No `netlify.toml` file to configure the Next.js deployment
2. **Edge Runtime incompatibility** - Netlify has limited support for Next.js Edge Runtime API routes
3. **Missing Netlify plugin** - The `@netlify/plugin-nextjs` package was not installed

## Changes Made

### 1. Created `netlify.toml`
Added a configuration file with:
- Proper build settings for Next.js
- Header configuration for CORS support
- Environment variables for proper builds

### 2. Installed Netlify Next.js Plugin
```bash
npm install --save-dev @netlify/plugin-nextjs
```

### 3. Converted API Routes from Edge to Node.js Runtime
Changed the following files from `runtime = 'edge'` to `runtime = 'nodejs'`:
- `src/app/api/proxy/route.ts`
- `src/app/api/fetch-rss/route.ts`
- `src/app/api/export-opml/route.ts`

Added `export const dynamic = 'force-dynamic'` to ensure routes are not statically optimized.

## Next Steps

### To Deploy the Fix:

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Fix: Convert to Node.js runtime for Netlify compatibility"
   git push origin main
   ```

2. **Netlify will automatically redeploy** (if auto-deploy is enabled)
   - Or manually trigger a deploy from the Netlify dashboard

3. **Verify the deployment:**
   - Wait for the build to complete
   - Check the "Feed Health Dashboard" again
   - The API routes should now work properly

### If Issues Persist:

1. **Check Netlify build logs** for any errors during deployment
2. **Verify environment variables** are set correctly in Netlify dashboard
3. **Check function logs** in Netlify dashboard under "Functions" tab

## Why This Fixes the Problem

### Edge Runtime vs Node.js Runtime
- **Edge Runtime**: Runs on Cloudflare Workers-like environment with limited APIs
- **Node.js Runtime**: Full Node.js environment with complete API access
- Netlify's Next.js support is more robust with Node.js runtime

### The @netlify/plugin-nextjs Plugin
This plugin ensures that:
- Next.js API routes are properly converted to Netlify Functions
- Build output is correctly structured
- Routing and rewrites work as expected

### netlify.toml Configuration
Provides explicit instructions to Netlify for:
- How to build the project
- Which plugin to use
- Environment settings
- Header configuration for CORS

## Testing Locally

Before pushing, you can test locally:
```bash
npm run build
npm start
```

Then test the proxy endpoint:
```bash
curl "http://localhost:3000/api/proxy?url=https://techcrunch.com/feed/"
```

## Additional Notes

- The Node.js runtime may have slightly slower cold starts than Edge Runtime
- However, it's more compatible and reliable for Netlify deployments
- For most RSS feeds, the performance difference is negligible

# InfRSS

An intelligent, offline-friendly RSS reader built with Next.js that combines modern web technologies with AI-powered content analysis.

## 🚀 Features

- **RSS Feed Directory**: Discover feeds from 768+ curated sources across 34 categories and 25 countries
- **Smart RSS Aggregation**: Fetch and parse RSS feeds with intelligent error handling and content cleaning
- **AI-Powered Content Analysis**: Sentiment analysis, clickbait detection, and toxicity scoring using local transformers
- **Offline-First PWA**: Progressive Web App with service worker for offline reading
- **P2P Synchronization**: Device-to-device sync for feeds and reading progress
- **Intelligent Content Filtering**: Filter articles by sentiment, toxicity, and content quality
- **Responsive Design**: Modern UI built with Tailwind CSS and Radix UI components
- **Pull-to-Refresh**: Native mobile-like refresh experience
- **Unread Management**: Track reading progress across devices

## 🏗️ Architecture

### Core Technologies
- **Frontend**: Next.js 15 with React 19 and TypeScript
- **Styling**: Tailwind CSS 4 with custom component library
- **AI Processing**: Local transformers using @xenova/transformers
- **PWA**: Next-PWA with service worker and manifest
- **State Management**: React Context with local storage persistence

### Key Components
- **RSS Parser**: Robust XML parsing with error handling and content cleaning
- **Sentiment Analyzer**: Local AI model for content analysis
- **P2P Sync Service**: Device synchronization using WebRTC
- **Offline Storage**: IndexedDB and localStorage for data persistence
- **Worker System**: Background processing for AI tasks

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd infrss
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Development Commands

```bash
# Development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Development worker (for AI processing)
npm run dev:worker
```

## 📱 Usage

### Discovering RSS Feeds
1. Use the feed suggestion API to discover feeds:
   - Browse 768+ curated feeds
   - Search by category (tech, programming, food, etc.)
   - Filter by country (news from 25 countries)
   - Get intelligent suggestions based on topics
2. See [RSS_FEED_IMPORT.md](docs/RSS_FEED_IMPORT.md) for the complete feed directory

### Adding RSS Feeds
1. Navigate to the manage page (`/manage`)
2. Enter RSS feed URLs or use suggested feeds
3. Organize feeds into categories
4. Set content filtering preferences

### Reading Articles
- Browse articles by feed or category
- Use pull-to-refresh to update feeds
- Mark articles as read/unread
- Filter content by sentiment and quality scores

### Offline Reading
- Articles are cached for offline access
- Service worker handles background updates
- PWA installable on mobile devices

### P2P Synchronization
- Enable sync in settings
- Connect with other devices
- Share feed configurations and reading progress

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for custom configuration:

```env
# Optional: Custom CORS proxy
NEXT_PUBLIC_CORS_PROXY=https://your-cors-proxy.com

# Optional: P2P sync settings
NEXT_PUBLIC_SYNC_ENABLED=true
NEXT_PUBLIC_SYNC_INTERVAL=30000
```

### Client-Side RSS Fetching (Optimized for Hosting Costs)
The app is optimized to minimize server-side API calls when deployed on hosting platforms like Netlify:

- **Direct Fetch First**: RSS feeds are fetched directly from the client browser when possible
- **Automatic Proxy Fallback**: If a feed is CORS-restricted, the app automatically falls back to the server proxy
- **Smart Caching**: The app remembers which feeds require the proxy to optimize future requests
- **Cost Savings**: This approach reduces server-side function invocations by ~90% for feeds that support CORS

This optimization is enabled by default and requires no configuration. The app will automatically determine the best fetch method for each feed.

### PWA Configuration
The app includes a web manifest and service worker for PWA functionality. Customize the manifest in `public/manifest.webmanifest`.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── manage/            # Feed management page
│   └── layout.tsx         # Root layout
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   ├── ArticleCard.tsx    # Article display component
│   └── Navigation.tsx     # Navigation component
├── lib/                    # Core utilities
│   ├── rssUtils.ts        # RSS parsing and management
│   ├── p2pSync.ts         # P2P synchronization
│   ├── types.ts           # TypeScript interfaces
│   └── utils.ts           # Helper functions
└── workers/                # Background workers
    └── transformer-worker.ts # AI processing worker
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- AI processing with [Transformers.js](https://github.com/xenova/transformers.js)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For questions, issues, or feature requests:
- Open an issue on GitHub
- Check the documentation
- Review existing discussions

---

**InfRSS** - Intelligent RSS reading, reimagined for the modern web.

(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_c1e2638a._.js", {

"[project]/src/components/ui/input.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Input": (()=>Input)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Input = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        className: `border border-[var(--card-border)] rounded-xl px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--card-bg)] text-[var(--text-primary)] ${className}`,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
};
_c = Input;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Button": (()=>Button)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Button = ({ className = "", variant = "default", children, ...props })=>{
    const base = "font-semibold px-4 py-2 rounded-xl shadow-sm transition-colors";
    const variants = {
        default: "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white",
        destructive: "bg-red-600 hover:bg-red-700 text-white"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: `${base} ${variants[variant]} ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
};
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/card.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Card": (()=>Card),
    "CardContent": (()=>CardContent)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Card = ({ className, children, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `border border-[var(--card-border)] rounded-2xl shadow p-4 bg-[var(--card-bg)] ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
};
_c = Card;
const CardContent = ({ className, children, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `space-y-1 ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
};
_c1 = CardContent;
var _c, _c1;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/spinner.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Spinner": (()=>Spinner)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Spinner = ({ size = "md", className = "", ...props })=>{
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex items-center justify-center ${className}`,
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `${sizeClasses[size]} border-4 border-[var(--accent)] border-t-[var(--primary)] rounded-full animate-spin`,
            style: {
                borderWidth: '3px'
            }
        }, void 0, false, {
            fileName: "[project]/src/components/ui/spinner.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/spinner.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
};
_c = Spinner;
var _c;
__turbopack_context__.k.register(_c, "Spinner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/rssUtils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// lib/rssUtils.ts
__turbopack_context__.s({
    "fetchAndParseRSS": (()=>fetchAndParseRSS),
    "fetchWithCors": (()=>fetchWithCors),
    "getFeedUrlFromHtml": (()=>getFeedUrlFromHtml),
    "loadFeedsFromStorage": (()=>loadFeedsFromStorage),
    "parseOPMLFile": (()=>parseOPMLFile),
    "removeFeedFromStorage": (()=>removeFeedFromStorage),
    "saveFeedToStorage": (()=>saveFeedToStorage)
});
// Helper function to fetch with timeout
async function fetchWithTimeout(url, options = {}, timeout = 15000) {
    const controller = new AbortController();
    const id = setTimeout(()=>controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
            headers: {
                ...options.headers,
                'User-Agent': 'Mozilla/5.0 (compatible; InfrssBot/1.0; +https://infrss.vercel.app)'
            }
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error(`Request timed out after ${timeout}ms for URL: ${url}`);
            }
            throw new Error(`Failed to fetch ${url}: ${error.message}`);
        }
        throw error;
    }
}
// Batch process promises with concurrency limit
async function batchProcess(items, processItem, concurrency = 3) {
    const results = [];
    const inProgress = new Set();
    for (const item of items){
        if (inProgress.size >= concurrency) {
            await Promise.race(inProgress);
        }
        const processPromise = Promise.resolve().then(async ()=>{
            try {
                results.push(await processItem(item));
            } finally{
                inProgress.delete(processPromise);
            }
        });
        inProgress.add(processPromise);
    }
    await Promise.all(inProgress);
    return results;
}
async function getFeedUrlFromHtml(siteUrl) {
    try {
        const res = await fetchWithCors(siteUrl);
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const linkEl = doc.querySelector('link[type="application/rss+xml"], link[rel="alternate"][type="application/rss+xml"]');
        if (linkEl && linkEl.getAttribute("href")) {
            const href = linkEl.getAttribute("href");
            const url = new URL(href, siteUrl);
            return url.toString();
        }
        return null;
    } catch (err) {
        console.error("Failed to resolve feed URL:", err);
        return null;
    }
}
async function fetchAndParseRSS(url) {
    try {
        // Use our proxy endpoint to fetch the RSS feed
        const response = await fetchWithTimeout('/api/proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { data: text } = await response.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        // Check if it's a valid RSS feed
        const rssElement = xmlDoc.querySelector("rss, feed");
        if (!rssElement) {
            return null;
        }
        const channel = xmlDoc.querySelector("channel, feed");
        if (!channel) {
            return null;
        }
        const title = channel.querySelector("title")?.textContent || "";
        const items = Array.from(xmlDoc.querySelectorAll("item, entry")).map((item)=>{
            const itemTitle = item.querySelector("title")?.textContent || "";
            const itemLink = item.querySelector("link")?.textContent || item.querySelector("link")?.getAttribute("href") || "";
            const itemPubDate = item.querySelector("pubDate, published")?.textContent || "";
            const content = item.querySelector("content\\:encoded, content, description")?.textContent || "";
            // Try to get enclosure image first
            let thumbnail = undefined;
            const enclosureUrl = item.querySelector("enclosure[type^='image']")?.getAttribute("url");
            if (enclosureUrl) {
                thumbnail = `/api/proxy?url=${encodeURIComponent(enclosureUrl)}`;
            }
            // If no enclosure image, try media:content
            if (!thumbnail) {
                const mediaContent = item.querySelector("media\\:content[type^='image'], media\\:thumbnail");
                const mediaUrl = mediaContent?.getAttribute("url");
                if (mediaUrl) {
                    thumbnail = `/api/proxy?url=${encodeURIComponent(mediaUrl)}`;
                }
            }
            return {
                title: itemTitle,
                link: itemLink,
                pubDate: itemPubDate,
                thumbnail,
                content
            };
        });
        // Process thumbnails in batches with increased concurrency
        const processedItems = await batchProcess(items, async (item)=>{
            const result = {
                ...item
            };
            // Skip article page fetch if we already have a thumbnail from RSS
            if (result.thumbnail) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { content, ...cleanResult } = result;
                return cleanResult;
            }
            // Only try to fetch article page if we have a link and no thumbnail yet
            if (result.link) {
                try {
                    const pageResponse = await fetchWithTimeout('/api/proxy', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            url: result.link
                        })
                    }, 10000); // Reduced timeout since we're processing more concurrently
                    if (pageResponse.ok) {
                        const { data: html } = await pageResponse.json();
                        // Try to get Open Graph image first (most reliable)
                        const ogMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i) || html.match(/<meta[^>]*content="([^"]*)"[^>]*property="og:image"[^>]*>/i);
                        if (ogMatch && ogMatch[1]) {
                            result.thumbnail = `/api/proxy?url=${encodeURIComponent(ogMatch[1])}`;
                        } else {
                            // Try to get Twitter image as fallback
                            const twitterMatch = html.match(/<meta[^>]*name="twitter:image"[^>]*content="([^"]*)"[^>]*>/i) || html.match(/<meta[^>]*content="([^"]*)"[^>]*name="twitter:image"[^>]*>/i);
                            if (twitterMatch && twitterMatch[1]) {
                                result.thumbnail = `/api/proxy?url=${encodeURIComponent(twitterMatch[1])}`;
                            } else if (result.content) {
                                // Last resort: try to find first image in content
                                const imgMatch = result.content.match(/<img[^>]*src="([^"]*)"[^>]*>/i);
                                if (imgMatch && imgMatch[1]) {
                                    result.thumbnail = `/api/proxy?url=${encodeURIComponent(imgMatch[1])}`;
                                }
                            }
                        }
                    }
                } catch (error) {
                    // Don't log timeout errors as they're expected occasionally
                    if (!(error instanceof Error && error.message.includes('timed out'))) {
                        console.error("Error fetching article page:", error);
                    }
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { content, ...cleanResult } = result;
            return cleanResult;
        }, 5); // Increased concurrency from 3 to 5
        return {
            title,
            items: processedItems
        };
    } catch (error) {
        console.error("Error fetching RSS:", error);
        return null;
    }
}
const fetchWithCors = async (url)=>{
    return fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
};
function saveFeedToStorage(feed) {
    const stored = localStorage.getItem("feeds");
    const current = stored ? JSON.parse(stored) : [];
    if (!current.find((f)=>f.url === feed.url)) {
        const updated = [
            ...current,
            feed
        ];
        localStorage.setItem("feeds", JSON.stringify(updated));
    }
}
function loadFeedsFromStorage() {
    const stored = localStorage.getItem("feeds");
    return stored ? JSON.parse(stored) : [];
}
function removeFeedFromStorage(url) {
    const stored = localStorage.getItem("feeds");
    const current = stored ? JSON.parse(stored) : [];
    const updated = current.filter((f)=>f.url !== url);
    localStorage.setItem("feeds", JSON.stringify(updated));
}
async function parseOPMLFile(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = async (e)=>{
            try {
                const text = e.target?.result;
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text, "text/xml");
                // Check if it's a valid OPML file
                const opmlElement = xmlDoc.querySelector("opml");
                if (!opmlElement) {
                    throw new Error("Invalid OPML file");
                }
                // Get all outline elements that have an xmlUrl attribute (these are the feed entries)
                const outlines = Array.from(xmlDoc.querySelectorAll("outline[xmlUrl]"));
                const feeds = outlines.map((outline)=>({
                        title: outline.getAttribute("title") || outline.getAttribute("text") || "",
                        url: outline.getAttribute("xmlUrl") || ""
                    })).filter((feed)=>feed.url !== ""); // Filter out any entries without URLs
                resolve(feeds);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = ()=>reject(new Error("Failed to read file"));
        reader.readAsText(file);
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/useTransformerWorker.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// lib/useTransformerWorker.ts
__turbopack_context__.s({
    "suggestFeedsWithWorker": (()=>suggestFeedsWithWorker)
});
// Fallback feed suggestions when API fails
const FALLBACK_FEEDS = [
    {
        title: "TechCrunch",
        url: "https://techcrunch.com/feed/"
    },
    {
        title: "The Verge",
        url: "https://www.theverge.com/rss/index.xml"
    },
    {
        title: "Wired",
        url: "https://www.wired.com/feed/rss"
    },
    {
        title: "Ars Technica",
        url: "https://arstechnica.com/feed/"
    },
    {
        title: "Engadget",
        url: "https://www.engadget.com/rss.xml"
    }
];
// Direct topic-based suggestions for common topics
const TOPIC_BASED_FEEDS = {
    "tech": [
        {
            title: "TechCrunch",
            url: "https://techcrunch.com/feed/"
        },
        {
            title: "The Verge",
            url: "https://www.theverge.com/rss/index.xml"
        },
        {
            title: "Wired",
            url: "https://www.wired.com/feed/rss"
        },
        {
            title: "Ars Technica",
            url: "https://arstechnica.com/feed/"
        },
        {
            title: "Engadget",
            url: "https://www.engadget.com/rss.xml"
        }
    ],
    "programming": [
        {
            title: "Dev.to",
            url: "https://dev.to/feed/"
        },
        {
            title: "CSS-Tricks",
            url: "https://css-tricks.com/feed/"
        },
        {
            title: "Smashing Magazine",
            url: "https://www.smashingmagazine.com/feed/"
        },
        {
            title: "JavaScript Weekly",
            url: "https://javascriptweekly.com/rss/"
        },
        {
            title: "React Blog",
            url: "https://reactjs.org/feed.xml"
        }
    ],
    "news": [
        {
            title: "BBC News",
            url: "http://feeds.bbci.co.uk/news/rss.xml"
        },
        {
            title: "Reuters",
            url: "https://www.reutersagency.com/feed/"
        },
        {
            title: "The Guardian",
            url: "https://www.theguardian.com/international/rss"
        },
        {
            title: "NPR News",
            url: "https://feeds.npr.org/1001/rss.xml"
        },
        {
            title: "CNN",
            url: "https://rss.cnn.com/rss/cnn_topstories.rss"
        }
    ],
    "science": [
        {
            title: "Scientific American",
            url: "https://www.scientificamerican.com/feed/"
        },
        {
            title: "Science Daily",
            url: "https://www.sciencedaily.com/rss/all.xml"
        },
        {
            title: "Nature",
            url: "https://www.nature.com/nature.rss"
        },
        {
            title: "Science News",
            url: "https://www.sciencenews.org/feed"
        },
        {
            title: "New Scientist",
            url: "https://www.newscientist.com/feed/"
        }
    ]
};
async function suggestFeedsWithWorker(topic, feeds) {
    // Check if we have direct topic-based suggestions
    const normalizedTopic = topic.toLowerCase().trim();
    for (const [key, topicFeeds] of Object.entries(TOPIC_BASED_FEEDS)){
        if (normalizedTopic.includes(key)) {
            console.log(`Using direct topic-based suggestions for: ${key}`);
            return topicFeeds;
        }
    }
    try {
        // Add a timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), 10000); // 10 second timeout
        console.log(`Fetching suggestions for topic: ${topic}`);
        const response = await fetch("/api/suggest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                topic,
                feeds
            }),
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!response.ok) {
            console.warn(`API responded with status: ${response.status}`);
            return FALLBACK_FEEDS;
        }
        const data = await response.json();
        console.log(`Received ${data.length} suggestions from API`);
        if (data.length === 0) {
            console.warn("API returned empty suggestions array");
            return FALLBACK_FEEDS;
        }
        return data;
    } catch (err) {
        console.error("suggestFeedsWithWorker error:", err);
        return FALLBACK_FEEDS;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/manage/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/manage/page.tsx
__turbopack_context__.s({
    "default": (()=>ManagePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/spinner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rssUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$useTransformerWorker$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/useTransformerWorker.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
// SuggestedFeed component to reduce re-renders
const SuggestedFeed = ({ feed, onSubscribe })=>{
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SuggestedFeed.useEffect": ()=>{
            setMounted(true);
        }
    }["SuggestedFeed.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "shadow-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
            className: "p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-6 h-6 relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: `https://www.google.com/s2/favicons?sz=32&domain_url=${feed.url}`,
                                    className: "object-contain",
                                    alt: "favicon",
                                    fill: true,
                                    unoptimized: true
                                }, void 0, false, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 35,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 34,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-medium text-[var(--text-primary)]",
                                        children: feed.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-[var(--text-secondary)] break-all",
                                        children: feed.url
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "default",
                        onClick: ()=>onSubscribe(feed),
                        className: "whitespace-nowrap",
                        children: "Subscribe"
                    }, void 0, false, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/manage/page.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/manage/page.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, feed.url, false, {
        fileName: "[project]/src/app/manage/page.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
};
_s(SuggestedFeed, "LrrVfNW3d1raFE0BNzCTILYmIfo=");
_c = SuggestedFeed;
// SavedFeed component
const SavedFeed = ({ feed, onRemove })=>{
    _s1();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SavedFeed.useEffect": ()=>{
            setMounted(true);
        }
    }["SavedFeed.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "shadow-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
            className: "p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-6 h-6 relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: `https://www.google.com/s2/favicons?sz=32&domain_url=${feed.url}`,
                                    className: "object-contain",
                                    alt: "favicon",
                                    fill: true,
                                    unoptimized: true
                                }, void 0, false, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 77,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 76,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-medium text-[var(--text-primary)]",
                                        children: feed.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-[var(--text-secondary)] break-all",
                                        children: feed.url
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "destructive",
                        onClick: ()=>onRemove(feed.url),
                        className: "whitespace-nowrap",
                        children: "Remove"
                    }, void 0, false, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/manage/page.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/manage/page.tsx",
            lineNumber: 72,
            columnNumber: 7
        }, this)
    }, feed.url, false, {
        fileName: "[project]/src/app/manage/page.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
};
_s1(SavedFeed, "LrrVfNW3d1raFE0BNzCTILYmIfo=");
_c1 = SavedFeed;
function ManagePage() {
    _s2();
    const [feedUrlInput, setFeedUrlInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [topic, setTopic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [suggestedFeeds, setSuggestedFeeds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [savedFeeds, setSavedFeeds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSuggesting, setIsSuggesting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isImporting, setIsImporting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Load saved feeds on initial render
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ManagePage.useEffect": ()=>{
            const feeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadFeedsFromStorage"])();
            setSavedFeeds(feeds);
        }
    }["ManagePage.useEffect"], []);
    // Handle adding a feed
    const handleAddFeed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ManagePage.useCallback[handleAddFeed]": async ()=>{
            if (!feedUrlInput.trim()) {
                setError("Please enter a feed URL");
                return;
            }
            setIsLoading(true);
            setError(null);
            try {
                // Check if the URL is already in the saved feeds
                if (savedFeeds.some({
                    "ManagePage.useCallback[handleAddFeed]": (feed)=>feed.url === feedUrlInput.trim()
                }["ManagePage.useCallback[handleAddFeed]"])) {
                    setError("This feed is already added");
                    setIsLoading(false);
                    return;
                }
                // Try to parse the feed directly first
                let feedData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAndParseRSS"])(feedUrlInput.trim());
                // If that fails, try to extract the feed URL from the HTML
                if (!feedData) {
                    const feedUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeedUrlFromHtml"])(feedUrlInput.trim());
                    if (feedUrl) {
                        feedData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAndParseRSS"])(feedUrl);
                    }
                }
                if (feedData) {
                    const newFeed = {
                        title: feedData.title || new URL(feedUrlInput.trim()).hostname,
                        url: feedUrlInput.trim()
                    };
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveFeedToStorage"])(newFeed);
                    setSavedFeeds({
                        "ManagePage.useCallback[handleAddFeed]": (prev)=>[
                                ...prev,
                                newFeed
                            ]
                    }["ManagePage.useCallback[handleAddFeed]"]);
                    setFeedUrlInput("");
                } else {
                    setError("Could not find a valid RSS feed at this URL");
                }
            } catch (error) {
                console.error("Error adding feed:", error);
                setError("Error adding feed. Please check the URL and try again.");
            } finally{
                setIsLoading(false);
            }
        }
    }["ManagePage.useCallback[handleAddFeed]"], [
        feedUrlInput,
        savedFeeds
    ]);
    // Handle suggesting feeds
    const handleSuggestFeeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ManagePage.useCallback[handleSuggestFeeds]": async ()=>{
            if (!topic.trim()) {
                setError("Please enter a topic");
                return;
            }
            setIsSuggesting(true);
            setError(null);
            try {
                const feeds = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$useTransformerWorker$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["suggestFeedsWithWorker"])(topic.trim(), []);
                setSuggestedFeeds(feeds);
            } catch (error) {
                console.error("Error suggesting feeds:", error);
                setError("Error suggesting feeds. Please try again.");
            } finally{
                setIsSuggesting(false);
            }
        }
    }["ManagePage.useCallback[handleSuggestFeeds]"], [
        topic
    ]);
    // Handle subscribing to a suggested feed
    const handleSubscribeToFeed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ManagePage.useCallback[handleSubscribeToFeed]": (feed)=>{
            // Check if the feed is already in the saved feeds
            if (savedFeeds.some({
                "ManagePage.useCallback[handleSubscribeToFeed]": (savedFeed)=>savedFeed.url === feed.url
            }["ManagePage.useCallback[handleSubscribeToFeed]"])) {
                setError("This feed is already added");
                return;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveFeedToStorage"])(feed);
            setSavedFeeds({
                "ManagePage.useCallback[handleSubscribeToFeed]": (prev)=>[
                        ...prev,
                        feed
                    ]
            }["ManagePage.useCallback[handleSubscribeToFeed]"]);
        }
    }["ManagePage.useCallback[handleSubscribeToFeed]"], [
        savedFeeds
    ]);
    // Handle removing a feed
    const handleRemoveFeed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ManagePage.useCallback[handleRemoveFeed]": (url)=>{
            const updatedFeeds = savedFeeds.filter({
                "ManagePage.useCallback[handleRemoveFeed].updatedFeeds": (feed)=>feed.url !== url
            }["ManagePage.useCallback[handleRemoveFeed].updatedFeeds"]);
            localStorage.setItem("feeds", JSON.stringify(updatedFeeds));
            setSavedFeeds(updatedFeeds);
        }
    }["ManagePage.useCallback[handleRemoveFeed]"], [
        savedFeeds
    ]);
    // Handle importing OPML file
    const handleImportOPML = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ManagePage.useCallback[handleImportOPML]": async (event)=>{
            const file = event.target.files?.[0];
            if (!file) return;
            setIsImporting(true);
            setError(null);
            try {
                const feeds = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseOPMLFile"])(file);
                // Filter out feeds that are already saved
                const newFeeds = feeds.filter({
                    "ManagePage.useCallback[handleImportOPML].newFeeds": (feed)=>!savedFeeds.some({
                            "ManagePage.useCallback[handleImportOPML].newFeeds": (savedFeed)=>savedFeed.url === feed.url
                        }["ManagePage.useCallback[handleImportOPML].newFeeds"])
                }["ManagePage.useCallback[handleImportOPML].newFeeds"]);
                // Save new feeds
                newFeeds.forEach({
                    "ManagePage.useCallback[handleImportOPML]": (feed)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveFeedToStorage"])(feed)
                }["ManagePage.useCallback[handleImportOPML]"]);
                // Update state with new feeds
                setSavedFeeds({
                    "ManagePage.useCallback[handleImportOPML]": (prev)=>[
                            ...prev,
                            ...newFeeds
                        ]
                }["ManagePage.useCallback[handleImportOPML]"]);
                // Clear the file input
                event.target.value = '';
                // Show success message
                setError(`Successfully imported ${newFeeds.length} new feeds${newFeeds.length < feeds.length ? ` (${feeds.length - newFeeds.length} were already saved)` : ''}`);
            } catch (error) {
                console.error("Error importing OPML file:", error);
                setError("Error importing OPML file. Please make sure it's a valid OPML file.");
            } finally{
                setIsImporting(false);
            }
        }
    }["ManagePage.useCallback[handleImportOPML]"], [
        savedFeeds
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "space-y-8 px-4 max-w-4xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-semibold text-[var(--text-primary)]",
                                    children: "Add Feed"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 249,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col sm:flex-row gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "url",
                                            placeholder: "Enter RSS feed URL",
                                            value: feedUrlInput,
                                            onChange: (e)=>setFeedUrlInput(e.target.value),
                                            className: "flex-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/manage/page.tsx",
                                            lineNumber: 251,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "default",
                                            onClick: handleAddFeed,
                                            disabled: isLoading,
                                            className: "w-full sm:w-auto",
                                            children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
                                                size: "sm"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/manage/page.tsx",
                                                lineNumber: 264,
                                                columnNumber: 30
                                            }, this) : "Add Feed"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/manage/page.tsx",
                                            lineNumber: 258,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 250,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "file",
                                            accept: ".opml,.xml",
                                            onChange: handleImportOPML,
                                            className: "flex-1",
                                            disabled: isImporting
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/manage/page.tsx",
                                            lineNumber: 268,
                                            columnNumber: 15
                                        }, this),
                                        isImporting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
                                            size: "sm"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/manage/page.tsx",
                                            lineNumber: 275,
                                            columnNumber: 31
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 267,
                                    columnNumber: 13
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `text-sm ${error.includes("Successfully") ? "text-green-500" : "text-red-500"}`,
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 277,
                                    columnNumber: 23
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/manage/page.tsx",
                            lineNumber: 248,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-semibold text-[var(--text-primary)]",
                                    children: "Suggest Feeds"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 281,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col sm:flex-row gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "text",
                                            placeholder: "Enter a topic (e.g., 'tech news', 'programming')",
                                            value: topic,
                                            onChange: (e)=>setTopic(e.target.value),
                                            className: "flex-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/manage/page.tsx",
                                            lineNumber: 283,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "default",
                                            onClick: handleSuggestFeeds,
                                            disabled: isSuggesting,
                                            className: "w-full sm:w-auto",
                                            children: isSuggesting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
                                                size: "sm"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/manage/page.tsx",
                                                lineNumber: 296,
                                                columnNumber: 33
                                            }, this) : "Suggest"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/manage/page.tsx",
                                            lineNumber: 290,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 282,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/manage/page.tsx",
                            lineNumber: 280,
                            columnNumber: 11
                        }, this),
                        suggestedFeeds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium text-[var(--text-primary)]",
                                    children: "Suggested Feeds"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 303,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-3",
                                    children: suggestedFeeds.map((feed)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SuggestedFeed, {
                                            feed: feed,
                                            onSubscribe: handleSubscribeToFeed
                                        }, feed.url, false, {
                                            fileName: "[project]/src/app/manage/page.tsx",
                                            lineNumber: 306,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 304,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/manage/page.tsx",
                            lineNumber: 302,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/manage/page.tsx",
                    lineNumber: 247,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/manage/page.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold text-[var(--text-primary)]",
                        children: "Your Feeds"
                    }, void 0, false, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 315,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3",
                        children: savedFeeds.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: "shadow-sm",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "p-4 text-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[var(--text-secondary)]",
                                    children: "No feeds added yet. Add some feeds to get started."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 320,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 319,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/manage/page.tsx",
                            lineNumber: 318,
                            columnNumber: 13
                        }, this) : savedFeeds.map((feed)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SavedFeed, {
                                feed: feed,
                                onRemove: handleRemoveFeed
                            }, feed.url, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 325,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 316,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/manage/page.tsx",
                lineNumber: 314,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/manage/page.tsx",
        lineNumber: 245,
        columnNumber: 5
    }, this);
}
_s2(ManagePage, "uw84U2WzR7JtcujtsvYPQahB6Bg=");
_c2 = ManagePage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "SuggestedFeed");
__turbopack_context__.k.register(_c1, "SavedFeed");
__turbopack_context__.k.register(_c2, "ManagePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_c1e2638a._.js.map
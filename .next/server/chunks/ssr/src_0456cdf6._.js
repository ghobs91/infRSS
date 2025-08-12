module.exports = {

"[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Button": (()=>Button)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const Button = ({ className = "", variant = "default", size = "md", children, ...props })=>{
    const base = "font-semibold rounded-xl shadow-sm transition-colors";
    const sizes = {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg"
    };
    const variants = {
        default: "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white",
        destructive: "bg-red-600 hover:bg-red-700 text-white",
        ghost: "bg-transparent hover:bg-[var(--muted)] text-[var(--foreground)]"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: `${base} ${sizes[size]} ${variants[variant]} ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
};
}}),
"[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Card": (()=>Card),
    "CardContent": (()=>CardContent)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const Card = ({ className, children, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `border border-[var(--card-border)] rounded-2xl shadow p-4 bg-[var(--card-bg)] ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
};
const CardContent = ({ className, children, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `space-y-1 ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
};
}}),
"[project]/src/components/ui/spinner.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Spinner": (()=>Spinner)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const Spinner = ({ size = "md", className = "", ...props })=>{
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex items-center justify-center ${className}`,
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
}}),
"[project]/src/lib/rssUtils.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// lib/rssUtils.ts
__turbopack_context__.s({
    "discoverFeedUrlWithFallbacks": (()=>discoverFeedUrlWithFallbacks),
    "fetchAndParseRSS": (()=>fetchAndParseRSS),
    "fetchWithCors": (()=>fetchWithCors),
    "filterArticlesBySentiment": (()=>filterArticlesBySentiment),
    "getFeedUrlFromHtml": (()=>getFeedUrlFromHtml),
    "groupArticlesByCategory": (()=>groupArticlesByCategory),
    "loadCategoriesFromStorage": (()=>loadCategoriesFromStorage),
    "loadFeedsFromStorage": (()=>loadFeedsFromStorage),
    "loadUserPreferences": (()=>loadUserPreferences),
    "parseOPMLFile": (()=>parseOPMLFile),
    "saveCategoriesToStorage": (()=>saveCategoriesToStorage),
    "saveFeedToStorage": (()=>saveFeedToStorage),
    "saveUserPreferences": (()=>saveUserPreferences)
});
// ... (Keep existing interfaces and other functions like getFeedUrlFromHtml, extractThumbnail, etc.)
// Import fetchWithCors if it's not already implicitly available in the scope
// (Assuming it's exported from the same file or imported correctly)
// Helper function to clean XML content before parsing
function cleanXMLContent(xmlString) {
    // First, normalize line endings
    xmlString = xmlString.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    // Handle CDATA sections that might contain problematic sequences
    // Use [\s\S]*? to match any character including newlines non-greedily
    xmlString = xmlString.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (match, content)=>{
        // Escape any ]] sequences within CDATA content by splitting the CDATA section
        const escapedContent = content.replace(/\]\]>/g, ']]]]><![CDATA[>');
        return `<![CDATA[${escapedContent}]]>`;
    });
    // Fix malformed CDATA sections that might cause parsing errors
    xmlString = xmlString.replace(/<!\[CDATA\[([^\]>]*?)(?!\]\]>)/g, (match, content)=>{
        // If the CDATA section is not properly closed, close it
        if (!content.includes(']]>')) {
            return `<!\[CDATA\[${content}]]>`;
        }
        return match;
    });
    // Handle cases where ]] sequences appear outside of CDATA sections
    // This is a common issue in RSS feeds where content contains these sequences
    // We'll use a more aggressive approach to catch all problematic sequences
    // First, let's handle the most common case: ]] sequences in content
    // Replace any ]] that's not part of a CDATA section with a safe alternative
    xmlString = xmlString.replace(/\]\]/g, (match, offset)=>{
        // Check if this ]] is part of a CDATA section
        const before = xmlString.substring(0, offset);
        const lastCDataStart = before.lastIndexOf('<![CDATA[');
        const lastCDataEnd = before.lastIndexOf(']]>');
        // If we're inside a CDATA section, don't replace
        if (lastCDataStart > lastCDataEnd) {
            return match;
        }
        // Otherwise, escape it
        return ']]]]><![CDATA[>';
    });
    // Now let's also handle any remaining problematic sequences
    // Some feeds might have HTML content with these sequences
    xmlString = xmlString.replace(/\]\]>/g, (match, offset)=>{
        const before = xmlString.substring(0, offset);
        const lastCDataStart = before.lastIndexOf('<![CDATA[');
        const lastCDataEnd = before.lastIndexOf(']]>');
        // If we're inside a CDATA section, don't replace
        if (lastCDataStart > lastCDataEnd) {
            return match;
        }
        // Otherwise, escape it
        return ']]]]><![CDATA[>';
    });
    // Additional safety: wrap any content that might contain problematic sequences
    // This is a more aggressive approach for very problematic feeds
    xmlString = xmlString.replace(/(<description>|<content>|<summary>)(.*?)(<\/description>|<\/content>|<\/summary>)/g, (match, openTag, content, closeTag)=>{
        // If content contains problematic sequences, wrap it in CDATA
        if (content.includes(']]') || content.includes(']]>')) {
            return `${openTag}<![CDATA[${content}]]>${closeTag}`;
        }
        return match;
    });
    // Remove any invalid XML characters (Control characters except Tab, LF, CR)
    // XML 1.0: #x9 | #xA | #xD | [#x20-#xD7FF] | [#xE000-#xFFFD] | [#x10000-#x10FFFF]
    // We remove characters in the ranges #x0-#x8, #xB-#xC, #xE-#x1F, #x7F-#x84, #x86-#x9F
    xmlString = xmlString.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F]/g, '');
    return xmlString;
}
// Helper function to extract thumbnail from RSS item
function extractThumbnailFromItem(item) {
    // Try to get enclosure image first
    let thumbnail = item.querySelector("enclosure[type^='image']")?.getAttribute("url");
    // If no enclosure image, try media:content or media:thumbnail
    if (!thumbnail) {
        try {
            // Try different approaches for media elements
            // First, try with proper namespace handling
            const mediaContent = item.querySelector("media\\:content[type^='image']") || item.querySelector("media\\:thumbnail");
            if (mediaContent) {
                thumbnail = mediaContent.getAttribute("url");
            } else {
                // Fallback: search for any element with 'media' in the tag name
                const allElements = item.querySelectorAll("*");
                for (const element of allElements){
                    if (element.tagName.toLowerCase().includes('media') && element.getAttribute('type')?.startsWith('image')) {
                        thumbnail = element.getAttribute('url');
                        break;
                    }
                }
            }
        } catch (error) {
            console.warn('Error extracting thumbnail from media elements:', error);
        }
    }
    return thumbnail || undefined;
}
async function fetchAndParseRSS(url) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), 10000); // 10 second timeout
        // *** Use fetchWithCors here instead of direct fetch ***
        const response = await fetchWithCors(url);
        // Note: You might need to adjust how you handle the signal if fetchWithCors doesn't support it directly.
        // If the proxy handles timeouts, you might remove the AbortController here.
        // If the proxy *doesn't* handle timeouts, the timeout here won't abort the *proxy's* fetch,
        // only the fetch *to* the proxy. You might need timeout logic within the /api/proxy endpoint itself.
        // For now, let's assume the proxy forwards the request quickly or handles its own timeout.
        clearTimeout(timeoutId); // Keep this for the fetch *to* the proxy
        if (!response.ok) {
            // Consider logging the response body for more details on proxy errors
            const errorText = await response.text().catch(()=>'Could not read error response');
            console.error(`Proxy fetch failed for ${url}. Status: ${response.status}, Body: ${errorText}`);
            // If it's a 404, the feed might not exist - try to discover the correct URL
            if (response.status === 404) {
                console.log(`Feed not found at ${url}, attempting to discover correct RSS URL...`);
                try {
                    const discoveredUrl = await discoverFeedUrlWithFallbacks(url);
                    if (discoveredUrl && discoveredUrl !== url) {
                        console.log(`Discovered RSS feed at: ${discoveredUrl}`);
                        return await fetchAndParseRSS(discoveredUrl);
                    }
                } catch (discoverError) {
                    console.warn(`Failed to discover RSS feed for ${url}:`, discoverError);
                }
            }
            // Don't throw an error, just return null to allow the app to continue
            return null;
        }
        let text = await response.text();
        // Check if the response is empty
        if (!text.trim()) {
            console.error(`Empty response from ${url}`);
            return null;
        }
        // Try to parse as JSON first, in case the XML is wrapped in a JSON object
        try {
            const jsonResponse = JSON.parse(text);
            if (jsonResponse.data && typeof jsonResponse.data === 'string') {
                text = jsonResponse.data;
            }
        } catch  {
        // If it's not JSON, continue with the original text
        }
        // Check if the response starts with XML declaration or a tag
        if (!text.trim().startsWith('<?xml') && !text.trim().startsWith('<')) {
            console.error(`Response from ${url} is not XML. First 100 chars: ${text.substring(0, 100)}`);
            return null;
        }
        // Add media namespace if it's missing
        if (text.includes('media:content') && !text.includes('xmlns:media')) {
            text = text.replace(/<rss[^>]*>/, (match)=>`${match.replace('>', ' xmlns:media="http://search.yahoo.com/mrss/">')}`);
        }
        // Fix unclosed CDATA sections
        text = text.replace(/<!\[CDATA\[([^\]>]*?)(?!\]\]>)/g, (match, content)=>{
            // If the CDATA section is not properly closed, close it
            if (!content.includes(']]>')) {
                return `<!\[CDATA\[${content}]]>`;
            }
            return match;
        });
        // Escape unescaped ampersands in content
        text = text.replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;');
        // Clean the XML content before parsing
        const cleanedXML = cleanXMLContent(text);
        // Additional safety: try to fix any remaining problematic sequences
        let finalXML = cleanedXML;
        // If the cleaning didn't work, try a more aggressive approach
        if (cleanedXML.includes(']]>') && !cleanedXML.includes('<![CDATA[')) {
            // Wrap the entire content in CDATA if it contains problematic sequences
            finalXML = `<![CDATA[${cleanedXML}]]>`;
        }
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(finalXML, "text/xml");
        // Check for parsing errors
        const parseError = xmlDoc.querySelector("parsererror");
        if (parseError) {
            console.error(`XML parsing error for ${url}:`, parseError.textContent);
            // Try to extract any useful information despite the error
            // Sometimes the parser can still extract some content even with errors
            const hasItems = xmlDoc.querySelector("item, entry");
            if (!hasItems) {
                return null; // Only fail completely if we can't get any items
            }
            console.warn(`Continuing with potentially malformed XML for ${url}`);
        }
        // Try to find the channel title
        const channelTitle = xmlDoc.querySelector("channel > title")?.textContent || xmlDoc.querySelector("feed > title")?.textContent || new URL(url).hostname.replace("www.", "");
        // Handle both RSS and Atom feeds
        let items;
        if (xmlDoc.querySelector("item")) {
            // RSS format
            items = Array.from(xmlDoc.querySelectorAll("item"));
        } else if (xmlDoc.querySelector("entry")) {
            // Atom format
            items = Array.from(xmlDoc.querySelectorAll("entry"));
        } else {
            console.error(`No items found in feed at ${url}`);
            return null;
        }
        const parsedItems = items.map((item, index)=>{
            const title = item.querySelector("title")?.textContent?.trim() || item.querySelector("title")?.textContent?.trim() || `Untitled Article ${index + 1}`;
            const link = item.querySelector("link")?.textContent?.trim() || item.querySelector("link")?.getAttribute("href") || item.querySelector("id")?.textContent?.trim() || "";
            const pubDate = item.querySelector("pubDate")?.textContent?.trim() || item.querySelector("published")?.textContent?.trim() || item.querySelector("updated")?.textContent?.trim() || new Date().toISOString();
            const content = item.querySelector("description")?.textContent?.trim() || item.querySelector("content")?.textContent?.trim() || item.querySelector("summary")?.textContent?.trim() || "";
            const thumbnail = extractThumbnailFromItem(item);
            const sourceDomain = link ? new URL(link).hostname.replace("www.", "") : "Unknown Source";
            return {
                id: `${url}-${index}`,
                title,
                link,
                pubDate,
                thumbnail,
                content,
                sourceDomain,
                readStatus: 'unread',
                tags: []
            };
        });
        return {
            title: channelTitle,
            items: parsedItems
        };
    } catch (error) {
        console.error(`Error fetching and parsing RSS from ${url}:`, error);
        return null;
    }
}
const fetchWithCors = async (url)=>{
    // Make sure your proxy endpoint is correct
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
    console.log(`Fetching via proxy: ${proxyUrl}`); // Add logging
    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) {
            // Log proxy errors specifically
            console.error(`Proxy request to ${proxyUrl} failed with status ${response.status}`);
        }
        return response;
    } catch (proxyError) {
        console.error(`Error fetching from proxy URL ${proxyUrl}:`, proxyError);
        throw proxyError; // Re-throw the error to be caught by fetchAndParseRSS
    }
};
function loadFeedsFromStorage() {
    try {
        const feeds = localStorage.getItem("feeds");
        if (feeds) {
            const parsedFeeds = JSON.parse(feeds);
            // Ensure all feeds have IDs for backward compatibility
            return parsedFeeds.map((feed, index)=>({
                    ...feed,
                    id: feed.id || `feed-${index}`,
                    category: feed.category || 'Uncategorized',
                    tags: feed.tags || [],
                    lastFetched: feed.lastFetched || 0,
                    isActive: feed.isActive !== false
                }));
        }
        return [];
    } catch (error) {
        console.error("Error loading feeds from storage:", error);
        return [];
    }
}
function saveFeedToStorage(feed) {
    try {
        const feeds = loadFeedsFromStorage();
        const existingIndex = feeds.findIndex((f)=>f.url === feed.url);
        if (existingIndex >= 0) {
            feeds[existingIndex] = {
                ...feeds[existingIndex],
                ...feed
            };
        } else {
            feeds.push(feed);
        }
        localStorage.setItem("feeds", JSON.stringify(feeds));
    } catch (error) {
        console.error("Error saving feed to storage:", error);
    }
}
function loadCategoriesFromStorage() {
    try {
        const categories = localStorage.getItem("categories");
        if (categories) {
            return JSON.parse(categories);
        }
        // Return default categories
        return [
            {
                id: 'uncategorized',
                name: 'Uncategorized',
                color: '#6B7280',
                createdAt: Date.now()
            },
            {
                id: 'tech',
                name: 'Technology',
                color: '#3B82F6',
                createdAt: Date.now()
            },
            {
                id: 'news',
                name: 'News',
                color: '#EF4444',
                createdAt: Date.now()
            },
            {
                id: 'science',
                name: 'Science',
                color: '#10B981',
                createdAt: Date.now()
            },
            {
                id: 'programming',
                name: 'Programming',
                color: '#8B5CF6',
                createdAt: Date.now()
            }
        ];
    } catch (error) {
        console.error("Error loading categories from storage:", error);
        return [];
    }
}
function saveCategoriesToStorage(categories) {
    try {
        localStorage.setItem("categories", JSON.stringify(categories));
    } catch (error) {
        console.error("Error saving categories to storage:", error);
    }
}
function loadUserPreferences() {
    try {
        const preferences = localStorage.getItem("userPreferences");
        if (preferences) {
            return JSON.parse(preferences);
        }
        // Return default preferences
        return {
            id: 'default',
            sentimentFilter: {
                enabled: false,
                minSentiment: -0.5,
                maxToxicity: 0.7,
                hideClickbait: false,
                hideRagebait: false
            },
            categories: loadCategoriesFromStorage(),
            syncEnabled: false,
            syncDeviceId: generateDeviceId(),
            lastSync: 0
        };
    } catch (error) {
        console.error("Error loading user preferences:", error);
        return null;
    }
}
function saveUserPreferences(preferences) {
    try {
        localStorage.setItem("userPreferences", JSON.stringify(preferences));
    } catch (error) {
        console.error("Error saving user preferences:", error);
    }
}
function generateDeviceId() {
    return 'device-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36);
}
function filterArticlesBySentiment(articles, preferences) {
    if (!preferences?.sentimentFilter?.enabled) {
        return articles;
    }
    const { minSentiment, maxToxicity, hideClickbait, hideRagebait } = preferences.sentimentFilter;
    return articles.filter((article)=>{
        if (!article.sentiment) return true;
        const { score, toxicity, isClickbait, isRagebait } = article.sentiment;
        // Filter by sentiment score
        if (score < minSentiment) return false;
        // Filter by toxicity
        if (toxicity > maxToxicity) return false;
        // Filter clickbait
        if (hideClickbait && isClickbait) return false;
        // Filter ragebait
        if (hideRagebait && isRagebait) return false;
        return true;
    });
}
function groupArticlesByCategory(articles, feeds) {
    const grouped = {};
    articles.forEach((article)=>{
        const feed = feeds.find((f)=>f.url === article.link || article.sourceDomain.includes(new URL(f.url).hostname));
        const category = feed?.category || 'Uncategorized';
        if (!grouped[category]) {
            grouped[category] = [];
        }
        grouped[category].push(article);
    });
    return grouped;
}
async function getFeedUrlFromHtml(url) {
    try {
        const response = await fetchWithCors(url);
        if (!response.ok) {
            console.error(`Failed to fetch HTML from ${url}: ${response.status}`);
            return null;
        }
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        // Look for RSS feed links in various formats
        const feedLinks = [
            // Standard RSS/Atom links
            ...Array.from(doc.querySelectorAll('link[type="application/rss+xml"], link[type="application/atom+xml"], link[type="application/xml"], link[type="text/xml"]')).map((link)=>link.getAttribute('href')),
            // Alternate links
            ...Array.from(doc.querySelectorAll('link[rel="alternate"][type="application/rss+xml"], link[rel="alternate"][type="application/atom+xml"]')).map((link)=>link.getAttribute('href')),
            // Feed links
            ...Array.from(doc.querySelectorAll('a[href*="feed"], a[href*="rss"], a[href*="atom"]')).map((link)=>link.getAttribute('href'))
        ].filter(Boolean);
        // If we found any feed links, return the first one
        if (feedLinks.length > 0) {
            const feedUrl = feedLinks[0];
            // If the URL is relative, make it absolute
            try {
                return new URL(feedUrl, url).toString();
            } catch (e) {
                console.error('Error making feed URL absolute:', e);
                return feedUrl;
            }
        }
        return null;
    } catch (error) {
        console.error('Error extracting feed URL from HTML:', error);
        return null;
    }
}
async function parseOPMLFile(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = (event)=>{
            try {
                const text = event.target?.result;
                if (!text) {
                    reject(new Error('Failed to read file content'));
                    return;
                }
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/xml');
                // Check for OPML structure
                const opmlElement = doc.querySelector('opml');
                if (!opmlElement) {
                    reject(new Error('Invalid OPML file: missing <opml> tag'));
                    return;
                }
                // Find all outline elements that have a type="rss" attribute or a url attribute
                const outlines = doc.querySelectorAll('outline[type="rss"], outline[url]');
                if (outlines.length === 0) {
                    reject(new Error('No feed outlines found in OPML file'));
                    return;
                }
                const feeds = [];
                outlines.forEach((outline)=>{
                    const title = outline.getAttribute('title') || outline.getAttribute('text') || '';
                    const url = outline.getAttribute('url') || outline.getAttribute('xmlUrl') || '';
                    // Only add if we have both a title and URL
                    if (title && url) {
                        feeds.push({
                            id: `opml-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                            title,
                            url,
                            category: 'Uncategorized',
                            tags: [],
                            isActive: true
                        });
                    }
                });
                resolve(feeds);
            } catch (error) {
                console.error('Error parsing OPML file:', error);
                reject(error);
            }
        };
        reader.onerror = ()=>{
            reject(new Error('Error reading file'));
        };
        reader.readAsText(file);
    });
}
async function discoverFeedUrlWithFallbacks(siteUrl) {
    // Helper to fetch and parse HTML
    async function fetchHtml(url) {
        try {
            const response = await fetchWithCors(url);
            if (!response.ok) return null;
            const html = await response.text();
            return new DOMParser().parseFromString(html, 'text/html');
        } catch  {
            return null;
        }
    }
    // 1. Try meta tags and link tags on the main page
    const doc = await fetchHtml(siteUrl);
    if (doc) {
        const feedLinks = [
            ...Array.from(doc.querySelectorAll('link[type="application/rss+xml"], link[type="application/atom+xml"], link[type="application/xml"], link[type="text/xml"]')).map((link)=>link.getAttribute('href')),
            ...Array.from(doc.querySelectorAll('link[rel="alternate"][type="application/rss+xml"], link[rel="alternate"][type="application/atom+xml"]')).map((link)=>link.getAttribute('href')),
            ...Array.from(doc.querySelectorAll('a[href*="feed"], a[href*="rss"], a[href*="atom"]')).map((link)=>link.getAttribute('href')),
            ...Array.from(doc.querySelectorAll('meta[property="og:see_also"], meta[name="twitter:app:url:ipad"], meta[name="twitter:app:url:iphone"]')).map((meta)=>meta.getAttribute('content'))
        ].filter(Boolean);
        for (const href of feedLinks){
            try {
                const absUrl = new URL(href, siteUrl).toString();
                if (absUrl.match(/\.(xml|rss|atom)$/i) || absUrl.includes('feed')) {
                    return absUrl;
                }
            } catch  {}
        }
    }
    // 2. Try parent pages (e.g., remove path segments)
    try {
        const urlObj = new URL(siteUrl);
        const segments = urlObj.pathname.split('/').filter(Boolean);
        for(let i = segments.length - 1; i >= 0; i--){
            const parentUrl = `${urlObj.origin}/${segments.slice(0, i).join('/')}`;
            const parentDoc = await fetchHtml(parentUrl);
            if (parentDoc) {
                const parentLinks = [
                    ...Array.from(parentDoc.querySelectorAll('link[type="application/rss+xml"], link[type="application/atom+xml"], link[type="application/xml"], link[type="text/xml"]')).map((link)=>link.getAttribute('href')),
                    ...Array.from(parentDoc.querySelectorAll('link[rel="alternate"][type="application/rss+xml"], link[rel="alternate"][type="application/atom+xml"]')).map((link)=>link.getAttribute('href')),
                    ...Array.from(parentDoc.querySelectorAll('a[href*="feed"], a[href*="rss"], a[href*="atom"]')).map((link)=>link.getAttribute('href'))
                ].filter(Boolean);
                for (const href of parentLinks){
                    try {
                        const absUrl = new URL(href, parentUrl).toString();
                        if (absUrl.match(/\.(xml|rss|atom)$/i) || absUrl.includes('feed')) {
                            return absUrl;
                        }
                    } catch  {}
                }
            }
        }
    } catch  {}
    // 3. Try common feed URL suffixes
    const commonSuffixes = [
        '/feed',
        '/rss',
        '/rss.xml',
        '/atom.xml',
        '/feed.xml',
        '/feeds/posts/default',
        '/blog/rss.xml',
        '/blog/feed',
        '/blog/atom.xml'
    ];
    for (const suffix of commonSuffixes){
        try {
            const testUrl = siteUrl.replace(/\/$/, '') + suffix;
            const resp = await fetchWithCors(testUrl);
            if (resp.ok) {
                const text = await resp.text();
                if (text.match(/<rss|<feed|<channel/i)) {
                    return testUrl;
                }
            }
        } catch  {}
    }
    // 4. Try /sitemap.xml and look for feed links
    try {
        const sitemapUrl = new URL('/sitemap.xml', siteUrl).toString();
        const resp = await fetchWithCors(sitemapUrl);
        if (resp.ok) {
            const xml = await resp.text();
            const feedUrls = Array.from(xml.matchAll(/<loc>([^<]+\.(xml|rss|atom))<\/loc>/gi)).map((m)=>m[1]);
            for (const url of feedUrls){
                if (url.match(/(rss|feed|atom)/i)) {
                    return url;
                }
            }
        }
    } catch  {}
    // 5. Try blog meta tags
    if (doc) {
        const blogMeta = doc.querySelector('meta[name="blog-channel-url"], meta[name="blog-feed-url"]');
        if (blogMeta) {
            const blogUrl = blogMeta.getAttribute('content');
            if (blogUrl) {
                try {
                    return new URL(blogUrl, siteUrl).toString();
                } catch  {}
            }
        }
    }
    return null;
}
}}),
"[project]/src/lib/utils.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "cn": (()=>cn),
    "formatDate": (()=>formatDate)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatDate(dateStr) {
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            return dateStr;
        }
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        console.warn('Error formatting date:', error);
        return dateStr;
    }
}
}}),
"[project]/src/app/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// app/page.tsx
__turbopack_context__.s({
    "default": (()=>HomePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/spinner.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rssUtils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$unreadContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/unreadContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
// Format date to "Month Day, Year" (e.g., "April 13th, 2025")
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return dateString; // Return original string if parsing fails
        }
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        // Add ordinal suffix to day (1st, 2nd, 3rd, etc.)
        let dayWithOrdinal = day.toString();
        if (day > 3 && day < 21) {
            dayWithOrdinal += "th";
        } else {
            const lastDigit = day % 10;
            switch(lastDigit){
                case 1:
                    dayWithOrdinal += "st";
                    break;
                case 2:
                    dayWithOrdinal += "nd";
                    break;
                case 3:
                    dayWithOrdinal += "rd";
                    break;
                default:
                    dayWithOrdinal += "th";
            }
        }
        return `${month} ${dayWithOrdinal}, ${year}`;
    } catch (error) {
        console.error("Error formatting date:", error);
        return dateString; // Return original string if there's an error
    }
}
// Article component to reduce re-renders
const Article = ({ article, isRead, onVisible })=>{
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [imgError, setImgError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!ref.current || !onVisible) return;
        const observer = new window.IntersectionObserver((entries)=>{
            if (entries[0].isIntersecting) {
                onVisible();
                observer.disconnect();
            }
        }, {
            threshold: 0.5
        });
        observer.observe(ref.current);
        return ()=>observer.disconnect();
    }, [
        onVisible
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("shadow-sm overflow-hidden", isRead && "read-article"),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "p-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row",
                    children: [
                        article.thumbnail && !imgError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full sm:w-40 h-40 sm:h-auto relative",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: article.thumbnail,
                                alt: article.title,
                                fill: true,
                                unoptimized: true,
                                className: "object-cover",
                                onError: ()=>setImgError(true)
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 87,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 85,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 p-3 sm:p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: article.link,
                                    className: "text-base sm:text-lg font-medium text-[var(--primary)] hover:underline line-clamp-2",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    children: article.title
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 my-1",
                                    children: [
                                        mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-4 h-4 relative",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                src: `https://www.google.com/s2/favicons?sz=16&domain_url=${article.link}`,
                                                alt: "favicon",
                                                fill: true,
                                                unoptimized: true,
                                                className: "object-contain"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 109,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 108,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs sm:text-sm text-[var(--text-secondary)]",
                                            children: (()=>{
                                                try {
                                                    return article.link ? new URL(article.link).hostname.replace("www.", "") : "Unknown Source";
                                                } catch  {
                                                    return "Unknown Source";
                                                }
                                            })()
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 118,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 106,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs sm:text-sm text-[var(--text-secondary)]",
                                    children: formatDate(article.pubDate)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 83,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 82,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 81,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
};
function HomePage() {
    const [articles, setArticles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [visibleCount, setVisibleCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(20);
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [hideRead, setHideRead] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const loadMoreRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { markAsRead, setTotalArticles, readLinks } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$unreadContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUnread"])();
    // Only show unread articles if hideRead is true
    const filteredArticles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (hideRead) {
            return articles.filter((article)=>!readLinks.has(article.link));
        }
        return articles;
    }, [
        articles,
        readLinks,
        hideRead
    ]);
    // Memoize visible articles to prevent unnecessary re-renders
    const visibleArticles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return filteredArticles.slice(0, visibleCount);
    }, [
        filteredArticles,
        visibleCount
    ]);
    // Handle refreshing feeds
    const handleRefresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setHideRead(true);
            const feeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadFeedsFromStorage"])();
            if (feeds.length === 0) {
                return;
            }
            // Fetch feeds in parallel with a timeout
            const fetchPromises = feeds.map(async (feed)=>{
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(()=>controller.abort(), 10000); // 10 second timeout
                    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAndParseRSS"])(feed.url);
                    clearTimeout(timeoutId);
                    return data?.items || [];
                } catch (error) {
                    console.error(`Error fetching feed ${feed.url}:`, error);
                    return [];
                }
            });
            const allArticles = await Promise.all(fetchPromises);
            const sorted = allArticles.flat().sort((a, b)=>new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
            setArticles(sorted);
            setVisibleCount(20); // Reset visible count
        } catch (error) {
            console.error("Error refreshing feeds:", error);
        }
    }, []);
    // Intersection observer for infinite scrolling
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observer = new IntersectionObserver((entries)=>{
            if (entries[0].isIntersecting && !isLoading) {
                setVisibleCount((prev)=>Math.min(prev + 20, articles.length));
            }
        }, {
            threshold: 0.5
        });
        const currentRef = loadMoreRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        const interval = setInterval(()=>{
            handleRefresh();
        }, 10 * 60 * 1000); // Check every 10 minutes
        return ()=>{
            clearInterval(interval);
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [
        isLoading,
        articles.length,
        handleRefresh
    ]);
    // Load saved feeds on initial render
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadSavedFeeds = async ()=>{
            setIsLoading(true);
            try {
                setHideRead(true);
                const feeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadFeedsFromStorage"])();
                if (feeds.length === 0) {
                    setIsLoading(false);
                    return;
                }
                // Fetch feeds in parallel with a timeout
                const fetchPromises = feeds.map(async (feed)=>{
                    try {
                        const controller = new AbortController();
                        const timeoutId = setTimeout(()=>controller.abort(), 10000); // 10 second timeout
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAndParseRSS"])(feed.url);
                        clearTimeout(timeoutId);
                        return data?.items || [];
                    } catch (error) {
                        console.error(`Error fetching feed ${feed.url}:`, error);
                        return [];
                    }
                });
                const allArticles = await Promise.all(fetchPromises);
                const sorted = allArticles.flat().sort((a, b)=>new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
                setArticles(sorted);
            } catch (error) {
                console.error("Error loading feeds:", error);
            } finally{
                setIsLoading(false);
            }
        };
        setIsClient(true);
        loadSavedFeeds();
    }, [
        handleRefresh
    ]);
    // After first render, allow read articles to be shown (but grayed out)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isLoading) {
            setTimeout(()=>setHideRead(false), 0);
        }
    }, [
        isLoading
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setTotalArticles(articles.length);
    }, [
        articles.length,
        setTotalArticles
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "space-y-8 px-4 max-w-4xl mx-auto pt-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "space-y-4",
            children: [
                isClient && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-4",
                    children: [
                        isLoading ? // Show spinner during initial load
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center items-center py-12",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Spinner"], {
                                size: "lg"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 282,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 281,
                            columnNumber: 15
                        }, this) : articles.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            className: "shadow-sm",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "p-4 text-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[var(--text-secondary)]",
                                    children: "No articles found. Add some feeds to get started."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 287,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 286,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 285,
                            columnNumber: 15
                        }, this) : // Show actual articles
                        visibleArticles.map((article, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Article, {
                                article: article,
                                isRead: readLinks.has(article.link),
                                onVisible: ()=>{
                                    if (!readLinks.has(article.link)) markAsRead(article.link);
                                }
                            }, `${article.link}-${idx}`, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 293,
                                columnNumber: 17
                            }, this)),
                        filteredArticles.length > visibleCount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: loadMoreRef,
                            className: "h-10 flex justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "default",
                                onClick: ()=>setVisibleCount((prev)=>Math.min(prev + 20, filteredArticles.length)),
                                className: "w-full",
                                children: "Load More"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 305,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 304,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 278,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "default",
                    onClick: handleRefresh,
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 328,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 321,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Refresh"
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 335,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 316,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 276,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 275,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=src_0456cdf6._.js.map
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
    const base = "font-semibold rounded-3xl transition-all duration-300 active:scale-95 relative overflow-hidden";
    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3",
        lg: "px-8 py-4 text-lg"
    };
    const variants = {
        default: "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-lg hover:shadow-xl hover:scale-105",
        destructive: "bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl hover:scale-105",
        ghost: "glass-button text-[var(--text-primary)] hover:scale-105",
        outline: "glass-button text-[var(--text-primary)] border-[var(--border)] hover:border-[var(--primary)] hover:scale-105"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: `${base} ${sizes[size]} ${variants[variant]} ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 21,
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
    "CardContent": (()=>CardContent),
    "CardHeader": (()=>CardHeader),
    "CardTitle": (()=>CardTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const Card = ({ className, children, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `glass-card rounded-[32px] overflow-hidden transition-all duration-400 hover:rounded-[36px] ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
};
const CardHeader = ({ className, children, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `pb-4 ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
};
const CardTitle = ({ className, children, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        className: `text-lg font-semibold leading-none tracking-tight ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 30,
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
        lineNumber: 40,
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
            className: `${sizeClasses[size]} border-4 border-[var(--accent)] border-t-[var(--primary)] rounded-full animate-spin shadow-lg`,
            style: {
                borderWidth: '4px',
                animationDuration: '0.8s'
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
"[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Badge": (()=>Badge),
    "badgeVariants": (()=>badgeVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 glass-card shadow-md hover:shadow-lg", {
    variants: {
        variant: {
            default: "text-[var(--primary)] hover:scale-110",
            secondary: "text-[var(--text-secondary)] hover:scale-110",
            destructive: "text-red-500 hover:scale-110",
            outline: "border-2 border-[var(--border)] text-[var(--text-primary)] hover:scale-110 hover:border-[var(--primary)]"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
;
}}),
"[project]/src/lib/rssUtilsClient.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "fetchAndParseRSSClient": (()=>fetchAndParseRSSClient),
    "fetchWithCors": (()=>fetchWithCors)
});
"use client";
async function fetchAndParseRSSClient(url, parseRSSWorker) {
    try {
        // Fetch XML text from proxy with a 30 second timeout
        const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), 30000); // 30 second timeout
        const response = await fetch(proxyUrl, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!response.ok) {
            // Try to get error details from response
            try {
                const errorData = await response.json();
                // Log different error types at appropriate levels
                if (response.status === 404) {
                    console.debug(`Feed not found: ${url}`);
                } else if (response.status === 429) {
                    console.warn(`Rate limited: ${url} - ${errorData.suggestion || 'Too many requests'}`);
                } else if (response.status === 408 || response.status === 504) {
                    console.warn(`Timeout: ${url} - Server took too long to respond`);
                } else if (response.status >= 500) {
                    console.warn(`Server error (${response.status}): ${url} - ${errorData.error || 'Server is experiencing issues'}`);
                } else {
                    console.warn(`Feed fetch failed: ${url} (HTTP ${response.status}): ${errorData.error || 'Unknown error'}`);
                }
            } catch  {
                console.warn(`Feed fetch failed: ${url} (HTTP ${response.status})`);
            }
            return null;
        }
        const xmlText = await response.text();
        if (!xmlText.trim()) {
            return null;
        }
        // Check if response is XML
        if (!xmlText.trim().startsWith('<?xml') && !xmlText.trim().startsWith('<')) {
            return null;
        }
        // If worker parser is provided, use it
        if (parseRSSWorker) {
            try {
                const result = await parseRSSWorker(xmlText, url);
                if (result) {
                    return result;
                }
            } catch (workerError) {
            // Worker failed, fall back to inline parsing silently
            }
        }
        // Fallback to inline parsing (same logic as worker, but runs in main thread)
        return parseRSSInline(xmlText, url);
    } catch (error) {
        // Only log unexpected errors (not timeouts)
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                console.warn(`Feed timeout (30s): ${url}`);
            } else {
                console.error(`Unexpected error parsing feed ${url}:`, error.message);
            }
        }
        return null;
    }
}
/**
 * Inline RSS parsing fallback (runs in main thread)
 * This is a simplified version of the worker parser
 */ function parseRSSInline(xmlText, feedUrl) {
    try {
        // First check if this is actually HTML, not RSS/XML
        const trimmedText = xmlText.trim();
        const looksLikeHTML = (trimmedText.startsWith('<!DOCTYPE html') || trimmedText.startsWith('<html') || trimmedText.startsWith('<HTML')) && !trimmedText.includes('<rss') && !trimmedText.includes('<feed');
        if (looksLikeHTML) {
            console.warn(`Received HTML instead of RSS/XML feed from ${feedUrl}`);
            return null;
        }
        // Add missing namespaces if needed
        let text = xmlText;
        if (text.includes('media:') && !text.includes('xmlns:media')) {
            text = text.replace(/<rss([^>]*?)>/i, '<rss$1 xmlns:media="http://search.yahoo.com/mrss/">');
        }
        if (text.includes('content:encoded') && !text.includes('xmlns:content')) {
            text = text.replace(/<rss([^>]*?)>/i, '<rss$1 xmlns:content="http://purl.org/rss/1.0/modules/content/">');
        }
        if (text.includes('itunes:') && !text.includes('xmlns:itunes')) {
            text = text.replace(/<rss([^>]*?)>/i, '<rss$1 xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">');
        }
        if (text.includes('dc:') && !text.includes('xmlns:dc')) {
            text = text.replace(/<rss([^>]*?)>/i, '<rss$1 xmlns:dc="http://purl.org/dc/elements/1.1/">');
        }
        // Replace HTML entities with numeric equivalents before parsing
        text = text.replace(/&nbsp;/g, '&#160;').replace(/&ndash;/g, '&#8211;').replace(/&mdash;/g, '&#8212;').replace(/&lsquo;/g, '&#8216;').replace(/&rsquo;/g, '&#8217;').replace(/&ldquo;/g, '&#8220;').replace(/&rdquo;/g, '&#8221;').replace(/&hellip;/g, '&#8230;').replace(/&bull;/g, '&#8226;').replace(/&middot;/g, '&#183;').replace(/&euro;/g, '&#8364;').replace(/&pound;/g, '&#163;').replace(/&yen;/g, '&#165;').replace(/&cent;/g, '&#162;').replace(/&copy;/g, '&#169;').replace(/&reg;/g, '&#174;').replace(/&trade;/g, '&#8482;').replace(/&deg;/g, '&#176;').replace(/&plusmn;/g, '&#177;').replace(/&para;/g, '&#182;').replace(/&sect;/g, '&#167;').replace(/&times;/g, '&#215;').replace(/&divide;/g, '&#247;')// Fix self-closing tags
        .replace(/<(img|br|hr|input|meta|link)([^>]*?)(?<!\/)>/gi, '<$1$2 />')// Fix malformed CDATA
        .replace(/<!\[CDATA\[([^\]>]*?)(?!\]\]>)/g, (match, content)=>{
            if (!content.includes(']]>')) {
                return `<![CDATA[${content}]]>`;
            }
            return match;
        }).replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');
        const parser = new DOMParser();
        let xmlDoc = parser.parseFromString(text, "application/xml");
        let parseError = xmlDoc.querySelector("parsererror");
        if (parseError) {
            const errorText = parseError.textContent || '';
            // For HTML mismatch errors, fail silently
            if (errorText.includes('Opening and ending tag mismatch') && (errorText.includes('head') || errorText.includes('body') || errorText.includes('html'))) {
                return null;
            }
            // Try multiple parsing strategies
            let fallbackText = text;
            let success = false;
            // Strategy 1: Try as plain text/xml (more lenient)
            xmlDoc = parser.parseFromString(text, "text/xml");
            parseError = xmlDoc.querySelector("parsererror");
            if (!parseError) {
                success = true;
            }
            // Strategy 2: Handle self-closing link tags (most common issue)
            if (!success && errorText.includes('link')) {
                fallbackText = text.replace(/<link([^>]*?)\/>/gi, '<link$1></link>');
                xmlDoc = parser.parseFromString(fallbackText, "application/xml");
                parseError = xmlDoc.querySelector("parsererror");
                if (!parseError) {
                    success = true;
                }
            }
            // Strategy 3: Try parsing as HTML (more lenient) then converting
            if (!success) {
                try {
                    xmlDoc = parser.parseFromString(text, "text/html");
                    // Check if we got valid RSS/Atom structure
                    if (xmlDoc.querySelector("rss, feed")) {
                        success = true;
                        parseError = null;
                    }
                } catch  {
                // HTML parsing failed, continue
                }
            }
            // Strategy 4: Strip problematic elements
            if (!success) {
                fallbackText = text// Fix unclosed CDATA
                .replace(/<!\[CDATA\[([^\]]*?)(?!\]\]>)/g, (match, content)=>{
                    if (!content.includes(']]>')) {
                        return `<![CDATA[${content}]]>`;
                    }
                    return match;
                })// Fix entity issues
                .replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');
                xmlDoc = parser.parseFromString(fallbackText, "text/xml");
                parseError = xmlDoc.querySelector("parsererror");
                if (!parseError) {
                    success = true;
                }
            }
            if (!success) {
                // Only log actual failures, not parsing attempts
                console.debug(`Parse failed for ${feedUrl}: ${errorText.substring(0, 100)}`);
                return null;
            }
        }
        const channelTitle = xmlDoc.querySelector("channel > title")?.textContent || xmlDoc.querySelector("feed > title")?.textContent || new URL(feedUrl).hostname.replace("www.", "");
        let items;
        if (xmlDoc.querySelector("item")) {
            items = Array.from(xmlDoc.querySelectorAll("item"));
        } else if (xmlDoc.querySelector("entry")) {
            items = Array.from(xmlDoc.querySelectorAll("entry"));
        } else {
            return null;
        }
        if (items.length === 0) {
            return null;
        }
        const parsedItems = items.map((item, index)=>{
            let title = item.querySelector("title")?.textContent?.trim() || `Untitled Article ${index + 1}`;
            // Clean title
            title = title.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
            title = title.replace(/<[^>]*>/g, '');
            title = title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
            title = title.replace(/\s+/g, ' ').trim();
            if (title.length > 200) {
                title = title.substring(0, 200) + '...';
            }
            const link = item.querySelector("link")?.textContent?.trim() || item.querySelector("link")?.getAttribute("href") || "";
            const pubDate = item.querySelector("pubDate")?.textContent?.trim() || item.querySelector("published")?.textContent?.trim() || new Date().toISOString();
            let content = item.querySelector("description")?.textContent?.trim() || item.querySelector("content")?.textContent?.trim() || "";
            if (content) {
                content = content.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
                content = content.replace(/<[^>]*>/g, '');
                content = content.replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
                content = content.replace(/\s+/g, ' ').trim();
                if (content.length > 1000) {
                    content = content.substring(0, 1000) + '...';
                }
            }
            const summary = content.length > 300 ? content.substring(0, 300) + '...' : content;
            // Enhanced thumbnail extraction
            let thumbnail = item.querySelector("enclosure[type^='image']")?.getAttribute("url") || undefined;
            // Try media:content and media:thumbnail
            if (!thumbnail) {
                const mediaContent = item.querySelector("media\\:content[type^='image'], media\\:content[medium='image']") || item.querySelector("media\\:thumbnail");
                if (mediaContent) {
                    thumbnail = mediaContent.getAttribute("url") || undefined;
                }
            }
            // Try to extract from description/content HTML
            if (!thumbnail) {
                const desc = item.querySelector("description")?.textContent || item.querySelector("content")?.textContent || "";
                if (desc) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = desc;
                    const imgTag = tempDiv.querySelector("img");
                    if (imgTag) {
                        thumbnail = imgTag.getAttribute("src") || imgTag.getAttribute("data-src") || undefined;
                    }
                }
            }
            // Try iTunes image
            if (!thumbnail) {
                const itunesImage = item.querySelector("itunes\\:image");
                if (itunesImage) {
                    thumbnail = itunesImage.getAttribute("href") || undefined;
                }
            }
            // Try Atom link rel="enclosure"
            if (!thumbnail) {
                const atomEnclosure = item.querySelector("link[rel='enclosure'][type^='image']");
                if (atomEnclosure) {
                    thumbnail = atomEnclosure.getAttribute("href") || undefined;
                }
            }
            // Validate thumbnail URL
            if (thumbnail && !thumbnail.startsWith('http://') && !thumbnail.startsWith('https://')) {
                thumbnail = undefined;
            }
            let sourceDomain = "Unknown Source";
            if (link) {
                try {
                    sourceDomain = new URL(link).hostname.replace("www.", "");
                } catch  {
                // ignore
                }
            }
            return {
                id: `${feedUrl}-${index}`,
                title,
                link,
                pubDate,
                thumbnail,
                content,
                summary,
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
        console.error('Error parsing RSS inline:', error);
        return null;
    }
}
const fetchWithCors = async (url)=>{
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
    return fetch(proxyUrl);
};
}}),
"[project]/src/lib/rssUtils.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// lib/rssUtils.ts
// This file contains both server-side and client-side RSS utilities
// Client-side parsing should use Web Workers when available
__turbopack_context__.s({
    "discoverFeedUrlWithFallbacks": (()=>discoverFeedUrlWithFallbacks),
    "fetchAndParseRSS": (()=>fetchAndParseRSS),
    "fetchAndParseRSSWithFallbacks": (()=>fetchAndParseRSSWithFallbacks),
    "fetchWithCors": (()=>fetchWithCors),
    "filterArticlesByVibes": (()=>filterArticlesByVibes),
    "generateOPMLFromFeeds": (()=>generateOPMLFromFeeds),
    "getAlternativeRSSSources": (()=>getAlternativeRSSSources),
    "getFeedUrlFromHtml": (()=>getFeedUrlFromHtml),
    "groupArticlesByCategory": (()=>groupArticlesByCategory),
    "loadCategoriesFromStorage": (()=>loadCategoriesFromStorage),
    "loadFeedsFromStorage": (()=>loadFeedsFromStorage),
    "loadUserPreferences": (()=>loadUserPreferences),
    "parseOPMLFile": (()=>parseOPMLFile),
    "saveCategoriesToStorage": (()=>saveCategoriesToStorage),
    "saveFeedToStorage": (()=>saveFeedToStorage),
    "saveFeedsToStorage": (()=>saveFeedsToStorage),
    "saveUserPreferences": (()=>saveUserPreferences)
});
;
// ... (Keep existing interfaces and other functions like getFeedUrlFromHtml, extractThumbnail, etc.)
// Import fetchWithCors if it's not already implicitly available in the scope
// (Assuming it's exported from the same file or imported correctly)
/**
 * Helper function to clean XML content before parsing.
 * 
 * Specifically handles the malformed CDATA patterns commonly found in RSS feeds:
 * - "><![CDATA[>>" - completely malformed pattern
 * - "><![CDATA[>" - incomplete CDATA start
 * - "><![CDATA[><![CDATA[>>" - nested malformed CDATA
 * - "><![CDATA[><![CDATA[><![CDATA[>>" - triple nested malformed CDATA
 * 
 * These patterns are commonly seen in feeds from major publishers like Apple,
 * Samsung, Microsoft, and others that have incomplete XML generation.
 */ function cleanXMLContent(xmlString) {
    // First, normalize line endings
    xmlString = xmlString.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    // STEP 1: Handle the specific malformed CDATA patterns we're seeing in error logs
    // These patterns appear when feed generators don't properly escape content
    // We need to remove these BEFORE doing any other CDATA processing
    // Pattern: "><![CDATA[><![CDATA[><![CDATA[>>" - triple nested malformed CDATA (most specific first)
    xmlString = xmlString.replace(/><!\[CDATA\[><!\[CDATA\[><!\[CDATA\[>>/g, '>');
    // Pattern: "><![CDATA[><![CDATA[>>" - double nested malformed CDATA
    xmlString = xmlString.replace(/><!\[CDATA\[><!\[CDATA\[>>/g, '>');
    // Pattern: "><![CDATA[>>" - single malformed CDATA with extra >
    xmlString = xmlString.replace(/><!\[CDATA\[>>/g, '>');
    // Pattern: "><![CDATA[>" - incomplete CDATA start
    xmlString = xmlString.replace(/><!\[CDATA\[>/g, '>');
    // STEP 2: Remove any invalid XML characters (Control characters except Tab, LF, CR)
    // XML 1.0: #x9 | #xA | #xD | [#x20-#xD7FF] | [#xE000-#xFFFD] | [#x10000-#x10FFFF]
    // We remove characters in the ranges #x0-#x8, #xB-#xC, #xE-#x1F, #x7F-#x84, #x86-#x9F
    xmlString = xmlString.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F]/g, '');
    // STEP 3: Fix unclosed CDATA sections
    // Find CDATA sections that don't have proper closing tags
    const cdataStartCount = (xmlString.match(/<!\[CDATA\[/g) || []).length;
    const cdataEndCount = (xmlString.match(/\]\]>/g) || []).length;
    // If we have more CDATA starts than ends, we need to close them
    if (cdataStartCount > cdataEndCount) {
        // Find unclosed CDATA sections and close them before the next tag
        xmlString = xmlString.replace(/<!\[CDATA\[([^<]*?)(?=<(?!!\[CDATA\[))/g, (match, content)=>{
            if (!content.includes(']]>')) {
                return `<![CDATA[${content}]]>`;
            }
            return match;
        });
    }
    // STEP 4: Handle problematic ]]> sequences throughout the entire document
    // This is the most critical step - ]]> appearing outside CDATA sections breaks XML parsing
    // First, protect legitimate CDATA section endings by temporarily replacing them
    const cdataEndMarker = '___CDATA_END_MARKER___';
    xmlString = xmlString.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (match, content)=>{
        // Replace the ending ]]> with our marker temporarily
        return `<![CDATA[${content}${cdataEndMarker}`;
    });
    // Now escape ALL remaining ]]> sequences (these are the problematic ones in content)
    // Replace ]]> with ]] > (adding a space to break the sequence)
    xmlString = xmlString.replace(/\]\]>/g, ']] >');
    // Restore the legitimate CDATA endings
    xmlString = xmlString.replace(new RegExp(cdataEndMarker, 'g'), ']]>');
    // STEP 5: Remove HTML5 boolean attributes and problematic attributes without values
    // This must be done BEFORE parsing to prevent "Specification mandates value for attribute" errors
    // We do this outside CDATA sections to preserve content integrity
    // First, temporarily protect CDATA sections
    const cdataProtectionMarker = '___PROTECTED_CDATA_';
    const protectedCDataSections = [];
    xmlString = xmlString.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (match, content)=>{
        protectedCDataSections.push(content);
        return `${cdataProtectionMarker}${protectedCDataSections.length - 1}___`;
    });
    // Now clean HTML attributes outside CDATA sections
    xmlString = xmlString// Fix self-closing tags that aren't properly closed (img, br, hr, input, SVG elements, etc.)
    .replace(/<(img|br|hr|input|meta|link|area|base|col|embed|param|source|track|wbr|path|circle|rect|svg|use|line|polygon|polyline|ellipse|g|defs|clipPath|mask|pattern|stop|linearGradient|radialGradient)([^>]*?)(?<!\/)>/gi, '<$1$2 />')// Remove comprehensive list of HTML5 boolean attributes and problematic attributes without values
    // Use negative lookahead to ensure we only match attributes without =
    .replace(/\s(allowfullscreen|allowpaymentrequest|async|autofocus|autoplay|checked|controls|default|defer|disabled|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|nomodule|novalidate|open|playsinline|readonly|required|reversed|selected|truespeed|typemustmatch|data-lazy|data-src|data-srcset|data-background|data-background-image|consumption-data|frameborder|scrolling|noresize|declare|compact|noshade|nowrap|inert)(?=\s|>|\/)/gi, ' ')// Remove any remaining data- attributes without values
    .replace(/\sdata-[\w-]+(?=\s|>|\/)/g, ' ')// Remove aria- attributes without values
    .replace(/\saria-[\w-]+(?=\s|>|\/)/g, ' ');
    // Restore protected CDATA sections
    xmlString = xmlString.replace(/___PROTECTED_CDATA_(\d+)___/g, (match, index)=>{
        return `<![CDATA[${protectedCDataSections[parseInt(index)]}]]>`;
    });
    // STEP 6: Handle CDATA sections that contain problematic ]] sequences (without the >)
    // This must be done carefully to avoid infinite loops
    const cdataRegex = /<!\[CDATA\[([\s\S]*?)\]\]>/g;
    const cdataMatches = [];
    let match2;
    while((match2 = cdataRegex.exec(xmlString)) !== null){
        cdataMatches.push({
            match: match2[0],
            content: match2[1],
            start: match2.index,
            end: match2.index + match2[0].length
        });
    }
    // Process CDATA sections in reverse to maintain correct indices
    for(let i = cdataMatches.length - 1; i >= 0; i--){
        const { content, start, end } = cdataMatches[i];
        // Check if the content contains ]] (without > after it)
        // This indicates a problematic sequence that needs escaping
        if (content.includes(']]') && !content.includes(']]>')) {
            // Escape by splitting the CDATA section at ]] boundaries
            const escapedContent = content.replace(/\]\]/g, ']]]]><![CDATA[');
            const replacement = `<![CDATA[${escapedContent}]]>`;
            xmlString = xmlString.substring(0, start) + replacement + xmlString.substring(end);
        }
    }
    return xmlString;
}
// Helper function to extract thumbnail from RSS item - Enhanced version
function extractThumbnailFromItem(item) {
    // 1. Try standard enclosure with image type
    let thumbnail = item.querySelector("enclosure[type^='image']")?.getAttribute("url");
    // 2. Try media:content and media:thumbnail (RSS Media namespace)
    if (!thumbnail) {
        try {
            const mediaContent = item.querySelector("media\\:content[type^='image'], media\\:content[medium='image']") || item.querySelector("media\\:thumbnail");
            if (mediaContent) {
                thumbnail = mediaContent.getAttribute("url") || undefined;
            }
            // Also check for media:group
            if (!thumbnail) {
                const mediaGroup = item.querySelector("media\\:group");
                if (mediaGroup) {
                    const groupContent = mediaGroup.querySelector("media\\:content[type^='image'], media\\:thumbnail");
                    if (groupContent) {
                        thumbnail = groupContent.getAttribute("url") || undefined;
                    }
                }
            }
        } catch (error) {
            console.warn('Error extracting media namespace thumbnail:', error);
        }
    }
    // 3. Try to extract from description or content:encoded HTML
    if (!thumbnail) {
        try {
            const description = item.querySelector("description")?.textContent || item.querySelector("content\\:encoded")?.textContent || item.querySelector("content")?.textContent || "";
            if (description) {
                // Parse HTML content to find images
                const parser = new DOMParser();
                const doc = parser.parseFromString(description, 'text/html');
                // Look for img tags in the content
                const imgTag = doc.querySelector("img");
                if (imgTag) {
                    thumbnail = imgTag.getAttribute("src") || imgTag.getAttribute("data-src") || imgTag.getAttribute("data-lazy-src") || undefined;
                }
                // Also check for Open Graph images in content
                if (!thumbnail) {
                    const ogImage = doc.querySelector("meta[property='og:image']");
                    if (ogImage) {
                        thumbnail = ogImage.getAttribute("content") || undefined;
                    }
                }
            }
        } catch (error) {
            console.warn('Error extracting thumbnail from content HTML:', error);
        }
    }
    // 4. Try iTunes image (common in podcast feeds)
    if (!thumbnail) {
        const itunesImage = item.querySelector("itunes\\:image");
        if (itunesImage) {
            thumbnail = itunesImage.getAttribute("href") || undefined;
        }
    }
    // 5. Try image element (some feeds use this)
    if (!thumbnail) {
        const imageEl = item.querySelector("image > url");
        if (imageEl) {
            thumbnail = imageEl.textContent?.trim() || undefined;
        }
    }
    // 6. Try Atom link rel="enclosure"
    if (!thumbnail) {
        const atomEnclosure = item.querySelector("link[rel='enclosure'][type^='image']");
        if (atomEnclosure) {
            thumbnail = atomEnclosure.getAttribute("href") || undefined;
        }
    }
    // 7. Try any element with 'thumbnail' or 'image' in the name
    if (!thumbnail) {
        try {
            const allElements = item.querySelectorAll("*");
            for (const element of allElements){
                const tagName = element.tagName.toLowerCase();
                if (tagName.includes('thumbnail') || tagName.includes('image')) {
                    const url = element.getAttribute('url') || element.getAttribute('href') || element.textContent?.trim();
                    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
                        thumbnail = url;
                        break;
                    }
                }
            }
        } catch (error) {
            console.warn('Error in fallback thumbnail extraction:', error);
        }
    }
    // Validate and clean the thumbnail URL
    if (thumbnail) {
        thumbnail = thumbnail.trim();
        // Check if it's a valid URL
        if (!thumbnail.startsWith('http://') && !thumbnail.startsWith('https://')) {
            thumbnail = undefined;
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
                console.debug(`Feed not found at ${url}, attempting to discover correct RSS URL...`);
                try {
                    const discoveredUrl = await discoverFeedUrlWithFallbacks(url);
                    if (discoveredUrl && discoveredUrl !== url) {
                        console.log(`✅ Discovered RSS feed at: ${discoveredUrl}`);
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
        // Check if the response is HTML instead of XML (common with 404 pages)
        if (text.trim().startsWith('<!DOCTYPE html') || text.includes('<html')) {
            console.error(`Response from ${url} is HTML instead of XML. This usually means the RSS feed doesn't exist.`);
            return null;
        }
        // Add media namespace if it's missing
        if (text.includes('media:content') && !text.includes('xmlns:media')) {
            text = text.replace(/<rss[^>]*>/, (match)=>`${match.replace('>', ' xmlns:media="http://search.yahoo.com/mrss/">')}`);
        }
        // Add content namespace if missing
        if (text.includes('content:encoded') && !text.includes('xmlns:content')) {
            text = text.replace(/<rss[^>]*>/, (match)=>match.replace('>', ' xmlns:content="http://purl.org/rss/1.0/modules/content/">'));
        }
        // Add iTunes namespace if missing
        if (text.includes('itunes:') && !text.includes('xmlns:itunes')) {
            text = text.replace(/<rss[^>]*>/, (match)=>match.replace('>', ' xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">'));
        }
        // Fix common mismatched tags before parsing
        text = text// Fix unclosed <br> tags
        .replace(/<br\s*(?=[^/>]*>)/gi, '<br />')// Fix unclosed <img> tags
        .replace(/<img([^>]*?)(?<!\/)>/gi, '<img$1 />')// Fix unclosed <hr> tags  
        .replace(/<hr\s*(?=[^/>]*>)/gi, '<hr />')// Fix common tag mismatches (opening tag doesn't match closing tag)
        .replace(/<(em|strong|b|i|u|time|span|div|a|td|tr|th|table|p)\b([^>]*)>\s*<\/(em|strong|b|i|u|time|span|div|a|td|tr|th|table|p)>/gi, (match, opening, attrs, closing)=>{
            // If opening and closing tags don't match, use the closing tag
            if (opening.toLowerCase() !== closing.toLowerCase()) {
                return `<${closing}${attrs}></${closing}>`;
            }
            return match;
        });
        // Fix unclosed CDATA sections
        text = text.replace(/<!\[CDATA\[([^\]>]*?)(?!\]\]>)/g, (match, content)=>{
            // If the CDATA section is not properly closed, close it
            if (!content.includes(']]>')) {
                return `<!\[CDATA\[${content}]]>`;
            }
            return match;
        });
        // Escape unescaped ampersands in content (but preserve HTML entities and numeric character references)
        text = text.replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');
        // Clean the XML content before parsing
        const cleanedXML = cleanXMLContent(text);
        // Parse the cleaned XML
        const parser = new DOMParser();
        let xmlDoc = parser.parseFromString(cleanedXML, "text/xml");
        // Check for parsing errors
        const parseError = xmlDoc.querySelector("parsererror");
        if (parseError) {
            console.error(`XML parsing error for ${url}:`, parseError.textContent);
            // Try aggressive cleaning as a fallback
            if (parseError.textContent?.includes("CData section not finished") || parseError.textContent?.includes("Sequence ']]>' not allowed") || parseError.textContent?.includes("Specification mandates value for attribute") || parseError.textContent?.includes("CDATA")) {
                console.debug(`Attempting aggressive XML cleaning for ${url}...`);
                // Strategy 1: More aggressive ]]> handling - escape ALL ]]> sequences first
                let aggressiveCleaned = text;
                // Step 1: Temporarily mark legitimate CDATA endings
                const cdataMarker = '___LEGIT_CDATA_END___';
                aggressiveCleaned = aggressiveCleaned.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (match, content)=>{
                    return `<![CDATA[${content}${cdataMarker}`;
                });
                // Step 2: Escape ALL remaining ]]> sequences (these are the problematic ones)
                aggressiveCleaned = aggressiveCleaned.replace(/\]\]>/g, ']] &gt;');
                // Step 3: Restore legitimate CDATA endings
                aggressiveCleaned = aggressiveCleaned.replace(new RegExp(cdataMarker, 'g'), ']]>');
                // Step 4: Clean up other issues - fix ALL HTML attributes without values
                aggressiveCleaned = aggressiveCleaned// Fix self-closing tags that aren't properly closed (img, br, hr, input, etc.)
                .replace(/<(img|br|hr|input|meta|link|area|base|col|embed|param|source|track|wbr|path|circle|rect|svg|use)([^>]*?)(?<!\/)>/gi, '<$1$2 />')// Fix VERY comprehensive list of HTML5 boolean attributes and common problematic attributes
                .replace(/\s(allowfullscreen|allowpaymentrequest|async|autofocus|autoplay|checked|controls|default|defer|disabled|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|nomodule|novalidate|open|playsinline|readonly|required|reversed|selected|truespeed|typemustmatch|data-lazy|data-src|data-srcset|data-background|data-background-image|consumption-data|frameborder|scrolling|noresize|declare|compact|noshade|nowrap|inert)\s*(?=[>\s\/])/gi, ' ')// Fix any remaining data- attributes without values (more comprehensive)
                .replace(/\sdata-[\w-]+\s*(?=[>\s\/])/g, ' ')// Fix aria- attributes without values
                .replace(/\saria-[\w-]+\s*(?=[>\s\/])/g, ' ')// Fix any other custom attributes without = sign (general catch-all)
                .replace(/\s([a-z][\w-]*)\s+(?=[a-z][\w-]*=|>|\/)/gi, ' ')// Escape unescaped ampersands
                .replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');
                // Try parsing the cleaned version
                const parser = new DOMParser();
                xmlDoc = parser.parseFromString(aggressiveCleaned, "text/xml");
                const secondParseError = xmlDoc.querySelector("parsererror");
                if (secondParseError) {
                    console.warn(`First aggressive cleaning failed for ${url}, trying CDATA stripping...`);
                    // Strategy 2: Strip all CDATA sections entirely
                    console.warn(`Trying complete CDATA stripping for ${url}...`);
                    const cdataStripped = text// Escape ALL ]] sequences in the entire document
                    .replace(/\]\]/g, '] ]')// Remove CDATA start markers
                    .replace(/<!\[CDATA\[/g, '')// Remove the > that was left from ]]> sequences
                    .replace(/] ]>/g, '] ] ')// Fix self-closing tags that aren't properly closed
                    .replace(/<(img|br|hr|input|meta|link|area|base|col|embed|param|source|track|wbr|path|circle|rect|svg|use)([^>]*?)(?<!\/)>/gi, '<$1$2 />')// Fix ALL common problematic HTML5 attributes without values
                    .replace(/\s(allowfullscreen|allowpaymentrequest|async|autofocus|autoplay|checked|controls|default|defer|disabled|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|nomodule|novalidate|open|playsinline|readonly|required|reversed|selected|truespeed|typemustmatch|data-lazy|data-src|data-srcset|data-background|data-background-image|consumption-data|frameborder|scrolling|noresize|declare|compact|noshade|nowrap|inert)\s*(?=[>\s\/])/gi, ' ').replace(/\sdata-[\w-]+\s*(?=[>\s\/])/g, ' ').replace(/\saria-[\w-]+\s*(?=[>\s\/])/g, ' ')// Escape unescaped ampersands
                    .replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');
                    xmlDoc = parser.parseFromString(cdataStripped, "text/xml");
                    const thirdParseError = xmlDoc.querySelector("parsererror");
                    if (thirdParseError) {
                        console.warn(`CDATA stripping also failed for ${url}, trying content extraction...`);
                        console.warn(`CDATA stripping also failed for ${url}, trying content extraction...`);
                        // Strategy 3: Try to extract just the content between tags
                        // This is useful when the entire feed structure is broken
                        try {
                            // Look for item or entry tags and extract them individually
                            const itemMatches = text.match(/<item[\s\S]*?<\/item>/gi) || [];
                            const entryMatches = text.match(/<entry[\s\S]*?<\/entry>/gi) || [];
                            const allItems = [
                                ...itemMatches,
                                ...entryMatches
                            ];
                            if (allItems.length > 0) {
                                console.log(`Found ${allItems.length} items/entries, attempting manual extraction...`);
                                // Create a minimal valid XML wrapper
                                const channelTitle = text.match(/<channel[^>]*>[\s\S]*?<title>([^<]+)<\/title>/i)?.[1] || text.match(/<feed[^>]*>[\s\S]*?<title>([^<]+)<\/title>/i)?.[1] || new URL(url).hostname.replace("www.", "");
                                const cleanedItems = allItems.map((item)=>{
                                    let cleaned = item;
                                    // Temporarily mark legitimate CDATA endings
                                    const marker = '___CDATA_END___';
                                    cleaned = cleaned.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (match, content)=>{
                                        return `<![CDATA[${content}${marker}`;
                                    });
                                    // Escape ALL remaining ]]> sequences
                                    cleaned = cleaned.replace(/\]\]>/g, ']] &gt;');
                                    // Restore legitimate CDATA endings
                                    cleaned = cleaned.replace(new RegExp(marker, 'g'), ']]>');
                                    // Additional cleaning - remove ALL HTML attributes without values
                                    cleaned = cleaned// Fix self-closing tags
                                    .replace(/<(img|br|hr|input|meta|link|area|base|col|embed|param|source|track|wbr|path|circle|rect|svg|use)([^>]*?)(?<!\/)>/gi, '<$1$2 />').replace(/\s(allowfullscreen|allowpaymentrequest|async|autofocus|autoplay|checked|controls|default|defer|disabled|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|nomodule|novalidate|open|playsinline|readonly|required|reversed|selected|truespeed|typemustmatch|data-lazy|data-src|data-srcset|data-background|data-background-image|consumption-data|frameborder|scrolling|noresize|declare|compact|noshade|nowrap|inert)\s*(?=[>\s\/])/gi, ' ').replace(/\sdata-[\w-]+\s*(?=[>\s\/])/g, ' ').replace(/\saria-[\w-]+\s*(?=[>\s\/])/g, ' ').replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');
                                    return cleaned;
                                }).join('\n');
                                const reconstructedXML = `<?xml version="1.0" encoding="UTF-8"?>
                  <rss version="2.0">
                    <channel>
                      <title>${channelTitle}</title>
                      ${cleanedItems}
                    </channel>
                  </rss>`;
                                xmlDoc = parser.parseFromString(reconstructedXML, "text/xml");
                                const fourthParseError = xmlDoc.querySelector("parsererror");
                                if (!fourthParseError) {
                                    console.log(`Manual item extraction successful for ${url}`);
                                } else {
                                    console.warn(`All XML cleaning strategies failed for ${url}, returning null`);
                                    return null;
                                }
                            } else {
                                console.warn(`No items found in ${url}, returning null`);
                                return null;
                            }
                        } catch (extractError) {
                            console.error(`Content extraction failed for ${url}:`, extractError);
                            return null;
                        }
                    } else {
                        console.log(`CDATA stripping successful for ${url}`);
                    }
                } else {
                    console.log(`First aggressive cleaning successful for ${url}`);
                }
            } else {
                // For other parsing errors, try to extract items anyway
                const hasItems = xmlDoc.querySelector("item, entry");
                if (!hasItems) {
                    return null;
                }
                console.warn(`Continuing with potentially malformed XML for ${url}`);
            }
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
            let title = item.querySelector("title")?.textContent?.trim() || item.querySelector("title")?.textContent?.trim() || `Untitled Article ${index + 1}`;
            // Clean the title by removing HTML tags and CDATA sections
            if (title) {
                // Remove CDATA sections
                title = title.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
                // Remove HTML tags
                title = title.replace(/<[^>]*>/g, '');
                // Decode HTML entities
                title = title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
                // Clean up extra whitespace and normalize
                title = title.replace(/\s+/g, ' ').replace(/\n+/g, ' ').replace(/\r+/g, ' ').replace(/\t+/g, ' ').trim();
                // Limit title length to prevent extremely long titles
                if (title.length > 200) {
                    title = title.substring(0, 200) + '...';
                }
            }
            const link = item.querySelector("link")?.textContent?.trim() || item.querySelector("link")?.getAttribute("href") || item.querySelector("id")?.textContent?.trim() || "";
            const pubDate = item.querySelector("pubDate")?.textContent?.trim() || item.querySelector("published")?.textContent?.trim() || item.querySelector("updated")?.textContent?.trim() || new Date().toISOString();
            let content = item.querySelector("description")?.textContent?.trim() || item.querySelector("content")?.textContent?.trim() || item.querySelector("summary")?.textContent?.trim() || "";
            // Clean the content by removing HTML tags and CDATA sections
            if (content) {
                // Remove CDATA sections
                content = content.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
                // Remove HTML tags
                content = content.replace(/<[^>]*>/g, '');
                // Decode HTML entities
                content = content.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
                // Clean up extra whitespace and normalize
                content = content.replace(/\s+/g, ' ').replace(/\n+/g, ' ').replace(/\r+/g, ' ').replace(/\t+/g, ' ').trim();
                // Limit content length to prevent extremely long articles
                if (content.length > 1000) {
                    content = content.substring(0, 1000) + '...';
                }
            }
            // Extract and clean summary if available
            let summary = item.querySelector("description")?.textContent?.trim() || item.querySelector("summary")?.textContent?.trim() || "";
            if (summary && summary !== content) {
                // Clean the summary the same way as content
                summary = summary.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
                summary = summary.replace(/<[^>]*>/g, '');
                summary = summary.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
                summary = summary.replace(/\s+/g, ' ').replace(/\n+/g, ' ').replace(/\r+/g, ' ').replace(/\t+/g, ' ').trim();
                // Limit summary length for better display
                if (summary.length > 300) {
                    summary = summary.substring(0, 300) + '...';
                }
            } else if (content) {
                // If no summary available, use a truncated version of content
                summary = content.length > 300 ? content.substring(0, 300) + '...' : content;
            }
            const thumbnail = extractThumbnailFromItem(item);
            let sourceDomain = "Unknown Source";
            if (link) {
                try {
                    sourceDomain = new URL(link).hostname.replace("www.", "");
                } catch  {
                    console.warn(`Invalid link URL for article: ${link}`);
                    // Try to extract domain from the link string if possible
                    const domainMatch = link.match(/https?:\/\/([^\/]+)/);
                    if (domainMatch) {
                        sourceDomain = domainMatch[1].replace("www.", "");
                    }
                }
            }
            return {
                id: `${url}-${index}`,
                title,
                link,
                pubDate,
                thumbnail,
                content,
                summary,
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
    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) {
            // Only log 404 errors as warnings since they're expected during feed discovery
            if (response.status === 404) {
                console.debug(`Feed not found at ${url} - trying next URL pattern...`);
            } else {
                // Log other errors as they might indicate real problems
                console.error(`Proxy request to ${proxyUrl} failed with status ${response.status}`);
            }
        // Don't throw here, let the calling function handle the response
        // This allows for better error handling upstream
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
function saveFeedsToStorage(feeds) {
    try {
        localStorage.setItem("feeds", JSON.stringify(feeds));
    } catch (error) {
        console.error("Error saving feeds to storage:", error);
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
    const defaultPreferences = {
        id: 'default',
        vibesFilter: {
            enabled: false,
            minVibes: -0.5,
            maxToxicity: 0.7,
            hideClickbait: false,
            hideRagebait: false
        },
        categories: loadCategoriesFromStorage(),
        syncEnabled: false,
        syncDeviceId: generateDeviceId(),
        lastSync: 0,
        language: 'en',
        autoMarkAsReadOnScroll: true // Default to enabled
    };
    try {
        const preferences = localStorage.getItem("userPreferences");
        if (preferences) {
            const parsed = JSON.parse(preferences);
            // Ensure vibesFilter exists in loaded preferences
            if (!parsed.vibesFilter) {
                parsed.vibesFilter = defaultPreferences.vibesFilter;
            }
            return parsed;
        }
        // Return default preferences
        return defaultPreferences;
    } catch (error) {
        console.error("Error loading user preferences:", error);
        return defaultPreferences;
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
function filterArticlesByVibes(articles, preferences) {
    if (!preferences?.vibesFilter?.enabled) {
        return articles;
    }
    const { minVibes, maxToxicity, hideClickbait, hideRagebait } = preferences.vibesFilter;
    return articles.filter((article)=>{
        if (!article.vibes) return true;
        const { score, toxicity, isClickbait, isRagebait } = article.vibes;
        // Filter by vibes score
        if (score < minVibes) return false;
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
function generateOPMLFromFeeds(feeds, categories) {
    const now = new Date().toUTCString();
    // Group feeds by category
    const feedsByCategory = {};
    feeds.forEach((feed)=>{
        const category = feed.category || 'Uncategorized';
        if (!feedsByCategory[category]) {
            feedsByCategory[category] = [];
        }
        feedsByCategory[category].push(feed);
    });
    // Start building OPML
    let opml = `<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head>
    <title>RSS Feeds Export</title>
    <dateCreated>${now}</dateCreated>
    <dateModified>${now}</dateModified>
  </head>
  <body>
`;
    // Add feeds grouped by category
    Object.keys(feedsByCategory).forEach((categoryId)=>{
        const category = categories.find((c)=>c.id === categoryId);
        const categoryName = category?.name || categoryId;
        const categoryFeeds = feedsByCategory[categoryId];
        opml += `    <outline text="${escapeXml(categoryName)}" title="${escapeXml(categoryName)}">\n`;
        categoryFeeds.forEach((feed)=>{
            opml += `      <outline type="rss" text="${escapeXml(feed.title)}" title="${escapeXml(feed.title)}" xmlUrl="${escapeXml(feed.url)}" htmlUrl="${escapeXml(feed.url)}"`;
            // Add tags if available
            if (feed.tags && feed.tags.length > 0) {
                opml += ` category="${escapeXml(feed.tags.join(','))}"`;
            }
            opml += `/>\n`;
        });
        opml += `    </outline>\n`;
    });
    opml += `  </body>
</opml>`;
    return opml;
}
/**
 * Helper function to escape XML special characters
 */ function escapeXml(unsafe) {
    return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
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
                    } catch (urlError) {
                        console.warn(`Invalid URL in parent page discovery: ${href}`, urlError);
                    }
                }
            }
        }
    } catch (urlError) {
        console.warn(`Error during parent page discovery for ${siteUrl}:`, urlError);
    }
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
        } catch (error) {
            console.warn(`Error testing suffix ${suffix} for ${siteUrl}:`, error);
        }
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
    } catch (error) {
        console.warn(`Error checking sitemap for ${siteUrl}:`, error);
    }
    // 5. Try blog meta tags
    if (doc) {
        const blogMeta = doc.querySelector('meta[name="blog-channel-url"], meta[name="blog-feed-url"]');
        if (blogMeta) {
            const blogUrl = blogMeta.getAttribute('content');
            if (blogUrl) {
                try {
                    return new URL(blogUrl, siteUrl).toString();
                } catch (urlError) {
                    console.warn(`Invalid blog URL in meta tag: ${blogUrl}`, urlError);
                }
            }
        }
    }
    return null;
}
function getAlternativeRSSSources(failedUrl) {
    const url = new URL(failedUrl);
    // RSSHub alternatives for common services
    if (url.hostname === 'rsshub.app') {
        const path = url.pathname;
        // Twitter alternatives
        if (path.includes('/twitter/')) {
            return [
                {
                    title: "Nitter RSS (Twitter Alternative)",
                    url: `https://nitter.net/${path.split('/').pop()}/rss`,
                    description: "Nitter provides RSS feeds for Twitter accounts"
                },
                {
                    title: "RSS.app Twitter",
                    url: `https://rss.app/rss/feed/${path.split('/').pop()}`,
                    description: "RSS.app can create RSS feeds from Twitter accounts"
                }
            ];
        }
        // GitHub alternatives
        if (path.includes('/github/')) {
            return [
                {
                    title: "GitHub RSS (Official)",
                    url: `https://github.com/${path.split('/').pop()}.atom`,
                    description: "Official GitHub RSS feeds for repositories and users"
                }
            ];
        }
        // General alternatives
        return [
            {
                title: "RSS.app",
                url: "https://rss.app/",
                description: "Create RSS feeds from any website"
            },
            {
                title: "Feed43",
                url: "https://feed43.com/",
                description: "Convert any web page to RSS feed"
            },
            {
                title: "RSSHub (Self-hosted)",
                url: "https://github.com/DIYgod/RSSHub",
                description: "Self-host RSSHub instance for better reliability"
            }
        ];
    }
    return [];
}
async function fetchAndParseRSSWithFallbacks(url) {
    try {
        const data = await fetchAndParseRSS(url);
        if (data) {
            return {
                data
            };
        }
    } catch (error) {
        console.warn(`Failed to fetch RSS from ${url}:`, error);
    }
    // If the original URL failed, try to find alternatives
    const alternatives = getAlternativeRSSSources(url);
    if (alternatives.length > 0) {
        console.log(`Found ${alternatives.length} alternative RSS sources for ${url}`);
        return {
            data: null,
            alternatives
        };
    }
    return null;
}
}}),
"[project]/src/lib/rssUtils.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtilsClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rssUtilsClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/rssUtils.ts [app-ssr] (ecmascript) <locals>");
}}),
"[project]/src/lib/useRSSParserWorker.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useRSSParserWorker": (()=>useRSSParserWorker)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function useRSSParserWorker() {
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const workerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Worker will be initialized on first use
        return ()=>{
            if (workerRef.current) {
                workerRef.current.terminate();
            }
        };
    }, []);
    // Lazy worker initialization
    const ensureWorker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return workerRef.current;
    }, []);
    const parseRSSWithWorker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (xmlText, feedUrl)=>{
        try {
            const worker = ensureWorker();
            if (!worker) {
                // Fallback to direct parsing if worker not available
                console.warn('Worker not available, using direct parsing fallback');
                return null;
            }
            setIsLoading(true);
            setError(null);
            return await new Promise((resolve, reject)=>{
                const timeoutId = setTimeout(()=>{
                    reject(new Error('Worker timeout'));
                }, 20000); // 20 second timeout for worker parsing
                const handleMessage = (event)=>{
                    clearTimeout(timeoutId);
                    if (event.data.type === 'rss_parsed') {
                        resolve(event.data.data);
                    } else if (event.data.type === 'error') {
                        reject(new Error(event.data.error));
                    }
                };
                workerRef.current.addEventListener('message', handleMessage, {
                    once: true
                });
                workerRef.current.postMessage({
                    type: 'parse_rss',
                    data: {
                        xmlText,
                        feedUrl
                    }
                });
            });
        } catch (err) {
            console.error("parseRSSWithWorker error:", err);
            setError(err instanceof Error ? err.message : 'Unknown error');
            return null;
        } finally{
            setIsLoading(false);
        }
    }, [
        ensureWorker
    ]);
    return {
        parseRSSWithWorker,
        isLoading,
        error
    };
}
}}),
"[project]/src/app/health/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>FeedHealthPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/spinner.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/lib/rssUtils.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/rssUtils.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtilsClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rssUtilsClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$useRSSParserWorker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/useRSSParserWorker.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-ssr] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
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
;
function FeedHealthPage() {
    const [feeds, setFeeds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isChecking, setIsChecking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const { parseRSSWithWorker } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$useRSSParserWorker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRSSParserWorker"])();
    const checkFeedHealth = async (url)=>{
        const startTime = Date.now();
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtilsClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAndParseRSSClient"])(url, parseRSSWithWorker);
            const responseTime = Date.now() - startTime;
            if (data && data.items.length > 0) {
                return {
                    url,
                    title: data.title,
                    status: 'success',
                    itemCount: data.items.length,
                    responseTime,
                    lastChecked: new Date()
                };
            } else {
                return {
                    url,
                    status: 'failed',
                    error: 'No items found in feed',
                    responseTime,
                    lastChecked: new Date()
                };
            }
        } catch (error) {
            const responseTime = Date.now() - startTime;
            if (error?.name === 'AbortError' || responseTime > 28000) {
                return {
                    url,
                    status: 'timeout',
                    error: 'Feed took too long to respond (>30s)',
                    suggestion: 'The feed server is very slow or unresponsive. Consider removing this feed.',
                    responseTime,
                    lastChecked: new Date()
                };
            }
            return {
                url,
                status: 'failed',
                error: error?.message || 'Unknown error',
                responseTime,
                lastChecked: new Date()
            };
        }
    };
    const checkAllFeeds = async ()=>{
        setIsChecking(true);
        const savedFeeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadFeedsFromStorage"])();
        // Initialize with checking status
        setFeeds(savedFeeds.map((f)=>({
                url: f.url,
                title: f.title,
                status: 'checking'
            })));
        // Check feeds in batches of 10 to avoid overwhelming the server
        const batchSize = 10;
        const results = [];
        for(let i = 0; i < savedFeeds.length; i += batchSize){
            const batch = savedFeeds.slice(i, i + batchSize);
            const batchResults = await Promise.all(batch.map((feed)=>checkFeedHealth(feed.url)));
            results.push(...batchResults);
            // Update UI incrementally
            setFeeds((prev)=>{
                const updated = [
                    ...prev
                ];
                batchResults.forEach((result)=>{
                    const index = updated.findIndex((f)=>f.url === result.url);
                    if (index !== -1) {
                        updated[index] = result;
                    }
                });
                return updated;
            });
            // Small delay between batches
            if (i + batchSize < savedFeeds.length) {
                await new Promise((resolve)=>setTimeout(resolve, 1000));
            }
        }
        setIsChecking(false);
    };
    const retryFeed = async (url)=>{
        setFeeds((prev)=>prev.map((f)=>f.url === url ? {
                    ...f,
                    status: 'checking'
                } : f));
        const result = await checkFeedHealth(url);
        setFeeds((prev)=>prev.map((f)=>f.url === url ? result : f));
    };
    const removeFeed = (url)=>{
        const savedFeeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadFeedsFromStorage"])();
        const updated = savedFeeds.filter((f)=>f.url !== url);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["saveFeedsToStorage"])(updated);
        setFeeds((prev)=>prev.filter((f)=>f.url !== url));
    };
    const removeAllFailed = ()=>{
        const failedUrls = feeds.filter((f)=>f.status === 'failed' || f.status === 'timeout').map((f)=>f.url);
        const savedFeeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadFeedsFromStorage"])();
        const updated = savedFeeds.filter((f)=>!failedUrls.includes(f.url));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["saveFeedsToStorage"])(updated);
        setFeeds((prev)=>prev.filter((f)=>f.status === 'success'));
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedFeeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadFeedsFromStorage"])();
        setFeeds(savedFeeds.map((f)=>({
                url: f.url,
                title: f.title,
                status: 'unknown'
            })));
    }, []);
    const filteredFeeds = feeds.filter((f)=>{
        if (filter === 'all') return true;
        if (filter === 'success') return f.status === 'success';
        if (filter === 'failed') return f.status === 'failed' || f.status === 'timeout';
        return true;
    });
    const stats = {
        total: feeds.length,
        success: feeds.filter((f)=>f.status === 'success').length,
        failed: feeds.filter((f)=>f.status === 'failed' || f.status === 'timeout').length,
        checking: feeds.filter((f)=>f.status === 'checking').length,
        unknown: feeds.filter((f)=>f.status === 'unknown').length
    };
    const getStatusIcon = (status)=>{
        switch(status){
            case 'success':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                    className: "h-5 w-5 text-green-500"
                }, void 0, false, {
                    fileName: "[project]/src/app/health/page.tsx",
                    lineNumber: 174,
                    columnNumber: 16
                }, this);
            case 'failed':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                    className: "h-5 w-5 text-red-500"
                }, void 0, false, {
                    fileName: "[project]/src/app/health/page.tsx",
                    lineNumber: 176,
                    columnNumber: 16
                }, this);
            case 'timeout':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                    className: "h-5 w-5 text-orange-500"
                }, void 0, false, {
                    fileName: "[project]/src/app/health/page.tsx",
                    lineNumber: 178,
                    columnNumber: 16
                }, this);
            case 'checking':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Spinner"], {
                    size: "sm"
                }, void 0, false, {
                    fileName: "[project]/src/app/health/page.tsx",
                    lineNumber: 180,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                    className: "h-5 w-5 text-gray-400"
                }, void 0, false, {
                    fileName: "[project]/src/app/health/page.tsx",
                    lineNumber: 182,
                    columnNumber: 16
                }, this);
        }
    };
    const getStatusBadge = (status)=>{
        switch(status){
            case 'success':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                    className: "bg-green-500",
                    children: "Working"
                }, void 0, false, {
                    fileName: "[project]/src/app/health/page.tsx",
                    lineNumber: 189,
                    columnNumber: 16
                }, this);
            case 'failed':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                    className: "bg-red-500",
                    children: "Failed"
                }, void 0, false, {
                    fileName: "[project]/src/app/health/page.tsx",
                    lineNumber: 191,
                    columnNumber: 16
                }, this);
            case 'timeout':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                    className: "bg-orange-500",
                    children: "Timeout"
                }, void 0, false, {
                    fileName: "[project]/src/app/health/page.tsx",
                    lineNumber: 193,
                    columnNumber: 16
                }, this);
            case 'checking':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                    className: "bg-blue-500",
                    children: "Checking..."
                }, void 0, false, {
                    fileName: "[project]/src/app/health/page.tsx",
                    lineNumber: 195,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                    variant: "outline",
                    children: "Unknown"
                }, void 0, false, {
                    fileName: "[project]/src/app/health/page.tsx",
                    lineNumber: 197,
                    columnNumber: 16
                }, this);
        }
    };
    const formatResponseTime = (ms)=>{
        if (!ms) return '-';
        if (ms < 1000) return `${ms}ms`;
        return `${(ms / 1000).toFixed(1)}s`;
    };
    const getRSSHubAlternative = (url)=>{
        if (!url.includes('rsshub.app')) return null;
        // Twitter/X feeds
        if (url.includes('/twitter/')) {
            const match = url.match(/\/twitter\/([^\/]+)/);
            if (match) {
                return `Alternative: Try Nitter RSS at https://nitter.net/${match[1]}/rss`;
            }
        }
        // YouTube feeds
        if (url.includes('/youtube/')) {
            const match = url.match(/\/youtube\/user\/([^\/]+)/);
            if (match) {
                return `Alternative: Use YouTube's native RSS feed`;
            }
        }
        return 'RSSHub feeds may be unreliable. Consider finding the native RSS feed from the source.';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "space-y-8 px-4 max-w-7xl mx-auto pt-8 pb-12 md:pb-12 pb-28",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold",
                        children: "Feed Health Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/src/app/health/page.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[var(--text-secondary)]",
                        children: "Check the status of all your RSS feeds and identify issues"
                    }, void 0, false, {
                        fileName: "[project]/src/app/health/page.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/health/page.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-5 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "pt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-2xl font-bold",
                                    children: stats.total
                                }, void 0, false, {
                                    fileName: "[project]/src/app/health/page.tsx",
                                    lineNumber: 242,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-[var(--text-secondary)]",
                                    children: "Total Feeds"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/health/page.tsx",
                                    lineNumber: 243,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/health/page.tsx",
                            lineNumber: 241,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/health/page.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-green-200 bg-green-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "pt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-2xl font-bold text-green-700",
                                    children: stats.success
                                }, void 0, false, {
                                    fileName: "[project]/src/app/health/page.tsx",
                                    lineNumber: 248,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-green-600",
                                    children: "Working"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/health/page.tsx",
                                    lineNumber: 249,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/health/page.tsx",
                            lineNumber: 247,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/health/page.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-red-200 bg-red-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "pt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-2xl font-bold text-red-700",
                                    children: stats.failed
                                }, void 0, false, {
                                    fileName: "[project]/src/app/health/page.tsx",
                                    lineNumber: 254,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-red-600",
                                    children: "Failed"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/health/page.tsx",
                                    lineNumber: 255,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/health/page.tsx",
                            lineNumber: 253,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/health/page.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-blue-200 bg-blue-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "pt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-2xl font-bold text-blue-700",
                                    children: stats.checking
                                }, void 0, false, {
                                    fileName: "[project]/src/app/health/page.tsx",
                                    lineNumber: 260,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-blue-600",
                                    children: "Checking"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/health/page.tsx",
                                    lineNumber: 261,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/health/page.tsx",
                            lineNumber: 259,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/health/page.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-gray-200 bg-gray-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "pt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-2xl font-bold text-gray-700",
                                    children: stats.unknown
                                }, void 0, false, {
                                    fileName: "[project]/src/app/health/page.tsx",
                                    lineNumber: 266,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-gray-600",
                                    children: "Unknown"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/health/page.tsx",
                                    lineNumber: 267,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/health/page.tsx",
                            lineNumber: 265,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/health/page.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/health/page.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-3 items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: checkAllFeeds,
                                disabled: isChecking,
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                        className: `h-4 w-4 ${isChecking ? 'animate-spin' : ''}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/health/page.tsx",
                                        lineNumber: 280,
                                        columnNumber: 13
                                    }, this),
                                    isChecking ? 'Checking...' : 'Check All Feeds'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/health/page.tsx",
                                lineNumber: 275,
                                columnNumber: 11
                            }, this),
                            stats.failed > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: removeAllFailed,
                                variant: "destructive",
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/health/page.tsx",
                                        lineNumber: 289,
                                        columnNumber: 15
                                    }, this),
                                    "Remove All Failed (",
                                    stats.failed,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/health/page.tsx",
                                lineNumber: 284,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/health/page.tsx",
                        lineNumber: 274,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: filter === 'all' ? 'default' : 'outline',
                                onClick: ()=>setFilter('all'),
                                size: "sm",
                                children: "All"
                            }, void 0, false, {
                                fileName: "[project]/src/app/health/page.tsx",
                                lineNumber: 296,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: filter === 'success' ? 'default' : 'outline',
                                onClick: ()=>setFilter('success'),
                                size: "sm",
                                children: "Working"
                            }, void 0, false, {
                                fileName: "[project]/src/app/health/page.tsx",
                                lineNumber: 303,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: filter === 'failed' ? 'default' : 'outline',
                                onClick: ()=>setFilter('failed'),
                                size: "sm",
                                children: "Failed"
                            }, void 0, false, {
                                fileName: "[project]/src/app/health/page.tsx",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/health/page.tsx",
                        lineNumber: 295,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/health/page.tsx",
                lineNumber: 273,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: filteredFeeds.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "p-8 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[var(--text-secondary)]",
                            children: feeds.length === 0 ? 'No feeds found. Add some feeds to get started.' : 'No feeds match the current filter.'
                        }, void 0, false, {
                            fileName: "[project]/src/app/health/page.tsx",
                            lineNumber: 325,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/health/page.tsx",
                        lineNumber: 324,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/health/page.tsx",
                    lineNumber: 323,
                    columnNumber: 11
                }, this) : filteredFeeds.map((feed)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        className: "hover:shadow-md transition-shadow",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1",
                                        children: getStatusIcon(feed.status)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/health/page.tsx",
                                        lineNumber: 337,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between gap-3 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "font-semibold text-sm mb-1 truncate",
                                                                children: feed.title || 'Untitled Feed'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/health/page.tsx",
                                                                lineNumber: 344,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-[var(--text-secondary)] break-all",
                                                                children: feed.url
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/health/page.tsx",
                                                                lineNumber: 347,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/health/page.tsx",
                                                        lineNumber: 343,
                                                        columnNumber: 23
                                                    }, this),
                                                    getStatusBadge(feed.status)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/health/page.tsx",
                                                lineNumber: 342,
                                                columnNumber: 21
                                            }, this),
                                            feed.status === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4 text-xs text-[var(--text-secondary)] mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "✓ ",
                                                            feed.itemCount,
                                                            " articles"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/health/page.tsx",
                                                        lineNumber: 356,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "⚡ ",
                                                            formatResponseTime(feed.responseTime)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/health/page.tsx",
                                                        lineNumber: 357,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/health/page.tsx",
                                                lineNumber: 355,
                                                columnNumber: 23
                                            }, this),
                                            (feed.status === 'failed' || feed.status === 'timeout') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-red-50 border border-red-200 rounded p-3 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-red-800 font-medium mb-1",
                                                        children: feed.error
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/health/page.tsx",
                                                        lineNumber: 363,
                                                        columnNumber: 25
                                                    }, this),
                                                    feed.suggestion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-red-600",
                                                        children: [
                                                            "💡 ",
                                                            feed.suggestion
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/health/page.tsx",
                                                        lineNumber: 367,
                                                        columnNumber: 27
                                                    }, this),
                                                    getRSSHubAlternative(feed.url) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-blue-600 mt-1",
                                                        children: [
                                                            "🔄 ",
                                                            getRSSHubAlternative(feed.url)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/health/page.tsx",
                                                        lineNumber: 372,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/health/page.tsx",
                                                lineNumber: 362,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    feed.status !== 'checking' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "outline",
                                                        size: "sm",
                                                        onClick: ()=>retryFeed(feed.url),
                                                        className: "text-xs",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                                className: "h-3 w-3 mr-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/health/page.tsx",
                                                                lineNumber: 387,
                                                                columnNumber: 27
                                                            }, this),
                                                            "Retry"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/health/page.tsx",
                                                        lineNumber: 381,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "ghost",
                                                        size: "sm",
                                                        onClick: ()=>window.open(feed.url, '_blank'),
                                                        className: "text-xs",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                className: "h-3 w-3 mr-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/health/page.tsx",
                                                                lineNumber: 397,
                                                                columnNumber: 25
                                                            }, this),
                                                            "Open"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/health/page.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "ghost",
                                                        size: "sm",
                                                        onClick: ()=>removeFeed(feed.url),
                                                        className: "text-xs text-red-600 hover:text-red-700",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                className: "h-3 w-3 mr-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/health/page.tsx",
                                                                lineNumber: 406,
                                                                columnNumber: 25
                                                            }, this),
                                                            "Remove"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/health/page.tsx",
                                                        lineNumber: 400,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/health/page.tsx",
                                                lineNumber: 379,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/health/page.tsx",
                                        lineNumber: 341,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/health/page.tsx",
                                lineNumber: 336,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/health/page.tsx",
                            lineNumber: 335,
                            columnNumber: 15
                        }, this)
                    }, feed.url, false, {
                        fileName: "[project]/src/app/health/page.tsx",
                        lineNumber: 334,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/health/page.tsx",
                lineNumber: 321,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "border-blue-200 bg-blue-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-sm",
                            children: "Tips for Managing Feeds"
                        }, void 0, false, {
                            fileName: "[project]/src/app/health/page.tsx",
                            lineNumber: 421,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/health/page.tsx",
                        lineNumber: 420,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "text-sm text-blue-800 space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Timeout errors:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/health/page.tsx",
                                        lineNumber: 424,
                                        columnNumber: 16
                                    }, this),
                                    " The feed server is too slow. Consider removing these feeds."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/health/page.tsx",
                                lineNumber: 424,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "RSSHub feeds:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/health/page.tsx",
                                        lineNumber: 425,
                                        columnNumber: 16
                                    }, this),
                                    " These may be rate-limited or unreliable. Look for native RSS feeds from the source."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/health/page.tsx",
                                lineNumber: 425,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "404 errors:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/health/page.tsx",
                                        lineNumber: 426,
                                        columnNumber: 16
                                    }, this),
                                    " The feed URL no longer exists. Remove these feeds."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/health/page.tsx",
                                lineNumber: 426,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Failed feeds:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/health/page.tsx",
                                        lineNumber: 427,
                                        columnNumber: 16
                                    }, this),
                                    " Check if the website still provides an RSS feed, or look for alternatives."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/health/page.tsx",
                                lineNumber: 427,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Slow response times:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/health/page.tsx",
                                        lineNumber: 428,
                                        columnNumber: 16
                                    }, this),
                                    " Feeds taking >5s may slow down your app. Consider removing them."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/health/page.tsx",
                                lineNumber: 428,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/health/page.tsx",
                        lineNumber: 423,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/health/page.tsx",
                lineNumber: 419,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/health/page.tsx",
        lineNumber: 230,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=src_8cfb899b._.js.map
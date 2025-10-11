(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_efebd045._.js", {

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
        className: `border border-[var(--input-border)] rounded-xl px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] bg-[var(--input-bg)] text-[var(--text-primary)] transition-colors ${className}`,
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
const Button = ({ className = "", variant = "default", size = "md", children, ...props })=>{
    const base = "font-semibold rounded-xl shadow-sm transition-colors";
    const sizes = {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg"
    };
    const variants = {
        default: "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-sm",
        destructive: "bg-red-600 hover:bg-red-700 text-white shadow-sm",
        ghost: "bg-transparent hover:bg-[var(--muted-hover)] text-[var(--text-primary)] border border-transparent hover:border-[var(--card-border)]",
        outline: "bg-transparent border border-[var(--card-border)] text-[var(--text-primary)] hover:bg-[var(--muted)] hover:border-[var(--card-border)]"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: `${base} ${sizes[size]} ${variants[variant]} ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 21,
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
    "CardContent": (()=>CardContent),
    "CardHeader": (()=>CardHeader),
    "CardTitle": (()=>CardTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Card = ({ className, children, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `border border-[var(--card-border)] rounded-2xl shadow-sm bg-[var(--card-bg)] transition-colors ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
};
_c = Card;
const CardHeader = ({ className, children, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `pb-4 ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
};
_c1 = CardHeader;
const CardTitle = ({ className, children, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        className: `text-lg font-semibold leading-none tracking-tight ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
};
_c2 = CardTitle;
const CardContent = ({ className, children, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `space-y-1 ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
};
_c3 = CardContent;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardContent");
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
    "discoverFeedUrlWithFallbacks": (()=>discoverFeedUrlWithFallbacks),
    "fetchAndParseRSS": (()=>fetchAndParseRSS),
    "fetchAndParseRSSWithFallbacks": (()=>fetchAndParseRSSWithFallbacks),
    "fetchWithCors": (()=>fetchWithCors),
    "filterArticlesBySentiment": (()=>filterArticlesBySentiment),
    "getAlternativeRSSSources": (()=>getAlternativeRSSSources),
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
 */ // Helper function to clean XML content before parsing
function cleanXMLContent(xmlString) {
    // First, normalize line endings
    xmlString = xmlString.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    // Handle the specific malformed CDATA patterns we're seeing in error logs
    // Pattern: "><![CDATA[>>" - this is completely malformed
    xmlString = xmlString.replace(/><!\[CDATA\[>>/g, '>');
    // Pattern: "><![CDATA[>" - another malformed pattern
    xmlString = xmlString.replace(/><!\[CDATA\[>/g, '>');
    // Pattern: "><![CDATA[><![CDATA[>>" - nested malformed CDATA
    xmlString = xmlString.replace(/><!\[CDATA\[><!\[CDATA\[>>/g, '>');
    // Pattern: "><![CDATA[><![CDATA[><![CDATA[>>" - triple nested malformed CDATA
    xmlString = xmlString.replace(/><!\[CDATA\[><!\[CDATA\[><!\[CDATA\[>>/g, '>');
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
    // Final cleanup: handle any remaining problematic sequences that might cause parsing errors
    // This is a more aggressive approach for very problematic feeds
    xmlString = xmlString.replace(/\]\]/g, ']]]]><![CDATA[>');
    // Also handle any remaining ]] sequences that might be in HTML content
    xmlString = xmlString.replace(/\]\]>/g, ']]]]><![CDATA[>');
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
        // Declare xmlDoc at function level
        let xmlDoc;
        // Pre-check for the specific malformed CDATA patterns we're seeing in error logs
        if (cleanedXML.includes('><![CDATA[>>') || cleanedXML.includes('><![CDATA[>') || cleanedXML.includes('><![CDATA[><![CDATA[>>') || cleanedXML.includes('><![CDATA[><![CDATA[><![CDATA[>>')) {
            console.debug(`Detected malformed CDATA patterns in ${url}, applying pre-parse cleanup...`);
            // Log the specific patterns found for debugging
            const patterns = [];
            if (cleanedXML.includes('><![CDATA[>>')) patterns.push('><![CDATA[>>');
            if (cleanedXML.includes('><![CDATA[>')) patterns.push('><![CDATA[>');
            if (cleanedXML.includes('><![CDATA[><![CDATA[>>')) patterns.push('><![CDATA[><![CDATA[>>');
            if (cleanedXML.includes('><![CDATA[><![CDATA[><![CDATA[>>')) patterns.push('><![CDATA[><![CDATA[><![CDATA[>>');
            console.debug(`Found malformed patterns in ${url}:`, patterns);
            // Apply the same cleanup patterns we use in aggressive cleaning
            let preCleaned = cleanedXML;
            preCleaned = preCleaned.replace(/><!\[CDATA\[>>/g, '>');
            preCleaned = preCleaned.replace(/><!\[CDATA\[>/g, '>');
            preCleaned = preCleaned.replace(/><!\[CDATA\[><!\[CDATA\[>>/g, '>');
            preCleaned = preCleaned.replace(/><!\[CDATA\[><!\[CDATA\[><!\[CDATA\[>>/g, '>');
            // Try parsing the pre-cleaned version first
            const parser = new DOMParser();
            xmlDoc = parser.parseFromString(preCleaned, "text/xml");
            // If pre-cleaning worked, use it; otherwise fall back to original cleaned version
            const preParseError = xmlDoc.querySelector("parsererror");
            if (!preParseError) {
                console.log(`Pre-parse cleanup successful for ${url}`);
            } else {
                console.debug(`Pre-parse cleanup failed for ${url}, falling back to standard cleaning...`);
                xmlDoc = parser.parseFromString(cleanedXML, "text/xml");
            }
        } else {
            const parser = new DOMParser();
            xmlDoc = parser.parseFromString(cleanedXML, "text/xml");
        }
        // Check for parsing errors
        const parseError = xmlDoc.querySelector("parsererror");
        if (parseError) {
            console.error(`XML parsing error for ${url}:`, parseError.textContent);
            // Try aggressive cleaning as a fallback
            if (parseError.textContent?.includes("Sequence ']]>' not allowed")) {
                console.debug(`Attempting aggressive XML cleaning for ${url}...`);
                // Try multiple cleaning strategies for malformed XML
                let aggressiveCleaned = cleanedXML;
                // Strategy 1: Handle the specific malformed CDATA patterns we're seeing
                // Pattern: "><![CDATA[>>" - completely malformed
                aggressiveCleaned = aggressiveCleaned.replace(/><!\[CDATA\[>>/g, '>');
                aggressiveCleaned = aggressiveCleaned.replace(/><!\[CDATA\[>/g, '>');
                aggressiveCleaned = aggressiveCleaned.replace(/><!\[CDATA\[><!\[CDATA\[>>/g, '>');
                aggressiveCleaned = aggressiveCleaned.replace(/><!\[CDATA\[><!\[CDATA\[><!\[CDATA\[>>/g, '>');
                // Strategy 2: Escape all ]] sequences that aren't in CDATA
                aggressiveCleaned = aggressiveCleaned.replace(/\]\]/g, ']]]]><![CDATA[>');
                // Strategy 3: If that doesn't work, try removing problematic sequences
                if (aggressiveCleaned.includes(']]]]><![CDATA[>')) {
                    aggressiveCleaned = aggressiveCleaned.replace(/\]\]\]\]><!\[CDATA\[>/g, ']]');
                }
                // Strategy 4: Remove any remaining problematic CDATA sections
                aggressiveCleaned = aggressiveCleaned.replace(/<!\[CDATA\[[^\]]*\]\]>/g, '');
                // Strategy 5: Clean up any remaining malformed patterns
                aggressiveCleaned = aggressiveCleaned.replace(/<!\[CDATA\[[^\]>]*$/g, ''); // Remove incomplete CDATA at end
                aggressiveCleaned = aggressiveCleaned.replace(/^[^<]*\]\]>/g, ''); // Remove incomplete CDATA at start
                // Try parsing again
                const parser = new DOMParser();
                xmlDoc = parser.parseFromString(aggressiveCleaned, "text/xml");
                // Check if the aggressive cleaning worked
                const secondParseError = xmlDoc.querySelector("parsererror");
                if (secondParseError) {
                    console.warn(`Aggressive cleaning failed for ${url}, trying final fallback...`);
                    // Final fallback: strip all CDATA and try to parse as basic XML
                    const strippedXML = cleanedXML.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '').replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;');
                    xmlDoc = parser.parseFromString(strippedXML, "text/xml");
                    const finalParseError = xmlDoc.querySelector("parsererror");
                    if (finalParseError) {
                        console.warn(`All XML cleaning strategies failed for ${url}, continuing with original...`);
                        xmlDoc = parser.parseFromString(cleanedXML, "text/xml");
                    } else {
                        console.log(`Final fallback cleaning successful for ${url}`);
                    }
                } else {
                    console.log(`Aggressive cleaning successful for ${url}`);
                }
            }
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
            lastSync: 0,
            language: 'en',
            autoMarkAsReadOnScroll: true // Default to enabled
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/useTransformerWorker.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useTransformerWorker": (()=>useTransformerWorker)
});
// lib/useTransformerWorker.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
// Fallback feed suggestions when API fails
const FALLBACK_FEEDS = [
    {
        id: '1',
        title: "TechCrunch",
        url: "https://techcrunch.com/feed/"
    },
    {
        id: '2',
        title: "The Verge",
        url: "https://www.theverge.com/rss/index.xml"
    },
    {
        id: '3',
        title: "Wired",
        url: "https://www.wired.com/feed/rss"
    },
    {
        id: '4',
        title: "Ars Technica",
        url: "https://arstechnica.com/feed/"
    },
    {
        id: '5',
        title: "Engadget",
        url: "https://www.engadget.com/rss.xml"
    }
];
// Direct topic-based suggestions for common topics
const TOPIC_BASED_FEEDS = {
    "tech": [
        {
            id: '1',
            title: "TechCrunch",
            url: "https://techcrunch.com/feed/"
        },
        {
            id: '2',
            title: "The Verge",
            url: "https://www.theverge.com/rss/index.xml"
        },
        {
            id: '3',
            title: "Wired",
            url: "https://www.wired.com/feed/rss"
        },
        {
            id: '4',
            title: "Ars Technica",
            url: "https://arstechnica.com/feed/"
        },
        {
            id: '5',
            title: "Engadget",
            url: "https://www.engadget.com/rss.xml"
        }
    ],
    "programming": [
        {
            id: '6',
            title: "Dev.to",
            url: "https://dev.to/feed/"
        },
        {
            id: '7',
            title: "CSS-Tricks",
            url: "https://css-tricks.com/feed/"
        },
        {
            id: '8',
            title: "Smashing Magazine",
            url: "https://www.smashingmagazine.com/feed/"
        },
        {
            id: '9',
            title: "JavaScript Weekly",
            url: "https://javascriptweekly.com/rss/"
        },
        {
            id: '10',
            title: "React Blog",
            url: "https://reactjs.org/feed.xml"
        }
    ],
    "news": [
        {
            id: '11',
            title: "BBC News",
            url: "http://feeds.bbci.co.uk/news/rss.xml"
        },
        {
            id: '12',
            title: "Reuters",
            url: "https://www.reutersagency.com/feed/"
        },
        {
            id: '13',
            title: "The Guardian",
            url: "https://www.theguardian.com/international/rss"
        },
        {
            id: '14',
            title: "NPR News",
            url: "https://feeds.npr.org/1001/rss.xml"
        },
        {
            id: '15',
            title: "CNN",
            url: "https://rss.cnn.com/rss/cnn_topstories.rss"
        }
    ],
    "science": [
        {
            id: '16',
            title: "Scientific American",
            url: "https://www.scientificamerican.com/feed/"
        },
        {
            id: '17',
            title: "Science Daily",
            url: "https://www.sciencedaily.com/rss/all.xml"
        },
        {
            id: '18',
            title: "Nature",
            url: "https://www.nature.com/nature.rss"
        },
        {
            id: '19',
            title: "Science News",
            url: "https://www.sciencenews.org/feed"
        },
        {
            id: '20',
            title: "New Scientist",
            url: "https://www.newscientist.com/feed/"
        }
    ]
};
function useTransformerWorker() {
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const workerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTransformerWorker.useEffect": ()=>{
            async function initWorker() {
                if ("TURBOPACK compile-time truthy", 1) {
                    try {
                        // Disable worker initialization in development mode with Turbopack
                        // Workers will be initialized on-demand when needed
                        console.log('Worker initialization deferred - will initialize on first use');
                    } catch (error) {
                        console.error('Failed to initialize worker:', error);
                        setError('Failed to initialize worker');
                    }
                }
            }
            initWorker();
            return ({
                "useTransformerWorker.useEffect": ()=>{
                    if (workerRef.current) {
                        workerRef.current.terminate();
                    }
                }
            })["useTransformerWorker.useEffect"];
        }
    }["useTransformerWorker.useEffect"], []);
    // Lazy worker initialization helper
    const ensureWorker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTransformerWorker.useCallback[ensureWorker]": ()=>{
            if (!workerRef.current && "object" !== 'undefined') {
                try {
                    // Use URL constructor to make it statically analyzable for Turbopack
                    const workerPath = new URL('/workers/transformer-worker.js', window.location.origin);
                    workerRef.current = new Worker(workerPath, {
                        type: 'module',
                        name: 'transformer-worker'
                    });
                    workerRef.current.onerror = ({
                        "useTransformerWorker.useCallback[ensureWorker]": (error)=>{
                            console.error('Worker error:', error);
                            setError('Worker error occurred');
                            setIsLoading(false);
                        }
                    })["useTransformerWorker.useCallback[ensureWorker]"];
                } catch (error) {
                    console.error('Failed to initialize worker:', error);
                    throw new Error('Failed to initialize worker');
                }
            }
            return workerRef.current;
        }
    }["useTransformerWorker.useCallback[ensureWorker]"], []);
    const suggestFeedsWithWorker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTransformerWorker.useCallback[suggestFeedsWithWorker]": async (topic, feeds)=>{
            // Check if we have direct topic-based suggestions
            const normalizedTopic = topic.toLowerCase().trim();
            for (const [key, topicFeeds] of Object.entries(TOPIC_BASED_FEEDS)){
                if (normalizedTopic.includes(key)) {
                    console.log(`Using direct topic-based suggestions for: ${key}`);
                    return topicFeeds.map({
                        "useTransformerWorker.useCallback[suggestFeedsWithWorker]": (feed)=>({
                                ...feed,
                                score: 1.0
                            })
                    }["useTransformerWorker.useCallback[suggestFeedsWithWorker]"]);
                }
            }
            try {
                const worker = ensureWorker();
                if (!worker) {
                    return FALLBACK_FEEDS.map({
                        "useTransformerWorker.useCallback[suggestFeedsWithWorker]": (feed)=>({
                                ...feed,
                                score: 0.5
                            })
                    }["useTransformerWorker.useCallback[suggestFeedsWithWorker]"]);
                }
                setIsLoading(true);
                setError(null);
                return await new Promise({
                    "useTransformerWorker.useCallback[suggestFeedsWithWorker]": (resolve, reject)=>{
                        const timeoutId = setTimeout({
                            "useTransformerWorker.useCallback[suggestFeedsWithWorker].timeoutId": ()=>{
                                reject(new Error('Worker timeout'));
                            }
                        }["useTransformerWorker.useCallback[suggestFeedsWithWorker].timeoutId"], 15000);
                        const handleMessage = {
                            "useTransformerWorker.useCallback[suggestFeedsWithWorker].handleMessage": (event)=>{
                                clearTimeout(timeoutId);
                                if (event.data.type === 'feed_suggestions') {
                                    resolve(event.data.data);
                                } else if (event.data.type === 'error') {
                                    reject(new Error(event.data.error));
                                }
                            }
                        }["useTransformerWorker.useCallback[suggestFeedsWithWorker].handleMessage"];
                        workerRef.current.addEventListener('message', handleMessage, {
                            once: true
                        });
                        workerRef.current.postMessage({
                            type: 'suggest_feeds',
                            data: {
                                topic,
                                feeds
                            }
                        });
                    }
                }["useTransformerWorker.useCallback[suggestFeedsWithWorker]"]);
            } catch (err) {
                console.error("suggestFeedsWithWorker error:", err);
                return FALLBACK_FEEDS.map({
                    "useTransformerWorker.useCallback[suggestFeedsWithWorker]": (feed)=>({
                            ...feed,
                            score: 0.5
                        })
                }["useTransformerWorker.useCallback[suggestFeedsWithWorker]"]);
            } finally{
                setIsLoading(false);
            }
        }
    }["useTransformerWorker.useCallback[suggestFeedsWithWorker]"], [
        ensureWorker
    ]);
    const analyzeArticle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTransformerWorker.useCallback[analyzeArticle]": async (title, content)=>{
            const worker = ensureWorker();
            if (!worker) {
                throw new Error('Worker not initialized');
            }
            setIsLoading(true);
            setError(null);
            try {
                return new Promise({
                    "useTransformerWorker.useCallback[analyzeArticle]": (resolve, reject)=>{
                        const timeoutId = setTimeout({
                            "useTransformerWorker.useCallback[analyzeArticle].timeoutId": ()=>{
                                reject(new Error('Worker timeout'));
                            }
                        }["useTransformerWorker.useCallback[analyzeArticle].timeoutId"], 30000);
                        const handleMessage = {
                            "useTransformerWorker.useCallback[analyzeArticle].handleMessage": (event)=>{
                                clearTimeout(timeoutId);
                                if (event.data.type === 'article_analysis') {
                                    resolve(event.data.data);
                                } else if (event.data.type === 'error') {
                                    reject(new Error(event.data.error));
                                }
                            }
                        }["useTransformerWorker.useCallback[analyzeArticle].handleMessage"];
                        workerRef.current.addEventListener('message', handleMessage, {
                            once: true
                        });
                        workerRef.current.postMessage({
                            type: 'analyze_article',
                            data: {
                                title,
                                content
                            }
                        });
                    }
                }["useTransformerWorker.useCallback[analyzeArticle]"]);
            } catch (err) {
                console.error("analyzeArticle error:", err);
                throw err;
            } finally{
                setIsLoading(false);
            }
        }
    }["useTransformerWorker.useCallback[analyzeArticle]"], [
        ensureWorker
    ]);
    const batchAnalyzeArticles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTransformerWorker.useCallback[batchAnalyzeArticles]": async (articles)=>{
            const worker = ensureWorker();
            if (!worker) {
                throw new Error('Worker not initialized');
            }
            setIsLoading(true);
            setError(null);
            try {
                return new Promise({
                    "useTransformerWorker.useCallback[batchAnalyzeArticles]": (resolve, reject)=>{
                        const timeoutId = setTimeout({
                            "useTransformerWorker.useCallback[batchAnalyzeArticles].timeoutId": ()=>{
                                reject(new Error('Worker timeout'));
                            }
                        }["useTransformerWorker.useCallback[batchAnalyzeArticles].timeoutId"], 60000);
                        const handleMessage = {
                            "useTransformerWorker.useCallback[batchAnalyzeArticles].handleMessage": (event)=>{
                                clearTimeout(timeoutId);
                                if (event.data.type === 'batch_analysis') {
                                    resolve(event.data.data);
                                } else if (event.data.type === 'error') {
                                    reject(new Error(event.data.error));
                                }
                            }
                        }["useTransformerWorker.useCallback[batchAnalyzeArticles].handleMessage"];
                        workerRef.current.addEventListener('message', handleMessage, {
                            once: true
                        });
                        workerRef.current.postMessage({
                            type: 'batch_analyze',
                            data: {
                                articles
                            }
                        });
                    }
                }["useTransformerWorker.useCallback[batchAnalyzeArticles]"]);
            } catch (err) {
                console.error("batchAnalyzeArticles error:", err);
                throw err;
            } finally{
                setIsLoading(false);
            }
        }
    }["useTransformerWorker.useCallback[batchAnalyzeArticles]"], [
        ensureWorker
    ]);
    return {
        suggestFeedsWithWorker,
        analyzeArticle,
        batchAnalyzeArticles,
        isLoading,
        error
    };
}
_s(useTransformerWorker, "5bgo03C1PmKrNBWEPCNc6KppUEQ=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "cn": (()=>cn),
    "formatDate": (()=>formatDate)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/badge.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Badge": (()=>Badge),
    "badgeVariants": (()=>badgeVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            outline: "text-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/feedMigration.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// lib/feedMigration.ts
__turbopack_context__.s({
    "FEED_MIGRATION_GUIDE": (()=>FEED_MIGRATION_GUIDE),
    "generateMigrationReport": (()=>generateMigrationReport),
    "getFeedMigrationSuggestions": (()=>getFeedMigrationSuggestions)
});
const FEED_MIGRATION_GUIDE = {
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
function getFeedMigrationSuggestions(failedUrl) {
    const url = new URL(failedUrl);
    if (url.hostname !== 'rsshub.app') {
        return null;
    }
    const path = url.pathname;
    // Check for Twitter user feeds
    if (path.match(/^\/twitter\/user\/[^\/]+/)) {
        const username = path.split('/').pop();
        const migration = {
            ...FEED_MIGRATION_GUIDE['twitter-user']
        };
        migration.originalUrl = failedUrl;
        migration.alternatives = migration.alternatives.map((alt)=>({
                ...alt,
                url: alt.url.replace('{username}', username || '')
            }));
        return migration;
    }
    // Check for GitHub trending feeds
    if (path.match(/^\/github\/trending/)) {
        return {
            ...FEED_MIGRATION_GUIDE['github-trending'],
            originalUrl: failedUrl
        };
    }
    // Check for GitHub user feeds
    if (path.match(/^\/github\/user\/[^\/]+/)) {
        const username = path.split('/').pop();
        const migration = {
            ...FEED_MIGRATION_GUIDE['github-user']
        };
        migration.originalUrl = failedUrl;
        migration.alternatives = migration.alternatives.map((alt)=>({
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
function generateMigrationReport(failedUrls) {
    const migrations = failedUrls.map((url)=>getFeedMigrationSuggestions(url)).filter(Boolean);
    const recommendations = [];
    if (migrations.length > 0) {
        recommendations.push(`Found ${migrations.length} feeds that need migration`);
        const twitterFeeds = migrations.filter((m)=>m.originalUrl.includes('/twitter/'));
        if (twitterFeeds.length > 0) {
            recommendations.push(`${twitterFeeds.length} Twitter feeds can be replaced with Nitter or RSS.app alternatives`);
        }
        const githubFeeds = migrations.filter((m)=>m.originalUrl.includes('/github/'));
        if (githubFeeds.length > 0) {
            recommendations.push(`${githubFeeds.length} GitHub feeds can use official GitHub RSS feeds`);
        }
        if (migrations.some((m)=>m.status === 'rate_limited')) {
            recommendations.push('Some feeds are rate-limited - consider self-hosting RSSHub');
        }
    }
    return {
        totalFeeds: failedUrls.length,
        migrations,
        recommendations
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/FeedHealthChecker.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "FeedHealthChecker": (()=>FeedHealthChecker)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/spinner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/twitter.js [app-client] (ecmascript) <export default as Twitter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/github.js [app-client] (ecmascript) <export default as Github>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$feedMigration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/feedMigration.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
function FeedHealthChecker({ feeds, onUpdateFeed }) {
    _s();
    const [healthStatuses, setHealthStatuses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isChecking, setIsChecking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [migrationReport, setMigrationReport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const checkFeedHealth = async (feed)=>{
        const startTime = Date.now();
        try {
            const response = await fetch(`/api/proxy?url=${encodeURIComponent(feed.url)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseTime = Date.now() - startTime;
            if (response.ok) {
                return {
                    url: feed.url,
                    status: 'healthy',
                    responseTime,
                    lastChecked: new Date()
                };
            } else {
                const errorData = await response.json();
                let status = 'error';
                if (response.status === 404) status = 'not_found';
                else if (response.status === 429) status = 'rate_limited';
                return {
                    url: feed.url,
                    status,
                    error: errorData.error || `HTTP ${response.status}`,
                    responseTime,
                    lastChecked: new Date()
                };
            }
        } catch (error) {
            return {
                url: feed.url,
                status: 'error',
                error: error instanceof Error ? error.message : 'Unknown error',
                lastChecked: new Date()
            };
        }
    };
    const checkAllFeeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FeedHealthChecker.useCallback[checkAllFeeds]": async ()=>{
            setIsChecking(true);
            const statuses = [];
            for (const feed of feeds){
                const status = await checkFeedHealth(feed);
                statuses.push(status);
                // Small delay to avoid overwhelming the server
                await new Promise({
                    "FeedHealthChecker.useCallback[checkAllFeeds]": (resolve)=>setTimeout(resolve, 100)
                }["FeedHealthChecker.useCallback[checkAllFeeds]"]);
            }
            setHealthStatuses(statuses);
            setIsChecking(false);
            // Generate migration report for failed feeds
            const failedUrls = statuses.filter({
                "FeedHealthChecker.useCallback[checkAllFeeds].failedUrls": (s)=>s.status !== 'healthy'
            }["FeedHealthChecker.useCallback[checkAllFeeds].failedUrls"]).map({
                "FeedHealthChecker.useCallback[checkAllFeeds].failedUrls": (s)=>s.url
            }["FeedHealthChecker.useCallback[checkAllFeeds].failedUrls"]);
            if (failedUrls.length > 0) {
                const report = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$feedMigration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMigrationReport"])(failedUrls);
                setMigrationReport(report);
            }
        }
    }["FeedHealthChecker.useCallback[checkAllFeeds]"], [
        feeds
    ]);
    const getStatusIcon = (status)=>{
        switch(status){
            case 'healthy':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                    className: "h-4 w-4 text-green-500"
                }, void 0, false, {
                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                    lineNumber: 108,
                    columnNumber: 30
                }, this);
            case 'error':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                    className: "h-4 w-4 text-red-500"
                }, void 0, false, {
                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                    lineNumber: 109,
                    columnNumber: 28
                }, this);
            case 'rate_limited':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                    className: "h-4 w-4 text-yellow-500"
                }, void 0, false, {
                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                    lineNumber: 110,
                    columnNumber: 35
                }, this);
            case 'not_found':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                    className: "h-4 w-4 text-orange-500"
                }, void 0, false, {
                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                    lineNumber: 111,
                    columnNumber: 32
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                    className: "h-4 w-4 text-gray-500"
                }, void 0, false, {
                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                    lineNumber: 112,
                    columnNumber: 23
                }, this);
        }
    };
    const getStatusColor = (status)=>{
        switch(status){
            case 'healthy':
                return 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800';
            case 'error':
                return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800';
            case 'rate_limited':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800';
            case 'not_found':
                return 'text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-900/20 dark:border-orange-800';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800';
        }
    };
    const getFeedTypeIcon = (url)=>{
        if (url.includes('twitter.com') || url.includes('rsshub.app/twitter')) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__["Twitter"], {
                className: "h-4 w-4 text-[var(--text-secondary)]"
            }, void 0, false, {
                fileName: "[project]/src/components/FeedHealthChecker.tsx",
                lineNumber: 128,
                columnNumber: 14
            }, this);
        }
        if (url.includes('github.com') || url.includes('rsshub.app/github')) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__["Github"], {
                className: "h-4 w-4 text-[var(--text-secondary)]"
            }, void 0, false, {
                fileName: "[project]/src/components/FeedHealthChecker.tsx",
                lineNumber: 131,
                columnNumber: 14
            }, this);
        }
        if (url.includes('rsshub.app')) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                className: "h-4 w-4 text-[var(--text-secondary)]"
            }, void 0, false, {
                fileName: "[project]/src/components/FeedHealthChecker.tsx",
                lineNumber: 134,
                columnNumber: 14
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
            className: "h-4 w-4 text-[var(--text-secondary)]"
        }, void 0, false, {
            fileName: "[project]/src/components/FeedHealthChecker.tsx",
            lineNumber: 136,
            columnNumber: 12
        }, this);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeedHealthChecker.useEffect": ()=>{
            if (feeds.length > 0) {
                checkAllFeeds();
            }
        }
    }["FeedHealthChecker.useEffect"], [
        feeds,
        checkAllFeeds
    ]);
    const healthyFeeds = healthStatuses.filter((s)=>s.status === 'healthy');
    const problematicFeeds = healthStatuses.filter((s)=>s.status !== 'healthy');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, this),
                            "Feed Health Checker"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FeedHealthChecker.tsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-[var(--text-secondary)]",
                                    children: [
                                        feeds.length,
                                        " total feeds • ",
                                        healthyFeeds.length,
                                        " healthy • ",
                                        problematicFeeds.length,
                                        " problematic"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                    lineNumber: 159,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: checkAllFeeds,
                                    disabled: isChecking,
                                    variant: "outline",
                                    size: "sm",
                                    children: [
                                        isChecking ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                            lineNumber: 168,
                                            columnNumber: 29
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                            lineNumber: 168,
                                            columnNumber: 63
                                        }, this),
                                        isChecking ? 'Checking...' : 'Recheck All'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        problematicFeeds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium text-[var(--text-primary)] mb-3",
                                    children: "Problematic Feeds"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                    lineNumber: 175,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: problematicFeeds.map((status, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between p-3 border border-[var(--card-border)] rounded-lg bg-[var(--muted)] hover:bg-[var(--muted-hover)] transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        getStatusIcon(status.status),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                getFeedTypeIcon(status.url),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-medium text-[var(--text-primary)]",
                                                                    children: feeds.find((f)=>f.url === status.url)?.title || 'Unknown Feed'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                                    lineNumber: 183,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                            lineNumber: 181,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            variant: "outline",
                                                            className: getStatusColor(status.status),
                                                            children: status.status.replace('_', ' ')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                            lineNumber: 189,
                                                            columnNumber: 23
                                                        }, this),
                                                        status.responseTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-[var(--text-secondary)]",
                                                            children: [
                                                                status.responseTime,
                                                                "ms"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                            lineNumber: 193,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                            lineNumber: 178,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                    lineNumber: 176,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                            lineNumber: 174,
                            columnNumber: 13
                        }, this),
                        migrationReport && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium text-[var(--text-primary)] mb-3",
                                    children: "Migration Recommendations"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                    lineNumber: 206,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: migrationReport.recommendations.map((rec, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-blue-800 dark:text-blue-200",
                                                children: rec
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                lineNumber: 210,
                                                columnNumber: 21
                                            }, this)
                                        }, index, false, {
                                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                            lineNumber: 209,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                    lineNumber: 207,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-md font-medium text-[var(--text-primary)] mb-2",
                                            children: "Migration Options"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                            lineNumber: 216,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: migrationReport.migrations.map((migration, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "border border-[var(--card-border)] rounded-lg p-4 bg-[var(--card-bg)]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between mb-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                    className: "font-medium text-[var(--text-primary)]",
                                                                    children: feeds.find((f)=>f.url === migration.originalUrl)?.title || 'Unknown Feed'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                                    lineNumber: 221,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                    variant: "outline",
                                                                    className: "text-xs border-[var(--card-border)] text-[var(--text-secondary)]",
                                                                    children: migration.status
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                                    lineNumber: 224,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                            lineNumber: 220,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2",
                                                            children: migration.alternatives.map((alt, altIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-between p-3 bg-[var(--muted)] rounded border border-[var(--card-border)] hover:bg-[var(--muted-hover)] transition-colors",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center gap-2",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-sm font-medium text-[var(--text-primary)]",
                                                                                            children: alt.title
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                                                            lineNumber: 234,
                                                                                            columnNumber: 33
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                            variant: "outline",
                                                                                            className: `text-xs border-[var(--card-border)] ${alt.reliability === 'high' ? 'text-green-600 dark:text-green-400' : alt.reliability === 'medium' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`,
                                                                                            children: [
                                                                                                alt.reliability,
                                                                                                " reliability"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                                                            lineNumber: 235,
                                                                                            columnNumber: 33
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                                                    lineNumber: 233,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-xs text-[var(--text-secondary)] mt-1",
                                                                                    children: alt.description
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                                                    lineNumber: 245,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                alt.setupInstructions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-xs text-[var(--text-secondary)] mt-1",
                                                                                    children: alt.setupInstructions
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                                                    lineNumber: 247,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                                            lineNumber: 232,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex gap-1",
                                                                            children: [
                                                                                onUpdateFeed && !alt.setupRequired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                    variant: "outline",
                                                                                    size: "sm",
                                                                                    onClick: ()=>onUpdateFeed(migration.originalUrl, alt.url),
                                                                                    className: "text-xs px-2 py-1",
                                                                                    children: "Use"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                                                    lineNumber: 252,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                    variant: "ghost",
                                                                                    size: "sm",
                                                                                    onClick: ()=>window.open(alt.url, '_blank'),
                                                                                    className: "text-xs px-2 py-1",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                                        className: "h-3 w-3"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                                                        lineNumber: 267,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                                                    lineNumber: 261,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                                            lineNumber: 250,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, altIndex, true, {
                                                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                                    lineNumber: 231,
                                                                    columnNumber: 27
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                            lineNumber: 229,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                            lineNumber: 217,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                    lineNumber: 215,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                            lineNumber: 205,
                            columnNumber: 13
                        }, this),
                        healthyFeeds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium text-[var(--text-primary)] mb-3",
                                    children: "Healthy Feeds"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                    lineNumber: 282,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3",
                                    children: healthyFeeds.map((status, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded dark:bg-green-900/20 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors",
                                            children: [
                                                getStatusIcon(status.status),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-green-800 dark:text-green-200",
                                                    children: feeds.find((f)=>f.url === status.url)?.title || 'Unknown Feed'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                    lineNumber: 287,
                                                    columnNumber: 21
                                                }, this),
                                                status.responseTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-green-600 dark:text-green-400 ml-auto",
                                                    children: [
                                                        status.responseTime,
                                                        "ms"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                            lineNumber: 285,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                                    lineNumber: 283,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/FeedHealthChecker.tsx",
                            lineNumber: 281,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/FeedHealthChecker.tsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/FeedHealthChecker.tsx",
            lineNumber: 150,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/FeedHealthChecker.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
_s(FeedHealthChecker, "PTm0vad9pp2i5JaZ2NPc9simBcw=");
_c = FeedHealthChecker;
var _c;
__turbopack_context__.k.register(_c, "FeedHealthChecker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/manage/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ManagePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// app/manage/page.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/spinner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rssUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$useTransformerWorker$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/useTransformerWorker.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FeedHealthChecker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FeedHealthChecker.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
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
// Category management component
const CategoryManager = ({ categories, onAddCategory, onEditCategory, onDeleteCategory })=>{
    _s();
    const [newCategory, setNewCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        color: '#3B82F6',
        description: ''
    });
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (newCategory.name.trim()) {
            onAddCategory(newCategory);
            setNewCategory({
                name: '',
                color: '#3B82F6',
                description: ''
            });
        }
    };
    const handleEdit = (category)=>{
        setEditingId(category.id);
        setNewCategory({
            name: category.name,
            color: category.color,
            description: category.description || ''
        });
    };
    const handleSaveEdit = ()=>{
        if (editingId && newCategory.name.trim()) {
            onEditCategory(editingId, newCategory);
            setEditingId(null);
            setNewCategory({
                name: '',
                color: '#3B82F6',
                description: ''
            });
        }
    };
    const handleCancelEdit = ()=>{
        setEditingId(null);
        setNewCategory({
            name: '',
            color: '#3B82F6',
            description: ''
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-medium text-[var(--text-primary)]",
                children: "Manage Categories"
            }, void 0, false, {
                fileName: "[project]/src/app/manage/page.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        type: "text",
                        placeholder: "Category name",
                        value: newCategory.name,
                        onChange: (e)=>setNewCategory((prev)=>({
                                    ...prev,
                                    name: e.target.value
                                })),
                        className: "flex-1"
                    }, void 0, false, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        type: "color",
                        value: newCategory.color,
                        onChange: (e)=>setNewCategory((prev)=>({
                                    ...prev,
                                    color: e.target.value
                                })),
                        className: "w-16"
                    }, void 0, false, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        type: "text",
                        placeholder: "Description (optional)",
                        value: newCategory.description,
                        onChange: (e)=>setNewCategory((prev)=>({
                                    ...prev,
                                    description: e.target.value
                                })),
                        className: "flex-1"
                    }, void 0, false, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    editingId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                onClick: handleSaveEdit,
                                size: "sm",
                                children: "Save"
                            }, void 0, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: "destructive",
                                onClick: handleCancelEdit,
                                size: "sm",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "submit",
                        size: "sm",
                        children: "Add"
                    }, void 0, false, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/manage/page.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-2",
                children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between p-4 bg-[var(--muted)] border border-[var(--card-border)] rounded-lg hover:bg-[var(--muted-hover)] transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-4 h-4 rounded-full border border-[var(--card-border)]",
                                        style: {
                                            backgroundColor: category.color
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium text-[var(--text-primary)]",
                                                children: category.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/manage/page.tsx",
                                                lineNumber: 113,
                                                columnNumber: 17
                                            }, this),
                                            category.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-[var(--text-secondary)] mt-1",
                                                children: category.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/manage/page.tsx",
                                                lineNumber: 115,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 107,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "sm",
                                        onClick: ()=>handleEdit(category),
                                        className: "hover:bg-[var(--accent)] hover:text-[var(--text-primary)]",
                                        children: "Edit"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this),
                                    category.id !== 'uncategorized' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "destructive",
                                        size: "sm",
                                        onClick: ()=>onDeleteCategory(category.id),
                                        children: "Delete"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this)
                        ]
                    }, category.id, true, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/manage/page.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/manage/page.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
};
_s(CategoryManager, "Noo+F2czBn6QX8tkQxdeuic4jeg=");
_c = CategoryManager;
// Sentiment filter settings component
const SentimentFilterSettings = ({ preferences, onUpdatePreferences })=>{
    const updateSentimentFilter = (updates)=>{
        onUpdatePreferences({
            ...preferences,
            sentimentFilter: {
                ...preferences.sentimentFilter,
                ...updates
            }
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-medium text-[var(--text-primary)]",
                children: "Sentiment Filtering"
            }, void 0, false, {
                fileName: "[project]/src/app/manage/page.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-2 text-[var(--text-primary)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: preferences.sentimentFilter.enabled,
                                onChange: (e)=>updateSentimentFilter({
                                        enabled: e.target.checked
                                    }),
                                className: "rounded border-[var(--input-border)] focus:ring-[var(--input-focus)]"
                            }, void 0, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Enable sentiment filtering"
                            }, void 0, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    preferences.sentimentFilter.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm text-[var(--text-primary)]",
                                    children: [
                                        "Minimum sentiment score: ",
                                        preferences.sentimentFilter.minSentiment,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "range",
                                            min: "-1",
                                            max: "1",
                                            step: "0.1",
                                            value: preferences.sentimentFilter.minSentiment,
                                            onChange: (e)=>updateSentimentFilter({
                                                    minSentiment: parseFloat(e.target.value)
                                                }),
                                            className: "w-full mt-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/manage/page.tsx",
                                            lineNumber: 183,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm text-[var(--text-primary)]",
                                    children: [
                                        "Maximum toxicity: ",
                                        Math.round(preferences.sentimentFilter.maxToxicity * 100),
                                        "%",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "range",
                                            min: "0",
                                            max: "1",
                                            step: "0.1",
                                            value: preferences.sentimentFilter.maxToxicity,
                                            onChange: (e)=>updateSentimentFilter({
                                                    maxToxicity: parseFloat(e.target.value)
                                                }),
                                            className: "w-full mt-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/manage/page.tsx",
                                            lineNumber: 198,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 196,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 195,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2 text-[var(--text-primary)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: preferences.sentimentFilter.hideClickbait,
                                        onChange: (e)=>updateSentimentFilter({
                                                hideClickbait: e.target.checked
                                            }),
                                        className: "rounded border-[var(--input-border)] focus:ring-[var(--input-focus)]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 211,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Hide clickbait articles"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 217,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 210,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2 text-[var(--text-primary)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: preferences.sentimentFilter.hideRagebait,
                                        onChange: (e)=>updateSentimentFilter({
                                                hideRagebait: e.target.checked
                                            }),
                                        className: "rounded border-[var(--input-border)] focus:ring-[var(--input-focus)]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 221,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Hide ragebait articles"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 227,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 220,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/manage/page.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/manage/page.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, this);
};
_c1 = SentimentFilterSettings;
// SuggestedFeed component to reduce re-renders
const SuggestedFeed = ({ feed, onSubscribe })=>{
    _s1();
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
                                    lineNumber: 251,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 250,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-medium text-[var(--text-primary)]",
                                        children: feed.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 261,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-[var(--text-secondary)] break-all",
                                        children: feed.url
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 262,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 260,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 248,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "default",
                        onClick: ()=>onSubscribe(feed),
                        className: "whitespace-nowrap",
                        children: "Subscribe"
                    }, void 0, false, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 265,
                        columnNumber: 11
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
        }, this)
    }, feed.url, false, {
        fileName: "[project]/src/app/manage/page.tsx",
        lineNumber: 245,
        columnNumber: 5
    }, this);
};
_s1(SuggestedFeed, "LrrVfNW3d1raFE0BNzCTILYmIfo=");
_c2 = SuggestedFeed;
// SavedFeed component
const SavedFeed = ({ feed, categories, onRemove, onUpdate })=>{
    _s2();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editData, setEditData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: feed.title,
        category: feed.category || 'Uncategorized'
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SavedFeed.useEffect": ()=>{
            setMounted(true);
        }
    }["SavedFeed.useEffect"], []);
    const handleSave = ()=>{
        onUpdate(feed.url, editData);
        setIsEditing(false);
    };
    const handleCancel = ()=>{
        setEditData({
            title: feed.title,
            category: feed.category || 'Uncategorized'
        });
        setIsEditing(false);
    };
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
                                    lineNumber: 315,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 314,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: editData.title,
                                            onChange: (e)=>setEditData((prev)=>({
                                                        ...prev,
                                                        title: e.target.value
                                                    })),
                                            className: "text-sm"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/manage/page.tsx",
                                            lineNumber: 327,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: editData.category,
                                            onChange: (e)=>setEditData((prev)=>({
                                                        ...prev,
                                                        category: e.target.value
                                                    })),
                                            className: "w-full text-sm p-2 border border-[var(--input-border)] rounded bg-[var(--input-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)]",
                                            children: categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: cat.id,
                                                    children: cat.name
                                                }, cat.id, false, {
                                                    fileName: "[project]/src/app/manage/page.tsx",
                                                    lineNumber: 338,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/manage/page.tsx",
                                            lineNumber: 332,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 326,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium text-[var(--text-primary)]",
                                            children: feed.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/manage/page.tsx",
                                            lineNumber: 344,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-[var(--text-secondary)] break-all",
                                            children: feed.url
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/manage/page.tsx",
                                            lineNumber: 345,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-[var(--text-secondary)] mt-1",
                                            children: [
                                                "Category: ",
                                                categories.find((c)=>c.id === feed.category)?.name || 'Uncategorized'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/manage/page.tsx",
                                            lineNumber: 346,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 343,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 324,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 312,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "default",
                                    size: "sm",
                                    onClick: handleSave,
                                    children: "Save"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 356,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "destructive",
                                    size: "sm",
                                    onClick: handleCancel,
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 357,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: ()=>setIsEditing(true),
                                    children: "Edit"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 361,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "destructive",
                                    size: "sm",
                                    onClick: ()=>onRemove(feed.url),
                                    children: "Remove"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 362,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 353,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/manage/page.tsx",
                lineNumber: 311,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/manage/page.tsx",
            lineNumber: 310,
            columnNumber: 7
        }, this)
    }, feed.url, false, {
        fileName: "[project]/src/app/manage/page.tsx",
        lineNumber: 309,
        columnNumber: 5
    }, this);
};
_s2(SavedFeed, "sZLjM7/q6nECcq1HAmdYmB/EJto=");
_c3 = SavedFeed;
function ManagePage() {
    _s3();
    const [feedUrlInput, setFeedUrlInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [topic, setTopic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [suggestedFeeds, setSuggestedFeeds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [savedFeeds, setSavedFeeds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [preferences, setPreferences] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSuggesting, setIsSuggesting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isImporting, setIsImporting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('feeds');
    const { suggestFeedsWithWorker, isLoading: workerLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$useTransformerWorker$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransformerWorker"])();
    // Load saved data on initial render
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ManagePage.useEffect": ()=>{
            const feeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadFeedsFromStorage"])();
            const cats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadCategoriesFromStorage"])();
            const prefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadUserPreferences"])();
            setSavedFeeds(feeds);
            setCategories(cats);
            setPreferences(prefs);
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
                let discoveredFeedUrl = null;
                if (!feedData) {
                    discoveredFeedUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeedUrlFromHtml"])(feedUrlInput.trim());
                    if (discoveredFeedUrl) {
                        feedData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAndParseRSS"])(discoveredFeedUrl);
                    }
                }
                // If still no feed, try advanced discovery
                if (!feedData) {
                    discoveredFeedUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["discoverFeedUrlWithFallbacks"])(feedUrlInput.trim());
                    if (discoveredFeedUrl) {
                        feedData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAndParseRSS"])(discoveredFeedUrl);
                    }
                }
                if (feedData && feedData.items && feedData.items.length > 0) {
                    // Get the feed title from the feed data or use the hostname
                    const feedTitle = feedData.title || new URL(feedUrlInput.trim()).hostname;
                    const newFeed = {
                        id: `feed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                        title: feedTitle,
                        url: discoveredFeedUrl || feedUrlInput.trim(),
                        category: 'Uncategorized',
                        tags: [],
                        isActive: true
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
                const feeds = await suggestFeedsWithWorker(topic.trim(), []);
                setSuggestedFeeds(feeds);
            } catch (error) {
                console.error("Error suggesting feeds:", error);
                setError("Error suggesting feeds. Please try again.");
            } finally{
                setIsSuggesting(false);
            }
        }
    }["ManagePage.useCallback[handleSuggestFeeds]"], [
        topic,
        suggestFeedsWithWorker
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
            const newFeed = {
                ...feed,
                id: feed.id || `feed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                category: 'Uncategorized',
                tags: [],
                isActive: true
            };
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveFeedToStorage"])(newFeed);
            setSavedFeeds({
                "ManagePage.useCallback[handleSubscribeToFeed]": (prev)=>[
                        ...prev,
                        newFeed
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
    // Handle updating a feed
    const handleUpdateFeed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ManagePage.useCallback[handleUpdateFeed]": (url, updates)=>{
            setSavedFeeds({
                "ManagePage.useCallback[handleUpdateFeed]": (prev)=>prev.map({
                        "ManagePage.useCallback[handleUpdateFeed]": (feed)=>feed.url === url ? {
                                ...feed,
                                ...updates
                            } : feed
                    }["ManagePage.useCallback[handleUpdateFeed]"])
            }["ManagePage.useCallback[handleUpdateFeed]"]);
            // Update in storage
            const updatedFeeds = savedFeeds.map({
                "ManagePage.useCallback[handleUpdateFeed].updatedFeeds": (feed)=>feed.url === url ? {
                        ...feed,
                        ...updates
                    } : feed
            }["ManagePage.useCallback[handleUpdateFeed].updatedFeeds"]);
            localStorage.setItem("feeds", JSON.stringify(updatedFeeds));
        }
    }["ManagePage.useCallback[handleUpdateFeed]"], [
        savedFeeds
    ]);
    // Handle feed URL updates for health checker
    const handleFeedUrlUpdate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ManagePage.useCallback[handleFeedUrlUpdate]": (oldUrl, newUrl)=>{
            setSavedFeeds({
                "ManagePage.useCallback[handleFeedUrlUpdate]": (prev)=>prev.map({
                        "ManagePage.useCallback[handleFeedUrlUpdate]": (feed)=>feed.url === oldUrl ? {
                                ...feed,
                                url: newUrl
                            } : feed
                    }["ManagePage.useCallback[handleFeedUrlUpdate]"])
            }["ManagePage.useCallback[handleFeedUrlUpdate]"]);
            // Update in storage
            const updatedFeeds = savedFeeds.map({
                "ManagePage.useCallback[handleFeedUrlUpdate].updatedFeeds": (feed)=>feed.url === oldUrl ? {
                        ...feed,
                        url: newUrl
                    } : feed
            }["ManagePage.useCallback[handleFeedUrlUpdate].updatedFeeds"]);
            localStorage.setItem("feeds", JSON.stringify(updatedFeeds));
        }
    }["ManagePage.useCallback[handleFeedUrlUpdate]"], [
        savedFeeds
    ]);
    // Handle adding a category
    const handleAddCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ManagePage.useCallback[handleAddCategory]": (categoryData)=>{
            const newCategory = {
                id: `cat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                ...categoryData,
                createdAt: Date.now()
            };
            const updatedCategories = [
                ...categories,
                newCategory
            ];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveCategoriesToStorage"])(updatedCategories);
            setCategories(updatedCategories);
        }
    }["ManagePage.useCallback[handleAddCategory]"], [
        categories
    ]);
    // Handle editing a category
    const handleEditCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ManagePage.useCallback[handleEditCategory]": (id, updates)=>{
            const updatedCategories = categories.map({
                "ManagePage.useCallback[handleEditCategory].updatedCategories": (cat)=>cat.id === id ? {
                        ...cat,
                        ...updates
                    } : cat
            }["ManagePage.useCallback[handleEditCategory].updatedCategories"]);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveCategoriesToStorage"])(updatedCategories);
            setCategories(updatedCategories);
        }
    }["ManagePage.useCallback[handleEditCategory]"], [
        categories
    ]);
    // Handle deleting a category
    const handleDeleteCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ManagePage.useCallback[handleDeleteCategory]": (id)=>{
            const updatedCategories = categories.filter({
                "ManagePage.useCallback[handleDeleteCategory].updatedCategories": (cat)=>cat.id !== id
            }["ManagePage.useCallback[handleDeleteCategory].updatedCategories"]);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveCategoriesToStorage"])(updatedCategories);
            setCategories(updatedCategories);
            // Update feeds that were using this category
            const updatedFeeds = savedFeeds.map({
                "ManagePage.useCallback[handleDeleteCategory].updatedFeeds": (feed)=>feed.category === id ? {
                        ...feed,
                        category: 'Uncategorized'
                    } : feed
            }["ManagePage.useCallback[handleDeleteCategory].updatedFeeds"]);
            localStorage.setItem("feeds", JSON.stringify(updatedFeeds));
            setSavedFeeds(updatedFeeds);
        }
    }["ManagePage.useCallback[handleDeleteCategory]"], [
        categories,
        savedFeeds
    ]);
    // Handle updating preferences
    const handleUpdatePreferences = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ManagePage.useCallback[handleUpdatePreferences]": (newPreferences)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveUserPreferences"])(newPreferences);
            setPreferences(newPreferences);
        }
    }["ManagePage.useCallback[handleUpdatePreferences]"], []);
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
        className: "space-y-8 px-4 max-w-4xl mx-auto py-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-[var(--border)] pb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-[var(--text-primary)]",
                        children: "Manage Feeds"
                    }, void 0, false, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 623,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[var(--text-secondary)] mt-1",
                        children: "Add, organize, and monitor your RSS feeds"
                    }, void 0, false, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 624,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/manage/page.tsx",
                lineNumber: 622,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1 border-b border-[var(--border)] bg-[var(--muted)] rounded-t-lg p-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('feeds'),
                        className: `px-4 py-3 rounded-lg transition-all duration-200 font-medium ${activeTab === 'feeds' ? 'bg-[var(--background)] text-[var(--primary)] shadow-sm border border-[var(--card-border)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-hover)]'}`,
                        children: "Feeds"
                    }, void 0, false, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 628,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('categories'),
                        className: `px-4 py-3 rounded-lg transition-all duration-200 font-medium ${activeTab === 'categories' ? 'bg-[var(--background)] text-[var(--primary)] shadow-sm border border-[var(--card-border)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-hover)]'}`,
                        children: "Categories"
                    }, void 0, false, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 638,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('sentiment'),
                        className: `px-4 py-3 rounded-lg transition-all duration-200 font-medium ${activeTab === 'sentiment' ? 'bg-[var(--background)] text-[var(--primary)] shadow-sm border border-[var(--card-border)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-hover)]'}`,
                        children: "Sentiment"
                    }, void 0, false, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 648,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('health'),
                        className: `px-4 py-3 rounded-lg transition-all duration-200 font-medium ${activeTab === 'health' ? 'bg-[var(--background)] text-[var(--primary)] shadow-sm border border-[var(--card-border)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-hover)]'}`,
                        children: "Health"
                    }, void 0, false, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 658,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/manage/page.tsx",
                lineNumber: 627,
                columnNumber: 7
            }, this),
            activeTab === 'feeds' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-b border-[var(--border)] pb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-semibold text-[var(--text-primary)]",
                                        children: "Add Feed"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 675,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-[var(--text-secondary)] mt-1",
                                        children: "Enter a feed URL or import from OPML file"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 676,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 674,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        type: "url",
                                        placeholder: "Enter RSS feed URL",
                                        value: feedUrlInput,
                                        onChange: (e)=>setFeedUrlInput(e.target.value),
                                        className: "flex-1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 679,
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
                                            lineNumber: 692,
                                            columnNumber: 30
                                        }, this) : "Add Feed"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 686,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 678,
                                columnNumber: 13
                            }, this),
                            isLoading && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mt-2 p-3 bg-[var(--muted)] border border-[var(--card-border)] rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
                                        size: "sm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 697,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-[var(--text-secondary)]",
                                        children: "Searching for feeds..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 698,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 696,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        type: "file",
                                        accept: ".opml,.xml",
                                        onChange: handleImportOPML,
                                        className: "flex-1",
                                        disabled: isImporting
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 702,
                                        columnNumber: 15
                                    }, this),
                                    isImporting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
                                        size: "sm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 709,
                                        columnNumber: 31
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 701,
                                columnNumber: 13
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `p-3 rounded-lg border ${error.includes("Successfully") ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200" : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200"}`,
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 712,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 673,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-b border-[var(--border)] pb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-semibold text-[var(--text-primary)]",
                                        children: "Suggest Feeds"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 724,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-[var(--text-secondary)] mt-1",
                                        children: "Discover new feeds based on topics"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 725,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 723,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        type: "text",
                                        placeholder: "Enter a topic (e.g., 'tech news', 'programming')",
                                        value: topic,
                                        onChange: (e)=>setTopic(e.target.value),
                                        className: "flex-1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 728,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "default",
                                        onClick: handleSuggestFeeds,
                                        disabled: isSuggesting || workerLoading,
                                        className: "w-full sm:w-auto",
                                        children: isSuggesting || workerLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
                                            size: "sm"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/manage/page.tsx",
                                            lineNumber: 741,
                                            columnNumber: 50
                                        }, this) : "Suggest"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 735,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 727,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 722,
                        columnNumber: 11
                    }, this),
                    suggestedFeeds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-medium text-[var(--text-primary)]",
                                children: "Suggested Feeds"
                            }, void 0, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 748,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-3",
                                children: suggestedFeeds.map((feed)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SuggestedFeed, {
                                        feed: feed,
                                        onSubscribe: handleSubscribeToFeed
                                    }, feed.url, false, {
                                        fileName: "[project]/src/app/manage/page.tsx",
                                        lineNumber: 751,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 749,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 747,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/manage/page.tsx",
                lineNumber: 672,
                columnNumber: 9
            }, this),
            activeTab === 'categories' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CategoryManager, {
                    categories: categories,
                    onAddCategory: handleAddCategory,
                    onEditCategory: handleEditCategory,
                    onDeleteCategory: handleDeleteCategory
                }, void 0, false, {
                    fileName: "[project]/src/app/manage/page.tsx",
                    lineNumber: 762,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/manage/page.tsx",
                lineNumber: 761,
                columnNumber: 9
            }, this),
            activeTab === 'sentiment' && preferences && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SentimentFilterSettings, {
                    preferences: preferences,
                    onUpdatePreferences: handleUpdatePreferences
                }, void 0, false, {
                    fileName: "[project]/src/app/manage/page.tsx",
                    lineNumber: 774,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/manage/page.tsx",
                lineNumber: 773,
                columnNumber: 9
            }, this),
            activeTab === 'health' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FeedHealthChecker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FeedHealthChecker"], {
                    feeds: savedFeeds,
                    onUpdateFeed: handleFeedUrlUpdate
                }, void 0, false, {
                    fileName: "[project]/src/app/manage/page.tsx",
                    lineNumber: 784,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/manage/page.tsx",
                lineNumber: 783,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-4 pt-6 border-t border-[var(--border)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b border-[var(--border)] pb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold text-[var(--text-primary)]",
                                children: "Your Feeds"
                            }, void 0, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 794,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-[var(--text-secondary)] mt-1",
                                children: "Manage and organize your subscribed feeds"
                            }, void 0, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 795,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 793,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3",
                        children: savedFeeds.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: "shadow-sm border-[var(--card-border)]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "p-6 text-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[var(--text-secondary)] text-lg",
                                    children: "No feeds added yet. Add some feeds to get started."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/manage/page.tsx",
                                    lineNumber: 801,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 800,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/manage/page.tsx",
                            lineNumber: 799,
                            columnNumber: 13
                        }, this) : savedFeeds.map((feed)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SavedFeed, {
                                feed: feed,
                                categories: categories,
                                onRemove: handleRemoveFeed,
                                onUpdate: handleUpdateFeed
                            }, feed.url, false, {
                                fileName: "[project]/src/app/manage/page.tsx",
                                lineNumber: 806,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/manage/page.tsx",
                        lineNumber: 797,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/manage/page.tsx",
                lineNumber: 792,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/manage/page.tsx",
        lineNumber: 620,
        columnNumber: 5
    }, this);
}
_s3(ManagePage, "fSwcu/Rk+MoNqKZL31b3kYe0pfo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$useTransformerWorker$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransformerWorker"]
    ];
});
_c4 = ManagePage;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "CategoryManager");
__turbopack_context__.k.register(_c1, "SentimentFilterSettings");
__turbopack_context__.k.register(_c2, "SuggestedFeed");
__turbopack_context__.k.register(_c3, "SavedFeed");
__turbopack_context__.k.register(_c4, "ManagePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_efebd045._.js.map
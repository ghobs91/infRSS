module.exports = {

"[project]/.next-internal/server/app/api/proxy/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/proxy/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST),
    "config": (()=>config)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// Increase the timeout for RSS feeds
const TIMEOUT = 60000; // 60 seconds
// List of domains that need special handling
const SPECIAL_DOMAINS = [
    'energy.gov',
    'investor.irobot.com',
    'www.cmcsa.com'
];
// Helper function to determine if a URL needs special handling
function needsSpecialHandling(url) {
    try {
        const urlObj = new URL(url);
        return SPECIAL_DOMAINS.some((domain)=>urlObj.hostname.includes(domain));
    } catch (error) {
        console.error('Error parsing URL:', error);
        return false;
    }
}
// Helper function to fetch with timeout and retries
async function fetchWithTimeout(url, timeout = TIMEOUT, retries = 2) {
    const controller = new AbortController();
    const timeoutId = setTimeout(()=>controller.abort(), timeout);
    try {
        const useSpecialHandling = needsSpecialHandling(url);
        console.log(`Fetching ${url} with ${useSpecialHandling ? 'special' : 'standard'} handling`);
        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; InfrssBot/1.0; +https://infrss.vercel.app)',
                'Accept': 'application/rss+xml, application/xml, application/atom+xml, text/xml, */*',
                'Cache-Control': 'no-cache'
            }
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        // If we have retries left and it's a connection error, retry
        if (retries > 0 && error instanceof Error && (error.message.includes('ECONNRESET') || error.message.includes('fetch failed') || error.message.includes('UNABLE_TO_VERIFY_LEAF_SIGNATURE') || error.name === 'AbortError')) {
            console.log(`Retrying fetch for ${url} after error (${retries} retries left):`, error.message);
            // Exponential backoff: wait longer between each retry
            const backoffTime = (3 - retries) * 1000; // 1s, 2s, 3s
            await new Promise((resolve)=>setTimeout(resolve, backoffTime));
            return fetchWithTimeout(url, timeout, retries - 1);
        }
        throw error;
    }
}
async function handleFetch(url) {
    try {
        // Try to fetch the URL
        const response = await fetchWithTimeout(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type') || '';
        // Handle different content types
        if (contentType.startsWith('image/')) {
            // For images, return the blob with caching
            const blob = await response.blob();
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](blob, {
                headers: {
                    'Content-Type': contentType,
                    'Cache-Control': 'public, max-age=86400'
                }
            });
        } else if (contentType.includes('html') || contentType.includes('xml') || contentType.includes('rss') || contentType.includes('atom') || contentType.includes('text/plain')) {
            // For HTML/XML/RSS content, return as text
            const text = await response.text();
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify({
                data: text
            }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'public, max-age=3600'
                }
            });
        } else {
            // For other content types, return error
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]('Unsupported content type', {
                status: 400
            });
        }
    } catch (error) {
        console.error('Error in handleFetch:', error);
        // Handle specific error types
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]('Request timed out', {
                    status: 504
                });
            }
            // Handle SSL certificate errors
            if (error.message.includes('UNABLE_TO_VERIFY_LEAF_SIGNATURE') || error.message.includes('unable to verify the first certificate')) {
                console.error('SSL certificate error for URL:', url);
                // Check if this domain should be added to the special domains list
                try {
                    const urlObj = new URL(url);
                    const hostname = urlObj.hostname;
                    if (!SPECIAL_DOMAINS.some((domain)=>hostname.includes(domain))) {
                        console.log(`Consider adding ${hostname} to SPECIAL_DOMAINS list`);
                    }
                } catch (e) {
                    console.error('Error parsing URL for SSL error:', e);
                }
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify({
                    error: 'SSL certificate verification failed',
                    url: url,
                    message: 'The site\'s SSL certificate could not be verified. This might be due to an invalid or self-signed certificate.'
                }), {
                    status: 502,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            // Handle connection reset errors
            if (error.message.includes('ECONNRESET') || error.message.includes('read ECONNRESET') || error.message.includes('fetch failed')) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]('Connection reset by server', {
                    status: 502
                });
            }
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](`Failed to fetch: ${error.message}`, {
                status: 500
            });
        }
        throw error;
    }
}
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    if (!url) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]('Missing URL parameter', {
            status: 400
        });
    }
    try {
        return await handleFetch(url);
    } catch (error) {
        console.error('Proxy error for URL:', url, error);
        // Handle specific error types
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]('Request timed out', {
                    status: 504
                });
            }
            // Handle SSL certificate errors
            if (error.message.includes('UNABLE_TO_VERIFY_LEAF_SIGNATURE') || error.message.includes('unable to verify the first certificate')) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]('SSL certificate verification failed', {
                    status: 502
                });
            }
            // Handle connection reset errors
            if (error.message.includes('ECONNRESET') || error.message.includes('read ECONNRESET')) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]('Connection reset by server', {
                    status: 502
                });
            }
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](`Failed to fetch: ${error.message}`, {
                status: 500
            });
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]('Failed to fetch resource', {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const url = body.url;
        if (!url) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]('Missing URL in request body', {
                status: 400
            });
        }
        return await handleFetch(url);
    } catch (error) {
        console.error('Proxy error:', error);
        // Handle specific error types
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]('Request timed out', {
                    status: 504
                });
            }
            // Handle SSL certificate errors
            if (error.message.includes('UNABLE_TO_VERIFY_LEAF_SIGNATURE') || error.message.includes('unable to verify the first certificate')) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]('SSL certificate verification failed', {
                    status: 502
                });
            }
            // Handle connection reset errors
            if (error.message.includes('ECONNRESET') || error.message.includes('read ECONNRESET')) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]('Connection reset by server', {
                    status: 502
                });
            }
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](`Failed to fetch: ${error.message}`, {
                status: 500
            });
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]('Failed to fetch resource', {
            status: 500
        });
    }
}
const config = {
    api: {
        responseLimit: '8mb'
    }
};
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__2a1edada._.js.map
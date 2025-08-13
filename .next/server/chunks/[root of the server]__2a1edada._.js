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
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function GET(req) {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get('url');
    if (!targetUrl) {
        console.log('Missing url parameter');
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Missing url parameter'
        }, {
            status: 400
        });
    }
    // Validate the URL
    let validatedUrl;
    try {
        validatedUrl = new URL(targetUrl);
    } catch  {
        console.log('Invalid URL format:', targetUrl);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Invalid URL format'
        }, {
            status: 400
        });
    }
    // Only allow HTTP and HTTPS protocols
    if (![
        'http:',
        'https:'
    ].includes(validatedUrl.protocol)) {
        console.log('Invalid protocol:', validatedUrl.protocol);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Only HTTP and HTTPS protocols are allowed'
        }, {
            status: 400
        });
    }
    // Check if this is an RSSHub URL and provide helpful error messages
    const isRSSHub = validatedUrl.hostname === 'rsshub.app';
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), 20000); // Increased to 20 seconds
        const response = await fetch(validatedUrl.toString(), {
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; RSSReader/1.0)',
                'Accept': 'text/xml,application/xml,application/rss+xml,application/atom+xml,text/html,*/*',
                'Accept-Language': 'en-US,en;q=0.9'
            }
        });
        clearTimeout(timeoutId);
        if (!response.ok) {
            console.log('Target server error:', response.status, 'for URL:', validatedUrl.toString());
            // Handle RSSHub-specific errors
            if (isRSSHub) {
                if (response.status === 404) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'RSSHub feed not found. This feed may have been removed or the URL format has changed.',
                        status: response.status,
                        suggestion: 'Try checking RSSHub documentation for the correct feed format or use a different RSS source.',
                        url: validatedUrl.toString()
                    }, {
                        status: 404
                    });
                }
                if (response.status === 429) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'RSSHub rate limit exceeded. Please try again later.',
                        status: response.status,
                        suggestion: 'Wait a few minutes before retrying, or consider using a different RSS source.',
                        retryAfter: '5 minutes'
                    }, {
                        status: 429
                    });
                }
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Target server responded with status ${response.status}`,
                status: response.status,
                url: validatedUrl.toString()
            }, {
                status: response.status
            });
        }
        const contentType = response.headers.get('content-type') || 'text/plain';
        const data = await response.text();
        // Validate that we actually got RSS/XML content
        if (isRSSHub && !data.includes('<rss') && !data.includes('<feed') && !data.includes('<xml')) {
            console.warn('RSSHub returned non-RSS content:', data.substring(0, 200));
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'RSSHub returned invalid RSS content',
                status: 422,
                suggestion: 'The feed may be temporarily unavailable or have changed format.'
            }, {
                status: 422
            });
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](data, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        });
    } catch (error) {
        console.error('Proxy error:', error, 'for URL:', validatedUrl.toString());
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Request timeout - the server took too long to respond',
                    status: 408,
                    suggestion: 'Try again later or check if the RSS source is experiencing issues.',
                    url: validatedUrl.toString()
                }, {
                    status: 408
                });
            }
            // Handle network timeouts and connection errors
            if (error.message.includes('fetch') || error.message.includes('timeout') || error.message.includes('connect')) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Network error - server may be unreachable or too slow',
                    details: error.message,
                    status: 504,
                    suggestion: 'Check your internet connection and try again.',
                    url: validatedUrl.toString()
                }, {
                    status: 504
                });
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error',
            status: 500,
            details: error instanceof Error ? error.message : 'Unknown error',
            url: validatedUrl.toString()
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__2a1edada._.js.map
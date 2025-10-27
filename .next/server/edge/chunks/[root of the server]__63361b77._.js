(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root of the server]__63361b77._.js", {

"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[project]/src/lib/rateLimit.ts [app-edge-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Simple in-memory rate limiting
__turbopack_context__.s({
    "checkRateLimit": (()=>checkRateLimit),
    "fetchWithRetry": (()=>fetchWithRetry)
});
const WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30;
const RSSHUB_MAX_REQUESTS_PER_WINDOW = 10; // More conservative for RSSHub
const rateLimit = new Map();
function checkRateLimit(hostname) {
    const now = Date.now();
    const window = rateLimit.get(hostname);
    // Use stricter limits for RSSHub
    const maxRequests = hostname === 'rsshub.app' ? RSSHUB_MAX_REQUESTS_PER_WINDOW : MAX_REQUESTS_PER_WINDOW;
    // Clean up old entries
    if (window && now - window.timestamp > WINDOW_MS) {
        rateLimit.delete(hostname);
    }
    // If no window exists or it's expired, create a new one
    if (!window || now - window.timestamp > WINDOW_MS) {
        rateLimit.set(hostname, {
            timestamp: now,
            count: 1
        });
        return {
            isLimited: false
        };
    }
    // If within window, check count
    if (window.count >= maxRequests) {
        const retryAfter = Math.ceil((window.timestamp + WINDOW_MS - now) / 1000);
        return {
            isLimited: true,
            retryAfter: `${retryAfter} seconds`
        };
    }
    // Increment count
    window.count++;
    return {
        isLimited: false
    };
}
async function fetchWithRetry(url, options, maxRetries = 3) {
    let lastError = null;
    for(let attempt = 0; attempt < maxRetries; attempt++){
        try {
            const response = await fetch(url, options);
            // Don't retry 404s or rate limits - return immediately
            if (response.status === 404 || response.status === 429) {
                return response;
            }
            // Don't retry client errors (4xx) except 408 (timeout) and 429 (rate limit, handled above)
            if (response.status >= 400 && response.status < 500 && response.status !== 408) {
                return response;
            }
            // Retry 503s, 408s, and other 5xx errors
            if (response.status >= 500 || response.status === 408) {
                if (attempt < maxRetries - 1) {
                    const backoffMs = Math.min(1000 * Math.pow(2, attempt), 10000);
                    console.log(`Attempt ${attempt + 1}/${maxRetries} failed with status ${response.status} for ${url}. Retrying in ${backoffMs}ms...`);
                    await new Promise((resolve)=>setTimeout(resolve, backoffMs));
                    continue;
                }
                // Last attempt - return the error response
                return response;
            }
            // Success - return the response
            return response;
        } catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));
            // Don't retry on AbortError (timeout)
            if (lastError.name === 'AbortError') {
                console.log(`Request aborted (timeout) for ${url}`);
                throw lastError;
            }
            // Log the error and retry
            if (attempt < maxRetries - 1) {
                const backoffMs = Math.min(1000 * Math.pow(2, attempt), 10000);
                console.log(`Attempt ${attempt + 1}/${maxRetries} failed for ${url}: ${lastError.message}. Retrying in ${backoffMs}ms...`);
                await new Promise((resolve)=>setTimeout(resolve, backoffMs));
            } else {
                // Last attempt - throw with detailed error
                console.error(`All ${maxRetries} attempts failed for ${url}. Last error: ${lastError.message}`);
                throw new Error(`Failed to fetch ${url} after ${maxRetries} retries. Last error: ${lastError.message}`);
            }
        }
    }
    // This should never be reached, but TypeScript needs it
    throw lastError || new Error(`Failed after ${maxRetries} retries`);
}
}}),
"[project]/src/app/api/proxy/route.ts [app-edge-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "runtime": (()=>runtime)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [app-edge-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [app-edge-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rateLimit$2e$ts__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rateLimit.ts [app-edge-route] (ecmascript)");
;
;
const runtime = 'edge';
async function GET(req) {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get('url');
    if (!targetUrl) {
        console.log('Missing url parameter');
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Only HTTP and HTTPS protocols are allowed'
        }, {
            status: 400
        });
    }
    // Check if this is an RSSHub URL and provide helpful error messages
    const isRSSHub = validatedUrl.hostname === 'rsshub.app';
    try {
        // Check rate limit for the target hostname
        const rateLimitResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rateLimit$2e$ts__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["checkRateLimit"])(validatedUrl.hostname);
        if (rateLimitResult.isLimited) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Rate limit exceeded for this RSS source',
                status: 429,
                suggestion: 'Please wait before making more requests to this feed',
                retryAfter: rateLimitResult.retryAfter
            }, {
                status: 429
            });
        }
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), 25000); // 25 second timeout (client has 30s)
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rateLimit$2e$ts__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["fetchWithRetry"])(validatedUrl.toString(), {
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
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'RSSHub feed not found. This feed may have been removed or the URL format has changed.',
                        status: response.status,
                        suggestion: 'Try checking RSSHub documentation for the correct feed format or use a different RSS source.',
                        url: validatedUrl.toString()
                    }, {
                        status: 404
                    });
                }
                if (response.status === 429) {
                    // Provide specific alternatives for Twitter feeds
                    const isTwitterFeed = validatedUrl.pathname.includes('/twitter/');
                    const suggestion = isTwitterFeed ? 'RSSHub Twitter feeds are currently rate limited. Consider using Nitter (nitter.net/{username}/rss) or RSS.app as alternatives. Twitter feeds through RSSHub may be unreliable due to X/Twitter API restrictions.' : 'Wait a few minutes before retrying, or consider using a different RSS source.';
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'RSSHub rate limit exceeded. Please try again later.',
                        status: response.status,
                        suggestion,
                        retryAfter: isTwitterFeed ? 'Consider using alternatives' : '5 minutes',
                        alternatives: isTwitterFeed ? [
                            {
                                name: 'Nitter',
                                example: 'https://nitter.net/{username}/rss'
                            },
                            {
                                name: 'RSS.app',
                                example: 'https://rss.app (requires setup)'
                            }
                        ] : undefined
                    }, {
                        status: 429
                    });
                }
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Target server responded with status ${response.status}`,
                status: response.status,
                url: validatedUrl.toString()
            }, {
                status: response.status
            });
        }
        const contentType = response.headers.get('content-type') || 'text/plain';
        const data = await response.text();
        // Validate that we actually got RSS/XML content (not HTML)
        const trimmedData = data.trim();
        const isHTML = (trimmedData.startsWith('<!DOCTYPE html') || trimmedData.startsWith('<html') || trimmedData.startsWith('<HTML')) && !trimmedData.includes('<rss') && !trimmedData.includes('<feed');
        if (isHTML) {
            console.warn('Server returned HTML instead of RSS/XML:', data.substring(0, 200));
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'The URL returned a webpage instead of an RSS feed',
                status: 422,
                suggestion: 'Please verify this is a valid RSS feed URL. You may need to look for a feed icon or RSS link on the website.',
                url: validatedUrl.toString()
            }, {
                status: 422
            });
        }
        // Additional validation for RSSHub feeds
        if (isRSSHub && !data.includes('<rss') && !data.includes('<feed')) {
            console.warn('RSSHub returned non-RSS content:', data.substring(0, 200));
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'RSSHub returned invalid RSS content',
                status: 422,
                suggestion: 'The feed may be temporarily unavailable or have changed format.'
            }, {
                status: 422
            });
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](data, {
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
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Request timeout - the server took too long to respond',
                    status: 408,
                    suggestion: 'The feed server is taking too long to respond. Try again later or check if the RSS source is online.',
                    url: validatedUrl.toString()
                }, {
                    status: 408
                });
            }
            // Handle specific fetch errors
            if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'DNS resolution failed - the domain could not be found',
                    details: error.message,
                    status: 502,
                    suggestion: 'The domain may not exist or may be temporarily unavailable. Please verify the URL is correct.',
                    url: validatedUrl.toString()
                }, {
                    status: 502
                });
            }
            if (error.message.includes('ECONNREFUSED')) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Connection refused - the server is not accepting connections',
                    details: error.message,
                    status: 502,
                    suggestion: 'The server is not responding. It may be down or blocking requests.',
                    url: validatedUrl.toString()
                }, {
                    status: 502
                });
            }
            if (error.message.includes('ETIMEDOUT') || error.message.includes('timeout')) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Connection timeout - the server is too slow or unreachable',
                    details: error.message,
                    status: 504,
                    suggestion: 'The server is not responding in time. Try again later.',
                    url: validatedUrl.toString()
                }, {
                    status: 504
                });
            }
            if (error.message.includes('ECONNRESET') || error.message.includes('socket hang up')) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Connection reset - the server closed the connection unexpectedly',
                    details: error.message,
                    status: 502,
                    suggestion: 'The server had an issue processing the request. Try again in a few moments.',
                    url: validatedUrl.toString()
                }, {
                    status: 502
                });
            }
            if (error.message.includes('SSL') || error.message.includes('TLS') || error.message.includes('certificate')) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'SSL/TLS error - there is an issue with the server\'s security certificate',
                    details: error.message,
                    status: 502,
                    suggestion: 'The server may have an invalid or expired SSL certificate. Contact the website administrator.',
                    url: validatedUrl.toString()
                }, {
                    status: 502
                });
            }
            // Handle retry errors with more context
            if (error.message.includes('retries')) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Multiple attempts failed - the server is not responding reliably',
                    details: error.message,
                    status: 503,
                    suggestion: 'The feed server is experiencing issues. Please try again in a few minutes, or check if the feed URL is correct.',
                    url: validatedUrl.toString()
                }, {
                    status: 503
                });
            }
            // General network errors
            if (error.message.includes('fetch') || error.message.includes('network')) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Network error - unable to reach the server',
                    details: error.message,
                    status: 502,
                    suggestion: 'There was a network issue connecting to the feed. Check your internet connection and try again.',
                    url: validatedUrl.toString()
                }, {
                    status: 502
                });
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error',
            status: 500,
            details: error instanceof Error ? error.message : 'Unknown error',
            suggestion: 'An unexpected error occurred. Please try again or contact support if the issue persists.',
            url: validatedUrl.toString()
        }, {
            status: 500
        });
    }
}
}}),
"[project]/.next-internal/server/app/api/proxy/route/actions.js [app-edge-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__63361b77._.js.map
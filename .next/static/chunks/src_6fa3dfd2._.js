(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_6fa3dfd2._.js", {

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
"[project]/src/components/ArticleCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// components/ArticleCard.tsx
__turbopack_context__.s({
    "ArticleCard": (()=>ArticleCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
// Sentiment indicator component
const SentimentIndicator = ({ sentiment })=>{
    const getSentimentColor = (score)=>{
        if (score > 0.3) return 'text-green-600';
        if (score < -0.3) return 'text-red-600';
        return 'text-yellow-600';
    };
    const getSentimentIcon = (score)=>{
        if (score > 0.3) return '😊';
        if (score < -0.3) return '😞';
        return '😐';
    };
    const getToxicityColor = (toxicity)=>{
        if (toxicity > 0.7) return 'text-red-600';
        if (toxicity > 0.4) return 'text-yellow-600';
        return 'text-green-600';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap gap-2 text-xs w-full overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-1 flex-shrink-0", getSentimentColor(sentiment.score)),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: getSentimentIcon(sentiment.score)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ArticleCard.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            Math.round(sentiment.score * 100),
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ArticleCard.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ArticleCard.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            sentiment.isClickbait && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-orange-600 flex items-center gap-1 flex-shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "🚨"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ArticleCard.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Clickbait"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ArticleCard.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ArticleCard.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, this),
            sentiment.isRagebait && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-red-600 flex items-center gap-1 flex-shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "💥"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ArticleCard.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Ragebait"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ArticleCard.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ArticleCard.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-1 flex-shrink-0", getToxicityColor(sentiment.toxicity)),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "⚠️"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ArticleCard.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            Math.round(sentiment.toxicity * 100),
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ArticleCard.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ArticleCard.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ArticleCard.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
};
_c = SentimentIndicator;
// Article summary component
const ArticleSummary = ({ summary, isExpanded, onToggle })=>{
    const maxLength = 150;
    const shouldTruncate = summary.length > maxLength;
    if (!shouldTruncate) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-[var(--text-secondary)] mt-2 break-words",
            children: summary
        }, void 0, false, {
            fileName: "[project]/src/components/ArticleCard.tsx",
            lineNumber: 79,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-2 w-full overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-[var(--text-secondary)] break-words",
                children: isExpanded ? summary : `${summary.substring(0, maxLength)}...`
            }, void 0, false, {
                fileName: "[project]/src/components/ArticleCard.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "ghost",
                size: "sm",
                onClick: onToggle,
                className: "text-xs p-1 h-auto mt-1 flex-shrink-0",
                children: isExpanded ? 'Show less' : 'Read more'
            }, void 0, false, {
                fileName: "[project]/src/components/ArticleCard.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ArticleCard.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
};
_c1 = ArticleSummary;
const ArticleCard = ({ article, isRead, onVisibleChange, onToggleRead, onArchive, showSentiment = true, showSummary = true })=>{
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [imgError, setImgError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [summaryExpanded, setSummaryExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArticleCard.useEffect": ()=>{
            setMounted(true);
        }
    }["ArticleCard.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArticleCard.useEffect": ()=>{
            if (!ref.current || !onVisibleChange) return;
            const observer = new window.IntersectionObserver({
                "ArticleCard.useEffect": (entries)=>{
                    entries.forEach({
                        "ArticleCard.useEffect": (entry)=>{
                            onVisibleChange(entry.isIntersecting);
                        }
                    }["ArticleCard.useEffect"]);
                }
            }["ArticleCard.useEffect"], {
                threshold: 0.1
            } // Lower threshold for better detection
            );
            observer.observe(ref.current);
            return ({
                "ArticleCard.useEffect": ()=>observer.disconnect()
            })["ArticleCard.useEffect"];
        }
    }["ArticleCard.useEffect"], [
        onVisibleChange
    ]);
    const handleToggleRead = ()=>{
        if (onToggleRead) {
            onToggleRead(article.id);
        }
    };
    const handleArchive = ()=>{
        if (onArchive) {
            onArchive(article.id);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md max-w-full", isRead && "read-article opacity-75", article.sentiment?.isClickbait && "border-orange-200", article.sentiment?.isRagebait && "border-red-200"),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "p-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row w-full overflow-hidden",
                    children: [
                        article.thumbnail && !imgError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full sm:w-40 h-40 sm:h-auto relative flex-shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: article.thumbnail,
                                alt: article.title,
                                fill: true,
                                unoptimized: true,
                                className: "object-cover",
                                onError: ()=>setImgError(true)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ArticleCard.tsx",
                                lineNumber: 157,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ArticleCard.tsx",
                            lineNumber: 156,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 p-3 sm:p-4 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between gap-2 w-full overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: article.link,
                                            className: "text-base sm:text-lg font-medium text-[var(--primary)] hover:underline line-clamp-2 flex-1 break-words overflow-hidden",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            children: article.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ArticleCard.tsx",
                                            lineNumber: 170,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-1 flex-shrink-0",
                                            children: [
                                                onToggleRead && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    onClick: handleToggleRead,
                                                    className: "text-xs p-2 h-auto whitespace-nowrap",
                                                    title: isRead ? "Mark as unread" : "Mark as read",
                                                    children: isRead ? "👁️" : "👁️‍🗨️"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ArticleCard.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 21
                                                }, this),
                                                onArchive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    onClick: handleArchive,
                                                    className: "text-xs p-2 h-auto whitespace-nowrap",
                                                    title: "Archive article",
                                                    children: "📁"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ArticleCard.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ArticleCard.tsx",
                                            lineNumber: 179,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ArticleCard.tsx",
                                    lineNumber: 169,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 my-1 w-full overflow-hidden",
                                    children: [
                                        mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-4 h-4 relative flex-shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: `https://www.google.com/s2/favicons?sz=16&domain_url=${article.link}`,
                                                alt: "favicon",
                                                fill: true,
                                                unoptimized: true,
                                                className: "object-contain"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ArticleCard.tsx",
                                                lineNumber: 209,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ArticleCard.tsx",
                                            lineNumber: 208,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs sm:text-sm text-[var(--text-secondary)] truncate flex-1",
                                            children: (()=>{
                                                try {
                                                    return article.link ? new URL(article.link).hostname.replace("www.", "") : "Unknown Source";
                                                } catch  {
                                                    return "Unknown Source";
                                                }
                                            })()
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ArticleCard.tsx",
                                            lineNumber: 218,
                                            columnNumber: 17
                                        }, this),
                                        article.tags && article.tags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-1 flex-shrink-0",
                                            children: article.tags.slice(0, 3).map((tag, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full whitespace-nowrap",
                                                    children: tag
                                                }, index, false, {
                                                    fileName: "[project]/src/components/ArticleCard.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ArticleCard.tsx",
                                            lineNumber: 229,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ArticleCard.tsx",
                                    lineNumber: 206,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs sm:text-sm text-[var(--text-secondary)] mb-2 truncate",
                                    children: new Date(article.pubDate).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ArticleCard.tsx",
                                    lineNumber: 242,
                                    columnNumber: 15
                                }, this),
                                showSentiment && article.sentiment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-2 w-full overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SentimentIndicator, {
                                        sentiment: article.sentiment
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ArticleCard.tsx",
                                        lineNumber: 253,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ArticleCard.tsx",
                                    lineNumber: 252,
                                    columnNumber: 17
                                }, this),
                                showSummary && article.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArticleSummary, {
                                        summary: article.summary,
                                        isExpanded: summaryExpanded,
                                        onToggle: ()=>setSummaryExpanded(!summaryExpanded)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ArticleCard.tsx",
                                        lineNumber: 260,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ArticleCard.tsx",
                                    lineNumber: 259,
                                    columnNumber: 17
                                }, this),
                                (!article.summary || showSummary === false) && article.content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-[var(--text-secondary)] mt-2 line-clamp-3 break-words",
                                        children: [
                                            article.content.substring(0, 200),
                                            "..."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ArticleCard.tsx",
                                        lineNumber: 271,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ArticleCard.tsx",
                                    lineNumber: 270,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ArticleCard.tsx",
                            lineNumber: 168,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ArticleCard.tsx",
                    lineNumber: 154,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ArticleCard.tsx",
                lineNumber: 153,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ArticleCard.tsx",
            lineNumber: 147,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ArticleCard.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
};
_s(ArticleCard, "0LIyYgZKIaLS5cDrRKudjn7u8L4=");
_c2 = ArticleCard;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "SentimentIndicator");
__turbopack_context__.k.register(_c1, "ArticleSummary");
__turbopack_context__.k.register(_c2, "ArticleCard");
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
"[project]/src/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/page.tsx
__turbopack_context__.s({
    "default": (()=>HomePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/spinner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ArticleCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ArticleCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rssUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$unreadContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/unreadContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
// Helper function to convert article format for ArticleCard
const convertArticleForCard = (article)=>({
        id: article.link,
        title: article.title,
        link: article.link,
        pubDate: article.pubDate,
        thumbnail: article.thumbnail,
        content: '',
        summary: '',
        sourceDomain: (()=>{
            try {
                return article.link ? new URL(article.link).hostname.replace("www.", "") : "Unknown Source";
            } catch  {
                return "Unknown Source";
            }
        })(),
        readStatus: 'unread',
        tags: []
    });
function HomePage() {
    _s();
    const [articles, setArticles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [visibleCount, setVisibleCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(20);
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [hideRead, setHideRead] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const loadMoreRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { toggleReadStatus, setTotalArticles, readLinks, unreadCount, autoMarkAsReadOnScroll, toggleAutoMarkAsRead } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$unreadContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUnread"])();
    // Only show unread articles if hideRead is true
    const filteredArticles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomePage.useMemo[filteredArticles]": ()=>{
            if (hideRead) {
                return articles.filter({
                    "HomePage.useMemo[filteredArticles]": (article)=>!readLinks.has(article.link)
                }["HomePage.useMemo[filteredArticles]"]);
            }
            return articles;
        }
    }["HomePage.useMemo[filteredArticles]"], [
        articles,
        readLinks,
        hideRead
    ]);
    // Memoize visible articles to prevent unnecessary re-renders
    const visibleArticles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomePage.useMemo[visibleArticles]": ()=>{
            return filteredArticles.slice(0, visibleCount);
        }
    }["HomePage.useMemo[visibleArticles]"], [
        filteredArticles,
        visibleCount
    ]);
    // Handle refreshing feeds
    const handleRefresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomePage.useCallback[handleRefresh]": async ()=>{
            try {
                setHideRead(true);
                const feeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadFeedsFromStorage"])();
                if (feeds.length === 0) {
                    return;
                }
                // Fetch feeds in parallel with a timeout
                const fetchPromises = feeds.map({
                    "HomePage.useCallback[handleRefresh].fetchPromises": async (feed)=>{
                        try {
                            const controller = new AbortController();
                            const timeoutId = setTimeout({
                                "HomePage.useCallback[handleRefresh].fetchPromises.timeoutId": ()=>controller.abort()
                            }["HomePage.useCallback[handleRefresh].fetchPromises.timeoutId"], 10000); // 10 second timeout
                            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAndParseRSS"])(feed.url);
                            clearTimeout(timeoutId);
                            return data?.items || [];
                        } catch (error) {
                            console.error(`Error fetching feed ${feed.url}:`, error);
                            return [];
                        }
                    }
                }["HomePage.useCallback[handleRefresh].fetchPromises"]);
                const allArticles = await Promise.all(fetchPromises);
                const sorted = allArticles.flat().sort({
                    "HomePage.useCallback[handleRefresh].sorted": (a, b)=>new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
                }["HomePage.useCallback[handleRefresh].sorted"]);
                setArticles(sorted);
                setVisibleCount(20); // Reset visible count
            } catch (error) {
                console.error("Error refreshing feeds:", error);
            }
        }
    }["HomePage.useCallback[handleRefresh]"], []);
    // Intersection observer for infinite scrolling
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            const observer = new IntersectionObserver({
                "HomePage.useEffect": (entries)=>{
                    if (entries[0].isIntersecting && !isLoading) {
                        setVisibleCount({
                            "HomePage.useEffect": (prev)=>Math.min(prev + 20, articles.length)
                        }["HomePage.useEffect"]);
                    }
                }
            }["HomePage.useEffect"], {
                threshold: 0.5
            });
            const currentRef = loadMoreRef.current;
            if (currentRef) {
                observer.observe(currentRef);
            }
            const interval = setInterval({
                "HomePage.useEffect.interval": ()=>{
                    handleRefresh();
                }
            }["HomePage.useEffect.interval"], 10 * 60 * 1000); // Check every 10 minutes
            return ({
                "HomePage.useEffect": ()=>{
                    clearInterval(interval);
                    if (currentRef) {
                        observer.unobserve(currentRef);
                    }
                }
            })["HomePage.useEffect"];
        }
    }["HomePage.useEffect"], [
        isLoading,
        articles.length,
        handleRefresh
    ]);
    // Load saved feeds on initial render
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            const loadSavedFeeds = {
                "HomePage.useEffect.loadSavedFeeds": async ()=>{
                    setIsLoading(true);
                    try {
                        setHideRead(true);
                        const feeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadFeedsFromStorage"])();
                        if (feeds.length === 0) {
                            setIsLoading(false);
                            return;
                        }
                        // Fetch feeds in parallel with a timeout
                        const fetchPromises = feeds.map({
                            "HomePage.useEffect.loadSavedFeeds.fetchPromises": async (feed)=>{
                                try {
                                    const controller = new AbortController();
                                    const timeoutId = setTimeout({
                                        "HomePage.useEffect.loadSavedFeeds.fetchPromises.timeoutId": ()=>controller.abort()
                                    }["HomePage.useEffect.loadSavedFeeds.fetchPromises.timeoutId"], 10000); // 10 second timeout
                                    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rssUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAndParseRSS"])(feed.url);
                                    clearTimeout(timeoutId);
                                    return data?.items || [];
                                } catch (error) {
                                    console.error(`Error fetching feed ${feed.url}:`, error);
                                    return [];
                                }
                            }
                        }["HomePage.useEffect.loadSavedFeeds.fetchPromises"]);
                        const allArticles = await Promise.all(fetchPromises);
                        const sorted = allArticles.flat().sort({
                            "HomePage.useEffect.loadSavedFeeds.sorted": (a, b)=>new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
                        }["HomePage.useEffect.loadSavedFeeds.sorted"]);
                        setArticles(sorted);
                    } catch (error) {
                        console.error("Error loading feeds:", error);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["HomePage.useEffect.loadSavedFeeds"];
            setIsClient(true);
            loadSavedFeeds();
        }
    }["HomePage.useEffect"], [
        handleRefresh
    ]);
    // After first render, allow read articles to be shown (but grayed out)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            if (!isLoading) {
                setTimeout({
                    "HomePage.useEffect": ()=>setHideRead(false)
                }["HomePage.useEffect"], 0);
            }
        }
    }["HomePage.useEffect"], [
        isLoading
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            setTotalArticles(articles.length);
        }
    }["HomePage.useEffect"], [
        articles.length,
        setTotalArticles
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "space-y-8 px-4 max-w-4xl mx-auto pt-6 overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "space-y-4 w-full overflow-hidden",
            children: [
                isClient && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-[var(--text-secondary)]",
                                    children: [
                                        unreadCount,
                                        " unread articles"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 178,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "sm",
                                            onClick: toggleAutoMarkAsRead,
                                            className: "text-xs",
                                            title: autoMarkAsReadOnScroll ? "Disable auto-mark as read when scrolling past" : "Enable auto-mark as read when scrolling past",
                                            children: autoMarkAsReadOnScroll ? "📖 Auto-scroll" : "📖 Manual"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 182,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "sm",
                                            onClick: ()=>setHideRead(!hideRead),
                                            className: "text-xs",
                                            children: hideRead ? "Show all" : "Hide read"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 191,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 177,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-4 w-full overflow-hidden",
                            children: [
                                isLoading ? // Show spinner during initial load
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center items-center py-12",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
                                        size: "lg"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 205,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 204,
                                    columnNumber: 15
                                }, this) : articles.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "shadow-sm",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "p-4 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[var(--text-secondary)]",
                                            children: "No articles found. Add some feeds to get started."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 210,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 209,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 208,
                                    columnNumber: 15
                                }, this) : // Show actual articles using ArticleCard component
                                visibleArticles.map((article, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ArticleCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArticleCard"], {
                                        article: convertArticleForCard(article),
                                        isRead: readLinks.has(article.link),
                                        onVisibleChange: (isVisible)=>{
                                            // Auto-mark as read when scrolling past if the preference is enabled
                                            if (autoMarkAsReadOnScroll && !readLinks.has(article.link) && !isVisible) {
                                                toggleReadStatus(article.link);
                                            }
                                        },
                                        onToggleRead: (articleId)=>toggleReadStatus(articleId)
                                    }, `${article.link}-${idx}`, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 216,
                                        columnNumber: 17
                                    }, this)),
                                filteredArticles.length > visibleCount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: loadMoreRef,
                                    className: "h-10 flex justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "default",
                                        onClick: ()=>setVisibleCount((prev)=>Math.min(prev + 20, filteredArticles.length)),
                                        className: "w-full",
                                        children: "Load More"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 232,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 231,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 201,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "default",
                    onClick: handleRefresh,
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 256,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 249,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Refresh"
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 263,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 244,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 174,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 173,
        columnNumber: 5
    }, this);
}
_s(HomePage, "X1c5L/H3XK7uBdX/mBdRslk4Hzc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$unreadContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUnread"]
    ];
});
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_6fa3dfd2._.js.map
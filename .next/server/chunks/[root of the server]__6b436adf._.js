module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/@xenova/transformers [external] (@xenova/transformers, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@xenova/transformers");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/pages/api/suggest.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
// pages/api/suggest.ts
__turbopack_context__.s({
    "default": (()=>handler)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$xenova$2f$transformers__$5b$external$5d$__$2840$xenova$2f$transformers$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@xenova/transformers [external] (@xenova/transformers, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$xenova$2f$transformers__$5b$external$5d$__$2840$xenova$2f$transformers$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$xenova$2f$transformers__$5b$external$5d$__$2840$xenova$2f$transformers$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
// Configure transformer.js environment
__TURBOPACK__imported__module__$5b$externals$5d2f40$xenova$2f$transformers__$5b$external$5d$__$2840$xenova$2f$transformers$2c$__esm_import$29$__["env"].backends.onnx = "wasm";
__TURBOPACK__imported__module__$5b$externals$5d2f40$xenova$2f$transformers__$5b$external$5d$__$2840$xenova$2f$transformers$2c$__esm_import$29$__["env"].allowLocalModels = false;
__TURBOPACK__imported__module__$5b$externals$5d2f40$xenova$2f$transformers__$5b$external$5d$__$2840$xenova$2f$transformers$2c$__esm_import$29$__["env"].useBrowserCache = true;
// Cache for models to avoid reloading
let embedder = null;
let textGenerator = null;
let textClassifier = null;
// Load the embedder model for semantic search
async function loadEmbedder() {
    if (!embedder) {
        try {
            console.log("Loading embedder model...");
            embedder = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$xenova$2f$transformers__$5b$external$5d$__$2840$xenova$2f$transformers$2c$__esm_import$29$__["pipeline"])("feature-extraction", "Xenova/all-MiniLM-L6-v2");
            console.log("Embedder model loaded successfully");
        } catch (error) {
            console.error("Error loading embedder:", error);
            throw new Error("Failed to load embedder model");
        }
    }
    return embedder;
}
// Load the text generation model for generating feed descriptions
async function loadTextGenerator() {
    if (!textGenerator) {
        try {
            console.log("Loading text generation model...");
            textGenerator = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$xenova$2f$transformers__$5b$external$5d$__$2840$xenova$2f$transformers$2c$__esm_import$29$__["pipeline"])("text-generation", "Xenova/distilgpt2");
            console.log("Text generation model loaded successfully");
        } catch (error) {
            console.error("Error loading text generator:", error);
            throw new Error("Failed to load text generation model");
        }
    }
    return textGenerator;
}
// Load the text classification model for topic relevance
async function loadTextClassifier() {
    if (!textClassifier) {
        try {
            console.log("Loading text classifier model...");
            textClassifier = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$xenova$2f$transformers__$5b$external$5d$__$2840$xenova$2f$transformers$2c$__esm_import$29$__["pipeline"])("text-classification", "Xenova/distilbert-base-uncased-finetuned-sst-2-english");
            console.log("Text classifier model loaded successfully");
        } catch (error) {
            console.error("Error loading text classifier:", error);
            throw new Error("Failed to load text classifier model");
        }
    }
    return textClassifier;
}
// Calculate cosine similarity between two vectors
function cosineSimilarity(a, b) {
    const dot = a.reduce((acc, val, i)=>acc + val * b[i], 0);
    const magA = Math.sqrt(a.reduce((acc, val)=>acc + val * val, 0));
    const magB = Math.sqrt(b.reduce((acc, val)=>acc + val * val, 0));
    return dot / (magA * magB);
}
// Extract feed URLs from HTML content
function extractFeedUrlsFromHtml(html) {
    // Improved regex to find more RSS feed URLs
    const matches = [
        ...html.matchAll(/https?:\/\/[^\s"']+\.(rss|xml|atom|feed)/gi)
    ];
    const urls = matches.map((m)=>m[0]).slice(0, 10);
    console.log(`Extracted ${urls.length} feed URLs from HTML`);
    return urls;
}
// Fetch HTML content for a given topic
async function fetchHTMLForTopic(topic) {
    try {
        // Use a more reliable search query format
        const query = encodeURIComponent(`${topic} rss feed`);
        const searchUrl = `https://www.google.com/search?q=${query}`;
        console.log(`Searching for: ${searchUrl}`);
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), 10000); // 10 second timeout
        const response = await fetch(searchUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Cache-Control": "no-cache",
                "Pragma": "no-cache"
            },
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!response.ok) {
            console.error(`Search request failed with status: ${response.status}`);
            throw new Error(`Search request failed with status: ${response.status}`);
        }
        const html = await response.text();
        console.log(`Successfully fetched HTML for topic: ${topic} (${html.length} bytes)`);
        return html;
    } catch (error) {
        console.error("Error fetching HTML for topic:", error);
        throw new Error(`Failed to fetch search results: ${error.message}`);
    }
}
// Generate a description for a feed based on its title and content
async function generateFeedDescription(title, content) {
    try {
        const generator = await loadTextGenerator();
        const prompt = `RSS feed about ${title}: ${content.substring(0, 100)}...`;
        const result = await generator(prompt, {
            max_length: 50,
            num_return_sequences: 1,
            temperature: 0.7
        });
        return result[0].generated_text.replace(prompt, "").trim();
    } catch (error) {
        console.error("Error generating feed description:", error);
        return "";
    }
}
// Check if a feed is relevant to the topic using text classification
async function isFeedRelevantToTopic(feedTitle, feedDescription, topic) {
    try {
        const classifier = await loadTextClassifier();
        const combinedText = `${feedTitle} ${feedDescription}`;
        // Create a prompt that asks if the feed is about the topic
        const prompt = `Is this RSS feed about ${topic}? ${combinedText}`;
        const result = await classifier(prompt);
        // If the classification is positive, consider it relevant
        return result[0].label === "POSITIVE" && result[0].score > 0.6;
    } catch (error) {
        console.error("Error checking feed relevance:", error);
        return true; // Default to true if classification fails
    }
}
// Fallback feeds when API fails
const FALLBACK_FEEDS = [
    {
        title: "TechCrunch",
        url: "https://techcrunch.com/feed/",
        score: 0.9
    },
    {
        title: "The Verge",
        url: "https://www.theverge.com/rss/index.xml",
        score: 0.85
    },
    {
        title: "Wired",
        url: "https://www.wired.com/feed/rss",
        score: 0.8
    },
    {
        title: "Ars Technica",
        url: "https://arstechnica.com/feed/",
        score: 0.75
    },
    {
        title: "Engadget",
        url: "https://www.engadget.com/rss.xml",
        score: 0.7
    }
];
// Direct feed suggestions based on common topics
const TOPIC_BASED_FEEDS = {
    "tech": [
        {
            title: "TechCrunch",
            url: "https://techcrunch.com/feed/",
            score: 0.95
        },
        {
            title: "The Verge",
            url: "https://www.theverge.com/rss/index.xml",
            score: 0.9
        },
        {
            title: "Wired",
            url: "https://www.wired.com/feed/rss",
            score: 0.85
        },
        {
            title: "Ars Technica",
            url: "https://arstechnica.com/feed/",
            score: 0.8
        },
        {
            title: "Engadget",
            url: "https://www.engadget.com/rss.xml",
            score: 0.75
        }
    ],
    "programming": [
        {
            title: "Dev.to",
            url: "https://dev.to/feed/",
            score: 0.95
        },
        {
            title: "CSS-Tricks",
            url: "https://css-tricks.com/feed/",
            score: 0.9
        },
        {
            title: "Smashing Magazine",
            url: "https://www.smashingmagazine.com/feed/",
            score: 0.85
        },
        {
            title: "JavaScript Weekly",
            url: "https://javascriptweekly.com/rss/",
            score: 0.8
        },
        {
            title: "React Blog",
            url: "https://reactjs.org/feed.xml",
            score: 0.75
        }
    ],
    "news": [
        {
            title: "BBC News",
            url: "http://feeds.bbci.co.uk/news/rss.xml",
            score: 0.95
        },
        {
            title: "Reuters",
            url: "https://www.reutersagency.com/feed/",
            score: 0.9
        },
        {
            title: "The Guardian",
            url: "https://www.theguardian.com/international/rss",
            score: 0.85
        },
        {
            title: "NPR News",
            url: "https://feeds.npr.org/1001/rss.xml",
            score: 0.8
        },
        {
            title: "CNN",
            url: "https://rss.cnn.com/rss/cnn_topstories.rss",
            score: 0.75
        }
    ],
    "science": [
        {
            title: "Scientific American",
            url: "https://www.scientificamerican.com/feed/",
            score: 0.95
        },
        {
            title: "Science Daily",
            url: "https://www.sciencedaily.com/rss/all.xml",
            score: 0.9
        },
        {
            title: "Nature",
            url: "https://www.nature.com/nature.rss",
            score: 0.85
        },
        {
            title: "Science News",
            url: "https://www.sciencenews.org/feed",
            score: 0.8
        },
        {
            title: "New Scientist",
            url: "https://www.newscientist.com/feed/",
            score: 0.75
        }
    ],
    "cooking": [
        {
            title: "Food Network",
            url: "https://www.foodnetwork.com/recipes.rss",
            score: 0.95
        },
        {
            title: "Bon Appétit",
            url: "https://www.bonappetit.com/feed/rss",
            score: 0.9
        },
        {
            title: "Serious Eats",
            url: "https://www.seriouseats.com/feeds/latest",
            score: 0.85
        },
        {
            title: "Smitten Kitchen",
            url: "https://smittenkitchen.com/feed/",
            score: 0.8
        },
        {
            title: "The Kitchn",
            url: "https://www.thekitchn.com/feed",
            score: 0.75
        }
    ],
    "travel": [
        {
            title: "Lonely Planet",
            url: "https://www.lonelyplanet.com/feed",
            score: 0.95
        },
        {
            title: "National Geographic Travel",
            url: "https://www.nationalgeographic.com/travel/feed/",
            score: 0.9
        },
        {
            title: "Travel + Leisure",
            url: "https://www.travelandleisure.com/feed",
            score: 0.85
        },
        {
            title: "Conde Nast Traveler",
            url: "https://www.cntraveler.com/feed",
            score: 0.8
        },
        {
            title: "AFAR",
            url: "https://www.afar.com/feed",
            score: 0.75
        }
    ],
    "sports": [
        {
            title: "ESPN",
            url: "https://www.espn.com/espn/rss/news",
            score: 0.95
        },
        {
            title: "Sports Illustrated",
            url: "https://www.si.com/rss/si_all",
            score: 0.9
        },
        {
            title: "Bleacher Report",
            url: "https://bleacherreport.com/feed",
            score: 0.85
        },
        {
            title: "CBS Sports",
            url: "https://www.cbssports.com/rss/headlines",
            score: 0.8
        },
        {
            title: "NBC Sports",
            url: "https://sports.nbcsports.com/feed/",
            score: 0.75
        }
    ]
};
async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }
    try {
        const { topic } = req.body;
        if (!topic || typeof topic !== 'string' || topic.trim() === '') {
            return res.status(400).json({
                error: "Topic is required and must be a non-empty string"
            });
        }
        console.log(`Received request for topic: "${topic}"`);
        // Check if we have direct topic-based suggestions
        const normalizedTopic = topic.toLowerCase().trim();
        for (const [key, feeds] of Object.entries(TOPIC_BASED_FEEDS)){
            if (normalizedTopic.includes(key)) {
                console.log(`Using direct topic-based suggestions for: ${key}`);
                return res.status(200).json(feeds);
            }
        }
        // Try to fetch and process suggestions
        try {
            console.log(`Fetching HTML for topic: ${topic}`);
            const html = await fetchHTMLForTopic(topic);
            const feedUrls = extractFeedUrlsFromHtml(html);
            console.log(`Found ${feedUrls.length} feed URLs in search results`);
            if (feedUrls.length === 0) {
                console.warn("No feed URLs found in search results");
                return res.status(200).json(FALLBACK_FEEDS);
            }
            // Load the embedder model for semantic search
            console.log("Loading embedder model");
            const embedder = await loadEmbedder();
            // Generate topic embedding for semantic search
            console.log("Generating topic embedding");
            const topicEmbedding = (await embedder(topic))[0][0];
            // Fetch and process feeds
            const feeds = [];
            for (const url of feedUrls){
                try {
                    console.log(`Fetching feed: ${url}`);
                    const controller = new AbortController();
                    const timeoutId = setTimeout(()=>controller.abort(), 5000); // 5 second timeout
                    const response = await fetch(url, {
                        signal: controller.signal
                    });
                    clearTimeout(timeoutId);
                    if (!response.ok) {
                        console.warn(`Failed to fetch feed at ${url} due to status: ${response.status}`);
                        continue;
                    }
                    const xml = await response.text();
                    const title = xml.match(/<title>(.*?)<\/title>/)?.[1] || url;
                    // Extract a sample of content for better relevance checking
                    const content = xml.match(/<description>(.*?)<\/description>/)?.[1] || xml.match(/<summary>(.*?)<\/summary>/)?.[1] || xml.match(/<content>(.*?)<\/content>/)?.[1] || "";
                    // Generate a description for the feed
                    const description = await generateFeedDescription(title, content);
                    // Check if the feed is relevant to the topic
                    const isRelevant = await isFeedRelevantToTopic(title, description, topic);
                    if (isRelevant) {
                        console.log(`Adding relevant feed: ${title}`);
                        feeds.push({
                            title,
                            url,
                            description
                        });
                    } else {
                        console.log(`Skipping irrelevant feed: ${title}`);
                    }
                } catch (err) {
                    console.warn(`Failed to fetch feed at ${url} due to error: ${err}`);
                }
            }
            if (feeds.length === 0) {
                console.warn("No valid feeds found");
                return res.status(200).json(FALLBACK_FEEDS);
            }
            // Calculate semantic similarity scores
            console.log("Generating feed embeddings and calculating similarity scores");
            const results = await Promise.all(feeds.map(async (feed)=>{
                try {
                    // Create a combined text for embedding
                    const combinedText = `${feed.title} ${feed.description}`;
                    const embedding = (await embedder(combinedText))[0][0];
                    const score = cosineSimilarity(topicEmbedding, embedding);
                    console.log(`Feed "${feed.title}" has similarity score: ${score}`);
                    return {
                        ...feed,
                        score
                    };
                } catch (err) {
                    console.warn(`Error embedding feed: ${feed.title}`, err);
                    return {
                        ...feed,
                        score: 0.5
                    };
                }
            }));
            // Sort by relevance score and return top 5
            const sortedResults = results.sort((a, b)=>b.score - a.score).slice(0, 5);
            console.log(`Returning ${sortedResults.length} sorted results`);
            // Format the results to match the expected output
            const formattedResults = sortedResults.map(({ title, url, score })=>({
                    title,
                    url,
                    score
                }));
            return res.status(200).json(formattedResults.length > 0 ? formattedResults : FALLBACK_FEEDS);
        } catch (searchError) {
            console.error("Error in search process:", searchError);
            return res.status(200).json(FALLBACK_FEEDS);
        }
    } catch (error) {
        console.error("Suggestion API error:", error);
        return res.status(200).json(FALLBACK_FEEDS);
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/node_modules/next/dist/esm/server/route-modules/pages-api/module.compiled.js [api] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time truthy", 1) {
        module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/pages-api.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api.runtime.dev.js, cjs)");
    } else {
        "TURBOPACK unreachable";
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/esm/server/route-kind.js [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "RouteKind": (()=>RouteKind)
});
var RouteKind = /*#__PURE__*/ function(RouteKind) {
    /**
   * `PAGES` represents all the React pages that are under `pages/`.
   */ RouteKind["PAGES"] = "PAGES";
    /**
   * `PAGES_API` represents all the API routes under `pages/api/`.
   */ RouteKind["PAGES_API"] = "PAGES_API";
    /**
   * `APP_PAGE` represents all the React pages that are under `app/` with the
   * filename of `page.{j,t}s{,x}`.
   */ RouteKind["APP_PAGE"] = "APP_PAGE";
    /**
   * `APP_ROUTE` represents all the API routes and metadata routes that are under `app/` with the
   * filename of `route.{j,t}s{,x}`.
   */ RouteKind["APP_ROUTE"] = "APP_ROUTE";
    /**
   * `IMAGE` represents all the images that are generated by `next/image`.
   */ RouteKind["IMAGE"] = "IMAGE";
    return RouteKind;
}({}); //# sourceMappingURL=route-kind.js.map
}}),
"[project]/node_modules/next/dist/esm/build/templates/helpers.js [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Hoists a name from a module or promised module.
 *
 * @param module the module to hoist the name from
 * @param name the name to hoist
 * @returns the value on the module (or promised module)
 */ __turbopack_context__.s({
    "hoist": (()=>hoist)
});
function hoist(module, name) {
    // If the name is available in the module, return it.
    if (name in module) {
        return module[name];
    }
    // If a property called `then` exists, assume it's a promise and
    // return a promise that resolves to the name.
    if ('then' in module && typeof module.then === 'function') {
        return module.then((mod)=>hoist(mod, name));
    }
    // If we're trying to hoise the default export, and the module is a function,
    // return the module itself.
    if (typeof module === 'function' && name === 'default') {
        return module;
    }
    // Otherwise, return undefined.
    return undefined;
} //# sourceMappingURL=helpers.js.map
}}),
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/src/pages/api/suggest.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "config": (()=>config),
    "default": (()=>__TURBOPACK__default__export__),
    "routeModule": (()=>routeModule)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/route-modules/pages-api/module.compiled.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/route-kind.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/build/templates/helpers.js [api] (ecmascript)");
// Import the userland code.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$api$2f$suggest$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/api/suggest.ts [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$api$2f$suggest$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$api$2f$suggest$2e$ts__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$api$2f$suggest$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$api$2f$suggest$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/suggest",
        pathname: "/api/suggest",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$api$2f$suggest$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__6b436adf._.js.map
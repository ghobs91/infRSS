// pages/api/proxy.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'url' parameter." });
  }

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type") || "text/plain";
    const body = await response.text();
    res.setHeader("Content-Type", contentType);
    res.status(200).send(body);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Failed to fetch proxied content." });
  }
}

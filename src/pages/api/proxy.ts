// pages/api/proxy.ts
export default async function handler(req, res) {
    const { url } = req.query;
    const response = await fetch(url);
    const text = await response.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(text);
  }
  
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { path, ...params } = req.query;

    if (!path) {
      return res.status(400).json({ error: "path parameter required" });
    }

    const queryString = new URLSearchParams(params).toString();
    const url = `https://v3.football.api-sports.io/${path}${queryString ? "?" + queryString : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-apisports-key": "5da71f696f2baa3867a5756bac83a0c0",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "*");

  const path = req.query.path;
  const params = { ...req.query };
  delete params.path;

  const queryString = new URLSearchParams(params).toString();
  const url = `https://v3.football.api-sports.io/${path}?${queryString}`;

  const response = await fetch(url, {
    headers: { "x-apisports-key": "5da71f696f2baa3867a5756bac83a0c0" }
  });

  const data = await response.json();
  res.status(200).json(data);
}

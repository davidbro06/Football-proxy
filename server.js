import express from "express";
import fetch from "node-fetch";
const app = express();

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  next();
});

app.get("/api/football", async (req, res) => {
  try {
    const { path, ...params } = req.query;
    const qs = new URLSearchParams(params).toString();
    const decodedPath = decodeURIComponent(path);
    const url = `https://api.football-data.org/v4/${decodedPath}${qs ? "?" + qs : ""}`;
    console.log("Fetching:", url);
    const r = await fetch(url, {
      headers: { 
        "X-Auth-Token": "04c70715613e4222b561202421299a42",
        "Content-Type": "application/json"
      }
    });
    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("OK"));

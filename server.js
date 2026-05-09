import express from "express";
import fetch from "node-fetch";
const app = express();
app.use((req,res,next)=>{res.setHeader("Access-Control-Allow-Origin","*");next();});
app.get("/api/football",async(req,res)=>{
  try{
    const{path,...p}=req.query;
    const url=`https://v3.football.api-sports.io/${path}?${new URLSearchParams(p)}`;
    const r=await fetch(url,{headers:{"x-apisports-key":"5da71f696f2baa3867a5756bac83a0c0"}});
    res.json(await r.json());
  }catch(e){res.status(500).json({error:e.message});}
});
app.listen(process.env.PORT||3000,()=>console.log("OK"));

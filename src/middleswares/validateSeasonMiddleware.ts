import { Request, Response, NextFunction } from "express";

import ValidationRegexV2 from "../services/v2/ValidationRegexV2";

export function ValidateSeason(req: Request, res: Response, next: NextFunction) {

  let { episodes, seasonNo } = req.body;
  
  
   if(typeof(episodes) != "number"){
    return res.status(400).json({ error: "epNo : dois etre un nombre" });
  }
  else if(episodes < 0){
     return res.status(400).json({ error: "epNo : dois etre superieur ou eglale a 0" });
  }
  if(typeof(seasonNo) != "number"){
    return res.status(400).json({ error: "seasonNo : dois etre un nombre" });
  }
  else if(seasonNo < 1){
     return res.status(400).json({ error: "seasonNo : dois etre superieur a 0" });
  }
  
  
  next();







}


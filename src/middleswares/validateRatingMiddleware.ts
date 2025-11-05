import { Request, Response, NextFunction } from "express";

import ValidationRegexV2 from "../services/v2/ValidationRegexV2";

export function ValidateRating(req: Request, res: Response, next: NextFunction) {

  let { score, review} = req.body;
  
  
   if(typeof(score) != "number"){
    return res.status(400).json({ error: "score : dois etre un nombre" });
  }
  else if(score < 0 || score > 10){
     return res.status(400).json({ error: "score : dois etre entre 0 et 10" });
  }
  if(typeof(review) != "string"){
    return res.status(400).json({ error: "review : dois etre un string" });
  }
  
  if(!ValidationRegexV2.validerReview(review)){
    return res.status(400).json({ error: "review : maxumix de 2000 characteres" });
  }
  
  next();







}


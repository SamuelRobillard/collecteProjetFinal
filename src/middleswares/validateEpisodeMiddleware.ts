import { Request, Response, NextFunction } from "express";

import ValidationRegexV2 from "../services/v2/ValidationRegexV2";

export function ValidateEpisode(req: Request, res: Response, next: NextFunction) {

  let {title, durationMin, epNo } = req.body;
  
  if(typeof(title) != 'string'){
    return res.status(400).json({ error: "Title doit etre de type string" });
  }
  else if(typeof(durationMin) != "number" && Number(durationMin)){
    return res.status(400).json({ error: "durationMin doit etre un nombre" });
  }
  else if(typeof(epNo) != "number"){
    return res.status(400).json({ error: "epNo : dois etre un nombre" });
  }
  else if(epNo < 1){
     return res.status(400).json({ error: "epNo : dois etre superieur a 1" });
  }
  else if (!ValidationRegexV2.validerTitre(title)) {
    return res.status(400).json({ error: "Title : Entre 1 et 200 charactere " });
  }
 
  else if (!ValidationRegexV2.validerDurationMinEpisode(durationMin)) {
    return res.status(400).json({ error: "duree doit etre entre 1 et 300 minutes" });
  }
  
  next();







}


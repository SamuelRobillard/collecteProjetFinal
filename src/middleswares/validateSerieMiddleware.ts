import { Request, Response, NextFunction } from "express";

import ValidationRegexV2 from "../services/v2/ValidationRegexV2";
import { isArrayBuffer } from "util/types";

export function ValidateSerie(req: Request, res: Response, next: NextFunction) {

  


  let {title, genre,status} = req.body;

  
  
  
   if(typeof(title) != 'string'){
    return res.status(400).json({ error: "Title doit etre de type string" });
  }
  
  
  if (!ValidationRegexV2.validerTitre(title)) {
    return res.status(400).json({ error: "Title : Entre 1 et 200 charactere " });
  }


  if(Array.isArray(genre)){
    genre.forEach(g =>{
        console.log(g)
        if (!ValidationRegexV2.validerGenre(g)) {
        return res.status(400).json({ error: "les genres doit avoir entre 1 et 30 characteres" });
    }});
    
  }
   else{
    return res.status(400).json({ error: "genre doit etre une liste" });
   }
  
    if(status !== "ongoing" && status !== "ended"){
        return res.status(400).json({ error: "status doit etre soit: ongoing ou ended" });
    }
  
  next();







}


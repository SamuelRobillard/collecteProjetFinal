import { Request, Response, NextFunction } from "express";

import ValidationRegexV2 from "../services/v2/ValidationRegexV2";
import { isArrayBuffer } from "util/types";

export function ValidateMovie(req: Request, res: Response, next: NextFunction) {

  


  let {title, genre, durationMin, releaseDate} = req.body;
  if(releaseDate !== undefined){
    const date = new Date(releaseDate)
  
  
    if(!Number(date.getTime())){
        return  res.status(400).json({ error: "releaseDate : separer les dates par un - exemple 2000-10-1" });
    }
    else if ( date.getTime()> Date.now()){
        return  res.status(400).json({ error: "releaseDate : date superieur a la date d'aujourd'hui" });
    }
  }
  
  else if(typeof(title) != 'string'){
    return res.status(400).json({ error: "Title doit etre de type string" });
  }
  else if(typeof(durationMin) != "number" && Number(durationMin)){
    return res.status(400).json({ error: "durationMin doit etre un nombre" });
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
  
    if (!ValidationRegexV2.validerDurationMinMovie(durationMin)) {
    return res.status(400).json({ error: "duree doit etre entre 1 et 600 minutes" });
  }
  
  next();







}


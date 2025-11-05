import { Request, Response, NextFunction } from "express";

import FormatedStringRegex from "../../Regex/FormatedStringRegex";

export function ValidateCityCodeName(req: Request, res: Response, next: NextFunction) {

  let {cityCode, cityName } = req.body;
  
  if(typeof(cityCode) != 'string'){
    return res.status(400).json({ error: "cityCode doit etre de type string" });
  }
 
  else if(typeof(cityName) != 'string'){
    return res.status(400).json({ error: "cityName doit etre de type string" });
  }

  
  req.body.cityCode = FormatedStringRegex.formatedString(cityCode)
  
  req.body.cityName = FormatedStringRegex.formatedString(cityName)
  
  next();







}


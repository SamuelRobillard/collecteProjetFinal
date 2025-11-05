import { Request, Response, NextFunction } from "express";

import ValidationRegexV2 from "../services/v2/ValidationRegexV2";

export function ValidateUser(req: Request, res: Response, next: NextFunction) {

  


  let { password, username, email, nom } = req.body;
  if (!ValidationRegexV2.validerPassword(password)) {
    return res.status(400).json({ error: "Password : Entrez 8 Characters minimums dont un chiffre, une majuscule et charactere special" });
  }
  else if (!ValidationRegexV2.validerEmail(email)) {
    return res.status(400).json({ error: "Email invalide" });
  }
  else if (!ValidationRegexV2.validerUsername(username)) {
    return res.status(400).json({ error: "Username doit contenir entre 3 et 30 charactere" });
  }
  else if (!ValidationRegexV2.validerNom(nom)) {
    return res.status(400).json({ error: "nom doit seulement contenir des lettres" });
  }
  next();







}


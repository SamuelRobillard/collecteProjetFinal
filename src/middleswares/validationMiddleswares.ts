import { Request, Response, NextFunction } from "express";
import ValidationRegexService from "../services/v1/validationRegexService";

export function validateMedia(req: Request, res: Response, next: NextFunction) {

  try {
    let titreR = req.body.titre;
    let titre = ValidationRegexService.cleanString(titreR)
  }
  catch {
    return res.status(400).json({ error: "Titre manquant" });
  }


  let { type, titre, genre, year, rating, duration, watched, status, saisonsId } = req.body;
  titre = ValidationRegexService.cleanString(titre)
  genre = ValidationRegexService.cleanString(genre)


  if (!ValidationRegexService.validerTitre(titre)) {
    return res.status(400).json({ error: "Titre : Seuls les lettres, chiffres et espaces sont autorisés." });
  }
  if (!ValidationRegexService.validerGenre(genre)) {
    return res.status(400).json({ error: "Genre : Seuls les lettres sont autorisés" });
  }
  if (type == "serie") {
    if (!ValidationRegexService.validerStatus(status)) {
      return res.status(400).json({ error: "Seuls les status en_attente, en_cours et terminee sont autorisé." });
    }

  }
  if (!ValidationRegexService.validerDuree(duration)) {
    return res.status(400).json({ error: "Duree : Seuls les chiffres positifs sont autorisés." });
  }
  if (!type || (type !== "film" && type !== "serie")) {
    return res.status(400).json({ error: "Le champ 'type' doit être 'film' ou 'serie'" });
  }
  if (typeof titre !== "string" || typeof genre !== "string") {
    return res.status(400).json({ error: "Champs de base invalides (id, titre, genre)" });
  }
  if (typeof year !== "number" || typeof rating !== "number") {
    return res.status(400).json({ error: "Champs 'year' et 'rating' doivent être des nombres" });
  }
  const currentYear: number = new Date().getFullYear();
  if (year > currentYear) {
    return res.status(400).json({ error: "Le champ year ne doit pas être supérieur a l'annee actuelle." });
  }

  if (type === "film") {
    if (typeof duration !== "number" || duration <= 0) {
      return res.status(400).json({ error: "Film: duration requise et  dois etre superieur à 0" });
    }
    if (typeof watched !== "boolean") {
      return res.status(400).json({ error: "Film: watched doit être un vrai ou faux" });
    }
  }


  if (type === "serie") {
    if (typeof status !== "string") {
      return res.status(400).json({ error: "Serie: 'status' est requis" });
    }
    if (!Array.isArray(saisonsId) || saisonsId.length === 0) {
      return res.status(400).json({ error: "Serie: doit avoir une liste de saisons" });
    }



  }
  req.body.titre = titre
  req.body.genre = genre
  next();







}


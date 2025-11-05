import { Router } from 'express';
import fs from "fs";
const router = Router();

function lireDerniereLigne(fichier: string): string | null {
  if (!fs.existsSync(fichier)) return null;

  const data = fs.readFileSync(fichier, "utf-8");
  const lignes = data.trim().split("\n");


  return lignes.length > 0 ? lignes[lignes.length - 1] ?? null : null;
}




router.get('/logs', (req, res) => {

  res.send(lireDerniereLigne("logs/app.log"))
});
router.get('/errors', (req, res) => {

  res.send(lireDerniereLigne("logs/error.log"))
});

export default router;
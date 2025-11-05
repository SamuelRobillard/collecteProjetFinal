import fs from "fs";
import path from "path";
const defaultData: any = {
  medias: [],
  episodes: [],
  series: []
};
const filePath = path.join(__dirname, "../data/dbMedia.json");

export function readData() {
   if (!fs.existsSync(filePath)) {
    // Le fichier n'existe pas, on le crée avec les listes vides
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8')}
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function writeData(data: any) {
  if (!fs.existsSync(filePath)) {
    // Le fichier n'existe pas, on le crée avec les listes vides
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8')}
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

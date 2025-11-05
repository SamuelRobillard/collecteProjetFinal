import fs from "fs";
import path from "path";



const defaultData: any = [

]
   

  
  

const filePath = path.join(__dirname, "../data/dbUsers.json");

export function readDataUser() {
   if (!fs.existsSync(filePath)) {
    // Le fichier n'existe pas, on le crée avec une liste vide
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8')}
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function writeDataUser(data: any) {
  if (!fs.existsSync(filePath)) {
    // Le fichier n'existe pas, on le crée avec une liste vide
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8')}
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

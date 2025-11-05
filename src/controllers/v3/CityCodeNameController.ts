import { Request, Response } from 'express';
import { CityCodeNameService } from '../../services/v3/CityCodeNameService';
import CityCodeName from '../../models/v3/CityCodeName';





export class CityCodeNameController {

  public async createCityCodeName(req: Request, res: Response): Promise<Response> {
    const {cityCode, cityName } = req.body;
    console.log("in controller" + cityCode)
   
    
    try {
      const cityCodeName = await CityCodeNameService.createCityCodeName(cityCode, cityName);
      return res.status(201).json(cityCodeName);
    } catch (error: unknown) {
     return res.status(400).json({message : "probleme creation de cityCodeName"})
    
  }}


  
 

  public async getCityCodeName(req: Request, res: Response): Promise<Response> {
    const { cityCode, cityName } = req.query;  // Les paramètres sont dans req.query

    try {
      if (cityName) {
        // Si l'utilisateur a filtré par cityName, on retourne le cityCode
        const code = await CityCodeNameService.getCityCodeByItsName(cityName as string);
        if (code) {
          return res.status(200).json({ cityCode: code });
        } else {
          return res.status(404).json({ message: `Aucun cityCode trouvé pour la ville ${cityName}` });
        }
      }

     else if (cityCode) {
        // Si l'utilisateur a filtré par cityCode, on retourne le cityName
        const name = await CityCodeNameService.getCityNameByItsCode(cityCode as string);
        if (name) {
          return res.status(200).json({ cityName: name });
        } else {
          return res.status(404).json({ message: `Aucun cityName trouvé pour le code ${cityCode}` });
        }
      }
      else {
        const allCityCodeName = await CityCodeNameService.getAllCityCodeName()
        return res.status(200).json(allCityCodeName);
      }
      

    } catch (error: unknown) {
      // Gestion des erreurs
      return res.status(500).json({ message: 'Erreur interne du serveur', error: error instanceof Error ? error.message : 'Erreur inconnue' });
    }
  }

}
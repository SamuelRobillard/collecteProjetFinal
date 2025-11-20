import { Request, Response } from 'express';
import { CityCodeNameService } from '../../services/v3/CityCodeNameService';
import CityCodeName from '../../models/v3/CityCodeName';
import { HotelService } from '../../services/v3/HotelService';
import { HotelLocationService } from '../../services/v3/HotelLocationService';





export class HotelLocationController {




  
 

  public async getHotelLocationByCity(req: Request, res: Response): Promise<Response> {
    
    const {cityName, cityCode} = req.body;  // Les paramètres sont dans req.query
   

    console.log("asdasdada" + cityName)
    try {
        const name = await  CityCodeNameService.getCityCodeByItsName(cityName)

        // Si l'utilisateur a filtré par cityName, on retourne le cityCode
        const hotels = await HotelLocationService.getHotelLocationByCity(name as string[]);
        if (hotels) {
          return res.status(200).json({ data: hotels });
        } else {
          return res.status(404).json({ message: `Aucun hotel trouvé pour la ville ${cityName}` });
        }

    } catch (error: unknown) {
      // Gestion des erreurs
      return res.status(500).json({ message: 'Erreur interne du serveur', error: error instanceof Error ? error.message : 'Erreur inconnue' });
    }
  }

}
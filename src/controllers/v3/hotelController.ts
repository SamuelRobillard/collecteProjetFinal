import { Request, Response } from 'express';
import { CityCodeNameService } from '../../services/v3/CityCodeNameService';
import CityCodeName from '../../models/v3/CityCodeName';
import { HotelService } from '../../services/v3/HotelService';





export class HotelController {




  
 

  public async getHotelById(req: Request, res: Response): Promise<Response> {
    const { hotelId} = req.body;  // Les paramètres sont dans req.query

    try {
      
        // Si l'utilisateur a filtré par cityName, on retourne le cityCode
        const code = await HotelService.getHotelById(hotelId as string);
        if (code) {
          return res.status(200).json({ cityCode: code });
        } else {
          return res.status(404).json({ message: `Aucun cityCode trouvé pour la ville ${hotelId}` });
        }

    } catch (error: unknown) {
      // Gestion des erreurs
      return res.status(500).json({ message: 'Erreur interne du serveur', error: error instanceof Error ? error.message : 'Erreur inconnue' });
    }
  }

}
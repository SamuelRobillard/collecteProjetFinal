import { Request, Response } from 'express';
import { CityCodeNameService } from '../../services/v3/CityCodeNameService';
import CityCodeName from '../../models/v3/CityCodeName';
import { HotelService } from '../../services/v3/HotelService';
import { ApiCall } from '../../services/v3/ApiCall';





export class HotelController {


  
  public async getLotsOfHotel(req: Request, res: Response): Promise<Response> {
   

    try {
      
        // Si l'utilisateur a filtré par cityName, on retourne le cityCode
        const hotels = await ApiCall.getAHugeBunchOfHotel(1,1);
        if (hotels) {
          return res.status(200).json({ data: hotels });
        } else {
          return res.status(404).json({ message: `Aucun cityCode trouvé pour la ville` });
        }

    } catch (error: unknown) {
      // Gestion des erreurs
      return res.status(500).json({ message: 'Erreur interne du serveur', error: error instanceof Error ? error.message : 'Erreur inconnue' });
    }
  }
  
 

  public async getHotelById(req: Request, res: Response): Promise<Response> {
    const { hotelId} = req.query;  // Les paramètres sont dans req.query

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
  public async createHotel(req: Request, res: Response): Promise<Response> {
    const {hotelId, name  } = req.body;

    
    
    try {
      const hotelQuality = await HotelService.createHotel(hotelId, name);
      return res.status(201).json({ message: 'HotelQuality créé avec succès', hotelQuality });
    } catch (error: unknown) {
     return res.status(400).json({message : "probleme creation de hotelQuality"})
    
  }}

}
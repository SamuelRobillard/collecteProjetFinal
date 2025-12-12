import { Request, Response } from 'express';
import { HotelQualityService } from '../../services/v3/HotelQualityService';





export class HotelQualityController {



    public async createHotelQuality(req: Request, res: Response): Promise<Response> {
        const {hotelId, price, rating  } = req.body;
    
        console.log(hotelId, price, rating)
        
        try {
          const hotelQuality = await HotelQualityService.createHotelQuality(hotelId, price, rating,0,0);
          return res.status(201).json({ message: 'HotelQuality créé avec succès', hotelQuality });
        } catch (error: unknown) {
         return res.status(400).json({message : "probleme creation de hotelQuality"})
        
      }}
  
      public async updateHotelQuality(req: Request, res: Response): Promise<Response> {
        const hotelId = req.params.id
        console.log(hotelId)
    
       console.log(req.body)
        
        try {
          const hotelQuality = await HotelQualityService.updateHotelQualityService(hotelId as string, req.body);
          return res.status(201).json({ message: 'HotelQuality modifier avec succès', hotelQuality });
        } catch (error: unknown) {
         return res.status(400).json({message : "probleme creation de hotelQuality"})
        
      }}
 

 

}
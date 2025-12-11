import { Request, Response } from "express";
import { BookingService } from "../../services/v3/BookingService";
import { AccessDataService } from "../../services/v3/AccessDataService";
import { CityCodeNameService } from "../../services/v3/CityCodeNameService";


export class AccessDataController {
  public async getDataInfoByCity(req: Request, res: Response): Promise<Response> {
    try {

        const {city}  = req.query;
        if (typeof(city) == "string") {
            const cityArrary : string[]= [city]
            if (cityArrary !== undefined){
                const dataInfo = await AccessDataService.getDataInfoByCity(cityArrary);
                return res.status(201).json(dataInfo);
            }
        }
        return res.status(404)
    } catch (error: unknown) {
      return res.status(400).json({ message: "probleme getDataInfoByCity" });
    }
  }


  public async getHotelsCsv(req: Request, res: Response): Promise<Response> {
    try {
      // utiliser require pour compatibilité CommonJS
      const fs = require('fs');
      const path = require('path');

      const csvPath = path.resolve(process.cwd(), 'hotels.csv');
      if (!fs.existsSync(csvPath)) {
        return res.status(404).json({ message: 'hotels.csv introuvable' });
      }

      const raw = fs.readFileSync(csvPath, 'utf-8');
      const lines = raw.split(/\r?\n/).filter((l: string) => l.trim().length > 0);
      if (lines.length <= 1) {
        return res.status(200).json([]);
      }

      const headers = lines[0].split(',');
      const rows = lines.slice(1).map((line: string) => {
        const cols = line.split(',');
        const obj: any = {};
      headers.forEach((h: string, i: number) => {
        obj[h] = cols[i];
      });


        
        // typage simple
        if (obj.rating !== undefined) obj.rating = Number(obj.rating);
        if (obj.nbRating !== undefined) obj.nbRating = Number(obj.nbRating);
        if (obj.price !== undefined) obj.price = Number(obj.price);
        if (obj.ratioPriceQuality !== undefined) obj.ratioPriceQuality = Number(obj.ratioPriceQuality);
        return obj;
      });

      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lecture hotels.csv' });
    }
  }


    public async getAllHotelDto(req: Request, res: Response): Promise<Response> {
    try {
                const dataInfo = await AccessDataService.getAllHotelDTo();
                return res.status(201).json(dataInfo);
        
    } catch (error: unknown) {
      return res.status(400).json({ message: "probleme getDataInfoByCity" });
    }
  }


 public async getTop10HotelPriceRatioByCity(req: Request, res: Response): Promise<Response> {
    try {

        const {city}  = req.query;
        if (typeof(city) == "string") {
            const cityArrary : string[]= [city]
            if (cityArrary !== undefined){
                const dataInfo = await AccessDataService.getBestHotelPriceRatioByCity(cityArrary);
                return res.status(201).json(dataInfo);
            }
        }
        return res.status(404)
    } catch (error: unknown) {
      return res.status(400).json({ message: "probleme getBestHotelPriceRatioByCity" });
    }
  }

   public async getCityNames(req: Request, res: Response): Promise<Response> {
    
    try {
        const dataInfo = await CityCodeNameService.getAllCityName();
        return res.status(201).json(dataInfo);
    } catch (error: unknown) {
        return res.status(400).json({ message: "probleme getCityName" });
    }
  }
}


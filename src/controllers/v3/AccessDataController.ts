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

   public async getCityNames(req: Request, res: Response): Promise<Response> {
    
    try {
        const dataInfo = await CityCodeNameService.getAllCityName();
        return res.status(201).json(dataInfo);
    } catch (error: unknown) {
        return res.status(400).json({ message: "probleme getCityName" });
    }
  }
}


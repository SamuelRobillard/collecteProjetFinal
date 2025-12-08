import { Types } from "mongoose";
import Hotel from "../../models/v3/HotelModel";
import HotelQuality, { IHotelQuality } from "../../models/v3/HotelQualityModel";
import { CityCodeNameService } from "./CityCodeNameService";
import { HotelLocationService } from "./HotelLocationService";
import { DataTransferService } from "./DataTransferService";
import DataTransferHotelInfo from "../../models/v3/DataTransferHotelInfo";



export class AccessDataService {
  public static async getDataInfoByCity(city : string[]): Promise<any> {
    try {
        
        // const cityCodeName = await CityCodeNameService.getCityCodeByItsName(city);
        console.log(city);
        if (city !== null) {
            const allHotels = await HotelLocationService.getHotelLocationByCity(city);
           
            if (allHotels !== null) {
                const result = await Promise.all(allHotels.map(async e => await DataTransferService.combineAllDataForOneHotelById(e.hotelId)));
                console.log(result);
                return result;
            }
            return null;
        }

        return null;

      
      
    } catch (error) {
      throw new Error('Erreur lors de la récupération des cityCodeName: ' + error);
    }
  }




}
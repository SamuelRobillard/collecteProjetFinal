import { Types } from "mongoose";
import Hotel from "../../models/v3/HotelModel";
import HotelQuality, { IHotelQuality } from "../../models/v3/HotelQualityModel";
import { CityCodeNameService } from "./CityCodeNameService";
import { HotelLocationService } from "./HotelLocationService";
import { DataTransferService } from "./DataTransferService";
import DataTransferHotelInfo from "../../models/v3/DataTransferHotelInfo";
import FormatedStringRegex from "../../Regex/FormatedStringRegex";
import { HotelService } from "./HotelService";



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



  public static async getBestHotelPriceRatioByCity(city : string[]): Promise<any> {
    try {
        
        // const cityCodeName = await CityCodeNameService.getCityCodeByItsName(city);
        console.log(city);
        if (city !== null) {
           
            const allHotels = await HotelLocationService.getHotelLocationByCity(city);
           
            if (allHotels !== null) {
                const result = await Promise.all(allHotels.map(async e => await DataTransferService.combineAllDataForOneHotelById(e.hotelId)));
                  const top10 = [...result]
            .sort((a, b) =>
                ((a?.ratioPriceQuality ?? 0)) - ((b?.ratioPriceQuality ?? 0))
            )
            .slice(0, 10);

                
                return top10;
            }
            return null;
        }

        return null;

      
      
    } catch (error) {
      throw new Error('Erreur lors de la récupération des cityCodeName: ' + error);
    }
  }

public static async getAllHotelDTo(): Promise<any> {
    try {
        
        // const cityCodeName = await CityCodeNameService.getCityCodeByItsName(city);
        
           
            const allHotels = await HotelService.getAllHotelId();
           
            if (allHotels !== null) {
                const result = await Promise.all(allHotels.map(async e => await DataTransferService.combineAllDataForOneHotelById(e)));
                console.log(result);
                return result;
            }
            return null;
        

       

      
      
    } catch (error) {
      throw new Error('Erreur lors de la récupération des cityCodeName: ' + error);
    }
  }

}
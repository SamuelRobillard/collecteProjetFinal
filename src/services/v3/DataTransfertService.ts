import { compareSync } from "bcryptjs";
import api from "../../utils/v3/axiosClient";
import { HotelService } from "./HotelService";
import DataTransfertHotelInfo from "../../models/v3/DataTransfertHotelInfo";
import { HotelLocationService } from "./HotelLocationService";
import { HotelQualityService } from "./HotelQualityService";



export class DataTransfertService {


  
  





    public static async combineAllDataForOneHotelById(hotelId : string): Promise<DataTransfertHotelInfo | null> {
        try {
            
            const hotelName = await HotelService.getHotelById(hotelId)
            const hotelLocation = await HotelLocationService.getHotelLocationById(hotelId)
            const hotelQuality = await HotelQualityService.getHotelQualityById(hotelId)
            
            if(hotelName && hotelQuality && hotelLocation){
                const dataTransfertHotelInfo = new DataTransfertHotelInfo(hotelId, hotelName.name, hotelLocation.countryCode, hotelLocation.cityCode, hotelQuality.rating, hotelQuality.nbRating, hotelQuality.price, hotelQuality.ratioPriceQuality)
                console.log(dataTransfertHotelInfo)
                return dataTransfertHotelInfo
            }
            else{
                return null
            }
            
        }
    

        catch  {
            return null
        }
    }
}
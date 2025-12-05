import { compareSync } from "bcryptjs";
import api from "../../utils/v3/axiosClient";
import { HotelService } from "./HotelService";
import DataTransferHotelInfo from "../../models/v3/DataTransferHotelInfo";
import { HotelLocationService } from "./HotelLocationService";
import { HotelQualityService } from "./HotelQualityService";



export class DataTransferService {


  
  





    public static async combineAllDataForOneHotelById(hotelId : string): Promise<DataTransferHotelInfo | null> {
        try {
            console.log(hotelId);
            const hotelName = await HotelService.getHotelById(hotelId)
            const hotelLocation = await HotelLocationService.getHotelLocationById(hotelId)
            const hotelQuality = await HotelQualityService.getHotelQualityById(hotelId)
            
            if(hotelName && hotelQuality && hotelLocation){
                const dataTransferHotelInfo = new DataTransferHotelInfo(hotelId, hotelName.name, hotelLocation.countryCode, hotelLocation.cityCode, hotelQuality.rating, hotelQuality.nbRating, hotelQuality.price, hotelQuality.ratioPriceQuality)
                return dataTransferHotelInfo
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
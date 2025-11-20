

import HotelLocation, { IHotelLocation } from "../../models/v3/HotelLocation";


export class HotelLocationService {


  
  public static async createHotelLocation(hotelId: string, cityCode: string, countryCode : string, latitude : number, longitude : number): Promise<any> {
    
  
    const hotelLocation = new HotelLocation({
       hotelId,
       cityCode,
       countryCode,
       latitude,
       longitude
       

     
    });


    try{
        const HotelAlreadyExist = await HotelLocation.findOne({
            hotelId : hotelId
        });
        
        if(HotelAlreadyExist != null){
            return  { message: `code :  ${hotelId} already exists` };
        }
        
        else{
            await hotelLocation.save();
            return { hotel: hotelLocation };
        }
            
    }
    catch (error) {
        throw new Error('Erreur lors de la récupération des cityCodeName: ' + error);
      }
   
  }

    public static async getHotelLocationByCity(cityCodes: string[]): Promise<IHotelLocation[] | null> {
    try {
      // Query the database to find hotel locations that match any cityCode in the cityCodes array
      const hotels = await HotelLocation.find({ cityCode: { $in: cityCodes } });

      // If hotels are found, return them, else return null
      return hotels.length > 0 ? hotels : null;
      
    } catch (error) {
      // Catch and throw any error that occurs during the database query
      throw new Error('Error retrieving hotel locations: ' + error);
    }
  }
}


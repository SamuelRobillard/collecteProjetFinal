


import HotelLocation, { IHotelLocation } from "../../models/v3/HotelLocationModel";


import { HttpError } from "../../utils/HttpError";



export class HotelLocationService {


  
  public static async createHotelLocation( hotelId: string, cityCode: string, countryCode: string, latitude: number, longitude: number): Promise<any> {


    const hotelLocation = {
        hotelId,
        cityCode,
        countryCode,
        latitude,
        longitude
    };

    try {
   
     
        const updatedHotelLocation = await HotelLocation.findOneAndUpdate(
            { hotelId: hotelId },        
            { $set: hotelLocation },  
            
            //sert a cree si trouve pas
            { new: true, upsert: true }  
        );

        return { hotel: updatedHotelLocation };  
    } catch (error) {
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

    public static async updateHotelLocationService(
    hotelId: string, 
    updateData: Partial<IHotelLocation>
): Promise<IHotelLocation> {
  
    const updatedHotelLocation = await HotelLocation.findOneAndUpdate(
        { hotelId: hotelId },        
        { $set: updateData },        
        { new: true, runValidators: true }
    );

    // If no hotel is found, throw a 404 error
    if (!updatedHotelLocation) {
        throw new HttpError('Hôtel non trouvé', 404);  
    }

    return updatedHotelLocation;  
}

public static async getHotelLocationById(hotelId : string): Promise<IHotelLocation | null> {
    try {
        
        const hotel = await HotelLocation.findOne({hotelId : hotelId});
        if(hotel != null){
          
            return hotel
        }

        return null
      
      
    } catch (error) {
      throw new Error('Erreur lors de la récupération des cityCodeName: ' + error);
    }
  }

}


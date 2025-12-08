



import  { IHotel } from "../../models/v3/HotelModel";
import Hotel from "../../models/v3/HotelModel";


export class HotelService {


  
  public static async createHotel(hotelId: string, name: string): Promise<any> {
    const hotelData = {
        hotelId,
        name
    };

    try {
        // Use findOneAndUpdate with upsert: true to either update the hotel or create it if it doesn't exist
        const hotel = await Hotel.findOneAndUpdate(
            { hotelId: hotelId },    // Find by hotelId
            { $set: hotelData },      // Set the fields to be updated or inserted
            { new: true, upsert: true }  // Return the updated or newly created document
        );

        return { hotel };  // Return the hotel (updated or newly created)
    } catch (error) {
        throw new Error('Erreur lors de la récupération des cityCodeName: ' + error);
    }
}


  public static async getHotelById(hotelId : string): Promise<IHotel | null> {
    try {
        
        const hotel = await Hotel.findOne({hotelId : hotelId});
        if(hotel != null){
            return hotel
        }

        return null
      
      
    } catch (error) {
      throw new Error('Erreur lors de la récupération des cityCodeName: ' + error);
    }
  }

  public static async getAllHotelId(): Promise<string[] | null> {
    try {
        const hotels = await Hotel.find().select('hotelId');
        if(hotels != null){
            return hotels.map(e => e.hotelId); 
        }

        return null
      
      
    } catch (error) {
      throw new Error('Erreur lors de la récupération des cityCodeName: ' + error);
    }
  }
}
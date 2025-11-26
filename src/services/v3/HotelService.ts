



import  { IHotel } from "../../models/v3/HotelModel";
import Hotel from "../../models/v3/HotelModel";


export class HotelService {


  
  public static async createHotel(hotelId: string, name: string): Promise<any> {
   
    
    // Créer un nouvel utilisateur
    
    const hotel = new Hotel({
       hotelId,
       name
       

     
    });

    
    try{
        const HotelAlreadyExist = await Hotel.findOne({
            hotelId : hotelId
        });
        
        if(HotelAlreadyExist != null){
            return  { message: `code :  ${hotelId} already exists` };
        }
        
        else{
            await hotel.save();
            return { hotel: hotel };
        }
            
    }
    catch (error) {
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




}




import  { IHotel } from "../../models/v3/Hotel";
import Hotel from "../../models/v3/Hotel";


export class HotelService {


  
  public static async createHotel(hotelId: string, name: string): Promise<any> {
   
    
    // Créer un nouvel utilisateur
    
    const hotel = new Hotel({
       hotelId,
       name
       

     
    });

    // Sauvegarder l'utilisateur dans la base de données
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
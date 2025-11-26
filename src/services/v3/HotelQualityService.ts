




import { Types } from "mongoose";
import Hotel from "../../models/v3/Hotel";
import HotelQuality, { IHotelQuality } from "../../models/v3/HotelQuality";
import { HttpError } from "../../utils/HttpError";


export class HotelQualityService {




  
  public static async createHotelQuality(hotelId: string, price: number, rating : number): Promise<any> {
    
    let ratioPriceQuality;
    // Créer un nouvel utilisateur
    try {
        ratioPriceQuality = rating / price

    }
    catch{
        ratioPriceQuality = 0
    }
    
    const hotel = new HotelQuality({
       hotelId ,
       price,
       rating,
       ratioPriceQuality
       

     
    });

    
    try{
       
        await hotel.save();
        return { hotel: hotel };
        
            
    }
    catch (error) {
        console.error('Erreur lors de la sauvegarde de l\'hotel:', error);
        throw new Error('Erreur lors de la récupération des cityCodeName: ' + error);
      }
    
    
   
  }

  

  public static async updateHotelQualityService(hotelId: string, updateData: Partial<IHotelQuality>): Promise<IHotelQuality> {
  

    // Si on veut mettre à jour le mot de passe, on le hash
    
    
    const hotel = await HotelQuality.findOne({
        hotelId : hotelId
    })
      
    const updatedHotel = hotel
    try{
      if(updatedHotel!== null){
        
        if(updateData.price !== undefined){
            updatedHotel.price =  updateData.price 
        }
         if(updateData.rating !== undefined){
            updatedHotel.rating =  updateData.rating 
        }

        updatedHotel.ratioPriceQuality = updatedHotel.rating / updatedHotel.price
        updatedHotel.save()
    }  
    }
    
    catch{

    }
    
        
    
    
     

    if (!updatedHotel) {
      throw new HttpError('hotel non trouvé.', 404);
    }

    return updatedHotel;
  }

}
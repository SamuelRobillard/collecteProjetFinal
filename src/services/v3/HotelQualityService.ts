
import HotelQuality, { IHotelQuality } from "../../models/v3/HotelQualityModel";


export class HotelQualityService {




  
  public static async createHotelQuality( hotelId: string, price: number, rating: number, ratioPriceQuality: number, nbRating: number): Promise<any> {


    const hotelQuality = {
        hotelId,
        price,
        rating,
        ratioPriceQuality,
        nbRating,
        
    };

    try {
   
     
        const hotelQualityUpdate = await HotelQuality.findOneAndUpdate(
            { hotelId: hotelId },        
            { $set: hotelQuality },  
            
            //sert a cree si trouve pas
            { new: true, upsert: true }  
        );

        return { hotel: hotelQualityUpdate };  
    } catch (error) {
        throw new Error('Erreur lors de la récupération des cityCodeName: ' + error);
    }
}

  

  public static async updateHotelQualityService(hotelId: string, updateData: Partial<IHotelQuality>): Promise<IHotelQuality | null> {
  

    
    
    
    const hotel = await HotelQuality.findOne({
        hotelId : hotelId
    })
    if(hotel !== null){
      const updatedHotel = hotel
      try{
        if(updatedHotel!== null){
          
          if(updateData.price !== undefined){
              updatedHotel.price =  updateData.price 
          }
           if(updateData.rating !== undefined){
              updatedHotel.rating =  updateData.rating 
          }
          if(updateData.nbRating !== undefined){
            updatedHotel.nbRating =  updateData.nbRating 
        }
  
          updatedHotel.ratioPriceQuality = updatedHotel.rating / updatedHotel.price
          updatedHotel.save()
      } 
       return updatedHotel
      }
        
      catch{
        return null
      }
    }
 
    
        
    
    
     

    else {
      
      return null
    }

    
  }



  public static async getHotelQualityById(hotelId : string): Promise<IHotelQuality | null> {
    try {
        
        const hotel = await HotelQuality.findOne({hotelId : hotelId});
        if(hotel != null){
            return hotel
        }

        return null
      
      
    } catch (error) {
      throw new Error('Erreur lors de la récupération des cityCodeName: ' + error);
    }
  }


  
}
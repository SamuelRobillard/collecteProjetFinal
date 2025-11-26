




import { ApiCall } from "./ApiCall";
import { HotelLocationService } from "./HotelLocationService";
import { HotelService } from "./HotelService";


export class StockHotelService {


    public static async createLots(): Promise<any> {
        try {
            
          const response = await ApiCall.getAHugeBunchOfHotel(41.397158, 2.160873);  
      
          
          console.log("Réponse API:", response);  
          
       
          if (response && Array.isArray(response.data)) {
          
            for (const hotel of response.data) {
            
              if (hotel.name && hotel.hotelId && hotel.geoCode && hotel.address) {
                // Affichage des informations de l'hôtel
                console.log(`Nom de l'hôtel: ${hotel.name}`);
                console.log(`ChainCode: ${hotel.chainCode}`);
                console.log(`Latitude: ${hotel.geoCode.latitude}, Longitude: ${hotel.geoCode.longitude}`);
                console.log(`Adresse: ${hotel.address.lines.join(", ")}, ${hotel.address.cityName}, ${hotel.address.countryCode}`);
                console.log(`Distance: ${hotel.distance.value} ${hotel.distance.unit}`);
      
               
                await HotelService.createHotel(hotel.hotelId, hotel.name);
      
               
                await HotelLocationService.createHotelLocation(
                  hotel.hotelId,
                  hotel.address.cityName,  
                  hotel.address.countryCode,  
                  hotel.geoCode.latitude,
                  hotel.geoCode.longitude
                );
              } else {
                console.warn(`Données manquantes pour l'hôtel ${hotel.name || hotel.hotelId}`);
              }
            }
          } else {
            console.log("Aucun hôtel trouvé.");
          }
        } catch (error) {
          console.error("Erreur lors de la création des hôtels :", error || error);
        }
      }
      
      
      

}
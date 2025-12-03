




import { IHotelQuality } from "../../models/v3/HotelQualityModel";
import FormatedStringRegex from "../../Regex/FormatedStringRegex";
import { ApiCall } from "./ApiCall";
import { HotelLocationService } from "./HotelLocationService";
import { HotelQualityService } from "./HotelQualityService";
import { HotelService } from "./HotelService";
import {faker} from "@faker-js/faker"

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
      
      
      public static async createHotelByCity(cityCode : string, radius : number): Promise<any> {
        try {
            
          const response = await ApiCall.getHotelByCityCode(cityCode, radius);  
      
          
          console.log("Réponse API:", response);  
          
       
          if (response && Array.isArray(response.data)) {
          
            for (const hotel of response.data) {
            

              
              if (hotel.name && hotel.hotelId && hotel.geoCode && hotel.address) {
                console.log(`Nom de l'hôtel: ${hotel.name}`);
                if(!FormatedStringRegex.isTestInName(hotel.name)){
                  console.log(`Nom de l'hôtel: ${hotel.name}`  + "saved");
                  
                  
                  await HotelService.createHotel(hotel.hotelId, hotel.name);
                  await HotelLocationService.createHotelLocation(
                    hotel.hotelId,
                    hotel.address.cityName,  
                    hotel.address.countryCode,  
                    hotel.geoCode.latitude,
                    hotel.geoCode.longitude
                  );
                }
               
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


      public static async fillBd(): Promise<any> {
        const listHotelId = await HotelService.getAllHotelId()
        
        try {
          if(listHotelId !== null){
            listHotelId.forEach(async hotel => {
              
              const isValide = await HotelQualityService.getHotelQualityById(hotel)
              console.log(isValide)
            if(isValide == null){
              this.createHotelByPriceApi([hotel])
            }
          });
          }
          
        }
        catch (error) {
          console.error("Erreur lors de la création des hôtels :", error || error);
        }
        return true;
      }

      public static async createHotelByPriceApi(listHotelArray : string[]): Promise<any> {
        try {
            
          const response = "await ApiCall.getPriceByListOfHotel(listHotelArray);  "
          
          
          
          if(Array.isArray(response)){
            const updateData: Partial<IHotelQuality> = {
              price:response[1],  // nouveau prix
              rating: faker.number.int(100),  // nouvelle note
              nbRating: faker.number.int(100)  // nouvelle note
            };
              HotelQualityService.createHotelQuality(response[0], response[1], 0,0,0)
              HotelQualityService.updateHotelQualityService(response[0], updateData)
          }
          else{
            const updateData: Partial<IHotelQuality> = {
              
              price: (Number)(faker.commerce.price({min : 50, max : 1500})),  // nouveau prix
              rating: (Number)(faker.commerce.price({min : 10, max : 100, dec : 0})),
              nbRating: (Number)(faker.commerce.price({min : 10, max : 400, dec : 0})),
            };
            console.log(updateData)
            await HotelQualityService.createHotelQuality(listHotelArray[0] as string, 0, 0,0,0)
            
            await HotelQualityService.updateHotelQualityService(listHotelArray[0] as string, updateData)
          }
       
          
        } catch (error) {
          console.error("Erreur lors de la création des hôtels :", error || error);
        }
      }   
}
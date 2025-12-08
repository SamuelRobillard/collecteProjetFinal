import { compareSync } from "bcryptjs";
import api from "../../utils/v3/axiosClient";


export class ApiCall {


  
  





  public static async getAHugeBunchOfHotel(latitude: number, longitude: number): Promise<any> {
    try {
      
      const response = await api.get(
        "/v1/reference-data/locations/hotels/by-geocode",
        {
          params: {
            latitude: latitude,
            longitude: longitude,
            radius: 300,
            radiusUnit: "KM",
            hotelSource: "ALL",
          },
          headers: {
            accept: "application/vnd.amadeus+json",
          }
        }
      );
      
      
      return response.data;  
    } catch (error: any) {
      console.error("Erreur Amadeus :", error.response?.data || error.message);
      throw error; 
    }
  }
  

public static async getHotelByCityCode (cityCode : string, radius : number) : Promise<any> {
  try {
    const response = await api.get(
      "/v1/reference-data/locations/hotels/by-city",
      {
        params: {
          cityCode: cityCode,
          
          radius: radius,
          radiusUnit: "KM",
          hotelSource: "ALL",
        },
        headers: {
          accept: "application/vnd.amadeus+json",
        }
      }
    );

    return response.data;

  } catch (error: any) {
    console.error("Erreur Amadeus :", error.response?.data || error.message);
    throw error;
  }
};


public static async getPriceByListOfHotel(listHotelArray: string[]): Promise<any> {
  const listHotelSeparatedComma = listHotelArray.join(',');

  try {
    const response = await api.get(
      "/v3/shopping/hotel-offers",
      {
        params: {
          hotelIds: listHotelSeparatedComma,
          currency: "CAD",
          paymentPolicy: "NONE",
        },
        headers: {
          accept: "application/vnd.amadeus+json",
        }
      }
    );
    if(response.data.data[0].offers[0].id !== undefined && response.data.data[0].offers[0].price.total !== undefined ){
      return  [response.data.data[0].hotel.hotelId, response.data.data[0].offers[0].price.total ]
    }
   
   return listHotelSeparatedComma

  } catch (error: any) {
    
    console.error("Erreur Amadeus:", error.response?.data || error.message);
    return listHotelSeparatedComma
    
  }
}






public static async getHotelSentimentByHotelId (hotelId : string) : Promise<string> {
  try {
    const response = await api.get(
      "/v2/e-reputation/hotel-sentiments",
      {
        params: {
          hotelIds: hotelId,
          
         
        },
        headers: {
          accept: "application/vnd.amadeus+json",
        }
      }
    );

    return response.data;

  } catch (error: any) {
    console.error("Erreur Amadeus :", error.response?.data || error.message);
    throw error;
  }
};


}
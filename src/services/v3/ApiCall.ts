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
  

public static async getHotelByCityCode (cityCode : string, radius : number) : Promise<string> {
  try {
    const response = await api.get(
      "/v1/reference-data/locations/hotels/by-geocode",
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
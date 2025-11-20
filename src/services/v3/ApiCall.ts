import api from "../../utils/v3/axiosClient";


export class ApiCall {


  
  





public static async getAHugeBunchOfHotel (latitude : number, longitude : number) : Promise<string> {
  try {
    const response = await api.get(
      "/v1/reference-data/locations/hotels/by-geocode",
      {
        params: {
          latitude: 41.397158,
          longitude: 2.160873,
          radius: 300,
          radiusUnit: "KM",
          hotelSource: "ALL",
        },
        headers: {
          accept: "application/vnd.amadeus+json",
        }
      }
    );
    console.log(response.data)
    return response.data;

  } catch (error: any) {
    console.error("Erreur Amadeus :", error.response?.data || error.message);
    throw error;
  }
};

public static async getHotelByCityCode (cityCode : string, radius : number) : Promise<string> {
  try {
    const response = await api.get(
      "/v1/reference-data/locations/hotels/by-geocode",
      {
        params: {
          cityCode: cityCode,
          // max de 300 je penses
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




}
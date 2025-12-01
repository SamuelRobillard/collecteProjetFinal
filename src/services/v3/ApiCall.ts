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

    // Check if response.data is an array and has at least one item
    if (response && Array.isArray(response.data)) {
          
      for (const hotel of response.data) {
      
        if (hotel.name && hotel.hotelId) {
          // Affichage des informations de l'hôtel
      
          if (hotel.offers && Array.isArray(hotel.offers)) {
            for (const offer of hotel.offers) {
              // Access the price from each offer
              if (offer.price) {
                const price = offer.price;
                console.log(`Prix total: ${price.currency} ${price.total}`);
              } else {
                console.warn(`Price data missing for offer ${offer.id}`);
              }
            }
          }
        } else {
          console.warn(`Données manquantes pour l'hôtel ${hotel.name || hotel.hotelId}`);
        }
      }
    } 
    
    
    else {
      // If response.data is not an array or is empty, throw an error
      console.error("Expected an array with hotel data, but got:", response.data);
      throw new Error("The response data is not in the expected format.");
    }

  } catch (error: any) {
    console.error("Erreur Amadeus:", error.response?.data || error.message);
    throw error;
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
import axios from 'axios';
import config from "../../config/config";


const clientIP = config.clientIp
const clientSecret = config.clientSecret

    


   export const getAmadeusToken = async(): Promise<string> =>{
        console.log(clientIP)
        console.log(clientSecret)
        try {
            if(typeof(clientIP) == "string" && typeof(clientSecret) == "string"){
                const response = await axios.post(
                    'https://test.api.amadeus.com/v1/security/oauth2/token',
                    new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id : clientIP,
                    client_secret: clientSecret,
                    
                    }),
                    {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    }
              );
          
              const accessToken = response.data.access_token;
              console.log('Token obtenu :', accessToken);
              return accessToken;
            }
           
          else{
            return "null"
          }
        } catch (error: any) {
          console.error('Erreur lors de la récupération du token :', error.response?.data || error.message);
          throw error;
        }
      }

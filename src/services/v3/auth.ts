// auth.ts
import axios from 'axios';
import config from "../../config/config";

const clientIP = config.clientId;
const clientSecret = config.clientSecret;

let accessToken: string | null = null;
let tokenExpiresAt = 0; // 


export const generateAmadeusToken = async (): Promise<string> => {
  
  
  try {
    if (typeof clientIP === "string" && typeof clientSecret === "string") {
      const response = await axios.post(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientIP,
          client_secret: clientSecret,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      accessToken = response.data.access_token;
      tokenExpiresAt = Date.now() + response.data.expires_in * 1000 - 5000;

      console.log("Token obtenu :", accessToken);
      return accessToken!;
    } else {
      return "null";
    }
  } catch (error: any) {
    console.error(
      "Erreur lors de la récupération du token :",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const getToken = async (): Promise<string> => {
  if (accessToken && Date.now() < tokenExpiresAt) {
    return accessToken;
  }
  return await generateAmadeusToken();
};


export const refreshToken = async (): Promise<string> => {
  return await generateAmadeusToken();
};

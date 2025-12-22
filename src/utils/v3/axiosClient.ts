import axios from "axios";
import { getToken, refreshToken } from "../../services/v3/auth";

const api = axios.create({
  baseURL: "https://test.api.amadeus.com",
});

api.interceptors.request.use(
  async (config) => {
 
    const token = await getToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// rafraîchie le token si expiré
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      console.log(" Token expiré, rafraîchissement");

      try {
        await refreshToken(); 
        const newToken = await getToken(); 

        
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api.request(error.config); 
      } catch (e) {
        console.error("Erreur lors du rafraîchissement du token : ", e);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

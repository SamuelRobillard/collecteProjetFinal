// axiosClient.ts
import axios from "axios";
import { getToken, refreshToken } from "../../services/v3/auth";

const api = axios.create({
  baseURL: "https://test.api.amadeus.com",
});

// gere l'ajout automatique du token
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});





// gere le rafraichissement du token si expiré
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("⚠️ Token expiré, rafraîchissement…");

      await refreshToken();
      const newToken = await getToken();

      error.config.headers.Authorization = `Bearer ${newToken}`;
      return api.request(error.config);
    }
    return Promise.reject(error);
  }
);

export default api;

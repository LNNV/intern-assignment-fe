import axios from "axios";
import { BASE_URL } from "./constants";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
  },
});

// api.interceptors.request.use(async (config) => {
//   try {
//     const token = localStorage.getItem('token');
//     token && (config.headers["auth-token"] = `${token}`);
//   } catch (error) {
//     throw error;
//   }
//   return config;
// });

// api.interceptors.response.use(
//     (response) => {
//       return response.data;
//     },
//     (err) => {
//       throw err.response.data.Message || err.response;
//     }
//   );

export default api;
import axios from "axios";
import { handleGetToken } from "../utils/handleJwtLocalstorage";

axios.defaults.baseURL = process.env.API_URL ?? "http://localhost:4000";
axios.interceptors.request.use((request) => {
  const token = handleGetToken();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

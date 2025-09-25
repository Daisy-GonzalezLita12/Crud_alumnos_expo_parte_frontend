import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.129:8080", // cambia a tu IP local si usas Expo Go en celular físico
});

export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // Your NestJS backend
  withCredentials: true, // So cookies (auth_token) are sent
});

export default api;

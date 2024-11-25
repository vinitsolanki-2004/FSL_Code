import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Adjust the URL if your server runs on a different host/port
});

export default API;
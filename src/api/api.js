import axios from "axios";

const API = axios.create({
  baseURL: "https://discipline-backend-1.onrender.com"
});

export default API;
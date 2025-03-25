import axios from "axios";
import { BASE_URL } from "./constraints";

const axiosinstance = axios.create({
  baseURL: BASE_URL
}) 
export default axiosinstance       
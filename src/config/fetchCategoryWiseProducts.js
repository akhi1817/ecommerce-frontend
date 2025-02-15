import axios from "axios"
import { API_ENDPOINTS } from "./api"

const fetchCategoyWiseProduct=async()=>{
    const response= await axios.post(API_ENDPOINTS.GET_MULTIPLE_PRODUCTS_BY_CATEGORY)
        return response;
}

export default fetchCategoyWiseProduct;
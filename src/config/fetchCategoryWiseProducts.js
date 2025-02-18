// fetchCategoryWiseProducts.js
import axios from 'axios';
import { API_ENDPOINTS } from "./api.js";

const fetchCategoryWiseProduct = async (category) => {
  const response = await axios.get(
    `${API_ENDPOINTS.GET_MULTIPLE_PRODUCTS_BY_CATEGORY}?category=${encodeURIComponent(category)}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  
  return response;
};

export default fetchCategoryWiseProduct;

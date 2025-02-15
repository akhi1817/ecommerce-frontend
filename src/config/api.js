// src/config/api.js
import BASE_URL from "./baseURL";

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/user/login`,
  REGISTER: `${BASE_URL}/user/register`,
  LOGOUT: `${BASE_URL}/user/logout`,
  LOGIN_USER_DETAILS:`${BASE_URL}/user/login-user-details`,
  GET_ALL_USERS:`${BASE_URL}/user/all-users`,
  UPDATE_USER_DETAILS:`${BASE_URL}/user/update-user`,
  // products
  UPLOAD_PRODUCTS:`${BASE_URL}/product/upload-product`,
  GET_ALL_PRODUCTS:`${BASE_URL}/product/get-all-products`,
  UPDATE_PRODUCT: `${BASE_URL}/product/update-product`,
  GET_PRODUCTS_BY_CATEGORY:`${BASE_URL}/product/get-product-category`,
  GET_MULTIPLE_PRODUCTS_BY_CATEGORY:`${BASE_URL}/product/get-multiple-products-category`
};

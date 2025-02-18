
const BASE_URL = "http://localhost:8000/api/v1";
 const API_ENDPOINTS = {
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
  GET_PRODUCT_BY_CATEGORY:`${BASE_URL}/product/get-categoryProduct`,
  GET_MULTIPLE_PRODUCTS_BY_CATEGORY:`${BASE_URL}/product/category-product`,
  GET_PRODUCT_BY_ID:`${BASE_URL}/product/get-product`,
  SEARCH_PRODUCT:`${BASE_URL}/product/search`,
  FILTER_PRODUCT:`${BASE_URL}/product/filter-product`,
  //add to cart
  ADD_TO_CART:`${BASE_URL}/user/addtocart`,
  COUNT_PRODUCT:`${BASE_URL}/user/countproduct`,
  DISPLAY_CART_PRODUCTS:`${BASE_URL}/user/viewcartproducts`,
  UPDATE_CART:`${BASE_URL}/user/updatecartproduct`,
  DELETE_CART:`${BASE_URL}/user/deletecartproduct`,
};
export { API_ENDPOINTS};

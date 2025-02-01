// src/config/api.js
import BASE_URL from "./baseURL";

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/user/login`,
  REGISTER: `${BASE_URL}/user/register`,
  LOGOUT: `${BASE_URL}/user/logout`,
  USER_DETAILS:`${BASE_URL}/user/login-user-details`
};

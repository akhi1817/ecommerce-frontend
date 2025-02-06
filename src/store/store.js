import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Import the reducer

export const store = configureStore({
  reducer: {
    user: userReducer, // Ensure the key is the same as used in `useSelector`
  },
});

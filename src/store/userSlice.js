import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Ensure this matches the expected structure
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      console.log("User Details",action.payload)
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;

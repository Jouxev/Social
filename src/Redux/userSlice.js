import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null,
  },
  reducers: {
    setUser: (state, data) => {
      localStorage.setItem("currentUser", JSON.stringify(data.payload));
      state.currentUser = data.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const userState = (state) => state.userReducer;
export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

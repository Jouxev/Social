import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
  name: "store",
  initialState: {
    selectedTheme: localStorage.getItem("selectedTheme") || "light",
  },
  reducers: {
    setDarkTheme: (state) => {
      state.selectedTheme = "dark";
      localStorage.setItem("selectedTheme", "dark");
    },
    setLightTheme: (state) => {
      state.selectedTheme = "light";
      localStorage.setItem("selectedTheme", "light");
    },
  },
});

export const storeState = (state) => state.storeReducer;
export const { setDarkTheme, setLightTheme } = storeSlice.actions;
export default storeSlice.reducer;

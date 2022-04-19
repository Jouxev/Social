import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
  name: "store",
  initialState: {
    selectedTheme: "light",
  },
  reducers: {
    setDarkTheme: (state) => {
      state.selectedTheme = "dark";
    },
    setLightTheme: (state) => {
      state.selectedTheme = "light";
    },
  },
});

export const storeState = (state) => state.storeReducer;
export const { setDarkTheme, setLightTheme } = storeSlice.actions;
export default storeSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./storeSlice";

export default configureStore({
  reducer: {
    storeReducer: storeReducer,
  },
});

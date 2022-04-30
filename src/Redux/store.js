import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./storeSlice";
import postReducer from "./postSlice";
export default configureStore({
  reducer: {
    storeReducer: storeReducer,
    postReducer: postReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./storeSlice";
import postReducer from "./postSlice";
import userReducer from "./userSlice";
export default configureStore({
  reducer: {
    storeReducer: storeReducer,
    postReducer: postReducer,
    userReducer: userReducer,
  },
});

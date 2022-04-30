import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URI } from "../Config";

export const getPosts = createAsyncThunk("post/getPosts", async () => {
  return fetch(`${API_URI}api/post/`).then((data) => data.json());
});
export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "",
  },
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = "done";
    },
    [getPosts.rejected]: (state, action) => {
      state.status = "failed";
      console.log(action.payload);
    },
  },
});

export const postState = (state) => state.postReducer;
export const { setPosts } = postSlice.actions;
export default postSlice.reducer;

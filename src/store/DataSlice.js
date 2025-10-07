import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: []
};

const DataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    }
  }
});

export const { setPosts } = DataSlice.actions;
export default DataSlice.reducer;

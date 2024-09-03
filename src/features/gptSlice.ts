import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResults: null,
  },
  reducers: {
    toogleGptSeachView: (state, action) => {
      state.showGptSearch = action.payload;
    },
    addGptMovieResult: (state, action) => {
      console.log("action ", action.payload);

      state.movieResults = action.payload;
    },
  },
});

export const { toogleGptSeachView, addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;

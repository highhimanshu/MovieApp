import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieDetailType } from "../types/MovieDetailType";

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    isLoading: true,
    trailerVideo: null,
    nowPlayingMovies: [],
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    favoriteMovies: [] as MovieDetailType[],
  },
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
      state.isLoading = false;
    },
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
      state.isLoading = false;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
      state.isLoading = false;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
      state.isLoading = false;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
      state.isLoading = false;
    },
    addFavoriteMovie: (state, action: PayloadAction<any>) => {
      // const newFavorite:MovieDetailType = action.payload;
      const existingIndex = state.favoriteMovies.findIndex(
        (movie: any) => movie.id === action.payload.id
      );
      if (existingIndex === -1) {
        state.favoriteMovies.push(action.payload);
      }
    },
    removeFavoriteMovie: (state, action: PayloadAction<number>) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie: any) => movie.id !== action.payload
      );
    },
  },
});

export const {
  setLoading,
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addFavoriteMovie,
  removeFavoriteMovie,
} = movieSlice.actions;
export default movieSlice.reducer;

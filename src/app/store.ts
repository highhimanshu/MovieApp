import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import moviesReducer from "../features/movieSlice";
import gptReducer from "../features/gptSlice";
import dropdownReducer from "../features/dropdownSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    dropdown : dropdownReducer,
    movies: moviesReducer,
    gpt: gptReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
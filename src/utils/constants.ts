// https://developer.themoviedb.org/reference/intro/getting-started

//Logo
export const LOGO: string =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

//login background image
export const BGIMAGE_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/1fd8c6d0-20db-4667-860e-dd1ad7353ac0/10f8d166-7c8c-499a-b16f-57c3740cdeae/IN-en-20240624-popsignuptwoweeks-perspective_alpha_website_small.jpg";

const API_ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;
export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
  },
};

//IMDB Image API
export const BASE_IMAGE_CDN = "https://image.tmdb.org/t/p/w500";

//No Image Available
export const NO_IMAGE = import("../assets/no_image_available.jpg");

//IMDB base movie API key
export const BASE_MOVIE_API = "https://api.themoviedb.org/3/movie/";

// List of api's
export const NOW_PLAYING_MOVIE_API = `${BASE_MOVIE_API}now_playing?language=en-US&page=1`;
export const POPULAR_MOVIE_API = `${BASE_MOVIE_API}popular?page=1`;
export const TOP_RATED_MOVIE_API = `${BASE_MOVIE_API}top_rated?page=1`;
export const UPCOMING_MOVIE_API = `${BASE_MOVIE_API}upcoming?page=1`;

// GEMINI AI KEY
export const GEMINIAI_KEY = import.meta.env.VITE_GEMINIAI_KEY;

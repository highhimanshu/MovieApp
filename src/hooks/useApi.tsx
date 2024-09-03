import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  setLoading,
} from "../features/movieSlice";
import { useEffect } from "react";

const useApi = (url: any) => {
  const dispatch = useDispatch();
  const getApiData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(url, API_OPTIONS);
      const json = await response.json();
      if (url.toLowerCase().includes("now_playing")) {
        dispatch(addNowPlayingMovies(json.results));
      } else if (url.toLowerCase().includes("top_rated")) {
        dispatch(addTopRatedMovies(json.results));
      } else if (url.toLowerCase().includes("upcoming")) {
        dispatch(addUpcomingMovies(json.results));
      } else if (url.toLowerCase().includes("popular")) {
        dispatch(addPopularMovies(json.results));
      } else {
        return;
      }
    } catch (error) {
      console.log("error", error);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getApiData();
  }, [url]);

  return null;
};

export default useApi;

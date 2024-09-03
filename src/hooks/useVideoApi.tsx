import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../features/movieSlice";

const useVideoApi = (id: number) => {
  const dispatch = useDispatch();
  const getMovieTrailer = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      API_OPTIONS
    );
    const result = await response.json();

    dispatch(addTrailerVideo(result.results[0]));
  };
  return getMovieTrailer;
};

export default useVideoApi;

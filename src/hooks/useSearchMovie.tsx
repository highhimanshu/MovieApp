import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useSearchMovie = (movie: string) => {
  const [aimovieList, setAiMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchMovieTMDB = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      setAiMovieList(json.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movie from TMDB:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (movie.length > 0) {
      searchMovieTMDB();
    }
  }, [movie]);

  return { aimovieList, isLoading };
};

export default useSearchMovie;

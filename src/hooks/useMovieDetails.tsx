import { useEffect, useState } from "react";
import { API_OPTIONS, BASE_MOVIE_API } from "../utils/constants";
import { MovieDetailType } from "../types/MovieDetailType";

const useMovieDetails = (id: string | undefined) => {
  const [sinlgeMovieData, setSingleMovieData] = useState<MovieDetailType>();
  const [isLoading, setIsLoading] = useState(false);

  const getSingleMovieData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(BASE_MOVIE_API + id, API_OPTIONS);
      const result = await response.json();
      setSingleMovieData(result);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSingleMovieData();
  }, [id]);

  return { sinlgeMovieData, isLoading };
};

export default useMovieDetails;

import { API_OPTIONS } from "../utils/constants";

import { useEffect, useState } from "react";

const useVideoApi = (id: number) => {
  const [movieVideoDetail, setMovieVideoDetail] = useState(null);

  const getMovieTrailer = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      API_OPTIONS
    );
    const result = await response.json();
    setMovieVideoDetail(result);
  };

  useEffect(() => {
    getMovieTrailer();
  }, []);
  return movieVideoDetail;
};

export default useVideoApi;

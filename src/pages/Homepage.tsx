import useApi from "../hooks/useApi";
import {
  NOW_PLAYING_MOVIE_API,
  POPULAR_MOVIE_API,
  TOP_RATED_MOVIE_API,
  UPCOMING_MOVIE_API,
} from "../utils/constants";
import { useSelector } from "react-redux";
import VideoSlider from "../components/VideoSlider";
import SecondaryContainer from "../components/SecondaryContainer";
import AISearch from "../components/AISearch";

const Homepage = () => {
  useApi(UPCOMING_MOVIE_API);
  useApi(POPULAR_MOVIE_API);
  useApi(TOP_RATED_MOVIE_API);
  useApi(NOW_PLAYING_MOVIE_API);

  const nowPlayingMoviesList = useSelector(
    (store: any) => store.movies?.nowPlayingMovies
  );
  const showGptSearch = useSelector((store: any) => store.gpt.showGptSearch);

  const oneMovie = nowPlayingMoviesList[0];

  return (
    <>
      {showGptSearch ? (
        <AISearch />
      ) : (
        <>
          <VideoSlider singleMovieData={oneMovie} />

          <SecondaryContainer />
        </>
      )}
    </>
  );
};

export default Homepage;

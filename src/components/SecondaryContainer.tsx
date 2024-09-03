import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const {
    isLoading,
    upcomingMovies,
    popularMovies,
    topRatedMovies,
    nowPlayingMovies,
  } = useSelector((store: any) => store?.movies);

  return (
    <div className="bg-black py-6">
      <div className="md:-mt-82 lg:-mt-80 sm:mt-0 relative">
        <MovieList
          title="Upcoming"
          moviesList={upcomingMovies}
          urlQuery="upcoming"
          isLoading={isLoading}
        />
        <MovieList
          title="Popular"
          moviesList={popularMovies}
          urlQuery="popular"
          isLoading={isLoading}
        />
        <MovieList
          title="Top Rated"
          moviesList={topRatedMovies}
          urlQuery="top_rated"
          isLoading={isLoading}
        />
        <MovieList
          title="Now Playing"
          moviesList={nowPlayingMovies}
          urlQuery="now_playing"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default SecondaryContainer;

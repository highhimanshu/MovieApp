import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { MovieDetailType } from "../types/MovieDetailType";
import { RootState } from "../app/store";

const FavoriteMovies = () => {
  const favoriteMovies = useSelector(
    (state: RootState) => state.movies.favoriteMovies
  );

  return (
    <div className="pt-20 md:pt-32 px-4 md:px-8 max-w-7xl mx-auto text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Favorite Movies</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {favoriteMovies?.map(({ id, poster_path, title }: MovieDetailType) => (
          <Link to={`/${id}`} key={id} className="flex justify-center">
            <MovieCard id={id} posterPath={poster_path} movieTitle={title} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMovies;

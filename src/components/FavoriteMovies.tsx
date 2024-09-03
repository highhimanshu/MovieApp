import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { MovieDetailType } from "../types/MovieDetailType";
import { RootState } from "../app/store";

const FavoriteMovies = () => {
  const favoriteMovies = useSelector(
    (state: RootState) => state.movies.favoriteMovies
  );
  console.log("fav movies...", favoriteMovies);

  //hello

  return (
    <div className="pt-32 w-[1200px] mx-auto text-center">
      <h2 className="text-3xl font-bold">Favorite Movies</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center gap-10">
        {favoriteMovies?.map(({ id, poster_path, title }: MovieDetailType) => (
          <Link to={`/${id}`} key={id}>
            <MovieCard id={id} posterPath={poster_path} movieTitle={title} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMovies;

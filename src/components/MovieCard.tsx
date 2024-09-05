import { BASE_IMAGE_CDN } from "../utils/constants";
import NO_IMAGE from "../assets/no_image_available.jpg";
import { MovieCardType, MovieDetailType } from "../types/MovieDetailType";
import { useDispatch } from "react-redux";
import { addFavoriteMovie, removeFavoriteMovie } from "../features/movieSlice";
import heartoutline from "../assets/heartoutline.svg";
import heartsolid from "../assets/heartsolid.svg";
import { useSelector } from "react-redux";

const MovieCard = ({
  id,
  posterPath,
  movieTitle,
  originalLanguage,
}: MovieCardType) => {
  const dispatch = useDispatch();
  const favMovies = useSelector((c: any) => c.movies.favoriteMovies);
  const isFavorite = favMovies.some(
    (movie: MovieDetailType) => movie.id === id
  );

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite) {
      dispatch(removeFavoriteMovie(id));
    } else {
      dispatch(
        addFavoriteMovie({ id, poster_path: posterPath, title: movieTitle })
      );
    }
  };

  return (
    <div
      key={id}
      className="group relative cursor-pointer my-7 hover:scale-125 transition-all duration-500 hover:rounded-md hover:z-50"
    >
      <div className="flex items-end justify-between overlay absolute bottom-0 left-0 right-0 w-full h-full bg-gradient-to-t from-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:z-50">
        <span className="text-primary-golden text-xl p-2 font-semibold">
          {movieTitle} ({originalLanguage})
        </span>
        <span className="m-4  border rounded" onClick={handleToggleFavorite}>
          {isFavorite ? (
            <img src={heartsolid} width={40} />
          ) : (
            <img src={heartoutline} width={40} />
          )}
        </span>
      </div>
      <div className="w-full">
        <img
          className="w-full max-h-48 h-auto rounded-lg object-cover"
          src={posterPath ? BASE_IMAGE_CDN + posterPath : NO_IMAGE}
          alt={movieTitle}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default MovieCard;

import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import Carousel from "./Carousel";
import CardSkeleton from "./skeleton/CardSkeleton";
import { MovieListType } from "../types/MovieDetailType";

const MovieList = ({
  urlQuery,
  title,
  moviesList,
  isLoading,
}: MovieListType) => {
  return (
    <div className="my-6">
      <div className="mx-4">
        <Link to={`category/${urlQuery}`} state={{ title: title }}>
          <h2 className="flex justify-between items-center font-medium text-white">
            <span className="text-golden text-3xl">{title}</span>
            <span className="hover:underline">See More</span>
          </h2>
        </Link>
      </div>
      <div className="overflow-hidden">
        <Carousel>
          {isLoading
            ? [...Array(10)].map((_, index) => (
                <div key={`skeleton-${index}`} className="w-full">
                  <CardSkeleton />
                </div>
              ))
            : moviesList?.map((movie: any) => (
                <div key={movie.id} className="w-[350px]">
                  <Link to={`/${movie.id}`}>
                    <MovieCard
                      id={movie.id}
                      posterPath={movie.backdrop_path}
                      movieTitle={movie.title}
                      originalLanguage={movie.original_language}
                    />
                  </Link>
                </div>
              ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MovieList;

import { useParams } from "react-router-dom";
import useMovieDetails from "../hooks/useMovieDetails";
import { BASE_IMAGE_CDN } from "../utils/constants";
import { GenreType, SpokenLanguageType } from "../types/MovieDetailType";

import MovieDetailSkeleton from "../components/skeleton/MovieDetailSkeleton";
import NO_IMG from "../assets/no_image_available.jpg";

const MovieDetail = () => {
  const { id } = useParams<string>();
  const { sinlgeMovieData, isLoading } = useMovieDetails(id);

  if (isLoading) {
    return (
      <div className="pt-32 w-screen  h-screen">
        <div className="m-2 flex flex-col sm:flex-row text-white justify-around ">
          <div className="w-full">
            <MovieDetailSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (!sinlgeMovieData) {
    return <div>Movie not found</div>;
  }
  const {
    backdrop_path,
    title,
    tagline,
    status,
    release_date,
    runtime,
    spoken_languages,
    genres,
  } = sinlgeMovieData;

  return (
    <div className="pt-32 w-screen  h-screen">
      <div className="m-2 flex flex-col sm:flex-row text-white justify-around">
        <img
          src={backdrop_path ? BASE_IMAGE_CDN + backdrop_path : NO_IMG}
          className="rounded-md "
        />
        <div>
          <h2 className="text-4xl">{title}</h2>
          <p>{tagline}</p>
          <span>{status}</span> | <span>{release_date}</span> |
          <span> {runtime} min</span>
          <div className="flex">
            {spoken_languages?.map(({ english_name }: SpokenLanguageType) => (
              <span>{english_name}, </span>
            ))}
            {genres?.map(({ id, name }: GenreType) => (
              <span key={id}>{name} , </span>
            ))}
          </div>
          <button className="my-2 p-2 bg-white text-black font-bold">
            Watch
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

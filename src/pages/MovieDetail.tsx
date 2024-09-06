import { useParams } from "react-router-dom";
import useMovieDetails from "../hooks/useMovieDetails";
import { BASE_IMAGE_CDN } from "../utils/constants";
import { GenreType, SpokenLanguageType } from "../types/MovieDetailType";
import MovieDetailSkeleton from "../components/skeleton/MovieDetailSkeleton";
import NO_IMG from "../assets/no_image_available.jpg";
import useVideoApi from "../hooks/useVideoApi";
import { useEffect, useState } from "react";

const MovieDetail = () => {
  const { id }: any = useParams<any>();
  const { sinlgeMovieData, isLoading } = useMovieDetails(id);
  const trailer: any = useVideoApi(id);
  const [watchTrailer, setWatchTrailer] = useState("");

  useEffect(() => {
    setWatchTrailer(trailer?.results[0].key);
  }, [trailer]);

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
    <div className="pt-16 md:pt-24 lg:pt-32 w-full min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-center text-white gap-8">
          <div className="lg:1/3">
            <img
              src={backdrop_path ? BASE_IMAGE_CDN + backdrop_path : NO_IMG}
              className="rounded-lg w-full h-auto object-cover"
              alt={title}
            />
          </div>
          <div className="lg:2/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
            <p className="text-lg text-gray-300 mb-4">{tagline}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-700 px-2 py-1 rounded">{status}</span>
              <span className="bg-gray-700 px-2 py-1 rounded">
                {release_date}
              </span>
              <span className="bg-gray-700 px-2 py-1 rounded">
                {runtime} min
              </span>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Languages:</h3>
              <div className="flex flex-wrap gap-2">
                {spoken_languages?.map(
                  ({ english_name }: SpokenLanguageType) => (
                    <span
                      key={english_name}
                      className="bg-blue-600 px-2 py-1 rounded"
                    >
                      {english_name}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Genres:</h3>
              <div className="flex flex-wrap gap-2">
                {genres?.map(({ id, name }: GenreType) => (
                  <span key={id} className="bg-green-600 px-2 py-1 rounded">
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={`https://www.youtube.com/embed/${watchTrailer}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="px-6 py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-colors">
                Watch Trailer
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

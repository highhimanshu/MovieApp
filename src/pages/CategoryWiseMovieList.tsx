import { useEffect, useState } from "react";
import { API_OPTIONS, BASE_MOVIE_API } from "../utils/constants";
import MovieCard from "../components/MovieCard";
import { Link, useParams, useLocation } from "react-router-dom";
import CardSkeleton from "../components/skeleton/CardSkeleton";
import toast, { Toaster } from "react-hot-toast";
import useApiToast from "../hooks/useApiToast";

const CategoryWiseMovieList = () => {
  const [allMovies, setAllMovies] = useState({
    movies: [],
    pages: 0,
  });
  const { showToast } = useApiToast();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const param = useParams();
  const location = useLocation();
  const { title } = location.state || {};

  const getAllMoviePerCategory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        BASE_MOVIE_API + `${param.category_name}?language=en-US&page=${page}`,
        API_OPTIONS
      );
      const data = await response.json();
      setAllMovies({ movies: data?.results, pages: data?.total_pages });
    } catch (error: any) {
      console.log("error", error);
      showToast(error, "error");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleNumberClick = (selectedPage: any) => {
    setPage(selectedPage);
  };

  useEffect(() => {
    const callApi = getAllMoviePerCategory();
    toast.promise(callApi, {
      loading: "Fetching movie details...",
      success: "Movie details fetched successfully!",
      error: "Failed to fetch movie details",
    });
  }, [page]);

  return (
    <div className="pt-32 w-[1200px] mx-auto h-max text-white">
      <h2 className="font-semibold text-3xl text-center my-6">{title}</h2>
      <Toaster position="top-center" />
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4  gap-10 ">
        {isLoading
          ? Array(12)
              .fill(0)
              .map((_, index) => (
                <div key={`skeleton-${index}`}>
                  <CardSkeleton />
                </div>
              ))
          : allMovies?.movies.map((movie: any) => (
              <Link to={`/${movie.id}`}>
                <MovieCard
                  id={movie.id}
                  posterPath={movie.backdrop_path}
                  movieTitle={movie.title}
                />
              </Link>
            ))}
      </div>

      <ul className="flex flex-wrap list-none justify-center gap-5 my-10 font-bold">
        {page > 1 && <li onClick={handlePrevPage}>Prev</li>}
        {[...Array(Math.ceil(allMovies?.pages))].map((_, i) => (
          <li
            onClick={() => handleNumberClick(i + 1)}
            className={
              page === i + 1
                ? "font-bold text-red-600 cursor-pointer"
                : "cursor-pointer"
            }
          >
            {i + 1}
          </li>
        ))}
        {page < allMovies?.movies.length && (
          <li onClick={handleNextPage}>Next</li>
        )}
      </ul>
    </div>
  );
};

export default CategoryWiseMovieList;

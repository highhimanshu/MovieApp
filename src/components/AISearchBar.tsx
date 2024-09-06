import { MutableRefObject, useEffect, useRef, useState } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addGptMovieResult } from "../features/gptSlice";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { MovieDetailType } from "../types/MovieDetailType";
import Spinner from "./skeleton/Spinner";
import toast, { Toaster } from "react-hot-toast";

const AISearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const searchText = useRef() as MutableRefObject<HTMLInputElement>;
  const dispatch = useDispatch();
  const aiMovieList = useSelector((store: any) => store?.gpt.movieResults);

  const suggestions = [
    "Action-packed Thrillers",
    "Epic Historical Dramas",
    "Comedy Blockbusters",
  ];

  const handleSuggestionClick = () => {
    if (searchText.current) {
      handleGptSearchClick();
    }
  };

  const handleGptSearchClick = async () => {
    setLoading(true);
    setErrorMessage("");
    const prompt =
      "Act as a Movie Recommendation System and Suggest some best movies for the query :" +
      searchText.current.value +
      ". Only give names of 5 movies, comma separated. Like the example result ahead. Example Result : yeh jawaani hai deewani, Animal, Kalki 2898 AD, Maharaja, Gaddar, Saaho, Salaar, Bahubali, Jailer, Kantara";

    // const chatCompletion = await client.chat.completions.create({
    //   messages: [{ role: "user", content: prompt }],
    //   model: "gpt-3.5-turbo",
    // });

    //google gemeni
    toast.promise(openai.generateContent(prompt), {
      loading: "Generating AI recommendations...",
      success: "AI recommendations generated!",
      error: "Failed to generate recommendations",
    });
    try {
      const gptResult = await openai.generateContent(prompt);
      const response = gptResult.response;
      const text = response.text();
      if (!text) {
        toast.error("No response from AI. Please try again later.");
        setLoading(false);
        return;
      }
      const gptMovies = text.split(","); // converts to array
      const gptMoviesSuggestionList = gptMovies.map((ele) => ele.trim());

      toast.promise(
        Promise.all(
          gptMoviesSuggestionList.map((movie) => searchMovieTMDB(movie))
        ),
        {
          loading: "Fetching movie details...",
          success: "Movie details fetched successfully!",
          error: "Failed to fetch movie details",
        }
      );

      // const promiseArray = gptMoviesSuggestionList.map((movie) =>
      //   searchMovieTMDB(movie)
      // );
      const tmdbResult = await Promise.all(
        gptMoviesSuggestionList.map((movie) => searchMovieTMDB(movie))
      );

      const flattenedArrayMovieList = tmdbResult.flat();
      console.log("flattened result", flattenedArrayMovieList);
      dispatch(addGptMovieResult(tmdbResult.flat()));
    } catch (error) {
      setErrorMessage(
        "An error occurred. Please try again later or check your network connection."
      );
      console.error("Error during GPT search:", error);
      toast.error("An error occurred during the search.");
    } finally {
      setLoading(false);
    }
  };

  const searchMovieTMDB = async (movie: any) => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );

      const json = await data.json();
      return json.results;
    } catch (error) {
      console.error("Error fetching movie from TMDB:", error);
      toast.error(`Failed to fetch details for ${movie}`);
      return [];
    }
  };

  return (
    <div className="pt-20 mt-14 md:mt-0 md:pt-12 flex flex-col items-center text-center space-y-4">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-white text-xl md:text-5xl font-extrabold mb-4">
        Discover Your Next Favorite Movie with
        <span className="text-golden"> AI Insights</span>
      </h2>

      <form
        className="w-full mx-auto bg-opacity-60 rounded-xl p-4 shadow-lg flex items-center justify-center md:space-x-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="w-2/3 md:w-2/3 p-2 md:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden transition duration-300"
          type="text"
          placeholder="Get AI recommended movie"
        />
        <button
          className="w-auto inline-block md:mt-0 py-2 px-4 rounded-md  font-semibold focus:outline-none transition duration-300"
          onClick={handleGptSearchClick}
          disabled={loading}
        >
          {loading ? <Spinner /> : "AI Search"}
        </button>
      </form>
      {errorMessage && (
        <p className="text-red-500 font-bold text-sm mt-4">{errorMessage}</p>
      )}
      <div className="flex flex-wrap justify-center gap-4">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="bg-gray-800 border border-white hover:bg-gray-700 text-xs text-white py-1 px-2 rounded-lg focus:outline-none transition duration-300 ease-in-out"
            onClick={handleSuggestionClick}
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 justify-center gap-10">
          {aiMovieList?.map(({ id, poster_path, title }: MovieDetailType) => (
            <Link to={`/${id}`}>
              <MovieCard id={id} posterPath={poster_path} movieTitle={title} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AISearchBar;

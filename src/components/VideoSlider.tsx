import { useEffect, useState } from "react";
import useVideoApi from "../hooks/useVideoApi";
import { useSelector, useDispatch } from "react-redux";
import { addTrailerVideo } from "../features/movieSlice";

const VideoSlider = ({ singleMovieData }: any) => {
  const movieVideoDetail: any = useVideoApi(singleMovieData?.id);
  const dispatch = useDispatch();
  const [playPause, setPlayPause] = useState<number>(1);

  const trailerId: any = useSelector(
    (store: any) => store?.movies.trailerVideo
  );

  const videoSrc = `https://www.youtube.com/embed/${trailerId?.key}?autoplay=${playPause}&mute=1&controls=1&showinfo=0&rel=0&loop=1`;

  useEffect(() => {
    if (movieVideoDetail?.results?.length > 0) {
      dispatch(addTrailerVideo(movieVideoDetail.results[0]));
    }
  }, [movieVideoDetail, dispatch]);

  return (
    <div className="relative w-full">
      <div className="aspect-video">
        <iframe
          className="w-full h-full"
          src={videoSrc}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-5">
        <div className="flex flex-col justify-center h-full p-4 sm:p-6 md:p-8 lg:p-12">
          <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mb-2 sm:mb-4">
            {singleMovieData?.title}
          </h2>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button
              className=" px-2 py-1 sm:px-3 sm:py-2 rounded text-sm sm:text-base"
              onClick={() => setPlayPause(playPause === 0 ? 1 : 0)}
            >
              {playPause === 0 ? "Play" : "Pause"}
            </button>
            <button className="bg-gray-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded text-sm sm:text-base">
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSlider;

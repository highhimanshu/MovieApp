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
    <div className="relative">
      <iframe
        className="w-full h-[800px] aspect-video"
        src={videoSrc}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <div className="w-screen aspect-video pt-[30%] top-0 px-6 lg:pt-[20%] md:px-12 absolute text-white bg-gradient-to-r from-black">
        <h2 className="font-bold text-3xl">{singleMovieData?.title}</h2>
        <div className="flex gap-5 mt-3">
          <button
            className="bg-black px-3 py-1 rounded"
            onClick={() => {
              if (playPause === 0) {
                setPlayPause(1);
              } else {
                setPlayPause(0);
              }
            }}
          >
            {playPause === 0 ? "Play" : "Pause"}
          </button>
          <button className="bg-gray-500 px-3 py-1  rounded">More Info</button>
        </div>
      </div>
    </div>
  );
};

export default VideoSlider;

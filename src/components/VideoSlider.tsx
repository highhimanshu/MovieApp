import { useEffect } from "react";
import useVideoApi from "../hooks/useVideoApi";
import { useSelector } from "react-redux";

const VideoSlider = ({ singleMovieData }: any) => {
  const getMovieTrailer = useVideoApi(singleMovieData?.id);
  const trailerId: any = useSelector(
    (store: any) => store?.movies.trailerVideo
  );

  useEffect(() => {
    getMovieTrailer();
  }, []);

  return (
    <div className="relative">
      <iframe
        className="w-full h-[800px] aspect-video"
        // width="560"
        // height="500px"
        src={"https://www.youtube.com/embed/" + trailerId?.key}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <div className="w-screen aspect-video pt-[30%] top-0 px-6 lg:pt-[20%] md:px-12 absolute text-white bg-gradient-to-r from-black">
        <h2 className="font-bold text-3xl">{singleMovieData?.title}</h2>
        <div className="flex gap-5 mt-3">
          <button className="bg-black px-3 py-1 rounded">Play</button>
          <button className="bg-gray-500 px-3 py-1  rounded">More Info</button>
        </div>
      </div>
    </div>
  );
};

export default VideoSlider;

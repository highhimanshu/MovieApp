import React, { useState, useRef, useEffect } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

interface CarouselProps {
  children: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemsToShow, setItemsToShow] = useState<number>(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(4);
      } else if (window.innerWidth < 768) {
        setItemsToShow(6);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(8);
      } else {
        setItemsToShow(10);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, children.length - itemsToShow)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(-${
        currentIndex * (100 / itemsToShow)
      }%)`;
    }
  }, [currentIndex, itemsToShow]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={containerRef}
        className="flex transition-transform duration-300 ease-in-out"
        style={{ width: `${(children.length / itemsToShow) * 100}%` }}
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="px-2"
            style={{ flex: `0 0 ${100 / itemsToShow}%` }}
          >
            {child}
          </div>
        ))}
      </div>
      {currentIndex > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r z-10"
        >
          <FaArrowCircleLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      )}
      {currentIndex < children.length - itemsToShow && (
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l z-10"
        >
          <FaArrowCircleRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      )}
    </div>
  );
};

export default Carousel;

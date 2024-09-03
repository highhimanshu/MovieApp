import React, { useState, useRef, useEffect } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

interface CarouselProps {
  children: React.ReactNode[];
  itemsToShow: number;
  itemsToScroll: number;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  itemsToShow,
  itemsToScroll,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsToScroll, children.length - itemsToShow)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsToScroll, 0));
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(-${
        currentIndex * (100 / itemsToShow)
      }%)`;
    }
  }, [currentIndex, itemsToShow]);

  return (
    <div className="relative">
      <div className="overflow-hidden">
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
      </div>
      {currentIndex > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r z-10"
        >
          <FaArrowCircleLeft className="size-6" />
        </button>
      )}
      {currentIndex < children.length - itemsToShow && (
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l z-10"
        >
          <FaArrowCircleRight className="size-6" />
        </button>
      )}
    </div>
  );
};

export default Carousel;

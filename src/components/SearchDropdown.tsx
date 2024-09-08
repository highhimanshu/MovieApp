import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeDropdown } from "../features/dropdownSlice";
import useSearchMovie from "../hooks/useSearchMovie";
import ListSkeleton from "./skeleton/ListSkeleton";

const SearchDropdown = ({ search }: { search: string }) => {
  const { aimovieList, isLoading } = useSearchMovie(search);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        dispatch(closeDropdown());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div
      ref={dropdownRef}
      className="absolute z-10 bg-gray-700 rounded-md w-full border border-gray-800 top-11"
    >
      {isLoading ? (
        <div className="h-[400px]">
          <ListSkeleton />
        </div>
      ) : (
        <div className="h-[550px] overflow-auto">
          <ul className="leading-7">
            {aimovieList?.map((ele: any, index: number) => (
              <Link to={`/${ele.id}`}>
                <li
                  key={ele.id}
                  className="p-2 space-x-4 rounded my-1 mx-1 hover:bg-golden shadow-sm  "
                >
                  {ele.original_title} ( {ele.original_language})
                </li>
                {index < aimovieList.length - 1 && (
                  <hr className="border-gray-600 my-1" />
                )}
              </Link>
            ))}
            <span className="flex justify-center items-center text-sm font-semibold bg-golden py-2 cursor-pointer hover:underline hover:underline-offset-1">
              See More
            </span>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;

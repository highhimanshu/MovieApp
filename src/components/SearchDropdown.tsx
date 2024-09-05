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
      className="absolute z-10 bg-black w-full border border-gray-800 top-14"
    >
      {isLoading ? (
        <div className="h-[400px]">
          <ListSkeleton />
        </div>
      ) : (
        <div className="h-[400px]">
          <ul className="leading-7">
            {aimovieList?.map((ele: any, index: number) => (
              <Link to={`/${ele.id}`}>
                <li
                  key={ele.id}
                  className="p-2 space-x-4  rounded my-2  hover:bg-red-500 shadow-sm "
                >
                  {ele.original_title} ( {ele.original_language})
                </li>
                {index < aimovieList.length - 1 && (
                  <hr className="border-gray-600 my-1" />
                )}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;

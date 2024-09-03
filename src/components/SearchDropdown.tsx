import { Link } from "react-router-dom";
import useSearchMovie from "../hooks/useSearchMovie";
import ListSkeleton from "./skeleton/ListSkeleton";

const SearchDropdown = ({ search }: any) => {
  const { aimovieList, isLoading } = useSearchMovie(search);
  console.log("search list", aimovieList);

  // const handleSearchDropdown = () => {};

  return (
    <div className="absolute rounded shadow-md p-2  bg-black bg-opacity-50  w-full rounded-bl rounded-br  overflow-auto">
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

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LOGO from "../assets/movie_flex_logo.png";
import Dropdown from "./Dropdown";
import SearchDropdown from "./SearchDropdown";
import useDebounce from "../hooks/useDebounce";
import { RootState } from "../app/store";
import { toggleDropdown } from "../features/dropdownSlice";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDropdownOpen = useSelector(
    (state: RootState) => state.dropdown.isOpen
  );

  // const searchText = useRef<HTMLInputElement | string>("");
  const [searchText, setSeachText] = useState<string>("");
  const globalStateData = useSelector((c: any) => c.users);
  const debounceValue = useDebounce(searchText, 2000);

  //https://api.themoviedb.org/3/search/movie?query=Jack+Reacher

  // track every firebase state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      console.log("auth changed user... ", user);
      if (user) {
        const { uid, email, displayName, photoURL }: any = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/");
      } else {
        console.log("you are logged out");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed w-full py-2 px-4 bg-gradient-to-b from-black to-transparent z-10">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={LOGO} className="w-32 md:w-48" alt="MovieFlex Logo" />
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white"
        >
          <GiHamburgerMenu />
        </button>

        {globalStateData && (
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex sm:bg-primary-golden md:bg-transparent w-full md:w-auto md:items-center mt-4 md:mt-0`}
          >
            <Link
              to="/favorite"
              className="block md:inline-block text-white mb-2 md:mb-0 md:mr-4"
            >
              Favorite
            </Link>
            <div className="relative mb-2 md:mb-0 md:mr-4">
              <input
                type="search"
                className="p-2 rounded-md bg-black border-2 border-gray-200 w-full md:w-auto"
                onChange={(e) => setSeachText(e.target.value)}
              />
              {searchText && <SearchDropdown search={debounceValue} />}
            </div>
            <Link
              to="/ai"
              className="block md:inline-block mb-2 md:mb-0 md:mr-4"
            >
              <button className="bg-primary-golden text-black p-2 border-2 border-white rounded-md w-full md:w-auto">
                AI Search
              </button>
            </Link>
            <div className="relative cursor-pointer">
              {globalStateData.photoURL ? (
                <img
                  src={globalStateData.photoURL}
                  alt="User Avatar"
                  onClick={() => dispatch(toggleDropdown())}
                  className="rounded-full border-2 border-white w-12 h-12 md:w-16 md:h-16"
                />
              ) : (
                <h2
                  className="border  rounded-full bg-black w-12 h-12 md:w-16 md:h-16 font-bold text-2xl md:text-4xl flex justify-center items-center text-white"
                  onClick={() => dispatch(toggleDropdown())}
                >
                  <span>
                    {globalStateData.displayName
                      ? globalStateData.displayName[0]
                      : `?`}
                  </span>
                </h2>
              )}
              {isDropdownOpen && (
                <Dropdown name={globalStateData?.displayName} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

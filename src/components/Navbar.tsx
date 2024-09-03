import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LOGO } from "../utils/constants";
import AVATAR from "../assets/login_pic.png";
import Dropdown from "./Dropdown";
import SearchDropdown from "./SearchDropdown";
import useDebounce from "../hooks/useDebounce";
import { RootState } from "../app/store";
import { toggleDropdown } from "../features/dropdownSlice";

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

  return (
    <div className="absolute w-full py-2 px-4 bg-gradient-to-b from-black to-transparent z-10 flex flex-col md:flex-row gap-5 justify-between">
      <Link to="/">
        <img src={LOGO} className="w-44 mx-auto md:mx-0" />
      </Link>
      {globalStateData && (
        <div className="flex gap-5 items-center text-white">
          <Link to="/favorite">Favorite </Link>
          <div className="relative">
            <input
              // ref={searchText}
              type="search"
              className="p-2 rounded-md bg-black border-2 border-gray-200 "
              onChange={(e) => setSeachText(e.target.value)}
            />
            {searchText && <SearchDropdown search={debounceValue} />}
          </div>

          <Link to="/ai">
            <button className="bg-black text-white p-2 border-2 border-white rounded-md">
              AI Search
            </button>
          </Link>

          <div className="relative">
            <img
              src={globalStateData.photoURL ? globalStateData.photoURL : AVATAR}
              alt="hello"
              onClick={() => dispatch(toggleDropdown())}
              className="rounded-full border-2  border-white w-14 h-14 "
            />

            {isDropdownOpen && <Dropdown name={globalStateData?.displayName} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { removeUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { closeDropdown } from "../features/dropdownSlice";

type DropdownType = {
  name: string;
};

const Dropdown = ({ name }: DropdownType) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        dispatch(closeDropdown());

      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div ref= {dropdownRef} className="absolute border-2 p-4 top-15 right-0 text-lg bg-black rounded-md ">
      <ul className="leading-loose w-max cursor-pointer">
        <Link to="/dashboard">
          <li className="hover:underline">{name ? name : "Update Name"}</li>
        </Link>
        <li>Favorite</li>
      </ul>
      <button
        className="px-2 py-1 rounded bg-red-400 hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dropdown;

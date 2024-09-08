import UpdateUserData from "../components/UpdateUserData";
import FavoriteMoives from "../components/FavoriteMovies";
import { useState } from "react";

const Dashboard = () => {
  const [showComponent, setShowComponent] = useState<string>("Update");

  console.log("show comp.. ", showComponent);

  return (
    <div className="pt-32 w-[1200px] mx-auto text-center">
      <h2 className="text-3xl font-bold my-4">Dashboard</h2>
      <div className="grid grid-cols-12 divide-x">
        <div className="col-span-4">
          <ul className="leading-[40px]">
            <li
              className="hover:underline cursor-pointer"
              onClick={(e: any) => setShowComponent(e.target.innerText)}
            >
              Update
            </li>

            <li
              className="hover:underline cursor-pointer"
              onClick={(e: any) => setShowComponent(e.target.innerText)}
            >
              Setting
            </li>
          </ul>

          <div className="divide-x"></div>
        </div>

        <div className="col-span-8">
          {showComponent === "Update" && <UpdateUserData />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

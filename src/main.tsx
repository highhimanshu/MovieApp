import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Homepage from "./pages/Homepage.tsx";
import About from "./pages/About.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Navbar from "./components/Navbar.tsx";
import MovieDetail from "./pages/MovieDetail.tsx";
import AISearch from "./components/AISearch.tsx";
import CategoryWiseMovieList from "./pages/CategoryWiseMovieList.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import FavoriteMoives from "./components/FavoriteMovies.tsx";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <LoginSignup />,
      },
      {
        path: "/",
        element: <ProtectedRoute />,

        children: [
          {
            index: true,
            element: <Homepage />,
          },
          {
            path: "/:id",
            element: <MovieDetail />,
          },
          {
            path: "/category/:category_name",
            element: <CategoryWiseMovieList />,
          },
          {
            path: "/ai",
            element: <AISearch />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/favorite",
            element: <FavoriteMoives />,
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

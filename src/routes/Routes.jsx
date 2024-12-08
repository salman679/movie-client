import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MovieDetails from "../pages/MovieDetails";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import AddMovie from "../pages/AddMovie";
import PrivateRoutes from "./PrivateRoutes";
import Favorite from "../pages/Favorite";
import AllMovies from "../pages/AllMovies";
import AboutUs from "../components/aboutUs/AboutUs";
import UpdateMovie from "../components/updateMovie/UpdateMovie";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "/all-movies",
        element: <AllMovies />,
      },
      {
        path: "/add-movie",
        element: (
          <PrivateRoutes>
            <AddMovie />
          </PrivateRoutes>
        ),
      },
      {
        path: "/update-movie/:id",
        element: (
          <PrivateRoutes>
            <UpdateMovie />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-favorites/:email",
        element: (
          <PrivateRoutes>
            <Favorite />
          </PrivateRoutes>
        ),
      },
      {
        path: "movie/:id",
        element: (
          <PrivateRoutes>
            <MovieDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },

      {
        path: "/about-us",
        element: <AboutUs />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

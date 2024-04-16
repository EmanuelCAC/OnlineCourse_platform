import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import NotFound from "pages/NotFound";
import BookDetails from "pages/BookDetails";
import Cart from "pages/Cart";
import Courses from "pages/Courses"
import { param } from "express/lib/router";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/shop", element: <Shop /> },
    { path: "/shop/:id", element: <BookDetails /> },
    { path: "/cart", element: <Cart /> },
    { path: "/courses", element: <Courses /> },
    { path: "*", element: <NotFound /> },
  ]);

  return element;
};

export default ProjectRoutes;

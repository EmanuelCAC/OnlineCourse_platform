import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import NotFound from "pages/NotFound";
import BookDetails from "pages/BookDetails";
import { param } from "express/lib/router";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/shop", element: <Shop /> },
    { path: "/shop/:id", element: <BookDetails /> },
    { path: "*", element: <NotFound /> },
  ]);

  return element;
};

export default ProjectRoutes;

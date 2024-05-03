import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import NotFound from "pages/NotFound";
import BookDetails from "pages/BookDetails";
import Cart from "pages/Cart";
import Courses from "pages/Courses"
import MentorDetails from "pages/MentorDetails"
import CourseDetails from "pages/CourseDetails";
import Mentors from "pages/Mentors";
import Pricing from "pages/Pricing";
import ConfirmAccount from "pages/ConfirmAccount";
import Payment from "pages/Payment";
// import Review from "pages/Review";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/shop", element: <Shop /> },
    { path: "/shop/:id", element: <BookDetails /> },
    { path: "/cart", element: <Cart /> },
    { path: "/courses", element: <Courses /> },
    { path: "/courses/:id", element: <CourseDetails /> },
    { path: "/mentor", element: <Mentors /> },
    { path: "/mentor/:id", element: <MentorDetails /> },
    { path: "/pricing", element: <Pricing /> },
    { path: "/confirmAccount", element: <ConfirmAccount /> },
    { path: "/payment", element: <Payment /> },
    // { path: "/review", element: <Review /> },
    { path: "*", element: <NotFound /> },
  ]);

  return element;
};

export default ProjectRoutes;

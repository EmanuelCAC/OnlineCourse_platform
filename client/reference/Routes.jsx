import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import EduviCoursesPricing from "pages/EduviCoursesPricing";
import EduviJoinAsTeacher from "pages/EduviJoinAsTeacher";
import Allmentors from "pages/Allmentors";
import Singlementordetails from "pages/Singlementordetails";
import EduviCoursesDetails from "pages/CoursesDetails";
import EduviShop from "pages/Shop";
import EduviCourses from "pages/EduviCourses";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
    {
      path: "eduvicoursespricing",
      element: <EduviCoursesPricing />,
    },
    {
      path: "eduvijoinasteacher",
      element: <EduviJoinAsTeacher />,
    },
    {
      path: "allmentors",
      element: <Allmentors />,
    },
    {
      path: "singlementordetails",
      element: <Singlementordetails />,
    },
    {
      path: "eduvicorsesdetails",
      element: <EduviCoursesDetails />,
    },
    {
      path: "eduvishop",
      element: <EduviShop />,
    },
    {
      path: "eduvicourses",
      element: <EduviCourses />,
    },
  ]);

  return element;
};

export default ProjectRoutes;

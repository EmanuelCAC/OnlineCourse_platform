import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div style={{ height: "100vh", padding: "20px", backgroundColor: "#232323", color: "white" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Homepage</h1>
      <ul style={{ listStyle: "none", padding: "0" }}>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/eduvicoursespricing" style={{ color: "#87CEFA", textDecoration: "none" }}>
            EduviCoursesPricing
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/eduvijoinasteacher" style={{ color: "#87CEFA", textDecoration: "none" }}>
            EduviJoinAsTeacher
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/allmentors" style={{ color: "#87CEFA", textDecoration: "none" }}>
            Allmentors
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/singlementordetails" style={{ color: "#87CEFA", textDecoration: "none" }}>
            Singlementordetails
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/eduvicorsesdetails" style={{ color: "#87CEFA", textDecoration: "none" }}>
            EduviCoursesDetails
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/eduvishop" style={{ color: "#87CEFA", textDecoration: "none" }}>
            EduviShop
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/eduvicourses" style={{ color: "#87CEFA", textDecoration: "none" }}>
            EduviCourses
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;

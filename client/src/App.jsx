import React from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    setData(fetch('http://localhost:3001/api'))
      .then(res => res.json())
      .then(data => setData(data.message))
  }, []);

  console.log(data)


  return (
    <p>{!data ? "Loading..." : "Loading..."}</p>
    // <Router>
    //   <Routes />
    // </Router>
  );
}

export default App;

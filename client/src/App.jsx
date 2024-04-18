import React from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [data, setData] = React.useState(null);

  async function getAPI() {
    const apiData = await fetch('http://localhost:3001/api')
    console.log((apiData))
    const result = await apiData.json()
    console.log((result))
    setData(result.message)
    console.log((result.message))
  }

  React.useEffect(() => {
  }, []);


  return (
    <Router>
      <Routes />
      <ScrollToTop />
    </Router>
  );
}

export default App;

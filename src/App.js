import "./App.css";
import About from "./containers/About";
import Favourite from "./containers/Favourites";
import Home from "./containers/Home";
import MoviePage from "./containers/MovieDetails";
import ResponsiveAppBar from "./components/navbar";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div style={{ background: "#2d323b" }} className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Favourites" element={<Favourite />} />
        <Route path="/About us" element={<About />} />
        <Route path="/moviepage/:movieid" element={<MoviePage />} />
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import About from './containers/About';
import Favorite from './containers/Favorites';
import Watchlist from './containers/Watchlist';
import Home from './containers/Home';
import MoviePage from './containers/MovieDetails';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router';

// import ButtonAppBar from './components/Drawer1';
// import WithHeader from './components/hoc/withHeader';

function App() {
  return (
    <div style={{ background: 'black' }} className="App">
      <NavBar />

      {/* <ButtonAppBar /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/watchlist" element={<Watchlist />} />

        <Route path="/about" element={<About />} />
        <Route path="/moviepage/:movieid" element={<MoviePage />} />
      </Routes>
    </div>
  );
}

export default App;

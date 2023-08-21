import React, { useEffect } from "react";
import MovieBox from "../components/MovieBox";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncMovies, getAllMovies } from "../features/movies/movieSlice";

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector(getAllMovies);

  useEffect(() => {
    dispatch(fetchAsyncMovies());
  }, [dispatch]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        marginTop: 10,
        marginLeft: 35,
        marginRight: 5,
      }}
    >
      {movies.map((movieReq) => (
        <div>
          <MovieBox key={movieReq.id} item={movieReq} />
        </div>
      ))}
    </div>
  );
};

export default Home;

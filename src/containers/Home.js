import React, { useEffect, useState } from "react";
import MovieBox from "../components/MovieBox";
import process from "process";




const Home = () => {
    const [movies, setMovies] = useState([]);

    const getdata = () =>{
        fetch(`${process.env.REACT_APP_DISCOVER_API}?api_key=${process.env.REACT_APP_API_KEY}`)
        .then((res) => res.json())
        .then(data => {
            console.log(data)
            setMovies(data.results)
        })
    }

    useEffect(() => {
        getdata();
    }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", marginTop:10, marginLeft:35, marginRight:5, }}>
        {movies.map((movieReq)=> <MovieBox  key={movieReq.id} item={movieReq} />)}
    </div>
  );
}

export default Home;
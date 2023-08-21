import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMovieDetail,
  getSelectedMovie,
  removeSelectedMovie,
} from "../features/movies/movieSlice";

function MoviePage() {
  const { movieid } = useParams();
  console.log(movieid, "id");
  const dispatch = useDispatch();
  const movie = useSelector(getSelectedMovie);
  console.log(movie, "select movie");

  useEffect(() => {
    dispatch(fetchAsyncMovieDetail(movieid));
    return () => {
      dispatch(removeSelectedMovie());
    };
  }, [dispatch, movieid]);

  const {
    title,
    genres,
    poster_path,
    overview,
    release_date,
    runtime,
    vote_average,
    spoken_languages,
    production_companies,
  } = movie;
  const genre = genres?.map((genre) => genre.name);
  const language = spoken_languages?.map((language) => language.name);
  const production = production_companies?.map((production) => production.name);

  return (
    <div
      className="movie-section"
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        padding: "40px 0px",
        color: "white",
        fontWeight: 400,
      }}
    >
      {" "}
      {Object.keys(movie).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <>
          <div className="section-left" style={{ margin: "10px" }}>
            <div className="movie-title" style={{ fontSize: "40px" }}>
              {title}
            </div>
            <div
              className="movie-rating"
              style={{ paddingLeft: 3, marginTop: "20px", display: "flex" }}
            >
              <span style={{ marginRight: "20px" }}>
                Votes: {vote_average}/10
              </span>
              <span style={{ marginRight: "20px" }}>
                Runtime: {runtime} mins
              </span>
              <span style={{ marginRight: "20px" }}>
                Release Date: {release_date}
              </span>
            </div>
            <div
              className="movie-plot"
              style={{ marginTop: "20px", lineHeight: "1.8rem" }}
            >
              {overview}
            </div>
            <div className="movie-info" style={{ marginTop: "10px" }}>
              <div>
                <span
                  style={{
                    padding: "10px 0px",
                    fontWeight: 600,
                    width: "100px",
                    // display: "inline-block",
                    marginTop: "10px",
                  }}
                >
                  Genres: {genre?.join(", ")}
                </span>
              </div>
              <div>
                <span
                  style={{
                    padding: "10px 0px",
                    fontWeight: 600,
                    width: "100px",
                    // display: "inline-block",
                    marginTop: "10px",
                  }}
                >
                  Languages: {language?.join(", ")}
                </span>
              </div>
              <div>
                <span
                  style={{
                    padding: "10px 0px",
                    fontWeight: 600,
                    width: "100px",
                    // display: "inline-block",
                    marginTop: "10px",
                  }}
                >
                  Productions: {production?.join(", ") || "N/A"}
                </span>
              </div>
            </div>
            <div>
              <button>Back To Home</button>
            </div>
          </div>
          <div className="section-right" style={{ marginRight: "30px" }}>
            <img
              src={`${process.env.REACT_APP_POSTER_API}/${poster_path}`}
              style={{ width: 300, height: 400 }}
              alt={title}
            ></img>
          </div>
        </>
      )}
    </div>
    // <div style={{ color: "white" }}>
    //   <h1>{title}</h1>
    //   <img
    //     src={`${process.env.REACT_APP_POSTER_API}/${poster_path}`}
    //     style={{ width: 300, height: 400 }}
    //     alt={title}
    //   ></img>
    //   <h4>Overview: {overview}</h4>
    //   <p>
    //     <span style={{ fontWeight: 700 }}>Genre: </span> {genre?.join(", ")}
    //   </p>
    //   <p>
    //     <span style={{ fontWeight: 700 }}>Languages: </span>{" "}
    //     {language?.join(", ")}
    //   </p>
    //   <p>
    //     <span style={{ fontWeight: 700 }}>Productions: </span>{" "}
    //     {production?.join(", ") || "N/A"}
    //   </p>
    //   <p>
    //     <span style={{ fontWeight: 700 }}>Release Date: </span> {release_date}
    //   </p>
    //   <p>
    //     <span style={{ fontWeight: 700 }}>Runtime: </span> {runtime} minutes
    //   </p>
    //   <p>
    //     <span style={{ fontWeight: 700 }}>Votes: </span> {vote_average}/10
    //   </p>
    // </div>
    // <div>{data.title}</div>
  );
}

export default MoviePage;

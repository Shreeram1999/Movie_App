import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'



function MoviePage() {

    const {movieid} = useParams();
    console.log(movieid, "id");


    const [movie, setMovie] = useState([])
    const getdata = () =>{
        // console.log(item.id)
        fetch(`${process.env.REACT_APP_MOVIE_API}/${movieid}?api_key=${process.env.REACT_APP_API_KEY}`)
        .then((res) => res.json())
        .then(data => {
            console.log(data)
            setMovie(data)
        })
    }

    useEffect(() => {
        getdata();
    },[]);

    const {title, genres, poster_path, overview, release_date, runtime, vote_average,spoken_languages, production_companies} = movie
    const genre =  genres?.map((genre)=>genre.name)
    const language =  spoken_languages?.map((language)=>language.name)
    const production =  production_companies?.map((production)=>production.name)

  return (
    <div style={{color: 'white'}}>
      <h1>{title}</h1>
        <img src={`${process.env.REACT_APP_POSTER_API}/${poster_path}`} style={{width: 300, height: 400}} alt={title}></img>
        <h4>Overview: {overview}</h4>
        <p><span style={{fontWeight:700}}>Genre: </span> {genre?.join(', ')}</p>
        <p><span style={{fontWeight:700}}>Languages: </span> {language?.join(', ')}</p>
        <p><span style={{fontWeight:700}}>Productions: </span> {production?.join(', ') || 'N/A'}</p>
        <p><span style={{fontWeight:700}}>Release Date: </span> {release_date}</p>
        <p><span style={{fontWeight:700}}>Runtime: </span> {runtime} minutes</p>
        <p><span style={{fontWeight:700}}>Votes: </span> {vote_average}/10</p>
      </div>
  )
}

export default MoviePage
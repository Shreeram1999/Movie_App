import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAsyncMovieDetail,
  getSelectedMovie,
  removeSelectedMovie,
  addToFavorites,
  favMovie,
  removeFromFavorites,
} from '../features/movies/movieSlice';
import { Container } from '@mui/material';
// import ToggleButton from '../components/toggleButton';
import {} from '../features/favorites/favoriteSlice';

function MoviePage() {
  const { movieid } = useParams();
  console.log(movieid, 'id');
  const dispatch = useDispatch();
  const movie = useSelector(getSelectedMovie);

  // const changeFavoriteHandler = (movie) => {};

  // const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    // Add functionality
    // You can perform the "add" action here
    dispatch(addToFavorites(movie));
    console.log('Item added');
    // setIsAdded(true);
  };

  const handleRemove = () => {
    // Remove functionality
    // You can perform the "remove" action here
    dispatch(removeFromFavorites(movie));
    console.log('Item removed');
    // setIsAdded(false);
  };

  // const changeFavoriteHandler = () => {
  //   if (isAdded) {
  //     handleRemove();
  //   } else {
  //     handleAdd();
  //   }
  // };

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

  const favMovies = useSelector(favMovie);
  console.log(favMovies, 'select movie');

  // let movieAlreadyExist = state.favorites?.findIndex(
  //   (movie) => movie.id === action.payload?.id,
  // );

  const checkMovieInFavorites = favMovies?.some(
    (favmovie) => favmovie.id === movie.id,
  );

  console.log(checkMovieInFavorites, 'check');

  return (
    <Container>
      <div
        className="movie-section"
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '40px 0px',
          color: 'white',
          fontWeight: 400,
        }}
      >
        {Object.keys(movie).length === 0 ? (
          <div>...Loading</div>
        ) : (
          <>
            <div className="section-left" style={{ margin: '10px' }}>
              <div className="movie-title" style={{ fontSize: '40px' }}>
                {title}
              </div>
              <div
                className="movie-rating"
                style={{ paddingLeft: 3, marginTop: '20px', display: 'flex' }}
              >
                <span style={{ marginRight: '20px' }}>
                  Votes: {vote_average}/10
                </span>
                <span style={{ marginRight: '20px' }}>
                  Runtime: {runtime} mins
                </span>
                <span style={{ marginRight: '20px' }}>
                  Release Date: {release_date}
                </span>
              </div>
              <div
                className="movie-plot"
                style={{ marginTop: '20px', lineHeight: '1.8rem' }}
              >
                {overview}
              </div>
              <div className="movie-info" style={{ marginTop: '20px' }}>
                <div>
                  <span
                    style={{
                      padding: '10px 0px',
                      fontWeight: 600,
                      width: '100px',
                      // display: "inline-block",
                      marginTop: '30px',
                    }}
                  >
                    Genres: {genre?.join(', ')}
                  </span>
                </div>
                <div>
                  <span
                    style={{
                      padding: '10px 0px',
                      fontWeight: 600,
                      width: '100px',
                      // display: "inline-block",
                      marginTop: '30px',
                    }}
                  >
                    Languages: {language?.join(', ')}
                  </span>
                </div>
                <div>
                  <span
                    style={{
                      padding: '10px 0px',
                      fontWeight: 600,
                      width: '100px',
                      // display: "inline-block",
                      marginTop: '30px',
                    }}
                  >
                    Productions: {production?.join(', ') || 'N/A'}
                  </span>
                </div>
              </div>
              <div>
                <Button variant="outlined">Back To Home</Button>
                <Button
                  onClick={!checkMovieInFavorites ? handleAdd : handleRemove}
                  variant="contained"
                  size="small"
                >
                  {' '}
                  {!checkMovieInFavorites
                    ? 'Add to Favorite'
                    : 'Remove from Favorite'}
                  {/* {isAdded ?  : } */}
                </Button>
              </div>
            </div>
            <div className="section-right" style={{ marginRight: '30px' }}>
              <img
                src={`${process.env.REACT_APP_POSTER_API}/${poster_path}`}
                style={{ width: 300, height: 400 }}
                alt={title}
              ></img>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}

export default MoviePage;

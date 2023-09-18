import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TheatersIcon from '@mui/icons-material/Theaters';
import TodayIcon from '@mui/icons-material/Today';
import GradeIcon from '@mui/icons-material/Grade';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderOutlined from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlined from '@mui/icons-material/BookmarkOutlined';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAsyncMovieDetail,
  getSelectedMovie,
  removeSelectedMovie,
  addToFavorites,
  favMovie,
  removeFromFavorites,
  watchMovie,
  addToWatchlist,
  removeFromWatchlist,
} from '../features/movies/movieSlice';
import { Container, Skeleton } from '@mui/material';

function MoviePage() {
  const { movieid } = useParams();
  // const [loading, setLoading] = useState(true);
  console.log(movieid, 'id');
  const dispatch = useDispatch();
  const movie = useSelector(getSelectedMovie);
  const navigate = useNavigate();

  const handleAddFavorite = () => {
    dispatch(addToFavorites(movie));
    console.log('Item added');
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFromFavorites(movie));
    console.log('Item removed');
  };

  const handleAddWatchlist = () => {
    dispatch(addToWatchlist(movie));
    console.log('Item added');
  };

  const handleRemoveWatchlist = () => {
    dispatch(removeFromWatchlist(movie));
    console.log('Item removed');
  };

  useEffect(() => {
    dispatch(fetchAsyncMovieDetail(movieid));
    return () => {
      dispatch(removeSelectedMovie());
      // setLoading(false);
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
    credits,
  } = movie;
  const genre = genres?.map((genre) => genre.name);
  const language = spoken_languages?.map((language) => language.name);
  const production = production_companies?.map((production) => production.name);
  const directors = credits?.crew
    .filter((item) => item.job === 'Director')
    .map((item) => item.name);
  const casts = credits?.cast
    .filter((item) => item.known_for_department === 'Acting')
    .slice(0, 10)
    .map((item) => item.name);

  const favMovies = useSelector(favMovie);
  const watchMovies = useSelector(watchMovie);
  console.log(movie, 'select movie');
  console.log(casts, 'select cast');

  const checkMovieInFavorites = favMovies?.some(
    (favmovie) => favmovie.id === movie.id,
  );

  const checkMovieInWatchlist = watchMovies?.some(
    (watchMovie) => watchMovie.id === movie.id,
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
          <div>
            <div className="section-left" style={{ margin: '10px' }}>
              <Skeleton
                variant="text"
                width={300}
                height={40}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width={200}
                height={24}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width={200}
                height={24}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width={300}
                height={140}
                animation="wave"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="section-left" style={{ margin: '10px' }}>
              <div className="movie-title" style={{ fontSize: '40px' }}>
                {title}
              </div>
              <div
                className="movie-rating"
                style={{
                  paddingLeft: 3,
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '20px',
                  }}
                >
                  <GradeIcon sx={{ marginRight: 1 }} />{' '}
                  {vote_average.toFixed(1)}
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '20px',
                  }}
                >
                  <TheatersIcon sx={{ marginRight: 1 }} />
                  {runtime} mins
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '20px',
                  }}
                >
                  <TodayIcon sx={{ marginRight: 1 }} /> {release_date}
                </span>
              </div>
              <div
                className="movie-plot"
                style={{ marginTop: '20px', lineHeight: '1.8rem' }}
              >
                {overview}
              </div>
              <div className="movie-info" style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '25px' }}>
                  <span
                    style={{
                      padding: '10px 0px',
                      fontWeight: 700,
                      lineHeight: '1.8rem',
                      width: '100px',
                      // display: "inline-block",
                      marginTop: '30px',
                    }}
                  >
                    Genres:{' '}
                    <span style={{ fontWeight: 400 }}>{genre?.join(', ')}</span>
                  </span>
                </div>
                <div style={{ marginBottom: '25px' }}>
                  <span
                    style={{
                      padding: '10px 0px',
                      fontWeight: 700,
                      lineHeight: '1.8rem',
                      width: '100px',
                      // display: "inline-block",
                      marginTop: '30px',
                    }}
                  >
                    Languages:{' '}
                    <span style={{ fontWeight: 400 }}>
                      {language?.join(', ')}
                    </span>
                  </span>
                </div>
                <div style={{ marginBottom: '25px' }}>
                  <span
                    style={{
                      padding: '10px 0px',
                      fontWeight: 700,
                      lineHeight: '1.8rem',
                      width: '100px',
                      // display: "inline-block",
                      marginTop: '30px',
                    }}
                  >
                    Cast:{' '}
                    <span style={{ fontWeight: 400 }}>{casts?.join(', ')}</span>
                  </span>
                </div>
                <div style={{ marginBottom: '25px' }}>
                  <span
                    style={{
                      padding: '10px 0px',
                      fontWeight: 700,
                      lineHeight: '1.8rem',
                      width: '100px',
                      // display: "inline-block",
                      marginTop: '30px',
                    }}
                  >
                    Directors:{' '}
                    <span style={{ fontWeight: 400 }}>
                      {directors?.join(', ')}
                    </span>
                  </span>
                </div>
                <div style={{ marginBottom: '25px' }}>
                  <span
                    style={{
                      padding: '10px 0px',
                      fontWeight: 700,
                      lineHeight: '1.8rem',
                      width: '100px',
                      // display: "inline-block",
                      marginTop: '30px',
                    }}
                  >
                    Productions:{' '}
                    <span style={{ fontWeight: 400 }}>
                      {production?.join(', ') || 'N/A'}
                    </span>
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  onClick={
                    !checkMovieInFavorites
                      ? handleAddFavorite
                      : handleRemoveFavorite
                  }
                  variant="contained"
                  size="small"
                  sx={{
                    margin: 2,
                    background: '#333333',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#4D4545',
                    },
                  }}
                >
                  {!checkMovieInFavorites ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <FavoriteBorderIcon
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          marginRight: 1,
                          color: 'red',
                        }}
                      />
                      Add to Favorites
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <FavoriteIcon
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          marginRight: 1,
                          color: 'red',
                        }}
                      />
                      Remove from Favorites
                    </div>
                  )}
                </Button>
                <Button
                  onClick={
                    !checkMovieInWatchlist
                      ? handleAddWatchlist
                      : handleRemoveWatchlist
                  }
                  variant="contained"
                  size="small"
                  sx={{
                    margin: 2,
                    background: '#333333',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#4D4545',
                    },
                  }}
                >
                  {!checkMovieInWatchlist ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <BookmarkBorderOutlined
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          marginRight: 1,
                          color: 'red',
                        }}
                      />
                      Add to Watchlist
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <BookmarkOutlined
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          marginRight: 1,
                          color: 'red',
                        }}
                      />
                      Remove from Watchlist
                    </div>
                  )}
                </Button>
                <Button
                  variant="filled"
                  size="small"
                  sx={{
                    margin: 2,
                    background: '#333333',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#4D4545',
                    },
                  }}
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  Back To Home
                </Button>
              </div>
            </div>
            <div className="section-right" style={{ marginRight: '30px' }}>
              <img
                src={`${process.env.REACT_APP_POSTER_API}/${poster_path}`}
                style={{ width: 350, height: 500 }}
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

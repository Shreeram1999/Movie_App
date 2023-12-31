import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Drawer, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import BookmarkBorderOutlined from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlined from '@mui/icons-material/BookmarkOutlined';
import { useDispatch, useSelector } from 'react-redux';
import no_image from '../images/no_image.jpg';
import {
  addToFavorites,
  addToWatchlist,
  favMovie,
  removeFromFavorites,
  removeFromWatchlist,
  watchMovie,
} from '../features/movies/movieSlice';
import MuiAlert from '@mui/material/Alert';

const Alert = React?.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MovieBox = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openFav, setOpenFav] = useState(false);
  const [openWatch, setOpenWatch] = useState(false);

  const dispatch = useDispatch();

  const posterSrc =
    movie.poster_path !== null
      ? `${process.env.REACT_APP_POSTER_API}${movie.poster_path}`
      : no_image;

  const handleAddFavorite = () => {
    dispatch(addToFavorites(movie));
    setOpenFav(true);
    console.log('Item added');
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFromFavorites(movie));
    setOpenFav(true);
    console.log('Item removed');
  };

  const handleAddWatchlist = () => {
    dispatch(addToWatchlist(movie));
    setOpenWatch(true);
    console.log('Item added');
  };

  const handleRemoveWatchlist = () => {
    dispatch(removeFromWatchlist(movie));
    setOpenWatch(true);
    console.log('Item removed');
  };

  const handleCloseFav = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFav(false);
  };
  const handleCloseWatch = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenWatch(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // const handleClick = () => {
  //   console.log(movie, 'movie-id');
  // };

  const favMovies = useSelector(favMovie);
  const watchMovies = useSelector(watchMovie);
  // const [state, setState] = React.useState(false);
  const checkMovieInFavorites = favMovies?.some(
    (favmovie) => favmovie.id === movie.id,
  );
  const checkMovieInWatchlist = watchMovies?.some(
    (watchMovie) => watchMovie.id === movie.id,
  );

  return (
    <>
      <Card
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        elevation={3}
        sx={{
          position: 'relative',
          maxWidth: 285,
          background: 'black',
        }}
      >
        <Drawer></Drawer>
        <Link style={{ textDecoration: 'none' }} to={`/moviepage/${movie.id}`}>
          <CardMedia
            component="img"
            height="400"
            src={posterSrc}
            alt={movie.title}
            style={{
              filter: isHovered ? 'brightness(35%)' : 'brightness(100%)',
              margin: 10,
              borderRadius: 10,
              width: 265,
              transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
              transition:
                'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
            }}
          />
          {isHovered && (
            <>
              <CardContent
                sx={{
                  position: 'absolute',
                  bottom: 200,
                  left: 0,
                  right: 0,
                  color: 'white',
                  padding: '8px',
                  transition:
                    'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                }}
              >
                <Typography align="center" variant="h5">
                  {movie.title}
                </Typography>
                <Typography
                  align="center"
                  style={{ display: 'flex', justifyContent: 'center' }}
                  marginTop="21px"
                  variant="body1"
                >
                  <ThumbUpRoundedIcon
                    sx={{ marginRight: '3px', fontSize: '22px' }}
                  />
                  {movie.vote_average}
                </Typography>
                <Typography
                  align="center"
                  variant="h6"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '10px',
                    padding: '10px',
                  }}
                >
                  {movie.genre_names?.join(', ')}
                </Typography>
              </CardContent>
            </>
          )}
        </Link>
        <Button
          variant="filled"
          sx={{ color: 'red' }}
          size="small"
          onClick={
            !checkMovieInFavorites ? handleAddFavorite : handleRemoveFavorite
          }
        >
          {!checkMovieInFavorites ? (
            <FavoriteBorderIcon size="small" />
          ) : (
            <FavoriteIcon size="small" />
          )}
        </Button>
        <Snackbar
          open={openFav}
          autoHideDuration={3000}
          onClose={handleCloseFav}
        >
          {checkMovieInFavorites ? (
            <Alert
              onClose={handleCloseFav}
              severity="info"
              sx={{ width: '100%' }}
            >
              Movie added to Favorites
            </Alert>
          ) : (
            <Alert
              onClose={handleCloseFav}
              severity="info"
              sx={{ width: '100%' }}
            >
              Movie removed from Favorites
            </Alert>
          )}
        </Snackbar>

        <Button
          variant="filled"
          sx={{ color: 'red' }}
          size="small"
          onClick={
            !checkMovieInWatchlist ? handleAddWatchlist : handleRemoveWatchlist
          }
        >
          {!checkMovieInWatchlist ? (
            <BookmarkBorderOutlined size="small" />
          ) : (
            <BookmarkOutlined size="small" />
          )}
        </Button>
        <Snackbar
          open={openWatch}
          autoHideDuration={3000}
          onClose={handleCloseWatch}
        >
          {checkMovieInWatchlist ? (
            <Alert
              onClose={handleCloseWatch}
              severity="info"
              sx={{ width: '100%' }}
            >
              Movie added to Watchlist
            </Alert>
          ) : (
            <Alert
              onClose={handleCloseWatch}
              severity="info"
              sx={{ width: '100%' }}
            >
              Movie removed from Watchlist
            </Alert>
          )}
        </Snackbar>
      </Card>
    </>
  );
};

export default MovieBox;

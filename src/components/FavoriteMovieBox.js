import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  //   Button,
  // CardActions,
  Snackbar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Drawer, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderOutlined from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlined from '@mui/icons-material/BookmarkOutlined';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import {
  addToFavorites,
  addToWatchlist,
  favMovie,
  removeFromFavorites,
  removeFromWatchlist,
  watchMovie,
} from '../features/movies/movieSlice';
import no_image from '../images/no_image.jpg';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function FavoriteMovieBox({ fav }) {
  // const { id, poster_path, title, release_date } = fav;
  const [isHovered, setIsHovered] = useState(false);
  const [openFav, setOpenFav] = useState(false);
  const [openWatch, setOpenWatch] = useState(false);

  const dispatch = useDispatch();

  const posterSrc =
    fav.poster_path !== null
      ? `${process.env.REACT_APP_POSTER_API}${fav.poster_path}`
      : no_image;

  const handleAddFavorite = () => {
    dispatch(addToFavorites(fav));
    console.log('Item added');
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFromFavorites(fav));
    console.log('Item removed');
  };

  const handleAddWatchlist = () => {
    dispatch(addToWatchlist(fav));
    console.log('Item added');
  };

  const handleRemoveWatchlist = () => {
    dispatch(removeFromWatchlist(fav));
    console.log('Item removed');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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

  const favMovies = useSelector(favMovie);
  const watchMovies = useSelector(watchMovie);
  const checkMovieInFavorites = favMovies?.some(
    (favmovie) => favmovie.id === fav.id,
  );
  const checkMovieInWatchlist = watchMovies?.some(
    (watchmovie) => watchmovie.id === fav.id,
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
        <Link style={{ textDecoration: 'none' }} to={`/moviepage/${fav.id}`}>
          <CardMedia
            component="img"
            height="400"
            src={posterSrc}
            alt={fav.title}
            style={{
              filter: isHovered ? 'brightness(35%)' : 'brightness(100%)',
              margin: 10,
              borderRadius: 10,
              width: 275,
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
                  bottom: 250,
                  left: 0,
                  right: 0,
                  // backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '8px',
                }}
              >
                <Typography align="center" variant="h5">
                  {fav.title}
                </Typography>
                <Typography
                  align="center"
                  style={{ display: 'flex', justifyContent: 'center' }}
                  marginTop="21px"
                  variant="body1"
                >
                  <ThumbUpRoundedIcon
                    sx={{ marginRight: '3px', fontSize: '22px' }}
                  />{' '}
                  {fav.vote_average}
                </Typography>
              </CardContent>
            </>
          )}
        </Link>
        <Button
          variant="filled"
          sx={{ color: 'red' }}
          onClick={
            !checkMovieInFavorites ? handleAddFavorite : handleRemoveFavorite
          }
        >
          {!checkMovieInFavorites ? <FavoriteBorderIcon /> : <FavoriteIcon />}
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
          onClick={
            !checkMovieInWatchlist ? handleAddWatchlist : handleRemoveWatchlist
          }
        >
          {!checkMovieInWatchlist ? (
            <BookmarkBorderOutlined />
          ) : (
            <BookmarkOutlined />
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
}

export default FavoriteMovieBox;

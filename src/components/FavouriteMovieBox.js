import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  //   Button,
  CardActions,
} from '@mui/material';
import { Link } from 'react-router-dom';

function FavouriteMovieBox({ fav }) {
  const { id, poster_path, title, release_date } = fav;

  return (
    <div>
      {console.log(fav, 'fav-box')}
      <Card
        style={{
          width: 250,
          marginTop: 15,
          background: 'black',
          borderRadius: 10,
          height: 500,
        }}
      >
        <Link style={{ textDecoration: 'none' }} to={`/moviepage/${id}`}>
          <CardActionArea>
            <CardMedia
              sx={{ width: 250, height: 350, borderRadius: 3 }}
              component="img"
              image={`${process.env.REACT_APP_POSTER_API}${poster_path}`}
              alt="movie poster"
            />
            <CardContent style={{ color: 'white' }}>
              <Typography
                align="center"
                gutterBottom
                variant="h6"
                component="div"
              >
                {title}
              </Typography>
              <Typography align="center" variant="body2">
                {release_date}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          {/* <Button
            onClick={() => addToFavoriteHandler(fav)}
            variant="contained"
            size="small"
            color="primary"
          >
            <FavoriteIcon /> Add to Favorite
          </Button> */}
        </CardActions>
      </Card>
    </div>
  );
}

export default FavouriteMovieBox;

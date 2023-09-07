import React from 'react';
import { useSelector } from 'react-redux'; // useDispatch,
import FavouriteMovieBox from '../components/FavouriteMovieBox';
import { Container, Grid } from '@mui/material';
import { favMovie } from '../features/movies/movieSlice';

const Favourite = (item) => {
  const favorites = useSelector(favMovie);

  // const dispatch = useDispatch();

  return (
    <Container>
      <Grid
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >
        {console.log(favorites, 'fav')}
        {favorites?.map((favorite) => (
          <Grid key={favorite.id}>
            <FavouriteMovieBox fav={favorite} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favourite;

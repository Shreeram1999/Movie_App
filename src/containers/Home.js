import React, { useEffect } from 'react';
import MovieBox from '../components/MovieBox';
import { Grid, Container, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAsyncMovies, getAllMovies } from '../features/movies/movieSlice';

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector(getAllMovies);

  useEffect(() => {
    dispatch(fetchAsyncMovies());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Typography
          variant="h3"
          sx={{ color: 'white', fontWeight: 700, justifyItems: 'center' }}
        >
          Discover Movies
        </Typography>
        <Grid
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            // marginTop: 10,
            // marginLeft: 35,
            // marginRight: 5,
          }}
        >
          {console.log(movies, 'movies')}
          {movies.map((movieReq) => (
            <Grid key={movieReq.id}>
              <MovieBox {...movieReq} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;

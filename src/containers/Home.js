import React, { useEffect, useState } from 'react';
import { Grid, Container, Pagination, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import MovieBox from '../components/MovieBox';
import { fetchAsyncMovies, getAllMovies } from '../features/movies/movieSlice';
// import ButtonAppBar from '../components/Drawer1';
// import HoverableCard from '../components/new';

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector(getAllMovies);

  // console.log(movies, 'remove');
  const [pages, setPages] = useState(1);
  // const [searchPages, setSearchPages] = useState(1);

  const handlePage = (page) => {
    setPages(page);
    window.scroll(0, 0);
    console.log(page);
  };
  // const handleSearchPage = (page) => {
  //   setSearchPages(page);
  //   window.scroll(0, 0);
  //   console.log(page);
  // };

  useEffect(() => {
    dispatch(fetchAsyncMovies(pages));
  }, [dispatch, pages]);

  // useEffect(() => {
  //   dispatch(fetchAsyncMovies(searchPages));
  // }, [dispatch, pages]);
  return (
    <>
      <Container>
        <Grid
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            // marginTop: 8,
            // marginLeft: 35,
            // marginRight: 5,
          }}
        >
          {/* {console.log(movies, 'movies')} */}
          {movies.results?.map((movieReq) => (
            <Grid key={movieReq.id}>
              <MovieBox movie={movieReq} />
              {/* <HoverableCard movie={movieReq} /> */}
            </Grid>
          ))}
        </Grid>
        <Stack spacing={2}>
          <Pagination
            sx={{
              background: 'transparent',
              // marginTop: 100,
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'right',
              height: '50px',
              '& .MuiPaginationItem-root': {
                color: '#19D5C6', // Color for the buttons
              },
              '& .MuiPaginationItem-root:hover': {
                backgroundColor: 'your-hover-color', // Color when hovering over the buttons
              },
            }}
            onChange={(e) => handlePage(e.target.textContent)}
            count={movies.total_pages}
            // variant="outlined"
            color="primary"
          />
        </Stack>
      </Container>
    </>
  );
};

export default Home;

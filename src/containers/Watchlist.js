import React, { useState } from 'react';
import {
  Container,
  Grid,
  Box,
  Stack,
  Pagination,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router';
import WatchlistMovieBox from '../components/WatchlistMovieBox';
import { useSelector } from 'react-redux'; // useDispatch,
import { watchMovie } from '../features/movies/movieSlice';
import noWatchlist from '../images/no_watchlist.png';

const Watchlist = () => {
  const watchlist = useSelector(watchMovie);
  const navigate = useNavigate();

  const itemsPerPage = 8;

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data based on the current page
  const paginatedData = watchlist.slice(startIndex, endIndex);

  console.log(paginatedData, 'pagination');

  // const dispatch = useDispatch();

  return Object.keys(watchlist).length === 0 ? (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography
        variant="h3"
        sx={{
          color: 'white',
          fontWeight: 700,
          textAlign: 'center', // Use 'textAlign' to center text horizontally
        }}
      >
        Watchlist
      </Typography>
      <img
        src={noWatchlist}
        alt="no favourite"
        style={{
          height: '500px', // Add 'px' to specify the unit for height and width
          width: '500px', // Add 'px' to specify the unit for height and width
          marginTop: '20px', // Add spacing above the image
        }}
      />
      <Typography
        variant="h4"
        sx={{
          color: 'white',
          fontWeight: 600,
          textAlign: 'center', // Use 'textAlign' to center text horizontally
        }}
      >
        Please add movies
      </Typography>
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
  ) : (
    <Box sx={{ display: 'flex', bgcolor: 'black' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
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
            {console.log(watchlist, 'watch')}
            {paginatedData?.map((watchlist) => (
              <Grid key={watchlist.id}>
                {console.log(Math.ceil(paginatedData.length / itemsPerPage))}
                <WatchlistMovieBox watch={watchlist} />
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2}>
            <Pagination
              sx={{ background: '#0A67D2' }}
              count={Math.ceil(watchlist.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="secondary"
              contrastText="white"
            />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Watchlist;

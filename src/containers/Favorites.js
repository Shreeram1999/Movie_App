import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // useDispatch,
import { useNavigate } from 'react-router';
import FavoriteMovieBox from '../components/FavoriteMovieBox';
import {
  Container,
  Grid,
  Box,
  Stack,
  Pagination,
  Typography,
  Button,
} from '@mui/material';
import { favMovie } from '../features/movies/movieSlice';
import noFavourites from '../images/no_favourites.png';

const Favorite = () => {
  const favorites = useSelector(favMovie);
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
  const paginatedData = favorites.slice(startIndex, endIndex);

  console.log(paginatedData, 'pagination');

  // const dispatch = useDispatch();

  return Object.keys(favorites).length === 0 ? (
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
        Favourites
      </Typography>
      <img
        src={noFavourites}
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
            {console.log(favorites, 'fav')}
            {paginatedData?.map((favorite) => (
              <Grid key={favorite.id}>
                {console.log(Math.ceil(paginatedData.length / itemsPerPage))}
                <FavoriteMovieBox fav={favorite} />
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2}>
            <Pagination
              sx={{
                background: 'transparent',
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'right',
                height: '40px',
                '& .MuiPaginationItem-root': {
                  color: '#19D5C6', // Color for the buttons
                },
                '& .MuiPaginationItem-root:hover': {
                  backgroundColor: 'your-hover-color', // Color when hovering over the buttons
                },
              }}
              count={Math.ceil(favorites.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Favorite;

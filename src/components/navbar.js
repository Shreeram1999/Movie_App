import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
// import { makeStyles } from '@mui/styled-engine';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
// import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux'; // , useSelector
import {
  fetchAsyncMovieSearch,
  fetchAsyncMovies,
} from '../features/movies/movieSlice';
import MuiAppBar from '@mui/material/AppBar';
import { useTheme } from '@emotion/react';
// import theme from './theme';
const pages = ['favorites', 'watchlist', 'about'];

// const useStyles = makeStyles((theme) => ({}));

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [text, setText] = React.useState('');
  // const dopen = useSelector((state) => state.navigation.doOpen);
  // const classes = useStyles();
  const dispatch = useDispatch();

  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    background: '#050f08',
  }));

  // const handleUpdateOpen = (newDopen) => {
  //   dispatch(updateOpen(newDopen));
  // };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm !== '') {
      dispatch(fetchAsyncMovieSearch(searchTerm));
    } else {
    }

    console.log('Searching for:', searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearClick = () => {
    setSearchTerm('');
    dispatch(fetchAsyncMovies());
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (searchTerm !== '') {
        dispatch(fetchAsyncMovieSearch(searchTerm));
      }
    }
  };
  // const height = 35;
  // const labelOffset = -6;
  // // const focused = 'final-form';

  //theme customization
  const theme = useTheme();
  console.log(theme, 'theme');
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ top: '0' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => handleUpdateOpen(!dopen)}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                // fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MovieAPP
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
                alignItems: 'center',
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography variant="body1" textAlign="center">
                      <Link
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        to={`/${page}`}
                      >
                        {page}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MovieAPP
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  variant="contained"
                  size="small"
                  sx={{
                    margin: 2,
                    background: 'transparent',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#4D4545',
                    },
                  }}
                >
                  <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to={`/${page}`}
                  >
                    {page}
                  </Link>
                </Button>
              ))}
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // Center content horizontally
              }}
            >
              {location.pathname === '/' && (
                <>
                  <TextField
                    size="small"
                    placeholder="Search Movies"
                    variant="outlined"
                    sx={{
                      background: 'white',
                      borderRadius: '5px',
                      width: { xs: '300px', md: '750px' },
                      fontSize: '10px',
                      // height: '30px',
                    }}
                    value={searchTerm}
                    onChange={(e) => handleInputChange(e)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    InputProps={{
                      style: {
                        // height,
                        // padding: '0 14px',
                      },
                      endAdornment: searchTerm && (
                        <IconButton
                          aria-label="clear"
                          onClick={handleClearClick}
                          edge="end"
                        >
                          <ClearIcon />
                        </IconButton>
                      ),
                    }}
                  />
                  {/* <TextField
                    id="outlined-basic"
                    label="Outlined"
                    value={text}
                    sx={{
                      background: 'white',
                      borderRadius: '5px',
                      width: { xs: '300px', md: '750px' },
                      fontSize: '10px',
                      // height: '30px',
                    }}
                    variant="outlined"
                    onChange={(e) => setText(e.target.value)}
                  /> */}
                  {/* <CustomTypography /> */}
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      margin: 2,
                      background: 'transparent',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#4D4545',
                      },
                    }}
                  >
                    Search
                  </Button>
                </>
              )}
              {location.pathname === '/favorites' && (
                <>
                  <TextField
                    size="small"
                    placeholder="Search Favorites"
                    variant="outlined"
                    sx={{
                      background: 'white',
                      borderRadius: '5px',
                      width: { xs: '300px', md: '750px' },
                      fontSize: '10px',
                      // height: '30px',
                    }}
                    value={searchTerm}
                    onChange={(e) => handleInputChange(e)}
                    autoFocus
                    InputProps={{
                      style: {
                        // height,
                        // padding: '0 14px',
                      },
                      endAdornment: searchTerm && (
                        <IconButton
                          aria-label="clear"
                          onClick={handleClearClick}
                          edge="end"
                        >
                          <ClearIcon />
                        </IconButton>
                      ),
                    }}
                  />
                  {/* <TextField
                    id="outlined-basic"
                    label="Outlined"
                    value={text}
                    sx={{
                      background: 'white',
                      borderRadius: '5px',
                      width: { xs: '300px', md: '750px' },
                      fontSize: '10px',
                      // height: '30px',
                    }}
                    variant="outlined"
                    onChange={(e) => setText(e.target.value)}
                  /> */}
                  {/* <CustomTypography /> */}
                  <Button
                    variant="outlined"
                    sx={{ marginLeft: 2 }}
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </>
              )}
              {location.pathname === '/watchlist' && (
                <>
                  <TextField
                    size="small"
                    placeholder="Search Watchlist"
                    variant="outlined"
                    sx={{
                      background: 'white',
                      borderRadius: '5px',
                      width: { xs: '300px', md: '750px' },
                      fontSize: '10px',
                      // height: '30px',
                    }}
                    value={searchTerm}
                    onChange={(e) => handleInputChange(e)}
                    autoFocus
                    InputProps={{
                      style: {
                        // height,
                        // padding: '0 14px',
                      },
                      endAdornment: searchTerm && (
                        <IconButton
                          aria-label="clear"
                          onClick={handleClearClick}
                          edge="end"
                        >
                          <ClearIcon />
                        </IconButton>
                      ),
                    }}
                  />
                  {/* <TextField
                    id="outlined-basic"
                    label="Outlined"
                    value={text}
                    sx={{
                      background: 'white',
                      borderRadius: '5px',
                      width: { xs: '300px', md: '750px' },
                      fontSize: '10px',
                      // height: '30px',
                    }}
                    variant="outlined"
                    onChange={(e) => setText(e.target.value)}
                  /> */}
                  {/* <CustomTypography /> */}
                  <Button
                    variant="outlined"
                    sx={{ marginLeft: 2 }}
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* <TextField
        id="outlined-basic"
        label="Outlined"
        value={text}
        variant="outlined"
        sx={{
          background: 'white',
          borderRadius: '5px',
          width: { xs: '300px', md: '750px' },
          fontSize: '10px',
          // height: '30px',
        }}
        onChange={(e) => setText(e.target.value)}
      /> */}
    </Box>
  );
}

export default NavBar;

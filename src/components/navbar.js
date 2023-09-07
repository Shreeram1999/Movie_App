import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import { styled, alpha } from '@mui/material/styles';
// import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
// import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAsyncMovieSearch } from '../features/movies/movieSlice';

const pages = ['Favourites', 'About'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const dispatch = useDispatch();

  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [searchTerm, setSearchTerm] = useState('');
  // const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (searchTerm !== '') {
      dispatch(fetchAsyncMovieSearch(searchTerm));
    }

    console.log('Searching for:', searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <AppBar style={{ backgroundColor: 'black' }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
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
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
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
          {location.pathname === '/' && (
            <>
              <TextField
                size="small"
                label="Search Movies"
                variant="filled"
                sx={{
                  background: 'white',
                  borderRadius: '5px',
                  width: { xs: '300px', md: '750px' },
                }}
                value={searchTerm}
                onChange={handleInputChange}
              />
              <Button
                variant="outlined"
                sx={{ marginLeft: 2 }}
                onClick={handleSearch}
              >
                Search
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movies/movieSlice';
// import favoritesReducer from './favorites/favoriteSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    // favorites: favoritesReducer,
  },
});

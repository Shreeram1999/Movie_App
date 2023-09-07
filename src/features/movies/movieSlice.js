import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import process from 'process';

const initialState = {
  movies: [],
  selectedMovie: [],
  favorites: [],
};

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DISCOVER_API}?api_key=${process.env.REACT_APP_API_KEY}`,
      );
      return response.data.results;
    } catch (error) {
      throw new Error('Failed to fetch movies');
    }
  },
);

export const fetchAsyncMovieDetail = createAsyncThunk(
  'movies/fetchAsyncMovieDetail',
  async (movieid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MOVIE_API}/${movieid}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=credits`,
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch movies');
    }
  },
);

export const fetchAsyncMovieSearch = createAsyncThunk(
  'movies/fetchAsyncMovieSearch',
  async (term) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SEARCH_API}?api_key=${process.env.REACT_APP_API_KEY}&query=${term}`,
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch movies');
    }
  },
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    removeSelectedMovie: (state) => {
      state.selectedMovie = [];
    },
    addToFavorites: (state, action) => {
      let movieAlreadyExist = state.favorites?.findIndex(
        (movie) => movie.id === action.payload?.id,
      );

      if (movieAlreadyExist >= 0) {
        alert('the movie is already added to favorites');
      } else {
        const buildFavoriteItem = { ...action.payload };
        console.log(buildFavoriteItem, 'build');
        state.favorites?.push(buildFavoriteItem);
        console.log(state.favorites, 'state fav');
      }
    },
    removeFromFavorites: (state, action) => {
      let filteredItems = state.favorites?.filter(
        (movie) => movie?.id !== action.payload?.id,
      );
      state.favorites = filteredItems;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncMovies.pending, () => {
      console.log('Pending');
    });
    builder.addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
      console.log('fetched movies successfully');
      return { ...state, movies: payload };
    });
    builder.addCase(fetchAsyncMovies.rejected, () => {
      console.log('rejected');
    });
    builder.addCase(fetchAsyncMovieDetail.fulfilled, (state, { payload }) => {
      // console.log(payload, 'before movie-detail-pay');
      payload.isFavorite = false;
      // console.log(payload, 'after movie-detail-pay');
      console.log('fetched movie detail successfully');
      return { ...state, selectedMovie: payload };
    });
    builder.addCase(fetchAsyncMovieSearch.fulfilled, (state, { payload }) => {
      console.log('fetched searched movie successfully');
      return { ...state, movies: payload.results };
    });
  },
});

export const { removeSelectedMovie, addToFavorites, removeFromFavorites } =
  movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getSelectedMovie = (state) => state.movies.selectedMovie;
export const favMovie = (state) => state?.movies.favorites;

export default movieSlice.reducer;

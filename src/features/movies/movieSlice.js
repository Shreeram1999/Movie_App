import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import process from 'process';

const initialState = {
  // movies: [],
  movies: {},
  selectedMovie: [],
  favorites: [],
  watchlist: [],
};

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async (page) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DISCOVER_API}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`,
      );
      const genre = await axios.get(
        `${process.env.REACT_APP_GENRE_API}?api_key=${process.env.REACT_APP_API_KEY}`,
      );
      const genreData = genre.data.genres;
      const finalResult = { ...response.data, genreData };

      const genreIdToName = {};
      finalResult.genreData.forEach((genre) => {
        genreIdToName[genre.id] = genre.name;
      });

      finalResult.results.forEach((result) => {
        result.genre_names = result.genre_ids.map(
          (genreId) => genreIdToName[genreId],
        );
      });

      console.log(finalResult, 'page data');
      return finalResult; // .results
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

      const genre = await axios.get(
        `${process.env.REACT_APP_GENRE_API}?api_key=${process.env.REACT_APP_API_KEY}`,
      );
      const genreData = genre.data.genres;
      const finalResult = { ...response.data, genreData };

      const genreIdToName = {};
      finalResult.genreData.forEach((genre) => {
        genreIdToName[genre.id] = genre.name;
      });

      finalResult.results.forEach((result) => {
        result.genre_names = result.genre_ids.map(
          (genreId) => genreIdToName[genreId],
        );
      });

      console.log(finalResult, 'page data');
      return finalResult; // .results
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
    addToWatchlist: (state, action) => {
      let movieAlreadyExist = state.watchlist?.findIndex(
        (movie) => movie.id === action.payload?.id,
      );

      if (movieAlreadyExist >= 0) {
        alert('the movie is already added to watchlist');
      } else {
        const buildWatchlistItem = { ...action.payload };
        console.log(buildWatchlistItem, 'build');
        state.watchlist?.push(buildWatchlistItem);
        console.log(state.watchlist, 'state watch');
      }
    },
    removeFromWatchlist: (state, action) => {
      let filteredItems = state.watchlist?.filter(
        (movie) => movie?.id !== action.payload?.id,
      );
      state.watchlist = filteredItems;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncMovies.pending, () => {
      console.log('Pending');
    });
    builder.addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
      console.log('fetched movies successfully', payload);
      return { ...state, movies: payload };
    });
    builder.addCase(fetchAsyncMovies.rejected, () => {
      console.log('rejected');
    });
    builder.addCase(fetchAsyncMovieDetail.fulfilled, (state, { payload }) => {
      console.log('fetched movie detail successfully');
      return { ...state, selectedMovie: payload };
    });
    builder.addCase(fetchAsyncMovieSearch.fulfilled, (state, { payload }) => {
      console.log('fetched searched movie successfully');
      return { ...state, movies: payload };
    });
  },
});

export const {
  removeSelectedMovie,
  addToFavorites,
  removeFromFavorites,
  addToWatchlist,
  removeFromWatchlist,
} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getSelectedMovie = (state) => state.movies.selectedMovie;
export const favMovie = (state) => state?.movies.favorites;
export const watchMovie = (state) => state?.movies.watchlist;

export default movieSlice.reducer;

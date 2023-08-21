import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import process from "process";

const initialState = {
  movies: [],
  selectedMovie: [],
  searchedMovies: [],
};

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DISCOVER_API}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      return response.data.results;
    } catch (error) {
      throw new Error("Failed to fetch movies");
    }
  }
);

export const fetchAsyncMovieDetail = createAsyncThunk(
  "movies/fetchAsyncMovieDetail",
  async (movieid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MOVIE_API}/${movieid}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch movies");
    }
  }
);

export const fetchAsyncMovieSearch = createAsyncThunk(
  "movies/fetchAsyncMovieSearch",
  async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SEARCH_API}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch movies");
    }
  }
);
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovie: (state) => {
      state.selectedMovie = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncMovies.pending, () => {
      console.log("Pending");
    });
    builder.addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
      console.log("fetched successfully");
      return { ...state, movies: payload };
    });
    builder.addCase(fetchAsyncMovies.rejected, () => {
      console.log("rejected");
    });
    builder.addCase(fetchAsyncMovieDetail.fulfilled, (state, { payload }) => {
      console.log("fetched successfully");
      return { ...state, selectedMovie: payload };
    });
    builder.addCase(fetchAsyncMovieSearch.fulfilled, (state, { payload }) => {
      console.log("fetched successfully");
      return { ...state, searchedMovies: payload };
    });
  },
});

export const { removeSelectedMovie } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getSelectedMovie = (state) => state.movies.selectedMovie;
export default movieSlice.reducer;

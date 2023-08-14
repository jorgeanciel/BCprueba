import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { genericRequestThunk } from "./app.slice";

export const moviesSlice = createSlice({
  name: "movie",
  initialState: [],
  reducers: {
    setMovie: (_, action) => action.payload,
    addMovie: (state, { payload }) => {
      state.push(payload);
    },
    deleteMovie: (state, { payload }) =>
      state.filter((movie) => movie.id !== payload),
    updateMovie: (state, { payload: { id, movie } }) => {
      const index = state.findIndex((movie) => movie.id === id);
      console.log(movie);
      state[index] = movie;
    },
  },
});

export const getMoviesThunk = () => (dispatch) => {
  dispatch(
    genericRequestThunk(async () => {
      const res = await axios.get("/movies");
      dispatch(setMovie(res.data));
    })
  );
};

export const addMovieThunk = (movie) => (dispatch) => {
  return dispatch(
    genericRequestThunk(async () => {
      const { data } = await axios.post("/movies", movie);
      const { data: categorias } = await axios.post(
        `/movies/${data.id}/categorias`,
        movie.categorias
      );
      const { data: subcategorias } = await axios.post(
        `/movies/${data.id}/subcategorias`,
        movie.subcategorias
      );
      const { data: tipos } = await axios.post(
        `/movies/${data.id}/tipos`,
        movie.tipos
      );
      dispatch(addMovie({ ...data, categorias, subcategorias, tipos }));
    }, "Movie added successfully")
  );
};

export const deleteMovieThunk = (id) => (dispatch) => {
  dispatch(
    genericRequestThunk(async () => {
      await axios.delete(`/movies/${id}`);
      dispatch(deleteMovie(id));
    }, "Movie deleted successfully")
  );
};

export const updateMovieThunk = (id, movie) => (dispatch) => {
  dispatch(
    genericRequestThunk(async () => {
      const { data: movieRes } = await axios.put(`/movies/${id}`, movie);
      const { data: categorias } = await axios.post(
        `/movies/${id}/categorias`,
        movie.categorias
      );
      const { data: subcategorias } = await axios.post(
        `/movies/${id}/subcategorias`,
        movie.subcategorias
      );
      const { data: tipos } = await axios.post(
        `/movies/${id}/tipos`,
        movie.tipos
      );
      dispatch(
        updateMovie({
          id,
          movie: { ...movieRes, categorias, subcategorias, tipos },
        })
      );
    }, "Movie updated succesfully")
  );
};

export const { setMovie, addMovie, deleteMovie, updateMovie } =
  moviesSlice.actions;

export default moviesSlice.reducer;

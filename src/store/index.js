import { configureStore } from "@reduxjs/toolkit";
import tiposSlice from "./slices/tipos.slice";
import appSlice from "./slices/app.slice";
import subcategoriasSlice from "./slices/subcategorias.slice";
import categoriasSlice from "./slices/genres.slice";
import moviesSlice from "./slices/movies.slice";

export default configureStore({
  reducer: {
    app: appSlice,
    movies: moviesSlice,
    categorias: categoriasSlice,
    tipos: tiposSlice,
    subcategorias: subcategoriasSlice,
  },
});

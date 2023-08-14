import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { genericRequestThunk } from "./app.slice";

export const subcategoriasSlice = createSlice({
  name: "subcategorias",
  initialState: [],
  reducers: {
    setSubcategorias: (_, action) => action.payload,
    addSubcategoria: (state, { payload }) => {
      state.push(payload);
    },
    deleteSubcategoria: (state, { payload }) =>
      state.filter((subcategoria) => subcategoria.id !== payload),
    updateSubcategoria: (state, { payload: { id, subcategoria } }) => {
      const index = state.findIndex((subcategoria) => subcategoria.id === id);
      state[index] = subcategoria;
    },
  },
});

export const getSubcategoriasThunk = () => (dispatch) => {
  dispatch(
    genericRequestThunk(async () => {
      const res = await axios.get("/subcategorias");
      dispatch(setSubcategorias(res.data));
    })
  );
};

export const addSubcategoriaThunk = (subcategoria) => (dispatch) => {
  dispatch(
    genericRequestThunk(async () => {
      const res = await axios.post("/subcategorias", subcategoria);
      dispatch(addSubcategoria(res.data));
    }, "Subcategoria added successfully")
  );
};

export const deleteSubcategoriaThunk = (id) => (dispatch) => {
  dispatch(
    genericRequestThunk(async () => {
      await axios.delete(`/subcategorias/${id}`);
      dispatch(deleteSubcategoria(id));
    }, "Subcategoria deleted successfully")
  );
};

export const updateSubcategoriaThunk =
  (id, subcategoriaParams) => (dispatch) => {
    dispatch(
      genericRequestThunk(async () => {
        const { data: subcategoria } = await axios.put(
          `/subcategorias/${id}`,
          subcategoriaParams
        );
        dispatch(updateSubcategoria({ id, subcategoria }));
      }, "Subcategoria updated succesfully")
    );
  };

export const {
  setSubcategorias,
  addSubcategoria,
  deleteSubcategoria,
  updateSubcategoria,
} = subcategoriasSlice.actions;

export default subcategoriasSlice.reducer;

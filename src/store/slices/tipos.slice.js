import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { genericRequestThunk } from "./app.slice";

export const tiposSlice = createSlice({
  name: "tipos",
  initialState: [],
  reducers: {
    setTipos: (_, action) => action.payload,
    addTipo: (state, { payload }) => {
      state.push(payload);
    },
    deleteTipo: (state, { payload }) =>
      state.filter((tipo) => tipo.id !== payload),
    updateTipo: (state, { payload: { id, tipo } }) => {
      const index = state.findIndex((tipo) => tipo.id === id);
      state[index] = tipo;
    },
  },
});

export const getTiposThunk = () => (dispatch) => {
  dispatch(
    genericRequestThunk(async () => {
      const res = await axios.get("/tipos");
      dispatch(setTipos(res.data));
    })
  );
};

export const addTipoThunk = (tipo) => (dispatch) => {
  dispatch(
    genericRequestThunk(async () => {
      const res = await axios.post("/tipos", tipo);
      dispatch(addTipo(res.data));
    }, "Tipo added successfully")
  );
};

export const deleteTipoThunk = (id) => (dispatch) => {
  dispatch(
    genericRequestThunk(async () => {
      await axios.delete(`/tipos/${id}`);
      dispatch(deleteTipo(id));
    }, "Tipo deleted successfully")
  );
};

export const updateTipoThunk = (id, tipoParams) => (dispatch) => {
  dispatch(
    genericRequestThunk(async () => {
      const { data: tipo } = await axios.put(`/tipos/${id}`, tipoParams);
      dispatch(updateTipo({ id, tipo }));
    }, "Tipo updated succesfully")
  );
};

export const { setTipos, addTipo, deleteTipo, updateTipo } = tiposSlice.actions;

export default tiposSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { genericRequestThunk } from './app.slice';

export const categoriasSlice = createSlice({
    name: 'categorias',
    initialState: [],
    reducers: {
        setCategorias: (_, action) => action.payload,
        addCategoria: (state, { payload }) => { state.push(payload) },
        deleteCategoria: (state, { payload }) =>
            state.filter(categoria => categoria.id !== payload),
        updateCategoria: (state, { payload: { id, categoria } }) => {
            const index = state.findIndex(categoria => categoria.id === id);
            state[index] = categoria;
        }
    }
})

export const getCategoriasThunk = () => dispatch => {
    dispatch(genericRequestThunk(async () => {
        const res = await axios.get('/categorias');
        dispatch(setCategorias(res.data));
    }))
}

export const addCategoriaThunk = (name) => dispatch => {
    dispatch(genericRequestThunk(async () => {
        const res = await axios.post('/categorias', {name});
        dispatch(addCategoria(res.data));
    }))
}

export const deleteCategoriaThunk = id => dispatch => {
    dispatch(genericRequestThunk(async () => {
        await axios.delete(`/categorias/${id}`)
        dispatch(deleteCategoria(id))
    }))
}

export const updateCategoriaThunk = (id, name) => dispatch => {
    dispatch(genericRequestThunk(async () => {
        const res = await axios.put(`/categorias/${id}`, {name})
        dispatch(updateCategoria({id, categoria: res.data}));
    }))
}

export const { setCategorias, addCategoria, deleteCategoria, updateCategoria } = categoriasSlice.actions;

export default categoriasSlice.reducer;

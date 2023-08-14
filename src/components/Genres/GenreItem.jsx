import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCategoriaThunk, updateCategoriaThunk } from '../../store/slices/genres.slice';

const CategoriaItem = ({ categoria }) => {

    const [ isUpdating, setIsUpdating ] = useState(false);
    const [ categoriaUpdated, setCategoriaUpdated ] = useState(categoria.name);
    
    const dispatch = useDispatch();

    const update = () => {
        dispatch(updateCategoriaThunk(categoria.id, categoriaUpdated));
        setIsUpdating(false);
    }

    return (
        <li key={categoria.id} className="genres-item bg-light">
            {isUpdating ? (
                <input 
                    value={categoriaUpdated} 
                    onChange={e => setCategoriaUpdated(e.target.value)} 
                />
            ) : (
                <div 
                    className="genre-name" 
                    onClick={() => setIsUpdating(true)}
                >{categoriaUpdated}</div>
            )}

            {isUpdating && (
                <button className="bg-warning" onClick={update}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
            )}
            <button 
                className="bg-danger" 
                onClick={() => dispatch(deleteCategoriaThunk(categoria.id))}
            >
                <i className="fa-solid fa-trash-can"></i>
            </button>
        </li>
    );
};

export default CategoriaItem;

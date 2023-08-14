import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoriaThunk } from '../../store/slices/genres.slice';
import GenreItem from './GenreItem';

const CategoriasModal = ({ show, handleClose }) => {

    const categorias = useSelector(state => state.categorias);
    const [newCategoria, setNewCategoria] = useState("");

    const dispatch = useDispatch();

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Handle categorias</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="New genre"
                        value={newCategoria}
                        onChange={e => setNewCategoria(e.target.value)}
                    />
                    <Button 
                        variant="outline-success" 
                        onClick={() => dispatch(addCategoriaThunk(newCategoria))} 
                    >
                        Add
                    </Button>
                </InputGroup>
                <ul className="genres-list">
                    {categorias.map(categoria => (
                        <GenreItem categoria={categoria} key={categoria.id} />
                    ))}
                </ul>
            </Modal.Body>
        </Modal>
    );
};

export default CategoriasModal;
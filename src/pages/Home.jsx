import React, { useEffect, useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/Movies/MovieCard';

const Home = () => {

    const { movies, categorias } = useSelector(state => state);
    const [moviesFiltered, setMoviesFiltered] = useState([]);
    useEffect(() => setMoviesFiltered(movies), [movies]);

    const filterMovies = (itemId, itemFilter) => {
        const filtered = movies.filter(movie =>
            movie[itemFilter].some(item => item.id === itemId)
        )
        setMoviesFiltered(filtered);
    }

    const navigate = useNavigate();

    return (
        <Row>
            <Col md={3} xl={2}>
                <h3>BASE DE CONOCIMIENTOS</h3>
                {categorias.map(categoria => (
                    <li
                        key={categoria.id}
                        className="filter-option"
                        onClick={() => filterMovies(categoria.id, "categorias")}
                    >
                        {categoria.name}
                    </li>
                ))}
            </Col>
            <Col>
                <div className="d-flex justify-content-between align-items-start mb-4">
                    <h1>Articulo</h1>
                    <Button
                        onClick={() => navigate("/movies/add")}
                        variant="success"
                    >
                        Add Articulo
                    </Button>
                </div>
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    {
                        moviesFiltered.map(movie => (
                            <MovieCard
                                movie={movie}
                                key={movie.id}
                            />
                        ))
                    }
                </Row>
            </Col>
        </Row>
    );
};

export default Home;
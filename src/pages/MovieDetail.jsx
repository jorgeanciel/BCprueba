import React, { useMemo } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TipoCard from "../components/Tipos/TipoCard";
import ButtonsEditDelete from "../components/ButtonsEditDelete";
import SubcategoriaCard from "../components/Subcategorias/SubcategoriaCard";
import { deleteMovieThunk } from "../store/slices/movies.slice";
import formatDate from "../utils/formatDate";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movies = useSelector((state) => state.movies);
  const movie = useMemo(() => {
    return movies.find((m) => m.id === +id);
  }, [movies]);

  if (!movie) return <></>;

  const deleteMovie = () => {
    dispatch(deleteMovieThunk(movie.id));
    navigate("/");
  };

  return (
    <>
      <Row>
        <Col sm={3} md={4} xl={3}>
          <img src={movie.image} alt="" className="img-fluid" />
        </Col>
        <Col>
          <h1>{movie.name}</h1>
          <ListGroup horizontal>
            {movie.categorias?.map((categoria) => (
              <ListGroup.Item key={categoria.id}>
                {categoria.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <p className="mt-3">
            <b>Release year:</b> {movie.releaseYear}
          </p>
          <p>{movie.synopsis}</p>
          <h3>Subcategorias</h3>
          <Row xs={1} sm={2} xl={3} className="g-4">
            {movie.subcategorias?.map((subcategoria) => (
              <SubcategoriaCard
                subcategoria={subcategoria}
                key={subcategoria.id}
                showOptions={false}
              />
            ))}
          </Row>
          <h3 className="mt-5">Tipos</h3>
          <Row xs={1} sm={2} xl={3} className="g-4">
            {movie.tipos?.map((tipo) => (
              <TipoCard tipo={tipo} key={tipo.id} showOptions={false} />
            ))}
          </Row>
        </Col>
      </Row>
      <div className="options-movie-buttons">
        <ButtonsEditDelete
          size="lg"
          rounded
          onDelete={deleteMovie}
          onUpdate={() => navigate(`/movies/update/${movie.id}`)}
        />
      </div>
    </>
  );
};

export default MovieDetail;

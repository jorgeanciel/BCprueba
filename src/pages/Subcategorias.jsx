import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import SubcategoriaCard from "../components/Subcategorias/SubcategoriaCard";
import SubcategoriaForm from "../components/Subcategorias/SubcategoriaForm";
import getOneProperty from "../utils/getOneProperty";

const Subcategorias = () => {
  const subcategorias = useSelector((state) => state.subcategorias);

  const [showSubcategoriasForm, setShowSubcategoriasForm] = useState(false);
  const [subcategoriaSelected, setSubcategoriaSelected] = useState(null);
  const [subcategoriasFiltered, setSubcategoriasFiltered] = useState([]);
  useEffect(() => setSubcategoriasFiltered(subcategorias), [subcategorias]);

  const nationalities = getOneProperty(subcategorias, "nationality");

  const filterNationality = (nationality) => {
    const filtered = subcategorias.filter(
      (tipo) => tipo.nationality === nationality
    );
    setSubcategoriasFiltered(filtered);
  };

  const selectSubcategoria = (subcategoria) => {
    setSubcategoriaSelected(subcategoria);
    setShowSubcategoriasForm(true);
  };

  const closeForm = () => {
    setSubcategoriaSelected(null);
    setShowSubcategoriasForm(false);
  };

  return (
    <>
      <Row>
        <Col md={3} xl={2}>
          <h4>Filter by nationality</h4>
          <ul>
            {nationalities.map((nationality) => (
              <li
                className="filter-option"
                key={nationality}
                onClick={() => filterNationality(nationality)}
              >
                {nationality}
              </li>
            ))}
          </ul>
        </Col>
        <Col>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h1>Subcategorias</h1>
            <Button
              variant="success"
              onClick={() => setShowSubcategoriasForm(true)}
            >
              Add subcategoria
            </Button>
          </div>
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {subcategoriasFiltered.map((subcategoria) => (
              <SubcategoriaCard
                subcategoria={subcategoria}
                key={subcategoria.id}
                selectSubcategoria={selectSubcategoria}
              />
            ))}
          </Row>
        </Col>
      </Row>
      <SubcategoriaForm
        show={showSubcategoriasForm}
        handleClose={closeForm}
        subcategoriaSelected={subcategoriaSelected}
      />
    </>
  );
};

export default Subcategorias;

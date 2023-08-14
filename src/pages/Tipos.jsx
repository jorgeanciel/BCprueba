import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import TipoCard from "../components/Tipos/TipoCard";
import TiposForm from "../components/Tipos/TiposForm";
import getOneProperty from "../utils/getOneProperty";

const Tipos = () => {
  const tipos = useSelector((state) => state.tipos);

  const [showTiposForm, setShowTiposForm] = useState(false);
  const [tipoSelected, setTipoSelected] = useState(null);
  const [tiposFiltered, setTiposFiltered] = useState([]);
  useEffect(() => setTiposFiltered(tipos), [tipos]);

  const nationalities = getOneProperty(tipos, "nationality");

  const filterNationality = (nationality) => {
    const filtered = tipos.filter((tipo) => tipo.nationality === nationality);
    setTiposFiltered(filtered);
  };

  const selectTipo = (tipo) => {
    setTipoSelected(tipo);
    setShowTiposForm(true);
  };

  const closeForm = () => {
    setTipoSelected(null);
    setShowTiposForm(false);
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
            <h1>Tipos</h1>
            <Button variant="success" onClick={() => setShowTiposForm(true)}>
              Add tipo
            </Button>
          </div>
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {tiposFiltered.map((tipo) => (
              <TipoCard tipo={tipo} key={tipo.id} selectTipo={selectTipo} />
            ))}
          </Row>
        </Col>
      </Row>
      <TiposForm
        show={showTiposForm}
        handleClose={closeForm}
        tipoSelected={tipoSelected}
      />
    </>
  );
};

export default Tipos;

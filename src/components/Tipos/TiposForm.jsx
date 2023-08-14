import React, { useEffect, useState } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addTipo,
  addTipoThunk,
  updateTipoThunk,
} from "../../store/slices/tipos.slice";
import EmptyImg from "../EmptyImg";
import ModalForm from "../ModalForm";

const defaultTipo = {
  firstName: "",
  lastName: "",
  birthday: "",
  nationality: "",
  image: "",
};

const TiposForm = ({ show, handleClose, tipoSelected }) => {
  const [tipo, setTipo] = useState(defaultTipo);

  useEffect(() => {
    if (tipoSelected) setTipo(tipoSelected);
    else setTipo(defaultTipo);
  }, [tipoSelected]);

  const editTipo = (field, value) => setTipo({ ...tipo, [field]: value });

  const dispatch = useDispatch();

  const saveTipo = () => {
    if (!tipoSelected) dispatch(addTipoThunk(tipo));
    else dispatch(updateTipoThunk(tipoSelected.id, tipo));
    handleClose();
    setTipo(defaultTipo);
  };

  return (
    <ModalForm
      show={show}
      handleClose={handleClose}
      title="Tipos form"
      save={saveTipo}
    >
      <Form>
        <Row className="mb-3">
          <Col xs={9}>
            <FloatingLabel label="Image URL">
              <Form.Control
                required
                placeholder="Image URL"
                value={tipo.image}
                onChange={(e) => editTipo("image", e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <EmptyImg src={tipo.image} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <FloatingLabel label="First name">
              <Form.Control
                required
                placeholder="First name"
                value={tipo.firstName}
                onChange={(e) => editTipo("firstName", e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label="Last name">
              <Form.Control
                required
                placeholder="Last name"
                value={tipo.lastName}
                onChange={(e) => editTipo("lastName", e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <FloatingLabel label="Nationality">
              <Form.Control
                required
                placeholder="Nationality"
                value={tipo.nationality}
                onChange={(e) => editTipo("nationality", e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label="Birthday">
              <Form.Control
                required
                type="date"
                placeholder="Birthday"
                value={tipo.birthday}
                onChange={(e) => editTipo("birthday", e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>
      </Form>
    </ModalForm>
  );
};

export default TiposForm;

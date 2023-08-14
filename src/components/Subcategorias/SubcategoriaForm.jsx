import React, { useEffect, useState } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addSubcategoriaThunk,
  updateSubcategoriaThunk,
} from "../../store/slices/subcategorias.slice";
import EmptyImg from "../EmptyImg";
import ModalForm from "../ModalForm";

const defaultSubcategoria = {
  firstName: "",
  lastName: "",
  birthday: "",
  nationality: "",
  image: "",
};

const SubcategoriasForm = ({ show, handleClose, subcategoriaSelected }) => {
  const [subcategoria, setSubcategoria] = useState(defaultSubcategoria);

  useEffect(() => {
    if (subcategoriaSelected) setSubcategoria(subcategoriaSelected);
    else setSubcategoria(defaultSubcategoria);
  }, [subcategoriaSelected]);

  const editSubcategoria = (field, value) =>
    setSubcategoria({ ...subcategoria, [field]: value });

  const dispatch = useDispatch();

  const saveSubcategoria = () => {
    if (!subcategoriaSelected) dispatch(addSubcategoriaThunk(subcategoria));
    else
      dispatch(updateSubcategoriaThunk(subcategoriaSelected.id, subcategoria));
    handleClose();
    setSubcategoria(defaultSubcategoria);
  };

  return (
    <ModalForm
      show={show}
      handleClose={handleClose}
      title="Subcategorias form"
      save={saveSubcategoria}
    >
      <Form>
        <Row className="mb-3">
          <Col xs={9}>
            <FloatingLabel label="Image URL">
              <Form.Control
                required
                placeholder="Image URL"
                value={subcategoria.image}
                onChange={(e) => editSubcategoria("image", e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <EmptyImg src={subcategoria.image} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <FloatingLabel label="First name">
              <Form.Control
                required
                placeholder="First name"
                value={subcategoria.firstName}
                onChange={(e) => editSubcategoria("firstName", e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label="Last name">
              <Form.Control
                required
                placeholder="Last name"
                value={subcategoria.lastName}
                onChange={(e) => editSubcategoria("lastName", e.target.value)}
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
                value={subcategoria.nationality}
                onChange={(e) =>
                  editSubcategoria("nationality", e.target.value)
                }
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label="Birthday">
              <Form.Control
                required
                type="date"
                placeholder="Birthday"
                value={subcategoria.birthday}
                onChange={(e) => editSubcategoria("birthday", e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>
      </Form>
    </ModalForm>
  );
};

export default SubcategoriasForm;

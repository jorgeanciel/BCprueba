import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import GenresModal from "./Genres/GenresModal";

const NavBar = () => {
  const [showCategorias, setShowCategorias] = useState(false);

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="md">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Movies App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Movies
              </Nav.Link>
              <Nav.Link as={Link} to="/tipos">
                Tipos
              </Nav.Link>
              <Nav.Link as={Link} to="/subcategorias">
                Subcategorias
              </Nav.Link>
              <Nav.Link onClick={() => setShowCategorias(true)}>
                Categorias
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <GenresModal
        show={showCategorias}
        handleClose={() => setShowCategorias(false)}
      />
    </>
  );
};

export default NavBar;

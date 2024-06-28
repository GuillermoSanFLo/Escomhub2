import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/Navbar.css';

const CustomNavbar = () => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="w-100">
      <div className="container-fluid">
        <Navbar.Brand href="/">EscomHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/faqs">Preguntas frecuentes</Nav.Link>
            <Nav.Link href="/contacts">Contactanos</Nav.Link>
            <Nav.Link href="/products">Mas productos</Nav.Link>
            
          </Nav>
          <span className="navbar-text">
            {currentDate}
          </span>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default CustomNavbar;

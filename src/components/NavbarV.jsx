import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/Navbar.css';

const CustomNavbarV = () => {
  const currentDate = new Date().toLocaleDateString();
  const username = localStorage.getItem('username'); // Obtener el nombre de usuario desde el localStorage

  const handleLogout = () => {
    localStorage.removeItem('username'); // Limpiar el nombre de usuario del localStorage al cerrar sesión
    window.location.href = '/'; // Redirigir al inicio de sesión
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="w-100">
      <div className="container-fluid">
        <Navbar.Brand href="/">EscomHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <Nav.Link href="/vendedor">Ver productos</Nav.Link>
          </Nav>
          
          <Nav>
            <NavDropdown title={<><i className="fas fa-user-circle">Admin</i> {username}</>} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/Micuenta">Mi cuenta</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/MisPedidos">Pedidos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <span className="navbar-text">
            {currentDate}
          </span>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default CustomNavbarV;

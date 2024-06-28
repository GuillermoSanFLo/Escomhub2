import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import CustomNavbar from './../../components/Navbar';
import Header from './../../components/Header';
import usuarios from './../../data/Usuarios';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import './../../css/MiCuenta.css'; // Estilos personalizados

const MiCuenta = () => {
  const username = localStorage.getItem('username');
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState(getUserByUsername(username));
  const [userType, setUserType] = useState(userData.tipo); // Estado para el tipo de usuario

  function getUserByUsername(username) {
    return usuarios.find(u => u.nombre === username);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  function handleTipoChange(event) {
    const { value } = event.target;
    if (userData.tipo === 'Usuario' && value === 'Vendedor') {
      // Mostrar alerta con SweetAlert2
      Swal.fire({
        title: 'Cambio irreversible',
        text: 'Una vez cambiado a Vendedor, ya no podrás cambiar de regreso a Usuario.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          setUserType('Vendedor');
          setEditing(false); // Desactivar el modo de edición después de guardar
        }
      });
    } else {
      setUserType(value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Implementa aquí la lógica para guardar los datos editados
    console.log("Datos editados:", userData);
    setEditing(false); // Desactivar el modo de edición después de guardar
  }

  if (!userData) {
    return (
      <Container className="mt-5">
        <h2>Usuario no encontrado</h2>
      </Container>
    );
  }

  return (
    <div>
      <CustomNavbar />
      <Header />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="mi-cuenta-card">
              <Card.Header className="text-center">
                <h2>Mi Cuenta</h2>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          type="text"
                          name="nombre"
                          value={userData.nombre}
                          disabled // Bloqueado cuando no se está editando
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                          type="text"
                          name="apellido"
                          value={userData.apellido}
                          disabled // Bloqueado cuando no se está editando
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control
                          type="email"
                          name="correoElectronico"
                          value={userData.correoElectronico}
                          disabled // Bloqueado cuando no se está editando
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          name="contrasena"
                          value={userData.contrasena}
                          onChange={handleInputChange}
                          required={editing} // Requerido solo en modo de edición
                          readOnly={!editing} // Bloqueado cuando no se está editando
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col className="d-flex align-items-center">
                      <i className="fas fa-calendar-alt me-2"></i>
                      <Form.Group className="mb-3">
                        <Form.Label>Fecha de nacimiento</Form.Label>
                        <Form.Control
                          type="date"
                          name="fechaNacimiento"
                          value={userData.fechaNacimiento}
                          disabled // Bloqueado cuando no se está editando
                        />
                      </Form.Group>
                    </Col>
                    <Col className="d-flex align-items-center">
                      <i className="fas fa-phone-alt me-2"></i>
                      <Form.Group className="mb-3">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                          type="tel"
                          name="telefono"
                          value={userData.telefono}
                          onChange={handleInputChange}
                          required={editing} // Requerido solo en modo de edición
                          readOnly={!editing} // Bloqueado cuando no se está editando
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Sobre mí</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="sobre"
                          value={userData.sobre}
                          onChange={handleInputChange}
                          required={editing} // Requerido solo en modo de edición
                          readOnly={!editing} // Bloqueado cuando no se está editando
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Tipo de usuario</Form.Label>
                        <div>
                          <Form.Check
                            type="radio"
                            label="Usuario"
                            name="tipo"
                            value="Usuario"
                            checked={userType === 'Usuario'}
                            onChange={handleTipoChange}
                            disabled={!editing || userData.tipo === 'Vendedor'} // Bloqueado cuando no se está editando o si ya es Vendedor
                          />
                          <Form.Check
                            type="radio"
                            label="Vendedor"
                            name="tipo"
                            value="Vendedor"
                            checked={userType === 'Vendedor'}
                            onChange={handleTipoChange}
                            disabled={userData.tipo === 'Vendedor'} // Bloqueado siempre que ya sea Vendedor
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      {!editing ? (
                        <Button variant="primary" onClick={() => setEditing(true)}>Editar</Button>
                      ) : (
                        <div className="text-center">
                          <Button variant="primary" type="submit">Guardar cambios</Button>{' '}
                          <Button variant="secondary" onClick={() => setEditing(false)}>Cancelar</Button>
                        </div>
                      )}
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MiCuenta;

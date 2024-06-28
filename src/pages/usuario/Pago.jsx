import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FaShoppingBag, FaMoneyBillWave, FaCreditCard, FaDollarSign } from 'react-icons/fa';
import { CartContext } from './../../components/CartContext';
import Header from './../../components/Header';
import CustomNavbar from './../../components/Navbar';
import './../../css/Pago.css';

const Pago = () => {
  const { cartItems, clearCart, addOrder } = useContext(CartContext);
  const [ubicacion, setUbicacion] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [formaPago, setFormaPago] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tarjeta, setTarjeta] = useState({ numero: '', vencimiento: '', cvv: '' });
  const [cupon, setCupon] = useState('');
  const [descuento, setDescuento] = useState(0);

  // Calcular el total de la compra
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalWithDiscount = totalAmount * (1 - descuento / 100);

  const handlePagar = () => {
    if (formaPago === 'efectivo' || formaPago === 'mercado_pago' || (formaPago === 'tarjeta' && tarjeta.numero)) {
      const order = {
        items: cartItems,
        total: totalWithDiscount,
        ubicacion,
        comentarios,
        formaPago,
      };
      addOrder(order);
      clearCart();
      
      if (formaPago === 'mercado_pago') {
        Swal.fire('Redirigiendo', 'Serás redirigido a Mercado Pago', 'info').then(() => {
          window.location.href = 'https://mpago.la/1ekNLPP';
        });
      } else {
        Swal.fire('Pedido Enviado', 'Su pedido fue enviado al vendedor', 'success').then(() => {
          window.location.href = '/MisPedidos';
        });
      }
    } else if (formaPago === 'tarjeta' && !tarjeta.numero) {
      Swal.fire('Error', 'Por favor, agregue una tarjeta válida.', 'error');
    } else {
      Swal.fire('Error', 'Por favor, seleccione un método de pago.', 'error');
    }
  };

  const handleModalPagar = () => {
    Swal.fire('Tarjeta Guardada', 'Su tarjeta ha sido guardada exitosamente', 'success');
    setShowModal(false);
  };

  const validateCardNumber = (number) => {
    const regex = new RegExp("^[0-9]{16}$");
    return regex.test(number);
  };

  const validateExpiryDate = (date) => {
    const regex = new RegExp("^(0[1-9]|1[0-2])/[0-9]{2}$");
    return regex.test(date);
  };

  const validateCVV = (cvv) => {
    const regex = new RegExp("^[0-9]{3,4}$");
    return regex.test(cvv);
  };

  const handleApplyCoupon = () => {
    const validCoupons = {
      Escomhub5: 5,
      Escomhub10: 10,
      Escomhub15: 15,
      Escomhub20: 20,
      Escomhub25: 25,
    };

    if (validCoupons[cupon]) {
      setDescuento(validCoupons[cupon]);
      Swal.fire('Descuento aplicado', `Se ha aplicado un descuento del ${validCoupons[cupon]}%`, 'success');
    } else {
      Swal.fire('Cupón inválido', 'El cupón ingresado no es válido', 'error');
    }
  };

  const handleAddCard = () => {
    setShowModal(true);
  };

  const handleSaveCard = () => {
    if (!validateCardNumber(tarjeta.numero) || !validateExpiryDate(tarjeta.vencimiento) || !validateCVV(tarjeta.cvv)) {
      Swal.fire('Error', 'Por favor, ingrese una tarjeta válida.', 'error');
      return;
    }
    setShowModal(false);
    Swal.fire('Tarjeta Guardada', 'Su tarjeta ha sido guardada exitosamente', 'success');
  };

  return (
    <div>
      <Header />
      <CustomNavbar />
      <Container className="mt-5">
        <h2>Estás a un paso de comprar...</h2>
        <Row>
          <Col md={6} className="text-center">
            <div style={{ marginBottom: '2rem' }}>
              <FaShoppingBag size={150} />
            </div>
            <h4>Total a Pagar: ${totalWithDiscount.toFixed(2)}</h4> {/* Muestra el total del carrito con descuento */}
            <Button variant="primary" onClick={handlePagar}>Pagar</Button>
          </Col>
          <Col md={6}>
            <Form>
              <Form.Group controlId="ubicacion" className="mb-3">
                <Form.Label>Tu Ubicación</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su ubicación"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="comentarios" className="mb-3">
                <Form.Label>Comentarios</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Comentarios adicionales"
                  value={comentarios}
                  onChange={(e) => setComentarios(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="cupon" className="mb-3">
                <Form.Label>¿Tienes algún cupón de descuento? Úsalo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su cupón"
                  value={cupon}
                  onChange={(e) => setCupon(e.target.value)}
                />
                <Button variant="secondary" className="mt-2" onClick={handleApplyCoupon}>Aplicar Descuento</Button>
              </Form.Group>
            </Form>
            <h4>Forma de Pago</h4>
            <div className="d-flex flex-column">
              <Card className={`mb-3 radio-container ${formaPago === 'efectivo' ? 'radio-selected' : ''}`} onClick={() => setFormaPago('efectivo')}>
                <Card.Body className="d-flex align-items-center">
                  <FaMoneyBillWave className="me-2" size={24} />
                  <Form.Check type="radio" label="Pago en efectivo" checked={formaPago === 'efectivo'} readOnly />
                </Card.Body>
              </Card>
              <Card className={`mb-3 radio-container ${formaPago === 'mercado_pago' ? 'radio-selected' : ''}`} onClick={() => setFormaPago('mercado_pago')}>
                <Card.Body className="d-flex align-items-center">
                  <FaDollarSign className="me-2" size={24} />
                  <Form.Check type="radio" label="Mercado Pago" checked={formaPago === 'mercado_pago'} readOnly />
                </Card.Body>
              </Card>
              <Card className={`mb-3 radio-container ${formaPago === 'tarjeta' ? 'radio-selected' : ''}`} onClick={() => setFormaPago('tarjeta')}>
                <Card.Body className="d-flex flex-column align-items-start">
                  <div className="d-flex align-items-center">
                    <FaCreditCard className="me-2" size={24} />
                    <Form.Check type="radio" label="Pago con tarjeta" checked={formaPago === 'tarjeta'} readOnly />
                  </div>
                  {formaPago === 'tarjeta' && (
                    <div className="mt-3 w-100">
                      {tarjeta.numero ? (
                        <>
                          <p>Número de Tarjeta: **** **** **** {tarjeta.numero.slice(-4)}</p>
                          <Button variant="secondary" onClick={handleAddCard}>Editar Tarjeta</Button>
                        </>
                      ) : (
                        <Button variant="secondary" onClick={handleAddCard}>Agregar Tarjeta</Button>
                      )}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{tarjeta.numero ? 'Editar Tarjeta' : 'Agregar Tarjeta'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="tarjetaNumero" className="mb-3">
              <Form.Label>Número de Tarjeta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Número de Tarjeta"
                value={tarjeta.numero}
                onChange={(e) => setTarjeta({ ...tarjeta, numero: e.target.value })}
                isInvalid={tarjeta.numero && !validateCardNumber(tarjeta.numero)}
              />
              <Form.Control.Feedback type="invalid">
                Número de tarjeta inválido.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="tarjetaVencimiento" className="mb-3">
              <Form.Label>Fecha de Vencimiento (MM/AA)</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/AA"
                value={tarjeta.vencimiento}
                onChange={(e) => setTarjeta({ ...tarjeta, vencimiento: e.target.value })}
                isInvalid={tarjeta.vencimiento && !validateExpiryDate(tarjeta.vencimiento)}
              />
              <Form.Control.Feedback type="invalid">
                Fecha de vencimiento inválida.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="tarjetaCVV" className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="text"
                placeholder="CVV"
                value={tarjeta.cvv}
                onChange={(e) => setTarjeta({ ...tarjeta, cvv: e.target.value })}
                isInvalid={tarjeta.cvv && !validateCVV(tarjeta.cvv)}
              />
              <Form.Control.Feedback type="invalid">
                CVV inválido.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleSaveCard}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Pago;

import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { CartContext } from './../../components/CartContext';
import Header from './../../components/Header';
import CustomNavbar from './../../components/Navbar';

const MisPedidos = () => {
  const { orders, removeOrder } = useContext(CartContext);

  const handleRemoveOrder = (index) => {
    removeOrder(index);
  };

  return (
    <div>
      <Header />
      <CustomNavbar />
      <Container className="mt-5">
        <h2>Mis Pedidos</h2>
        {orders.length === 0 ? (
          <p>No hay pedidos.</p>
        ) : (
          orders.map((order, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <h5>Pedido #{index + 1}</h5>
                <p>Total: ${order.total.toFixed(2)}</p>
                <p>Ubicación: {order.ubicacion}</p>
                <p>Comentarios: {order.comentarios}</p>
                <p>Forma de Pago: {order.formaPago}</p>
                <h6>Productos:</h6>
                <ul>
                  {order.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item.name} - Cantidad: {item.quantity} - Precio: ${item.price.toFixed(2)}</li>
                  ))}
                </ul>
                <Button variant="danger" onClick={() => handleRemoveOrder(index)}>Borrar Pedido</Button>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </div>
  );
};

export default MisPedidos;

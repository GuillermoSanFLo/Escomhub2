import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { CartContext } from './../../components/CartContext';
import './../../css/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
  };

  const handleIncreaseQuantity = (product) => {
    increaseQuantity(product);
  };

  const handleDecreaseQuantity = (product) => {
    decreaseQuantity(product);
  };

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="container mt-4 cart-container">
      <h2>Carrito de Compra ({cartItems.length} artículos)</h2>
      {cartItems.length === 0 ? (
        <div className="alert alert-info mt-3" role="alert">
          No hay productos en el carrito.
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cartItems.map((product) => (
              <div key={product.id} className="card mb-3 cart-item">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={product.image} className="img-fluid rounded-start" alt={product.name} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">Precio unitario: ${product.price}</p>
                      <div className="d-flex align-items-center">
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => handleDecreaseQuantity(product)}>
                          <FaMinus />
                        </button>
                        <span className="mx-2">{product.quantity}</span>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => handleIncreaseQuantity(product)}>
                          <FaPlus />
                        </button>
                      </div>
                      <p className="card-text">Total: ${product.price * product.quantity}</p>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveFromCart(product)}>
                        <FaTrash /> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <div className="card total-card">
              <div className="card-body">
                <h5 className="card-title">Total</h5>
                <p className="card-text">Total a Pagar: ${totalAmount.toFixed(2)}</p>
                <div className="d-grid gap-2">
                  <Link to={{ pathname: '/pago', state: { totalAmount } }} className="btn btn-primary">
                    Continuar
                  </Link>
                  <button className="btn btn-danger" onClick={() => window.history.back()}>
                    Regresar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import CustomNavbar from './../../components/Navbar';
import Header from './../../components/Header';
import SearchBar from './../../components/SearchBar';
import ImageCarousel from './../../components/ImageCarousel';
import { CartContext } from './../../components/CartContext';
import { products } from './../../data/products';
import './../../css/PrincipalP.css';
import Swal from 'sweetalert2';

const PrincipalP = () => {
  const [filteredProducts, setFilteredProducts] = useState(products.slice(0, 3)); // Mostrar solo 3 productos por defecto
  const { addToCart, cartItems } = useContext(CartContext); // Obtén addToCart y cartItems del contexto
  const [showCoupon, setShowCoupon] = useState(true); // Estado para mostrar el cupón

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredProducts(products.slice(0, 3)); // Mostrar solo 3 productos por defecto si no hay búsqueda
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    Swal.fire({
      icon: 'success',
      title: `${product.name} añadido al carrito.`,
      showConfirmButton: false,
      timer: 1500
    });
  };

  const handleCouponClick = () => {
    // Ocultar el cupón después de 1 minuto
    setTimeout(() => {
      setShowCoupon(false);
    }, 60000); // 60000 milisegundos = 1 minuto

    // Redirigir a la página de Juegos después de 1.5 segundos
    setTimeout(() => {
      window.location.href = '/juegos';
    }, 1500);
  };

  const calculateProgressColor = (sold, total) => {
    const percentage = (sold / total) * 100;
    if (percentage <= 25) {
      return 'bg-success'; // Verde
    } else if (percentage <= 50) {
      return 'bg-info'; // Azul
    } else if (percentage <= 75) {
      return 'bg-warning'; // Amarillo
    } else {
      return 'bg-danger'; // Rojo
    }
  };

  return (
    <div>
      <CustomNavbar />
      <Header />
      <SearchBar onSearch={handleSearch} />
      <ImageCarousel images={[{ url: 'https://picsum.photos/200/300', alt: 'Imagen 1' }, { url: 'https://picsum.photos/200/300', alt: 'Imagen 2' }]} />

      {/* Elemento de cupones */}
      {showCoupon && (
        <div className="cupon-container" onClick={handleCouponClick}>
          <div className="cupon">
            <p>¡Obtén tu cupón!</p>
          </div>
        </div>
      )}

      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-item elegant-product-item">
            <Link to={`/producto/${product.id}`}>
              <h3>{product.name}</h3>
              <img src={product.image} alt={product.name} />
              <p>${product.price} C/U</p>
              <div className="product-rating">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < product.rating ? 'filled' : ''}>&#9733;</span>
                ))}
                <span>({product.reviews} Reviews)</span>
              </div>
              <div className="product-stock">
                <div className="progress">
                  <div
                    className={`progress-bar ${calculateProgressColor(product.sold + (cartItems.find(item => item.id === product.id)?.quantity || 0), product.total)}`}
                    role="progressbar"
                    style={{ width: `${((product.sold + (cartItems.find(item => item.id === product.id)?.quantity || 0)) / product.total) * 100}%` }}
                    aria-valuenow={product.sold + (cartItems.find(item => item.id === product.id)?.quantity || 0)}
                    aria-valuemin="0"
                    aria-valuemax={product.total}
                  ></div>
                </div>
                <p>{product.total - product.sold - (cartItems.find(item => item.id === product.id)?.quantity || 0)} disponibles</p>
              </div>
            </Link>
            <button className="btn-add-cart" onClick={() => handleAddToCart(product)}>Añadir al Carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrincipalP;

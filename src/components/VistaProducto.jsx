import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import CustomNavbar from './Navbar';
import Header from './Header';
import SearchBar from './SearchBar';
import { CartContext } from '../components/CartContext';
import './../css/VistaProducto.css';
import { products } from './../data/products';
import Swal from 'sweetalert2';

const VistaProducto = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext);
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    Swal.fire({
      icon: 'success',
      title: `${product.name} añadido al carrito.`,
      showConfirmButton: false,
      timer: 1500
    });
  };

  const getRandomProducts = () => {
    const randomProducts = [];
    while (randomProducts.length < 2) {
      const randomIndex = Math.floor(Math.random() * products.length);
      const randomProduct = products[randomIndex];
      if (randomProduct.id !== product.id) {
        randomProducts.push(randomProduct);
      }
    }
    return randomProducts;
  };

  const randomProducts = getRandomProducts();

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

  // Calcular el promedio de calificaciones basado en las reseñas del producto
  const calculateAverageRating = () => {
    if (product.reviewsList.length === 0) {
      return 0;
    }
    
    const totalReviews = product.reviewsList.length;
    const sumOfRatings = product.reviewsList.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = sumOfRatings / totalReviews;
    return averageRating;
  };

  // Función para renderizar las estrellas de calificación
  const renderRatingStars = () => {
    const averageRating = calculateAverageRating();
    const filledStars = Math.round(averageRating);
    const emptyStars = 5 - filledStars;

    return (
      <>
        {Array.from({ length: filledStars }, (_, i) => (
          <span key={i} className="filled">&#9733;</span>
        ))}
        {Array.from({ length: emptyStars }, (_, i) => (
          <span key={i + filledStars}>&#9733;</span>
        ))}
      </>
    );
  };

  return (
    <div>
      <CustomNavbar />
      <Header />
      <SearchBar onSearch={(term) => console.log(term)} />

      <div className="product-detail">
        <div className="product-detail-header">
          <h1>{product.name}</h1>
          <p>${product.price} C/U</p>
          <div className="product-rating">
            {renderRatingStars()}
            <span>({product.reviewsList.length} Reviews)</span>
          </div>
        </div>

        <div className="product-detail-body">
          <img src={product.image} alt={product.name} />

          <div className="product-description">
            <p>{product.fullDescription}</p>
            <div className="product-sold-bar">
              <div
                className="sold-progress"
                style={{ width: `${(product.sold / product.total) * 100}%`, backgroundColor: product.sold === product.total ? 'red' : 'green' }}
              ></div>
              <span>{product.sold}/{product.total} Vendidas</span>
            </div>
          </div>

          <div className="product-contact">
            <h3>Datos de Contacto</h3>
            <p><i className="fas fa-phone"></i> {product.contact.phone}</p>
            <p><i className="fas fa-user"></i> {product.contact.name}</p>
            <p><i className="fas fa-clock"></i> {product.contact.hours}</p>
          </div>

          <div className="product-reviews">
            <h3>Reseñas</h3>
            {product.reviewsList.map((review, index) => (
              <p key={index}><strong>{review.name}:</strong> {review.comment}</p>
            ))}
          </div>

          <div className="product-actions">
            <button className="btn btn-primary">Comprar Ahora</button>
            <button className="btn btn-secondary" onClick={handleAddToCart}>Añadir al Carrito</button>
          </div>
        </div>
      </div>

      <div className="related-products">
        <h2>También te podría interesar esto</h2>
        <div className="related-products-list">
          {randomProducts.map((relatedProduct) => (
            <div className="related-product" key={relatedProduct.id}>
              <Link to={`/producto/${relatedProduct.id}`}>
                <img className="related-product-image" src={relatedProduct.image} alt={relatedProduct.name} />
              </Link>
              <div className="related-product-info">
                <h3>{relatedProduct.name}</h3>
                <p>${relatedProduct.price}</p>
                <div className="product-stock">
                  <div className="progress">
                    <div
                      className={`progress-bar ${calculateProgressColor(relatedProduct.sold, relatedProduct.total)}`}
                      role="progressbar"
                      style={{ width: `${(relatedProduct.sold / relatedProduct.total) * 100}%` }}
                      aria-valuenow={relatedProduct.sold}
                      aria-valuemin="0"
                      aria-valuemax={relatedProduct.total}
                    ></div>
                  </div>
                  <p>{relatedProduct.total - relatedProduct.sold} disponibles</p>
                </div>
                <div className="product-rating">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={i < relatedProduct.rating ? 'filled' : ''}>&#9733;</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <footer className="footer">
        <p>&copy; 2024 Escomhub. Todos los derechos reservados.</p>
      </footer>
      </div>

      
    </div>
  );
};

export default VistaProducto;

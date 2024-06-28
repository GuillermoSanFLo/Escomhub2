// Products.jsx
import React, { useState, useEffect, useContext } from 'react';
import CustomNavbar from './../../components/Navbar';
import Header from './../../components/Header';
import SearchBar from './../../components/SearchBar';
import initialProducts from './../../components/productsData';
import './../../css/Products.css';
import { CartContext } from './../../components/CartContext';

const Products = () => {
  const [products] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart, cartItems } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = [...new Set(products.map(product => product.category))];

  useEffect(() => {
    const sortedProducts = {};
    categories.forEach(category => {
      sortedProducts[category] = products.filter(product => product.category === category);
    });
    setFilteredProducts(sortedProducts);
  }, [products]);

  const filterProducts = (searchTerm) => {
    const filtered = {};
    categories.forEach(category => {
      filtered[category] = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredProducts(filtered);
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="products-container">
      <CustomNavbar />
      <Header />
      <SearchBar onSearch={filterProducts} onCartClick={handleCartClick} />
      <div className="products-content container-fluid">
        <h2>Todos los Productos</h2>
        {Object.keys(filteredProducts).map(category => (
          <div key={category} className="category-section">
            <h3>{category}</h3>
            <div className="row">
              {filteredProducts[category].map(product => (
                <div key={product.id} className="col-md-6">
                  <div className="product-card">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <span className="product-category">{product.category}</span>
                    <button className="btn btn-primary" onClick={() => addToCart(product)}>Agregar al carrito</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {isCartOpen && (
        <div className="cart-menu">
          <h3>Carrito de Compras</h3>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                <span>{item.name}</span>
                <span>{item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Products;

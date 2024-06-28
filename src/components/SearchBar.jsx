import React, { useState, useContext, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import './../css/SearchBar.css';
import { CartContext } from './../components/CartContext';
import { Link } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [username, setUsername] = useState(null);
  const { cartItems } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar la visibilidad del menú desplegable

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null);
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="search-bar container-fluid py-2 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <Link to="/cart" className="btn-cart-user me-2">
          Tu carrito: ${totalAmount.toFixed(2)}
          <FaShoppingCart className="ms-2" />
          <span className="badge bg-secondary ms-1">{cartItems.length}</span>
        </Link>
        {username ? (
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              onClick={toggleMenu} // Toggle para abrir/cerrar el menú
            >
              {username}
            </button>
            {/* Aplicar la clase 'show' para mostrar el menú si menuOpen es true */}
            <div className={`dropdown-menu ${menuOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
              <Link className="dropdown-item" to="/MiCuenta">Mi cuenta</Link>
              <Link className="dropdown-item" to="/mispedidos">Mis Pedidos</Link>
              <button className="dropdown-item" onClick={handleLogout}>Cerrar sesión</button>
            </div>
          </div>
        ) : (
          <a href="/login" className="btn-cart-user">
            Identifícate / Inicia sesión
            <FaUser className="ms-2" />
          </a>
        )}
      </div>

      <div className="search-container">
        <form className="d-flex" onSubmit={handleSubmit}>
          <button className="btn btn-warning" type="submit">
            <FaSearch />
          </button>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar productos..."
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;


import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/Header.css'; // Asegúrate de crear y ajustar este archivo de estilos según sea necesario
import logo from './../imgs/logo.png'; // Ajusta la ruta según tu estructura de proyecto

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <h1 className="lema">¡Conecta, Compra, Estudia! Tu mercado estudiantil en un solo lugar</h1>
    </header>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import CustomNavbar from './../../components/Navbar';
import Header from './../../components/Header';
import RuletaDescuentos from './../../components/RuletaDescuentos'; 
import AdivinaLaBola from './../../components/AdivinaLaBola';
import PreguntasGenerales from './../../components/PreguntasGenerales'; 
import './../../css/Juegos.css'; 

const Juegos = () => {
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);

 
  const juegos = [
    { nombre: 'Ruleta de Descuentos', componente: <RuletaDescuentos /> },
    { nombre: 'Adivina la Bola', componente: <AdivinaLaBola /> },
    { nombre: 'Preguntas Generales', componente: <PreguntasGenerales /> }
  ];

  const seleccionarJuegoAleatorio = () => {
    const indiceAleatorio = Math.floor(Math.random() * juegos.length);
    return juegos[indiceAleatorio];
  };

  useEffect(() => {
    const juegoAleatorio = seleccionarJuegoAleatorio();
    setJuegoSeleccionado(juegoAleatorio);
  }, []);

  return (
    <div>
      <CustomNavbar />
      <Header />
      <div className="juegos-container">
        <h1>Gana Cupones de forma divertida</h1>
        <div className="juego-aleatorio">
          {juegoSeleccionado ? (
            <div className="juego-seleccionado">
              <h2>{juegoSeleccionado.nombre}</h2>
              {juegoSeleccionado.componente}
            </div>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Juegos;

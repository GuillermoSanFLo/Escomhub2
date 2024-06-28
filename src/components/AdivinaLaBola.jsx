import React, { useState } from 'react';
import './../css/AdivinaLaBola.css'; // Estilos específicos para Adivina la Bola

const AdivinaLaBola = () => {
  const [posicionBola, setPosicionBola] = useState(null);
  const [seleccionada, setSeleccionada] = useState(null);
  const [resultado, setResultado] = useState(null);

  const iniciarJuego = () => {
    const posiciones = ['A', 'B', 'C'];
    const posicionAleatoria = posiciones[Math.floor(Math.random() * posiciones.length)];
    setPosicionBola(posicionAleatoria);
    setSeleccionada(null);
    setResultado(null);
  };

  const seleccionarCasilla = (casilla) => {
    if (!seleccionada) {
      setSeleccionada(casilla);
      setTimeout(() => {
        if (casilla === posicionBola) {
          setResultado('¡Felicidades! Ganaste un cupon de 20% en tu siguiente compra(Escomhub20)');
        } else {
          setResultado(`No acertaste. La bola estaba en la posición ${posicionBola}.`);
        }
      }, 1000); // Simulación de tiempo para mostrar el resultado (1 segundo)
    }
  };

  return (
    <div className="adivina-la-bola">
      <h3>Adivina la Bola</h3>
      <div className="casillas">
        <div className={`casilla ${seleccionada === 'A' ? 'seleccionada' : ''}`} onClick={() => seleccionarCasilla('A')}>A</div>
        <div className={`casilla ${seleccionada === 'B' ? 'seleccionada' : ''}`} onClick={() => seleccionarCasilla('B')}>B</div>
        <div className={`casilla ${seleccionada === 'C' ? 'seleccionada' : ''}`} onClick={() => seleccionarCasilla('C')}>C</div>
      </div>
      <button className="btn-iniciar" onClick={iniciarJuego}>Iniciar Juego</button>
      {resultado && <p>{resultado}</p>}
    </div>
  );
};

export default AdivinaLaBola;

import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import Swal from 'sweetalert2';
import './../css/RuletaDescuentos.css'; // Estilos específicos para la Ruleta de Descuentos

const RuletaDescuentos = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [canSpin, setCanSpin] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);

  const data = [
    { option: 'Suerte para la próxima', style: { backgroundColor: '#f8b400', textColor: '#ffffff' } },
    { option: 'Suerte para la próxima', style: { backgroundColor: '#f85f36', textColor: '#ffffff' } },
    { option: 'Gira de nuevo', style: { backgroundColor: '#6a0572', textColor: '#ffffff' } },
    { option: 'Gira de nuevo', style: { backgroundColor: '#0096c7', textColor: '#ffffff' } },
    { option: '10% de descuento', style: { backgroundColor: '#00b4d8', textColor: '#ffffff' } },
    { option: '10% de descuento', style: { backgroundColor: '#0077b6', textColor: '#ffffff' } },
    { option: '20% de descuento', style: { backgroundColor: '#023e8a', textColor: '#ffffff' } },
    { option: '20% de descuento', style: { backgroundColor: '#03045e', textColor: '#ffffff' } },
    { option: '30% de descuento', style: { backgroundColor: '#ffba08', textColor: '#ffffff' } },
    { option: '30% de descuento', style: { backgroundColor: '#faa307', textColor: '#ffffff' } },
    { option: '99% de descuento', style: { backgroundColor: '#d00000', textColor: '#ffffff' } },
  ];

  const probabilities = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.005]; // Probabilidades ajustadas

  useEffect(() => {
    const lastSpinTime = localStorage.getItem('lastSpinTime');
    if (lastSpinTime) {
      const timeDiff = Date.now() - new Date(lastSpinTime).getTime();
      const secondsLeft = 30 - timeDiff / 1000;
      if (secondsLeft > 0) {
        setCanSpin(false);
        setTimeLeft(secondsLeft * 1000); // Convertir segundos a milisegundos
      }
    }
  }, []);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        const newTimeLeft = timeLeft - 1000;
        setTimeLeft(newTimeLeft);
        localStorage.setItem('timeLeft', newTimeLeft); // Guardar el tiempo restante en localStorage
        if (newTimeLeft <= 0) {
          setCanSpin(true);
          setTimeLeft(null);
          localStorage.removeItem('timeLeft');
          localStorage.removeItem('lastSpinTime');
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSpinClick = () => {
    const cumulativeProbabilities = probabilities.reduce((acc, prob, index) => {
      const sum = acc[index - 1] || 0;
      acc.push(sum + prob);
      return acc;
    }, []);

    const random = Math.random();
    const newPrizeNumber = cumulativeProbabilities.findIndex(cumProb => random < cumProb);

    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleFinishSpin = () => {
    const premio = data[prizeNumber].option;
    let mensaje = '';

    if (premio.includes('descuento')) {
      let cupon = '';
      switch (premio) {
        case '10% de descuento':
          cupon = 'Escomhub10';
          break;
        case '20% de descuento':
          cupon = 'Escomhub20';
          break;
        case '30% de descuento':
          cupon = 'EscomHub30';
          break;
        case '99% de descuento':
          cupon = '15.09.0199';
          break;
        default:
          cupon = '';
      }
      mensaje = `Ganaste ${premio}. Tu código es ${cupon}.`;
    } else {
      mensaje = `¡${premio}!`;
    }

    Swal.fire({
      icon: 'success',
      title: '¡Resultado!',
      text: mensaje,
      confirmButtonText: premio.includes('descuento') ? 'Copiar código' : 'Cerrar',
      showCancelButton: !premio.includes('descuento'),
      cancelButtonText: 'Cerrar',
    }).then((result) => {
      if (result.isConfirmed && premio.includes('descuento')) {
        navigator.clipboard.writeText(mensaje.split(' ').slice(-1)[0]);
        Swal.fire({
          icon: 'success',
          title: '¡Código copiado!',
          text: `El código de descuento ${mensaje.split(' ').slice(-1)[0]} ha sido copiado al portapapeles.`,
        });
      }
    });

    if (!premio.includes('Gira de nuevo')) {
      setCanSpin(false);
      const nextSpinTime = Date.now() + 30 * 1000; // 30 segundos en milisegundos
      localStorage.setItem('lastSpinTime', new Date(nextSpinTime).toISOString());
      setTimeLeft(30 * 1000); // 30 segundos en milisegundos
    }

    setMustSpin(false);
  };

  return (
    <div className="ruleta-descuentos">
      <h3>Ruleta de Descuentos</h3>
      <div className="ruleta-container">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={['#3e3e3e', '#df3428']}
          textColors={['#ffffff']}
          fontSize={20} 
          onStopSpinning={handleFinishSpin}
        />
      </div>
      <button className="btn-girar" onClick={handleSpinClick} disabled={!canSpin}>
        {mustSpin ? 'Girando...' : 'Girar la Ruleta'}
      </button>
      {!canSpin && timeLeft > 0 && <p>Puedes girar de nuevo en {Math.ceil(timeLeft / 1000)} segundos.</p>}
    </div>
  );
};

export default RuletaDescuentos;

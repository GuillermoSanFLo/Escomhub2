import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom
import './../css/PreguntasGenerales.css'; // Estilos específicos para Preguntas Generales
import Swal from 'sweetalert2';

const PreguntasGenerales = () => {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [resultado, setResultado] = useState(null);
  const [preguntasSeleccionadas, setPreguntasSeleccionadas] = useState([]);

  const preguntas = [
    { pregunta: '¿Cuál es la capital de Francia?', opciones: ['Roma', 'Londres', 'París'], respuestaCorrecta: 'París' },
    { pregunta: '¿Quién escribió "Don Quijote de la Mancha"?', opciones: ['Miguel de Cervantes', 'Gabriel García Márquez', 'Julio Cortázar'], respuestaCorrecta: 'Miguel de Cervantes' },
    { pregunta: '¿Cuál es el río más largo del mundo?', opciones: ['Nilo', 'Amazonas', 'Yangtsé'], respuestaCorrecta: 'Amazonas' },
    { pregunta: '¿En qué año llegó el hombre a la luna?', opciones: ['1965', '1969', '1971'], respuestaCorrecta: '1969' },
    { pregunta: '¿Cuál es el planeta más grande del sistema solar?', opciones: ['Saturno', 'Júpiter', 'Neptuno'], respuestaCorrecta: 'Júpiter' },
    { pregunta: '¿Qué país ganó la Copa Mundial de la FIFA en 2018?', opciones: ['Alemania', 'Brasil', 'Francia'], respuestaCorrecta: 'Francia' },
    { pregunta: '¿Cuál es el elemento químico más abundante en la Tierra?', opciones: ['Oxígeno', 'Hidrógeno', 'Carbono'], respuestaCorrecta: 'Oxígeno' },
    { pregunta: '¿Quién pintó la Mona Lisa?', opciones: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci'], respuestaCorrecta: 'Leonardo da Vinci' },
    { pregunta: '¿Cuál es la capital de Japón?', opciones: ['Pekín', 'Seúl', 'Tokio'], respuestaCorrecta: 'Tokio' },
    { pregunta: '¿Qué país es conocido como la tierra de los tulipanes?', opciones: ['Dinamarca', 'Países Bajos', 'Suecia'], respuestaCorrecta: 'Países Bajos' }
  ];

  useEffect(() => {
    const seleccionarPreguntasAleatorias = () => {
      const preguntasAleatorias = [];
      const preguntasCopia = [...preguntas];
      for (let i = 0; i < 5; i++) {
        const indiceAleatorio = Math.floor(Math.random() * preguntasCopia.length);
        preguntasAleatorias.push(preguntasCopia.splice(indiceAleatorio, 1)[0]);
      }
      setPreguntasSeleccionadas(preguntasAleatorias);
    };

    seleccionarPreguntasAleatorias();
  }, []);

  const responderPregunta = (opcionSeleccionada) => {
    const respuesta = {
      pregunta: preguntasSeleccionadas[preguntaActual].pregunta,
      respuestaUsuario: opcionSeleccionada,
      respuestaCorrecta: preguntasSeleccionadas[preguntaActual].respuestaCorrecta
    };
    setRespuestas([...respuestas, respuesta]);
    if (opcionSeleccionada === preguntasSeleccionadas[preguntaActual].respuestaCorrecta) {
      setResultado('¡Respuesta Correcta!');
    } else {
      setResultado(`Respuesta Incorrecta. La respuesta correcta es: ${preguntasSeleccionadas[preguntaActual].respuestaCorrecta}`);
    }
  };

  const siguientePregunta = () => {
    if (preguntaActual < preguntasSeleccionadas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
      setResultado(null);
    } else {
      calcularCupon();
    }
  };

  const calcularCupon = () => {
    const respuestasCorrectas = respuestas.filter(respuesta => respuesta.respuestaUsuario === respuesta.respuestaCorrecta).length;
    let cupon = '';
    switch (respuestasCorrectas) {
      case 1:
        cupon = 'Escomhub5';
        break;
      case 2:
        cupon = 'Escomhub10';
        break;
      case 3:
        cupon = 'Escomhub15';
        break;
      case 4:
        cupon = 'Escomhub20';
        break;
      case 5:
        cupon = 'Escomhub25';
        break;
      default:
        cupon = 'Sin cupón';
    }

    Swal.fire({
      icon: 'success',
      title: '¡Resultados!',
      text: `Respondiste correctamente ${respuestasCorrectas} preguntas. Tu cupón es: ${cupon}.`,
      confirmButtonText: 'Copiar código',
    }).then((result) => {
      if (result.isConfirmed) {
        navigator.clipboard.writeText(cupon);
        Swal.fire({
          icon: 'success',
          title: '¡Código copiado!',
          text: `El código de descuento ${cupon} ha sido copiado al portapapeles.`,
        });
      }
    });
  };

  return (
    <div className="preguntas-generales">
      <p>Contesta la mayor cantidad de preguntas para obtener el mayor descuento posible</p>
      {preguntaActual < preguntasSeleccionadas.length && (
        <div className="pregunta">
          <p>{preguntasSeleccionadas[preguntaActual].pregunta}</p>
          <div className="opciones">
            {preguntasSeleccionadas[preguntaActual].opciones.map((opcion, index) => (
              <button key={index} onClick={() => responderPregunta(opcion)}>{opcion}</button>
            ))}
          </div>
          {resultado && <p>{resultado}</p>}
          <button className="btn-siguiente" onClick={siguientePregunta} disabled={!resultado}>Siguiente Pregunta</button>
        </div>
      )}
      <div className="respuestas">
        <h4>Respuestas Anteriores:</h4>
        {respuestas.map((respuesta, index) => (
          <p key={index}>{respuesta.pregunta}: {respuesta.respuestaUsuario} - Correcta: {respuesta.respuestaCorrecta}</p>
        ))}
      </div>
      <Link to="/">Regresear</Link> {/* Enlace para redirigir al main */}
    </div>
  );
};

export default PreguntasGenerales;

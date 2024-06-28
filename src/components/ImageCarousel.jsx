import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/ImageCarousel.css';
import fondobanner from './../imgs/fondobanner.png';
import solchecitos from './../imgs/solchecitos.png';
import papas from './../imgs/papas.png';
import cacahuates from './../imgs/cacahuates.png';

const ImageCarousel = () => {
  return (
    <Carousel className="mb-4">
      <Carousel.Item>
        <div className="carousel-background" style={{ backgroundImage: `url(${fondobanner})` }}>
          <Carousel.Caption className="custom-caption d-flex justify-content-between align-items-center">
            <div className="text-container">
              <h3>¡Últimos productos!</h3>
              <p>Solchecitos tu mejor opcion .</p>
              <Button variant="light" className="buy-button">Comprar ahora</Button>
            </div>
            <img src={solchecitos} alt="Solchecitos" className="overlay-image" />
          </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-background" style={{ backgroundImage: `url(${fondobanner})` }}>
          <Carousel.Caption className="custom-captionn d-flex justify-content-between align-items-center">
            <div className="text-container">
              <h3>¡Últimos productos!</h3>
              <p>A que no puede comer solo una.</p>
              <Button variant="light" className="buy-button">Comprar ahora</Button>
            </div>
            <img src={papas} alt="Papas" className="overlay-image" />
          </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-background" style={{ backgroundImage: `url(${fondobanner})` }}>
          <Carousel.Caption className="custom-caption d-flex justify-content-between align-items-center">
            <div className="text-container">
              <h3>¡Últimos productos!</h3>
              <p> Los cacahuates son los mejores.</p>
              <Button variant="light" className="buy-button">Comprar ahora</Button>
            </div>
            <img src={cacahuates} alt="Cacahuates" className="overlay-image" />
          </Carousel.Caption>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageCarousel;

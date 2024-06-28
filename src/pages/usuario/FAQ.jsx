import React from 'react';
import { Container, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomNavbar from '../../components/Navbar';
import Header from '../../components/Header';
import './../../css/faq.css';

const faqs = [
  {
    question: '¿Cómo puedo registrarme?',
    answer: (
      <span>
        Puedes registrarte haciendo clic en el apartado <Link to="/register">Registrarse</Link> en la esquina superior derecha de la página y completando el formulario de registro.
      </span>
    ),
  },
  {
    question: '¿Cómo puedo recuperar mi contraseña?',
    answer: (
      <span>
        Si olvidaste tu contraseña, puedes recuperarla haciendo clic en <Link to="/recuperarcontra">¿Olvidaste tu contraseña?</Link> en la página de inicio de sesión y siguiendo las instrucciones.
      </span>
    ),
  },
  {
    question: '¿Cómo puedo contactar al soporte?',
    answer: (
      <span>
        Puedes contactar al soporte enviando un correo a soporte@ejemplo.com o llamando al +52 123456789. También puedes ir al apartado de <Link to="/contacts">Contactos</Link>.
      </span>
    ),
  },
  {
    question: '¿Cómo puedo agregar un producto?',
    answer: 'Para agregar un producto, inicia sesión en tu cuenta de vendedor y haz clic en "Agregar producto" en tu panel de control.',
  },
  // Agrega más preguntas y respuestas según sea necesario
];

const FAQ = () => {
  return (
    <div>
      <CustomNavbar />
      <Header />
      <Container className="mt-5 faq-container">
        <h2 className="faq-title">Preguntas Frecuentes</h2>
        <Accordion defaultActiveKey="0">
          {faqs.map((faq, index) => (
            <Accordion.Item eventKey={String(index)} key={index} className="faq-card">
              <Accordion.Header className="faq-question">
                {faq.question}
              </Accordion.Header>
              <Accordion.Body className="faq-answer">
                {faq.answer}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </div>
  );
};

export default FAQ;

import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import CustomNavbar from './../../components/Navbar';
import Header from './../../components/Header';
import './../../css/Contacts.css';
import qrmar from './../../imgs/instamar.jpg';
import qrluis from './../../imgs/instaluis.jpg';
import qrmemo from './../../imgs/instamemo.jpg';
import qrbran from './../../imgs/instabran.jpg';

const contacts = [
  {
    name: 'Guillermo Sanchez Flores',
    email: 'gsanchezf1900@alumno.ipn.mx',
    phone: '+52 7331087133',
    image: qrmemo,
  },
  {
    name: 'Luis Angel Bernal Perez',
    email: 'labptop0520@outlook.com',
    phone: '+0987654321',
    image: qrluis,
  },
  {
    name: 'Campero Beleche Brandon Antonio',
    email: 'brandon@example.com',
    phone: '+52 5569654981',
    image: qrbran,
  },
  {
    name: 'Elias Diaz Mariana Sofia',
    email: 'sofielias132@gmail.com',
    phone: '+52 5580334983',
    image: qrmar,
  },
];

const Contacts = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div>
      <CustomNavbar />
      <Header />
      <Container className="mt-5 contact-container">
        {contacts.map((contact, index) => (
          <Card className="mb-4 contact-card" key={index}>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title className="contact-name">{contact.name}</Card.Title>
                </Col>
              </Row>
              <Row className="align-items-center mt-2">
                <Col className="d-flex flex-column contact-details">
                  <span className="contact-info">Correo: {contact.email}</span>
                  <span className="contact-info">Teléfono: {contact.phone}</span>
                </Col>
                <Col className="text-end">
                  <img
                    src={contact.image}
                    alt="QR Code"
                    className="qr-image"
                    onClick={() => handleImageClick(contact.image)}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Body>
            <img src={selectedImage} alt="QR Code Enlarged" className="img-fluid" />
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default Contacts;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../../css/RecuperarContra.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './../../components/Header';
import Navbar from './../../components/Navbar';
import loginImage from './../../imgs/login.png';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap'; 

const RecuperarContra = () => {
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [codigoValido, setCodigoValido] = useState(false);
  const [email, setEmail] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Correo electrónico inválido').required('Por favor, ingresa tu correo electrónico')
  });

  const handleSubmit = async () => {
    try {
      await validationSchema.validate({ email }, { abortEarly: false });
      setShowModal(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCodigoSubmit = () => {
    // Validar el código (temporalmente 123456)
    if (codigo === '123456') {
      setCodigoValido(true);
      // Mostrar alerta de código verificado
      Swal.fire('¡Código verificado!', 'Ahora puede restablecer su contraseña.', 'success').then((result) => {
        // Redirigir al usuario al login
        window.location.href = '/cambiarcontra';
      });
    } else {
    
      Swal.fire('¡Código incorrecto!', 'Por favor, intente de nuevo.', 'error');
    }
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card transparent-card">
              <div className="card-body">
                <div className="login-image-container">
                  <img src={loginImage} alt="Recuperar Contraseña ESCOMhub" className="login-image" />
                  <div className="image-text-overlay">
                    <p>Recuperar Contraseña <span>ESCOMhub</span></p>
                    <p>Favor de llenar todos los campos con la información correspondiente</p>
                  </div>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                <form>
                  <p>Para poder recuperar la contraseña ingrese el correo con el que se registró en la aplicación</p>
                  <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="text-center">
                    <button type="button" onClick={handleSubmit} className="btn btn-continuar btn-block mt-3 elegant-button">Continuar</button>
                    <Link to="/login" className="btn btn-cancelar btn-block mt-3 elegant-button">Cancelar</Link>
                  </div>
                </form>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Verificar código</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form>
                      <div className="form-group">
                        <label htmlFor="codigo">Código de verificación</label>
                        <input
                          type="text"
                          id="codigo"
                          name="codigo"
                          className="form-control"
                          value={codigo}
                          onChange={(e) => setCodigo(e.target.value)}
                        />
                      </div>
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleCodigoSubmit}>Verificar</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecuperarContra;

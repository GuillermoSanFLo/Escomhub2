import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './../../components/Header';
import Navbar from './../../components/Navbar';
import loginImage from './../../imgs/login.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const CambiarContra = () => {
  const [showInitialAlert, setShowInitialAlert] = useState(true);

  useEffect(() => {
    // Mostrar Sweet Alert al cargar la página
    Swal.fire({
      icon: 'info',
      title: 'Información',
      html: '<p>Longitud Mínima: 8 caracteres.</p>' +
            '<p>Letras Mayúsculas: Incluir al menos una letra mayúscula (A-Z).</p>' +
            '<p>Letras Minúsculas: Incluir al menos una letra minúscula (a-z).</p>' +
            '<p>Números: Incluir al menos un número (0-9).</p>' +
            '<p>Caracteres Especiales: Incluir al menos un carácter especial (por ejemplo, !@#$%^&*).</p>',
      confirmButtonText: 'Entendido'
    });
  }, []);

  const initialValues = {
    newPassword: '',
    confirmNewPassword: ''
  };

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('Por favor, ingrese su nueva contraseña')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'
      ),
    confirmNewPassword: Yup.string()
      .required('Por favor, confirme su nueva contraseña')
      .oneOf([Yup.ref('newPassword'), null], 'Las contraseñas deben coincidir')
  });

  const handleSubmit = (values) => {
    // Aquí podrías enviar la solicitud para cambiar la contraseña con la nueva contraseña proporcionada
    
    // Mostrar Sweet Alert al cambiar la contraseña
    Swal.fire({
      icon: 'success',
      title: 'Contraseña cambiada',
      text: 'Su contraseña ha sido cambiada exitosamente.',
      confirmButtonText: 'OK'
    }).then((result) => {
      // Redirigir al usuario al login al hacer clic en el botón de confirmación
      if (result.isConfirmed) {
        window.location.href = '/login';
      }
    });
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
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <p>Escriba la nueva contraseña con la que va a ingresar</p>
                    <div className="form-group">
                      <label htmlFor="newPassword">Nueva contraseña</label>
                      <Field
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="form-control"
                      />
                      <ErrorMessage name="newPassword" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmNewPassword">Confirmar contraseña</label>
                      <Field
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        className="form-control"
                      />
                      <ErrorMessage name="confirmNewPassword" component="div" className="text-danger" />
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-continuar btn-block mt-3 elegant-button">Continuar</button>
                      <Link to="/login" className="btn btn-cancelar btn-block mt-3 elegant-button">Cancelar</Link>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CambiarContra;

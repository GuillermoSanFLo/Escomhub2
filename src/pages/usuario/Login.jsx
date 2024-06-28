import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../../css/Login.css';
import Header from './../../components/Header';
import Navbar from './../../components/Navbar';
import loginImage from './../../imgs/login.png';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { usuarios } from './../../data/Usuarios'; // Importar la lista de usuarios

const Login = () => {
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Correo electrónico no válido').required('Este campo es requerido'),
    password: Yup.string().required('Este campo es requerido')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!values.email || !values.password) {
      setError('Por favor, completa todos los campos.');
      setSubmitting(false);
      return;
    }

    try {
      const user = usuarios.find(user => user.correoElectronico === values.email);

      if (user) {
        if (user.contrasena === values.password) {
          localStorage.setItem('username', user.nombre);
          setIsLoggingIn(true);

          await Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            showConfirmButton: true,
            confirmButtonText: 'OK'
          });

          if (user.tipo === 'Vendedor') {
            window.location.href = '/vendedor';
          } else {
            window.location.href = '/';
          }
        } else {
          throw new Error('Contraseña incorrecta');
        }
      } else {
        throw new Error('Correo no encontrado');
      }
    } catch (error) {
      let errorMessage;
      if (error.message === 'Correo no encontrado') {
        errorMessage = 'Correo electrónico no encontrado. Verifica tus credenciales.';
      } else if (error.message === 'Contraseña incorrecta') {
        errorMessage = 'Contraseña incorrecta. Verifica tu contraseña.';
      } else {
        errorMessage = 'Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde.';
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
      });
    }

    setSubmitting(false);
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
                  <img src={loginImage} alt="Bienvenido de vuelta a ESCOMhub" className="login-image" />
                  <div className="image-text-overlay">
                    <p>Bienvenido de vuelta a <span>ESCOMhub</span></p>
                    <p>Descubre tus nuevos favoritos</p>
                  </div>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form>
                      {error && <div className="alert alert-danger">{error}</div>}
                      <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className={`form-control ${
                            touched.email && errors.email ? 'is-invalid' : ''
                          }`}
                        />
                        {touched.email && errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <Field
                          type="password"
                          id="password"
                          name="password"
                          className={`form-control ${
                            touched.password && errors.password ? 'is-invalid' : ''
                          }`}
                        />
                        {touched.password && errors.password && (
                          <div className="invalid-feedback">{errors.password}</div>
                        )}
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block mt-3 elegant-button"
                          disabled={isSubmitting || isLoggingIn}
                        >
                          {isLoggingIn ? 'Iniciando sesión...' : 'Iniciar sesión'}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
                <div className="mt-3 text-center">
                  <p>
                    <Link to="/register">Regístrate ahora</Link> |{' '}
                    <Link to="/recuperarcontra">¿Olvidaste tu contraseña?</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

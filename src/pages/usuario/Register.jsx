import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from './../../components/Navbar';
import Header from './../../components/Header';
import './../../css/Register.css';
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const categories = [
  'Comida preparada',
  'Golosinas y frituras',
  'Electrónica',
  'Papelería',
  'Servicios',
  'Ropa y accesorios',
  'Videojuegos & juguetes',
  'Libros & material de apoyo',
  'Postres',
  'Bebidas'
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nombre es requerido'),
  lastName: Yup.string().required('Apellido es requerido'),
  email: Yup.string().email('Correo electrónico inválido').required('Correo electrónico es requerido'),
  password: Yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('Contraseña es requerida'),
  studentId: Yup.string().when('accountType', {
    is: 'vendor',
    then: Yup.string().required('Número de Boleta es requerido')
  }),
  selectedCategories: Yup.array().when('accountType', {
    is: 'vendor',
    then: Yup.array().min(1, 'Debe seleccionar al menos una categoría')
  }),
  aboutMe: Yup.string().required('Sobre mí es requerido'),
  birthDate: Yup.date().required('Fecha de nacimiento es requerida')
});

const Register = () => {
  const [accountType, setAccountType] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const handleAccountTypeChange = (type, resetForm) => {
    setAccountType(type);
    resetForm();
    setSelectedCategories([]);
  };

  const handleCategorySelect = (event) => {
    const selectedCategory = event.target.value;
    if (!selectedCategories.includes(selectedCategory)) {
      setSelectedCategories([...selectedCategories, selectedCategory]);
    }
  };

  const handleCategoryRemove = (category) => {
    setSelectedCategories(selectedCategories.filter(c => c !== category));
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    // Aquí puedes manejar la lógica de envío del formulario
    Swal.fire({
      icon: 'success',
      title: 'Registrado',
      text: 'Usuario registrado exitosamente'
    }).then(() => {
      navigate('/');
    });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div >
      <CustomNavbar />
      <Header />
      <div className="register-form container">
        <h2>Registrar Cuenta</h2>
        <Formik
          initialValues={{
            name: '',
            lastName: '',
            email: '',
            password: '',
            studentId: '',
            selectedCategories: [],
            accountType: '',
            aboutMe: '',
            birthDate: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ resetForm, values }) => (
            <Form className="form-content">
              <div className="account-type-selection">
                <button
                  type="button"
                  className={`btn ${accountType === 'user' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleAccountTypeChange('user', resetForm)}
                  style={{ margin: '10px', padding: '10px 20px' }}
                >
                  Usuario
                </button>
                <button
                  type="button"
                  className={`btn ${accountType === 'vendor' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleAccountTypeChange('vendor', resetForm)}
                  style={{ margin: '10px', padding: '10px 20px' }}
                >
                  Vendedor
                </button>
              </div>
              {accountType && (
                <>
                  <Field type="hidden" name="accountType" value={accountType} />
                  <div className="mb-3 form-floating">
                    <Field
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Nombre"
                    />
                    <label htmlFor="name">Nombre</label>
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3 form-floating">
                    <Field
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      placeholder="Apellido"
                    />
                    <label htmlFor="lastName">Apellido</label>
                    <ErrorMessage name="lastName" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3 form-floating">
                    <Field
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Correo Electrónico"
                    />
                    <label htmlFor="email">Correo Electrónico</label>
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3 form-floating">
                    <Field
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Contraseña"
                    />
                    <label htmlFor="password">Contraseña</label>
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3 form-floating">
                    <Field
                      as="textarea"
                      className="form-control"
                      id="aboutMe"
                      name="aboutMe"
                      placeholder="Sobre mí"
                    />
                    <label htmlFor="aboutMe">Sobre mí</label>
                    <ErrorMessage name="aboutMe" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3 form-floating">
                    <Field
                      type="date"
                      className="form-control"
                      id="birthDate"
                      name="birthDate"
                      placeholder="Fecha de Nacimiento"
                    />
                    <label htmlFor="birthDate">Fecha de Nacimiento</label>
                    <ErrorMessage name="birthDate" component="div" className="text-danger" />
                  </div>
                  {accountType === 'vendor' && (
                    <>
                      <div className="mb-3 form-floating">
                        <Field
                          type="text"
                          className="form-control"
                          id="studentId"
                          name="studentId"
                          placeholder="Número de Boleta"
                        />
                        <label htmlFor="studentId">Número de Boleta</label>
                        <ErrorMessage name="studentId" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="categorySelect" className="form-label">Seleccionar Categorías</label>
                        <Field
                          as="select"
                          className="form-control"
                          id="categorySelect"
                          onChange={handleCategorySelect}
                          value=""
                        >
                          <option value="" disabled>Selecciona una categoría</option>
                          {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="selectedCategories" component="div" className="text-danger" />
                        <div className="selected-categories">
                          {selectedCategories.map((category, index) => (
                            <div key={index} className="selected-category">
                              {category} <span onClick={() => handleCategoryRemove(category)}>x</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  <div className="button-group">
                    <button type="submit" className="btn btn-primary">Registrar</button>
                    <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancelar</button>
                  </div>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;

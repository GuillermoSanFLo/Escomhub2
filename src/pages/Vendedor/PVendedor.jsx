import React, { useEffect, useState } from 'react';
import CustomNavbarV from './../../components/NavbarV';
import Header from './../../components/Header';
import { Container, Row, Col, Card, Button, Modal, Form, ProgressBar } from 'react-bootstrap';
import { products } from './../../data/products'; // Importa el array de productos
import './../../css/PVendedor.css'; // Importa el archivo de estilos CSS personalizados
import { BiTrash, BiPencil } from 'react-icons/bi'; // Importa los iconos de React Icons
import Swal from 'sweetalert2'; // Importa SweetAlert
import { FaStar } from 'react-icons/fa'; // Importa el icono de estrella de React Icons

const Pvendedor = () => {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [nombreProducto, setNombreProducto] = useState('');
  const [descripcionProducto, setDescripcionProducto] = useState('');
  const [precioProducto, setPrecioProducto] = useState(0);
  const [imagenProducto, setImagenProducto] = useState('');
  const [cantidadProducto, setCantidadProducto] = useState(0);
  const [vendidoProducto, setVendidoProducto] = useState(0);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [username] = useState(localStorage.getItem('username') || 'Guillermo'); // Obtén el nombre de usuario del localStorage

  // Función para filtrar productos por el nombre de usuario
  const filtrarProductos = () => {
    const productosFiltrados = products.filter(producto => producto.vendedor === username);
    setProductos(productosFiltrados);
  };

  useEffect(() => {
    filtrarProductos();
  }, []);

  // Función para eliminar un producto
  const eliminarProducto = (id) => {
    // Muestra un SweetAlert para confirmar la eliminación
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Elimina el producto de la lista
        const productosActualizados = productos.filter(producto => producto.id !== id);
        setProductos(productosActualizados);

        // Aquí podrías implementar la lógica real para eliminar el producto de tu base de datos
        console.log(`Eliminar producto con ID: ${id}`);
        Swal.fire(
          'Eliminado',
          'El producto ha sido eliminado.',
          'success'
        );
      }
    });
  };

  // Función para abrir/cerrar el modal de agregar producto
  const toggleModal = () => setShowModal(!showModal);

  // Función para abrir/cerrar el modal de editar producto
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  // Función para cargar datos del producto seleccionado en el modal de edición
  const cargarDatosProducto = (id) => {
    const producto = productos.find(producto => producto.id === id);
    if (producto) {
      setProductoSeleccionado(producto);
      setNombreProducto(producto.name);
      setDescripcionProducto(producto.fullDescription);
      setPrecioProducto(producto.price);
      setImagenProducto(producto.image);
      setCantidadProducto(producto.total);
      setVendidoProducto(producto.sold);
      toggleEditModal();
    }
  };

  // Función para manejar el envío del formulario de edición de producto
  const handleEditarProducto = (event) => {
    event.preventDefault();
    // Aquí podrías implementar la lógica para editar el producto en la base de datos
    console.log('Editando producto:', productoSeleccionado.id, nombreProducto, descripcionProducto, precioProducto, imagenProducto, cantidadProducto, vendidoProducto);

    // Simulamos la edición del producto en la lista (esto debería venir de la base de datos)
    const productosActualizados = productos.map(producto => {
      if (producto.id === productoSeleccionado.id) {
        return {
          ...producto,
          name: nombreProducto,
          fullDescription: descripcionProducto,
          price: precioProducto,
          image: imagenProducto,
          total: cantidadProducto,
          sold: vendidoProducto
        };
      }
      return producto;
    });

    // Actualizamos la lista de productos
    setProductos(productosActualizados);

    // Cerramos el modal de edición
    toggleEditModal();

    // Limpiamos los campos del formulario
    setNombreProducto('');
    setDescripcionProducto('');
    setPrecioProducto(0);
    setImagenProducto('');
    setCantidadProducto(0);
    setVendidoProducto(0);

    // Mostramos un mensaje de éxito (esto puede ser reemplazado con tu lógica real)
    Swal.fire(
      '¡Producto editado!',
      'El producto ha sido editado correctamente.',
      'success'
    );
  };

  // Función para manejar el envío del formulario de nuevo producto
  const handleAgregarProducto = (event) => {
    event.preventDefault();
    // Aquí podrías implementar la lógica para agregar el nuevo producto a la base de datos
    console.log('Agregando nuevo producto:', nombreProducto, descripcionProducto, precioProducto, imagenProducto, cantidadProducto, vendidoProducto);

    // Simulamos que agregamos el producto a la lista (esto debería venir de la base de datos)
    const nuevoProducto = {
      id: productos.length + 1,
      name: nombreProducto,
      fullDescription: descripcionProducto,
      price: precioProducto,
      sold: vendidoProducto,
      total: cantidadProducto,
      rating: 0,
      reviews: 0,
      image: imagenProducto,
      vendedor: username
    };

    // Actualizamos la lista de productos
    setProductos([...productos, nuevoProducto]);

    // Cerramos el modal
    toggleModal();

    // Limpiamos los campos del formulario
    setNombreProducto('');
    setDescripcionProducto('');
    setPrecioProducto(0);
    setImagenProducto('');
    setCantidadProducto(0);
    setVendidoProducto(0);

    // Mostramos un mensaje de éxito (esto puede ser reemplazado con tu lógica real)
    Swal.fire(
      '¡Producto agregado!',
      'El nuevo producto ha sido agregado correctamente.',
      'success'
    );
  };

  return (
    <div>
      <CustomNavbarV />
      <Header />
      <Container className="mt-5 producto-container">
        <Row className="mb-3">
          <Col>
            <h4>Bienvenido Vendedor {username}</h4>
            <p>Resumen de tus productos publicados: {productos.length}</p>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={toggleModal}>Agregar producto</Button>
          </Col>
        </Row>

        {productos.map(producto => (
          <Row key={producto.id} className="producto-card mb-3">
            <Col>
              <Card>
                <Card.Body className="d-flex align-items-start">
                  <img src={producto.image} alt={producto.name} className="card-img-left" />
                  <div className="card-text">
                    <Card.Title>{producto.name}</Card.Title>
                    <Card.Text>{producto.fullDescription}</Card.Text>
                    <Card.Text className="precio">Precio: ${producto.price}</Card.Text>
                    <ProgressBar now={(producto.sold / producto.total) * 100} label={`${producto.sold}/${producto.total}`} />
                    <Card.Text className="mt-2">Vendidos: {producto.sold} / Quedan: {producto.total - producto.sold}</Card.Text>
                    <Card.Text className="mt-2">
                      {Array.from({ length: 5 }, (_, index) => (
                        <FaStar key={index} color={index < producto.rating ? 'gold' : 'gray'} />
                      ))}
                      <span className="ms-2">{producto.reviews} reseñas</span>
                    </Card.Text>
                    <div className="acciones">
                      <BiTrash className="icon" onClick={() => eliminarProducto(producto.id)} />
                      <BiPencil className="icon" onClick={() => cargarDatosProducto(producto.id)} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}

        {/* Modal para agregar producto */}
        <Modal show={showModal} onHide={toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Nuevo Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAgregarProducto}>
              <Form.Group controlId="nombreProducto">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre del producto"
                  value={nombreProducto}
                  onChange={(e) => setNombreProducto(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="descripcionProducto">
                <Form.Label>Descripción del Producto</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ingrese la descripción del producto"
                  value={descripcionProducto}
                  onChange={(e) => setDescripcionProducto(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="precioProducto">
                <Form.Label>Precio del Producto</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese el precio del producto"
                  value={precioProducto}
                  onChange={(e) => setPrecioProducto(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="imagenProducto">
                <Form.Label>URL de la Imagen del Producto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la URL de la imagen del producto"
                  value={imagenProducto}
                  onChange={(e) => setImagenProducto(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="cantidadProducto">
                <Form.Label>Cantidad del Producto</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese la cantidad total del producto"
                  value={cantidadProducto}
                  onChange={(e) => setCantidadProducto(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="vendidoProducto">
                <Form.Label>Cantidad Vendida del Producto</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese la cantidad vendida del producto"
                  value={vendidoProducto}
                  onChange={(e) => setVendidoProducto(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Agregar Producto
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Modal para editar producto */}
        <Modal show={showEditModal} onHide={toggleEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleEditarProducto}>
            <Form.Group controlId="nombreProducto">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del producto"
                value={nombreProducto}
                onChange={(e) => setNombreProducto(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="descripcionProducto">
              <Form.Label>Descripción del Producto</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese la descripción del producto"
                value={descripcionProducto}
                onChange={(e) => setDescripcionProducto(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="precioProducto">
              <Form.Label>Precio del Producto</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese el precio del producto"
                value={precioProducto}
                onChange={(e) => setPrecioProducto(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="imagenProducto">
              <Form.Label>URL de la Imagen del Producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la URL de la imagen del producto"
                value={imagenProducto}
                onChange={(e) => setImagenProducto(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="cantidadProducto">
              <Form.Label>Cantidad del Producto</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese la cantidad total del producto"
                value={cantidadProducto}
                onChange={(e) => setCantidadProducto(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="vendidoProducto">
              <Form.Label>Cantidad Vendida del Producto</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese la cantidad vendida del producto"
                value={vendidoProducto}
                onChange={(e) => setVendidoProducto(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  </div>
);
};

export default Pvendedor;

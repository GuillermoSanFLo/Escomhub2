
const initialProducts = [
    { id: 1, name: 'Taco', category: 'Comida preparada', description: 'Delicioso taco mexicano.', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Chips', category: 'Golosinas y frituras', description: 'Papas fritas crujientes.', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Laptop', category: 'Electrónica', description: 'Laptop de alta gama.', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Cuaderno', category: 'Papelería', description: 'Cuaderno para notas.', image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Servicio de limpieza', category: 'Servicios', description: 'Limpieza profesional.', image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Camisa', category: 'Ropa y accesorios', description: 'Camisa de algodón.', image: 'https://via.placeholder.com/150' },
    { id: 7, name: 'Juego de mesa', category: 'Videojuegos & juguetes', description: 'Juego de mesa divertido.', image: 'https://via.placeholder.com/150' },
    { id: 8, name: 'Libro de programación', category: 'Libros & material de apoyo', description: 'Libro para aprender a programar.', image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Pastel', category: 'Postres', description: 'Delicioso pastel de chocolate.', image: 'https://via.placeholder.com/150' },
    { id: 10, name: 'Refresco', category: 'Bebidas', description: 'Refresco de cola.', image: 'https://via.placeholder.com/150' },
    { id: 11, name: 'Pizza', category: 'Comida preparada', description: 'Pizza de pepperoni.', image: 'https://via.placeholder.com/150' },
    { id: 12, name: 'Galletas', category: 'Golosinas y frituras', description: 'Galletas de chocolate.', image: 'https://via.placeholder.com/150' },
    { id: 13, name: 'Smartphone', category: 'Electrónica', description: 'Teléfono inteligente.', image: 'https://via.placeholder.com/150' },
    { id: 14, name: 'Lápiz', category: 'Papelería', description: 'Lápiz HB.', image: 'https://via.placeholder.com/150' },
    { id: 15, name: 'Clases de matemáticas', category: 'Servicios', description: 'Clases particulares de matemáticas.', image: 'https://via.placeholder.com/150' },
    { id: 16, name: 'Pantalones', category: 'Ropa y accesorios', description: 'Pantalones de mezclilla.', image: 'https://via.placeholder.com/150' },
    { id: 17, name: 'Muñeca', category: 'Videojuegos & juguetes', description: 'Muñeca de colección.', image: 'https://via.placeholder.com/150' },
    { id: 18, name: 'Libro de cocina', category: 'Libros & material de apoyo', description: 'Libro de recetas.', image: 'https://via.placeholder.com/150' },
    { id: 19, name: 'Helado', category: 'Postres', description: 'Helado de vainilla.', image: 'https://via.placeholder.com/150' },
    { id: 20, name: 'Jugo', category: 'Bebidas', description: 'Jugo de naranja.', image: 'https://via.placeholder.com/150' },
    { id: 21, name: 'Hamburguesa', category: 'Comida preparada', description: 'Hamburguesa con queso.', image: 'https://via.placeholder.com/150' },
    { id: 22, name: 'Caramelos', category: 'Golosinas y frituras', description: 'Caramelos de menta.', image: 'https://via.placeholder.com/150' },
    { id: 23, name: 'Tablet', category: 'Electrónica', description: 'Tablet de última generación.', image: 'https://via.placeholder.com/150' },
    { id: 24, name: 'Bolígrafo', category: 'Papelería', description: 'Bolígrafo de tinta negra.', image: 'https://via.placeholder.com/150' },
    { id: 25, name: 'Asesoría legal', category: 'Servicios', description: 'Asesoría legal profesional.', image: 'https://via.placeholder.com/150' },
    { id: 26, name: 'Gorro', category: 'Ropa y accesorios', description: 'Gorro de lana.', image: 'https://via.placeholder.com/150' },
    { id: 27, name: 'Pelota', category: 'Videojuegos & juguetes', description: 'Pelota de fútbol.', image: 'https://via.placeholder.com/150' },
    { id: 28, name: 'Diccionario', category: 'Libros & material de apoyo', description: 'Diccionario bilingüe.', image: 'https://via.placeholder.com/150' },
    { id: 29, name: 'Tarta', category: 'Postres', description: 'Tarta de manzana.', image: 'https://via.placeholder.com/150' },
    { id: 30, name: 'Agua mineral', category: 'Bebidas', description: 'Agua mineral con gas.', image: 'https://via.placeholder.com/150' },
    { id: 31, name: 'Ensalada César', category: 'Comida preparada', description: 'Ensalada fresca con aderezo César.', image: 'https://via.placeholder.com/150' },
    { id: 32, name: 'Chicle de menta', category: 'Golosinas y frituras', description: 'Chicle de menta refrescante.', image: 'https://via.placeholder.com/150' },
    { id: 33, name: 'Cámara DSLR', category: 'Electrónica', description: 'Cámara réflex digital de alta calidad.', image: 'https://via.placeholder.com/150' },
    { id: 34, name: 'Bloc de notas', category: 'Papelería', description: 'Bloc de notas con tapa dura.', image: 'https://via.placeholder.com/150' },
    { id: 35, name: 'Limpieza de alfombras', category: 'Servicios', description: 'Servicio profesional de limpieza de alfombras.', image: 'https://via.placeholder.com/150' },
    { id: 36, name: 'Bufanda de lana', category: 'Ropa y accesorios', description: 'Bufanda tejida de lana suave.', image: 'https://via.placeholder.com/150' },
    { id: 37, name: 'Muñeco de peluche', category: 'Videojuegos & juguetes', description: 'Muñeco de peluche de osito.', image: 'https://via.placeholder.com/150' },
    { id: 38, name: 'Novela de ciencia ficción', category: 'Libros & material de apoyo', description: 'Novela emocionante de ciencia ficción.', image: 'https://via.placeholder.com/150' },
    { id: 39, name: 'Pastel de tres leches', category: 'Postres', description: 'Pastel esponjoso de tres leches.', image: 'https://via.placeholder.com/150' },
    { id: 40, name: 'Café negro', category: 'Bebidas', description: 'Taza de café negro recién preparado.', image: 'https://via.placeholder.com/150' },
  ];
  
  export default initialProducts;
  

import solchecitos from './../imgs/solchecitos.png';
import papas from './../imgs/papas.png';
import cacahuates from './../imgs/cacahuates.png';
import trufa from './../imgs/trufa.png';
import pizza from './../imgs/pizza.png';
import muffin from './../imgs/muffins.jpeg';
import ensalada from './../imgs/ensalada.jpeg';
import Refresco from './../imgs/refresco.jpg'
import Papas from './../imgs/papas.png'
import Brownie from './../imgs/brownie.jpeg'
import GalletaA from './../imgs/GalletaA.jpg'
import pera from './../imgs/pera.jpeg'
export const products = [
    {
      vendedor: 'Guillermo',
      id: 1,
      name: 'Muffin Chocolate de Costco',
      price: 20,
      rating: 1,
      reviews: 2,
      image: muffin,
      fullDescription: 'Rico muffin de de vainilla con chispas de chocolate de Costco.',
      sold: 10,
      total: 30,
      contact: {
        phone: '5524209358',
        name: 'Brandon Beleche',
        hours: 'Lunes a Viernes de 10am a 5pm'
      },
      reviewsList: [
        { name: 'Juan', comment: 'Muy ricos muffins, sin duda los volvería a comprar' },
        { name: 'Alexa', comment: 'Deliciosos y frescos!' }
      ]
    },
    {
      vendedor: 'Guillermo',
      id: 2,
      name: 'Trufa de Nuez',
      price: 5,
      rating: 5,
      reviews: 4,
      image:  trufa,
      fullDescription: 'Deliciosa trufa de chocolate con nuez.',
      sold: 25,
      total: 30,
      contact: {
        phone: '5524209359',
        name: 'Maria Lopez',
        hours: 'Lunes a Viernes de 9am a 6pm'
      },
      reviewsList: [
        { name: 'Carlos', comment: 'Las mejores trufas que he probado.' },
        { name: 'Sofia', comment: 'Excelentes para regalar.' }
      ]
    },
    {
      vendedor: 'Guillermo',
      id: 3,
      name: 'Rebanada de Pizza de Pepperoni',
      price: 25,
      rating: 4,
      reviews: 3,
      image: pizza,
      fullDescription: 'Rebanada de pizza de pepperoni con queso extra.',
      sold: 8,
      total: 10,
      contact: {
        phone: '5524209360',
        name: 'Luis Hernandez',
        hours: 'Lunes a Domingo de 11am a 11pm'
      },
      reviewsList: [
        { name: 'Ana', comment: 'Muy buena pizza, crujiente y deliciosa.' },
        { name: 'Miguel', comment: 'Buen tamaño y sabor.' }
      ]
    },
    {
      vendedor: 'shh',
      id: 30,
      name: 'Pera',
      price: 15,
      rating: 0,
      reviews: 0,
      image: pera,
      fullDescription: 'Pera rica',
      sold: 0,
      total: 10,
      contact: {
        phone: '5524209360',
        name: 'Luis Hernandez',
        hours: 'Lunes a Domingo de 11am a 11pm'
      },
      reviewsList: [
        
      ]
    },
    {
      id: 4,
      name: 'Refresco 355ml Variedad de Sabores',
      price: 8,
      rating: 3,
      reviews: 1,
      image: Refresco,
      fullDescription: 'Refresco de 355ml disponible en varios sabores.',
      sold: 1,
      total: 15,
      contact: {
        phone: '5524209361',
        name: 'Carmen Sanchez',
        hours: 'Lunes a Viernes de 10am a 5pm'
      },
      reviewsList: [
        { name: 'Jose', comment: 'Refresco frío y refrescante.' }
      ]
    },
    {
      id: 5,
      name: 'Bolsa de Papas Fritas',
      price: 12,
      rating: 4,
      reviews: 5,
      image:  Papas,
      fullDescription: 'Bolsa de papas fritas con sal y un toque de limón.',
      sold: 18,
      total: 25,
      contact: {
        phone: '5524209362',
        name: 'Andres Gonzalez',
        hours: 'Lunes a Viernes de 8am a 6pm'
      },
      reviewsList: [
        { name: 'Laura', comment: 'Crujientes y sabrosas.' },
        { name: 'Marcos', comment: 'El toque de limón es perfecto.' }
      ]
    },
    {
      
      id: 6,
      name: 'Brownie de Chocolate',
      price: 15,
      rating: 5,
      reviews: 6,
      image:  Brownie,
      fullDescription: 'Brownie de chocolate con nueces.',
      sold: 10,
      total: 20,
      contact: {
        phone: '5524209363',
        name: 'Pedro Perez',
        hours: 'Lunes a Sábado de 9am a 7pm'
      },
      reviewsList: [
        { name: 'Gabriela', comment: 'El mejor brownie que he probado.' },
        { name: 'Daniel', comment: 'Muy esponjoso y delicioso.' }
      ]
    },
    {
      id: 7,
      name: 'Galletas de Avena con Pasas',
      price: 10,
      rating: 4,
      reviews: 2,
      image: GalletaA,
      fullDescription: 'Galletas de avena con pasas hechas en casa.',
      sold: 15,
      total: 20,
      contact: {
        phone: '5524209364',
        name: 'Lorena Jimenez',
        hours: 'Lunes a Viernes de 10am a 4pm'
      },
      reviewsList: [
        { name: 'Fernanda', comment: 'Deliciosas y saludables.' },
        { name: 'Raul', comment: 'Perfectas para acompañar el café.' }
      ]
    },
    {
      id: 8,
      name: 'Pastel de Zanahoria',
      price: 30,
      rating: 5,
      reviews: 3,
      image: 'https://via.placeholder.com/150',
      fullDescription: 'Pastel de zanahoria con cobertura de queso crema.',
      sold: 5,
      total: 10,
      contact: {
        phone: '5524209365',
        name: 'Patricia Romero',
        hours: 'Lunes a Domingo de 10am a 8pm'
      },
      reviewsList: [
        { name: 'Ricardo', comment: 'Muy húmedo y sabroso.' },
        { name: 'Claudia', comment: 'La cobertura es deliciosa.' }
      ]
    },
    {
      vendedor: 'Guillermo',
      id: 9,
      name: 'Ensalada César',
      price: 20,
      rating: 4,
      reviews: 5,
      image: ensalada,
      fullDescription: 'Ensalada César con aderezo casero.',
      sold: 10,
      total: 15,
      contact: {
        phone: '5524209366',
        name: 'Jorge Rivas',
        hours: 'Lunes a Viernes de 11am a 4pm'
      },
      reviewsList: [
        { name: 'Nora', comment: 'Fresca y deliciosa.' },
        { name: 'Roberto', comment: 'El aderezo es excelente.' }
      ]
    },
    {
      id: 10,
      name: 'Taco al Pastor',
      price: 18,
      rating: 5,
      reviews: 10,
      image: 'https://via.placeholder.com/150',
      fullDescription: 'Taco al pastor con piña y cilantro.',
      sold: 50,
      total: 50,
      contact: {
        phone: '5524209367',
        name: 'Alejandro Ruiz',
        hours: 'Lunes a Domingo de 12pm a 10pm'
      },
      reviewsList: [
        { name: 'Silvia', comment: 'Los mejores tacos al pastor de la ciudad.' },
        { name: 'Carlos', comment: 'Muy sabrosos y bien servidos.' }
      ]
    },
    {
      id: 11,
      name: 'Sándwich de Jamón y Queso',
      price: 15,
      rating: 3,
      reviews: 1,
      image: 'https://via.placeholder.com/150',
      fullDescription: 'Sándwich de jamón y queso con mayonesa.',
      sold: 5,
      total: 10,
      contact: {
        phone: '5524209368',
        name: 'Diana Torres',
        hours: 'Lunes a Viernes de 9am a 5pm'
      },
      reviewsList: [
        { name: 'Rafael', comment: 'Simple pero delicioso.' }
      ]
    },
    {
      id: 12,
      name: 'Jugo de Naranja Natural',
      price: 12,
      rating: 4,
      reviews: 3,
      image: 'https://via.placeholder.com/150',
      fullDescription: 'Jugo de naranja recién exprimido.',
      sold: 10,
      total: 20,
      username: 'Amdmin Guillermo',
      contact: {
        phone: '5524209369',
        name: 'Guillermo',
       
        hours: 'Lunes a Domingo de 7am a 1pm'
      },
      reviewsList: [
        { name: 'Mario', comment: 'Muy refrescante y natural.' },
        { name: 'Isabel', comment: 'Perfecto para el desayuno.' }
      ]
    }
  ];
  
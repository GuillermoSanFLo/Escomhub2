import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/usuario/Login.jsx';
import PrincipalP from './pages/usuario/PrincipalP.jsx';
import Register from './pages/usuario/Register.jsx';
import Products from './pages/usuario/Products.jsx'; 
import VistaProducto from './components/VistaProducto.jsx';
import { CartProvider } from './components/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecuperarContra from "./pages/usuario/RecuperarContra.jsx";
import CambiarContra from "./pages/usuario/CambiarContra.jsx";
import PVendedor from "./pages/Vendedor/PVendedor.jsx";
import Cart from "./pages/usuario/cart.jsx";
import Juegos from "./pages/usuario/Juegos.jsx";
import Pago from "./pages/usuario/Pago.jsx";
import RuletaDescuentos from "./components/RuletaDescuentos.jsx";
import Contacts from "./pages/usuario/Contacts.jsx";
import FAQ from "./pages/usuario/FAQ.jsx";
import MiCuenta from "./pages/usuario/Micuenta.jsx";
import MisPedidos from "./pages/usuario/MisPedidos.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrincipalP />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/products",
    element: <Products />
  },
  {
    path: "/producto/:productId",
    element: <VistaProducto />
  },
  {
    path: "/recuperarcontra",
    element: <RecuperarContra />
  },
  {
    path: "/cambiarcontra",
    element: <CambiarContra />
  },
  {
    path: "/Micuenta",
    element: <MiCuenta />
  }
  ,
  {
    path: "/cart",
    element: <Cart />
  }
  ,
  {
    path: "/juegos",
    element: <Juegos/>
  }
  ,
  {
    path: "/ruleta",
    element: <RuletaDescuentos/>
  }
  ,
  {
    path: "/vendedor",
    element: <PVendedor/>
  },
  {
    path: "/pago",
    element: <Pago/>
  },
  {
    path: "/contacts",
    element: <Contacts/>
  }
  ,
  {
    path: "/faqs",
    element: <FAQ/>
  },
  {
    path: "/mispedidos",
    element: <MisPedidos/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>,
);

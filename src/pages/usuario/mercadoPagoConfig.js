// mercadoPagoConfig.js
import { initMercadoPago } from '@mercadopago/sdk-react';

const PUBLIC_KEY = 'APP_USR-fc06eae6-1de4-4cca-808f-514d34c52a16'; // Reemplaza con tu clave pública de Mercado Pago

initMercadoPago(PUBLIC_KEY);

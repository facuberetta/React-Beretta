import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from "./context/cartContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <CartProvider>
    <App />
  </CartProvider>
);

// Si quieres medir el rendimiento en tu aplicación, pasa una función
// para registrar los resultados (por ejemplo: reportWebVitals(console.log))
// o envíalos a un punto final de análisis. Aprende más: https://bit.ly/CRA-vitals
reportWebVitals();


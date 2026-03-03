/* =========================================
   Archivo: index.js
   Tipo: JS
   Descripción: Punto de entrada de la aplicación; monta el componente raíz en el div con id "root" del index.html
   ========================================= */

/* ====== IMPORTS ======
   Importaciones de librerías, hooks, componentes y recursos */
import React from "react"; // Librería React para JSX
import ReactDOM from "react-dom/client"; // Renderiza React en el DOM
import "./index.css"; // Estilos globales
import App from "./App.js"; // Componente principal de la aplicación

/* ====== CONSTANTES / DATOS ======
   Datos estáticos, arrays de opciones, configuraciones internas */
const root = ReactDOM.createRoot(document.getElementById("root"));

/* ====== RENDER / JSX ======
   Estructura principal del componente, return con JSX */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
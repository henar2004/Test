// ==================
// Componente raíz: index.js
// Punto de entrada para monta la app en el div cona la id "root" dentro de index.html
// ==================

import React from "react"; // Librería React para JSX
import ReactDOM from "react-dom/client"; // Permite renderizar React en el DOM
import "./index.css"; // Estilos globales
import App from "./App.js"; // Componente principal de la app

const root = ReactDOM.createRoot(document.getElementById("root")); // Crea el contenedor React
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
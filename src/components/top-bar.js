// ==================
// Componente: TopBar.js
// Componente de la barra superior de la aplicación
// ==================

import { Link } from "react-router-dom";
import "../styles/top-bar.css";

export default function TopBar({ location }) {
  // Mapea rutas a títulos que se mostrarán en la barra
  const titles = {
    "/": "Inicio",
    "/portafolio": "Portafolio",
    "/login": "Iniciar Sesión",
    "/gestor-de-tareas": "Gestor de tareas",
  };

  // Obtiene el título según la ruta actual
  const title = titles[location.pathname];

  return (
    <div className="app-page-bg">
      <div className="container app-container">
        <div className="app-card p-3 rounded d-flex align-items-center justify-content-between">
          {/* Botón de volver a inicio */}
          <Link
            to="/"
            className="app-btn app-text-sm fw-semibold d-flex align-items-center gap-2"
          >
            Volver
          </Link>

          {/* Título de la página */}
          <span className="app-text-lg fw-semibold">{title}</span>

          {/* Botón de inicio de sesión */}
          <Link
            to="/login"
            className="app-btn app-text-sm fw-semibold d-flex align-items-center gap-2"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
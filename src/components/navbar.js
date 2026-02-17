// ==================
// Componente: TopBar.js
// Componente de la barra superior de la aplicación
// ==================

import { Link } from "react-router-dom";

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
    <div className="g__page-bg">
      <div className="container">
        <div className="g__card p-3 rounded d-flex align-items-center justify-content-between">
          {/* Botón de volver a inicio */}
          <Link
            to="/"
            className="g__btn g__text--sm fw-semibold d-flex align-items-center gap-2"
          >
            Volver
          </Link>

          {/* Título de la página */}
          <span className="g__text--lg fw-semibold">{title}</span>

          {/* Botón de inicio de sesión */}
          <Link
            to="/login"
            className="g__btn g__text--sm fw-semibold d-flex align-items-center gap-2"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
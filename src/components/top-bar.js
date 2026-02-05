// TopBar.js
import { Link } from "react-router-dom";
import "../styles/top-bar.css";

export default function TopBar({ location }) {
  const titles = {
    "/": "Inicio",
    "/portafolio": "Portafolio",
    "/login": "Iniciar Sesión",
    "/gestor-de-tareas": "Gestor de tareas",
  };

  const title = titles[location.pathname] || "Página";

  return (
    <div className="app-page-bg">
      <div className="container app-container">
        <div className="app-card p-3 rounded d-flex align-items-center justify-content-between">
          <Link
            to="/"
            className="menu-btn app-text-sm fw-semibold d-flex align-items-center gap-2"
          >
            Volver
          </Link>

          <span className="app-text-lg fw-semibold">{title}</span>

          <Link
            to="/login"
            className="menu-btn app-text-sm fw-semibold d-flex align-items-center gap-2"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

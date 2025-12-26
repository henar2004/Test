import { Link } from "react-router-dom";
import webIcon from "../images/link.png";
import "../styles/cards.css";

const proyectos = [
  {
    titulo: "Proyecto de tareas",
    descripcion:
      "Juego desarrollado en Roblox con scripting en Lua, centrado en mecánicas SCP.",
    enlace: "/Tareas",
  },
  {
    titulo: "Proyecto Web 1",
    descripcion:
      "Página web con Bootstrap y JavaScript, enfocada en e-commerce.",
    enlace: "#",
  },
  {
    titulo: "Proyecto Publicidad",
    descripcion: "Diseño de contenido publicitario para redes sociales.",
    enlace: "#",
  },
];

export default function Cards() {
  return (
    <div className="row g-4">
      {proyectos.map((proyecto, index) => (
        <div className="col-md-4" key={index}>
          <div className="portfolio-card p-4 rounded shadow-sm h-100 d-flex flex-column justify-content-between position-relative">
            <div>
              <h6 className="fw-semibold">{proyecto.titulo}</h6>
              <p className="mb-0">{proyecto.descripcion}</p>
            </div>

            <div className="d-flex gap-3 mt-3 align-items-center">
              {proyecto.enlace !== "#" ? (
                <Link
                  to={proyecto.enlace}
                  className="btn-project d-flex align-items-center gap-2"
                  aria-label={`Abrir ${proyecto.titulo}`}
                >
                  <img src={webIcon} alt="Web" width={18} height={18} />
                  Abrir
                </Link>
              ) : (
                <button
                  className="btn-project d-flex align-items-center gap-2 disabled-btn"
                  disabled
                >
                  <img src={webIcon} alt="Web" width={18} height={18} />
                  No disponible
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

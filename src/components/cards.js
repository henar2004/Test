import webIcon from "../images/link.png";
import "../styles/cards.css";

const proyectos = [
  {
    titulo: "Proyecto Roblox 1",
    descripcion:
      "Juego desarrollado en Roblox con scripting en Lua, centrado en mecánicas SCP.",
    enlace: "#",
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
      {/* g-4 reemplaza mb-4 en las columnas para spacing uniforme */}
      {proyectos.map((proyecto, index) => (
        <div className="col-md-4" key={index}>
          <div className="portfolio-card p-4 rounded shadow-sm h-100 d-flex flex-column justify-content-between position-relative">
            <div>
              <h6 className="fw-semibold">{proyecto.titulo}</h6>
              <p className="mb-0">{proyecto.descripcion}</p>
            </div>

            <div className="d-flex gap-3 mt-3 align-items-center">
              <a
                href={proyecto.enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-project d-flex align-items-center gap-2"
                aria-label={`Abrir ${proyecto.titulo}`}
              >
                <img src={webIcon} alt="Web" width={18} height={18} />
                Abrir
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

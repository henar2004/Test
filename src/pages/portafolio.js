import Cards from "../components/cards.js";
import miFoto from "../images/mi-cara.png";
import "../styles/portafolio.css";

export default function Portafolio() {
  return (
    <main className="portfolio-bg page-fill">
      <div className="container portfolio-container">
        {/* HERO / INICIO */}
        <header id="inicio" className="hero d-flex align-items-center mb-5">
          <img src={miFoto} alt="Henar Garcia Boada" className="hero-photo" />
          <div className="hero-content">
            <h1 className="hero-name text-white">Henar Garcia Boada</h1>
            <p className="hero-role">
              Desarrolladora de Roblox · Tecnología & Programación
            </p>
            <p className="hero-desc">
              Soy una persona optimista, entusiasta y persistente, con pasión
              por la tecnología y la programación. Desde los 13 años desarrollo
              juegos en Roblox con Lua, y siempre busco aprender y mejorar mis
              habilidades.
            </p>
          </div>
        </header>

        {/* HABILIDADES / ATRIBUTOS */}
        <h5 className="fw-semibold mb-3 text-white">
          Habilidades & Tecnologías
        </h5>
        <section className="portfolio-card p-4 mb-4 rounded shadow-sm">
          <div className="row g-3">
            {[
              "Lua / Roblox Studio",
              "Python",
              "Kotlin",
              "C#",
              "Java",
              "Bootstrap / CSS / JS",
              "Laravel / Express",
              "Bases de datos / APIs",
            ].map((skill, i) => (
              <div key={i} className="col-6 col-md-3 d-flex align-items-center">
                <span
                  style={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    backgroundColor: "var(--accent)",
                    borderRadius: "50%",
                    marginRight: "0.5rem",
                  }}
                ></span>
                <span className="text-white">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PROYECTOS */}
        <h5 className="fw-semibold mb-3 text-white">Proyectos</h5>
        <section id="proyectos" className="mb-4">
          <Cards />
        </section>

        {/* EXPERIENCIA LABORAL */}
        <h5 className="fw-semibold mb-3 text-white">Experiencia Laboral</h5>
        <section className="portfolio-card p-4 mb-4 rounded shadow-sm">
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-body">
                <strong>Empleado - MC Donald's</strong>
                <div className="timeline-sub">
                  Abril 2025 – Actualidad · Atención a clientes, gestión de
                  pagos, trabajo en equipo bajo presión
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-body">
                <strong>Diseñadora de publicidad - KIT DIGITAL</strong>
                <div className="timeline-sub">
                  Marzo 2025 – Actualidad · Contenido publicitario para redes
                  sociales, contacto con clientes
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-body">
                <strong>Diseñadora Web - KIT DIGITAL</strong>
                <div className="timeline-sub">
                  Marzo 2024 – Agosto 2024 · Páginas web, contenido publicitario
                  y gestión de clientes
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-body">
                <strong>Técnico de TI - Miscota</strong>
                <div className="timeline-sub">
                  Febrero 2021 – Marzo 2022 · Reparación de ordenadores, soporte
                  técnico remoto, bases de datos
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ESTUDIOS */}
        <h5 className="fw-semibold mb-3 text-white">Estudios</h5>
        <section className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="portfolio-card p-3 rounded shadow-sm h-100 d-flex flex-column justify-content-center">
              <div className="fw-semibold text-white mb-1">
                CFGS — Desarrollo de Aplicaciones Multiplataforma
              </div>
              <div className="text-white-50 small">
                Escola Ginebró · Sept 2022 – Mayo 2024
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="portfolio-card p-3 rounded shadow-sm h-100 d-flex flex-column justify-content-center">
              <div className="fw-semibold text-white mb-1">
                CFGM — Sistemas Microinformáticos y Redes
              </div>
              <div className="text-white-50 small">
                Escola Ginebró · Sept 2020 – Mayo 2022
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

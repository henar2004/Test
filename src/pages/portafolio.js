import Cards from "../components/cards.js";
import miFoto from "../images/mi-cara.png";
import "../styles/portafolio.css";

export default function Portafolio() {
  const skills = [
    "Lua / Roblox Studio",
    "Python",
    "Kotlin",
    "C#",
    "Java",
    "Bootstrap / CSS / JS",
    "Laravel / Express",
    "Bases de datos / APIs",
  ];

  const experiencias = [
    {
      title: "Empleado - MC Donald's",
      period: "Abril 2025 – Actualidad",
      desc: "Atención a clientes, gestión de pagos, trabajo en equipo bajo presión",
    },
    {
      title: "Diseñadora de publicidad - KIT DIGITAL",
      period: "Marzo 2025 – Actualidad",
      desc: "Contenido publicitario para redes sociales, contacto con clientes",
    },
    {
      title: "Diseñadora Web - KIT DIGITAL",
      period: "Marzo 2024 – Agosto 2024",
      desc: "Páginas web, contenido publicitario y gestión de clientes",
    },
    {
      title: "Técnico de TI - Miscota",
      period: "Febrero 2021 – Marzo 2022",
      desc: "Reparación de ordenadores, soporte técnico remoto, bases de datos",
    },
  ];

  const estudios = [
    {
      title: "CFGS — Desarrollo de Aplicaciones Multiplataforma",
      period: "Sept 2022 – Mayo 2024",
    },
    {
      title: "CFGM — Sistemas Microinformáticos y Redes",
      period: "Sept 2020 – Mayo 2022",
    },
  ];

  return (
    <main className="portfolio-bg page-fill">
      <div className="container portfolio-container">
        {/* HERO / INICIO */}
        <header id="inicio" className="hero mb-5">
          <img src={miFoto} alt="Henar Garcia Boada" className="hero-photo" />
          <div className="hero-content">
            <h1 className="hero-name">Henar Garcia Boada</h1>
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
        <h5 className="fw-semibold mb-3">Habilidades & Tecnologías</h5>
        <section className="portfolio-card p-4 mb-4 rounded">
          <div className="row g-3">
            {skills.map((skill, i) => (
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
                />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PROYECTOS */}
        <h5 className="fw-semibold mb-3">Proyectos</h5>
        <section id="proyectos" className="mb-4">
          <Cards />
        </section>

        {/* EXPERIENCIA LABORAL */}
        <h5 className="fw-semibold mb-3">Experiencia Laboral</h5>
        <section className="portfolio-card p-4 mb-4 rounded">
          <div className="timeline">
            {experiencias.map((exp, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-body">
                  <strong>{exp.title}</strong>
                  <div className="timeline-sub">
                    {exp.period} · {exp.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ESTUDIOS */}
        <h5 className="fw-semibold mb-3">Estudios</h5>
        <section className="row g-4 mb-4">
          {estudios.map((edu, i) => (
            <div key={i} className="col-md-6">
              <div className="portfolio-card p-3 rounded d-flex flex-column justify-content-center">
                <div className="fw-semibold mb-1">{edu.title}</div>
                <div className="timeline-sub">{edu.period}</div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

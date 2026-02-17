// ==================
// Pagina: Portafolio.js
// Página de portafolio personal
// ==================

import miFoto from "../images/mi-cara.png";
import webIcon from "../images/link.png";
import { Link } from "react-router-dom";

// ==================
// DATOS: Habilidades
// Array con habilidades y tecnologías
// ==================
export default function Portafolio() {
  // Habilidades
  const skills = [
    "Lua",
    "Python",
    "Kotlin",
    "C#",
    "Java",
    "React",
    "Bootstrap",
    "CSS",
    "JavaScript",
    "Laravel",
    "Express",
    "API",
    "Serverless",
    "MongoDB",
    "GitHub",
    "CI/CD",
    "UI",
    "Diseño",
  ];

  // ==================
  // DATOS: Proyectos
  // Lista de proyectos a mostrar en la sección de portfolio
  // ==================
  const proyectos = [
    {
      titulo: "Gestor de tareas",
      descripcion: "Web simple de gestión de tareas con el sistema CRUD.",
      enlace: "/gestor-de-tareas",
    },
    {
      titulo: "Transcriptor de videos",
      descripcion: "Web que transcribe el audio de un video usando una API.",
      enlace: "#",
    },
    {
      titulo: "Algoritmo heurístico",
      descripcion: "Web que revisa el animo de una persona mediante el análisis del texto.",
      enlace: "#",
    },
    {
      titulo: "Explorador de ciudades",
      descripcion: "Buscador de información sobre ciudades usando APIs.",
      enlace: "#",
    },
    {
      titulo: "Retro shooter",
      descripcion: "Juego de disparos desarrollado con JavaScript y HTML.",
      enlace: "#",
    },
    {
      titulo: "Ajedrez 2D",
      descripcion: "Juego de ajedrez desarrollado con JavaScript y HTML.",
      enlace: "#",
    },
  ];

  // ==================
  // DATOS: Experiencia laboral
  // Cronología breve de puestos y responsabilidades
  // ==================
  const experiencias = [
    {
      title: "Empleado - MC Donald's",
      period: "Abril 2025 – Actualidad",
      desc: "Atención a clientes, gestión de pagos, trabajo en equipo bajo presión.",
    },
    {
      title: "Diseñadora de publicidad - KIT DIGITAL",
      period: "Marzo 2025 – Diciembre 2025",
      desc: "Contenido publicitario para redes sociales, contacto con clientes.",
    },
    {
      title: "Diseñadora Web - KIT DIGITAL",
      period: "Marzo 2024 – Agosto 2024",
      desc: "Páginas web, contenido publicitario y gestión de clientes.",
    },
    {
      title: "Técnico de TI - Miscota",
      period: "Febrero 2021 – Marzo 2022",
      desc: "Reparación de ordenadores, soporte técnico remoto, bases de datos.",
    },
  ];

  // ==================
  // DATOS: Estudios
  // Formación académica relevante
  // ==================
  const estudios = [
    {
      title: "CFGM — Sistemas Microinformáticos y Redes",
      period: "Sept 2020 – Mayo 2022",
    },
    {
      title: "CFGS — Desarrollo de Aplicaciones Multiplataforma",
      period: "Sept 2022 – Mayo 2024",
    },
  ];

  // ==================
  // RENDER
  // Estructura principal del componente Portafolio
  // ==================
  return (
    <main className="g__page-bg g__page-fill">
      <div className="container">
        {/* HERO / INICIO */}
        <header id="inicio" className="p__hero gap-3 mb-5">
          <img
            src={miFoto}
            alt="Henar Garcia Boada"
            className="p__hero-photo"
          />
          <div>
            <h1 className="g__text--xl m-0">Henar Garcia Boada</h1>
            <p className="fw-semibold g__text--md p__hero-role">
              Desarrollador Web · Tecnología & Programación
            </p>
            <p className="m-0 g__text--md">
              Soy una persona optimista, entusiasta y persistente, con pasión
              por la tecnología y la programación. Me especializo en desarrollo
              Fullstack, trabajando tanto en frontend como backend con múltiples
              lenguajes y frameworks, creando aplicaciones completas y
              funcionales, siempre buscando aprender y mejorar mis habilidades.
            </p>
          </div>
        </header>

        {/* HABILIDADES / ATRIBUTOS */}
        <h5 className="fw-semibold g__text--lg mb-3">
          Habilidades & Tecnologías
        </h5>
        <section className="g__card p-4 mb-4 rounded">
          <div className="row g-3">
            {skills.map((skill, i) => (
              <div key={i} className="col-6 col-md-2 d-flex align-items-center">
                <span className="p__skill-dot me-2" />
                <span className="g__text--md">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PROYECTOS */}
        <h5 className="fw-semibold g__text--lg mb-3">Proyectos</h5>
        <section className="mb-4">
          <div className="row g-4">
            {proyectos.map((proyecto, index) => (
              <div className="col-md-4" key={index}>
                <div className="g__card p-4 rounded h-100 d-flex flex-column justify-content-between position-relative">
                  <div>
                    <h6 className="fw-semibold g__text--md">
                      {proyecto.titulo}
                    </h6>
                    <p className="mb-0">{proyecto.descripcion}</p>
                  </div>

                  <div className="d-flex gap-3 mt-3 align-items-center">
                    {proyecto.enlace !== "#" ? (
                      <Link
                        to={proyecto.enlace}
                        className="p__btn g__text--md fw-semibold d-flex align-items-center gap-2"
                      >
                        <img src={webIcon} alt="Web" width={18} height={18} />
                        Abrir
                      </Link>
                    ) : (
                      <button
                        className="p__btn g__text--md fw-semibold d-flex align-items-center gap-2 p__disabled-btn"
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
        </section>

        {/* EXPERIENCIA LABORAL */}
        <h5 className="fw-semibold g__text--lg mb-3">Experiencia Laboral</h5>
        <section className="g__card p-4 mb-4 rounded">
          <div className="p__timeline gap-3">
            {experiencias.map((exp, i) => (
              <div key={i} className="d-flex gap-3 align-items-start">
                {/* Dot */}
                <div className="p__timeline-dot mt-1" />

                {/* Contenido: title arriba, period+desc debajo */}
                <div className="d-flex flex-column">
                  <h6 className="fw-semibold g__text--md mb-1">{exp.title}</h6>
                  <div className="p__timeline-sub g__text--md">
                    {exp.period} · {exp.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ESTUDIOS */}
        <h5 className="fw-semibold g__text--lg mb-3">Estudios</h5>
        <section className="row g-4 mb-4">
          {estudios.map((edu, i) => (
            <div key={i} className="col-md-6">
              <div className="g__card p-3 rounded d-flex flex-column justify-content-center">
                <div className="fw-semibold g__text--md mb-1">{edu.title}</div>
                <div className="p__timeline-sub g__text--md">
                  {edu.period}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

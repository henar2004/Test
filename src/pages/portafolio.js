import Cards from "../components/cards.js";
import miFoto from "../images/miCara.png";
import '../styles/portafolio.css';

export default function Portafolio() {
  return (
    <div className="portfolio-bg min-vh-100 py-5">
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
        <section className="portfolio-card p-4 mb-4 rounded shadow-sm">
          <h5 className="section-title">Habilidades & Tecnologías</h5>
          <div className="skills-grid">
            {[
              { name: "Lua / Roblox Studio", value: 95 },
              { name: "Python", value: 85 },
              { name: "Kotlin", value: 80 },
              { name: "C#", value: 80 },
              { name: "Java", value: 75 },
              { name: "Bootstrap / CSS / JS", value: 85 },
              { name: "Laravel / Express", value: 75 },
              { name: "Bases de datos / APIs", value: 80 },
            ].map((skill, i) => (
              <div key={i} className="skill">
                <div className="skill-head">
                  <span>{skill.name}</span>
                  <span className="skill-value">{skill.value}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-fill"
                    style={{ width: `${skill.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROYECTOS */}
        <section id="proyectos" className="mb-4">
          <Cards />
        </section>

        {/* EXPERIENCIA LABORAL */}
        <section className="portfolio-card p-4 mb-4 rounded shadow-sm">
          <h5 className="section-title">Experiencia Laboral</h5>
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
        <section className="portfolio-card p-4 mb-4 rounded shadow-sm">
          <h5 className="section-title">Estudios</h5>
          <ul className="list-group list-group-flush mt-2">
            <li className="list-group-item bg-transparent text-white px-0">
              CFGS Desarrollo de Aplicaciones Multiplataforma - Escola Ginebró
              (Sept 2022 – Mayo 2024)
            </li>
            <li className="list-group-item bg-transparent text-white px-0">
              CFGM Sistemas Microinformáticos y Redes – Escola Ginebró (Sept
              2020 – Mayo 2022)
            </li>
          </ul>
        </section>

        {/* CONTACTO */}
        <section
          id="contacto"
          className="portfolio-card p-4 mb-4 rounded shadow-sm"
        >
          <h5 className="section-title">Contacto</h5>
          <div className="contact-grid">
            <a className="contact-item" href="tel:+34688644970">
              <span className="contact-title">Teléfono</span>
              <span className="contact-sub">+34 688644970</span>
            </a>
            <a className="contact-item" href="mailto:hegarbod@gmail.com">
              <span className="contact-title">Email</span>
              <span className="contact-sub">hegarbod@gmail.com</span>
            </a>
            <a
              className="contact-item"
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-title">LinkedIn</span>
              <span className="contact-sub">Perfil LinkedIn</span>
            </a>
            <div className="contact-item">
              <span className="contact-title">Idiomas</span>
              <span className="contact-sub">Inglés / Castellano / Catalán</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

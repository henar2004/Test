import Cards from "../components/cards.js";

export default function Portafolio() {
  return (
    <div className="bg-light text-dark">

      {/* Hero */}
      <section className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-primary text-white">
        <h1 className="display-3">Hegarbod</h1>
        <p className="lead">Desarrollador | Diseñador | Tech Enthusiast</p>
        <a href="#about" className="btn btn-light mt-3">Conóceme</a>
      </section>

      {/* About */}
      <section id="about" className="container py-5">
        <h2 className="mb-4 text-center">Sobre mí</h2>
        <p className="text-center">
          Soy una persona optimista, entusiasta y persistente, con pasión por la tecnología y la programación. Desde los 13 años desarrollo juegos en Roblox con Lua y tengo experiencia con Bootstrap, Laravel y Express.
        </p>
      </section>

      {/* Skills */}
      <section id="skills" className="container py-5">
        <h2 className="mb-4 text-center">Qué sé hacer</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <h5>Lenguajes</h5>
            <p>Lua, Python, Kotlin, C#, Java, JS</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Frameworks</h5>
            <p>Bootstrap, Laravel, Express</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Habilidades</h5>
            <p>APIs, módulos reutilizables, bases de datos, interfaces funcionales, algoritmos complejos</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="container py-5">
        <h2 className="mb-4 text-center">Proyectos</h2>
        <Cards />
      </section>

    </div>
  );
}

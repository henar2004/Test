export default function Cards() {
  // Array de proyectos dentro del mismo archivo
  const projects = [
    {
      title: "Proyecto 1",
      description: "Mini descripción del proyecto 1.",
      image: "https://via.placeholder.com/300x200",
      link: "#"
    },
    {
      title: "Proyecto 2",
      description: "Mini descripción del proyecto 2.",
      image: "https://via.placeholder.com/300x200",
      link: "#"
    },
    {
      title: "Proyecto 3",
      description: "Mini descripción del proyecto 3.",
      image: "https://via.placeholder.com/300x200",
      link: "#"
    },
      {
      title: "Proyecto 4",
      description: "Mini descripción del proyecto 3.",
      image: "https://via.placeholder.com/300x200",
      link: "#"
    },
    // Puedes añadir más proyectos aquí
  ];

  // Componente interno que genera la tarjeta
  const ProjectCard = ({ title, description, image, link }) => (
    <div className="col-md-4">
      <div className="card h-100">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={link} className="btn btn-primary btn-sm">Ver</a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="row g-4">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          description={project.description}
          image={project.image}
          link={project.link}
        />
      ))}
    </div>
  );
}

// ==================
// Componente: footer.js
// Pie de página con copyright y enlaces de contacto/redes sociales
// ==================

export default function Footer() {
  return (
    <footer className="app-page-bg pb-3">
      {/* Contenedor centrado con padding vertical */}
      <div className="container py-3">
        {/* Contenedor flex: copyright a la izquierda, enlaces a la derecha */}
        <div className="d-flex justify-content-between align-items-center app-text-sm">
          {/* Copyright dinámico con año actual */}
          <span>© {new Date().getFullYear()} Henar Garcia Boada</span>

          {/* Grupo de enlaces: LinkedIn, Email y GitHub */}
          <div className="d-flex gap-3">
            <a
              href="http://www.linkedin.com/in/henar-garcia-boada-145893201"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href="mailto:hegarbod@gmail.com">Email</a>
            <a
              href="https://github.com/henar2004/Test"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

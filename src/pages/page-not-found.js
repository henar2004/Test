// ==================
// Pagina: not-found.js
// Página de error 404 cuando la ruta no existe
// ==================

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="g__page-bg g__page-fill d-flex justify-content-center align-items-center">
      <section className="text-center">
        {/* Código de error 404 en grande */}
        <h1 className="display-1 mb-2 pnf__warning-text fw-semibold">404</h1>
        <p className="lead mb-4">Página no encontrada</p>
        {/* Contenedor del botón de navegación */}
        <div>
          <Link to="/" className="pnf__btn g__text--md fw-semibold">
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}

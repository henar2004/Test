export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1 text-danger">404</h1>
      <p className="lead">Página no encontrada</p>
      <a href="/Portafolio" className="btn btn-primary mt-3">
        Volver al inicio
      </a>
    </div>
  );
}

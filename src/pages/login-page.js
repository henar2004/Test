import "../styles/login-page.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <main className="app-page-bg d-flex justify-content-center align-items-center">
      <div className="container app-container d-flex flex-column gap-3">
        
        <section className="app-card login-box p-4 rounded">
          {/* Nombre */}
          <div className="mb-3">
            <label className="app-text-md mb-1">Nombre</label>
            <input
              type="text"
              className="form-control login-input"
              placeholder="Tu nombre"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="app-text-md mb-1">Correo</label>
            <input
              type="email"
              className="form-control login-input"
              placeholder="ejemplo@gmail.com"
            />
          </div>

          {/* Contraseña */}
          <div className="mb-3">
            <label className="app-text-md mb-1">Contraseña</label>
            <input
              type="password"
              className="form-control login-input"
              placeholder="••••••••"
            />
          </div>

          {/* RECORDAR SESIÓN */}
          <div className="d-flex justify-content-end align-items-center">
            <Link to="/recuperar" className="app-text-sm fw-semibold">
              Has olvidado la contraseña?
            </Link>
          </div>

          {/* Botón */}
          <button className="login-btn fw-semibold app-text-md">
            Entrar
          </button>
        </section>

        {/* Texto extra */}
        <div className="text-center app-text-sm">
          <p className="mb-1">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="fw-semibold">
              Crear una ahora
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}

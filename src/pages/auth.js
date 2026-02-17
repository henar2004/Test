// ==================
// Pagina: login-page.js
// Pagina de login para usuarios registrados, con formulario de email y contraseña, y enlaces a recuperar contraseña y registro.
// ==================

import { Link } from "react-router-dom";

export default function Login() {
  return (
    <main className="g__page-bg d-flex justify-content-center align-items-center">
      <div className="container d-flex flex-column gap-3">
        <section className="g__card login-box p-4 rounded">
          {/* Nombre */}
          <div className="mb-3">
            <label className="g__text--md mb-1">Nombre</label>
            <input
              type="text"
              className="form-control login-input"
              placeholder="Tu nombre"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="g__text--md mb-1">Correo</label>
            <input
              type="email"
              className="form-control login-input"
              placeholder="ejemplo@gmail.com"
            />
          </div>

          {/* Contraseña */}
          <div className="mb-3">
            <label className="g__text--md mb-1">Contraseña</label>
            <input
              type="password"
              className="form-control login-input"
              placeholder="••••••••"
            />
          </div>

          {/* Recuperar contraseña */}
          <div className="d-flex justify-content-end align-items-center">
            <Link to="/recuperar" className="g__text--sm fw-semibold">
              Has olvidado la contraseña?
            </Link>
          </div>

          {/* Enviar mail */}
          <button className="g__btn fw-semibold g__text--md">Entrar</button>
        </section>

        {/* Crear cuenta */}
        <div className="text-center g__text--sm">
          <p className="mb-1">
            ¿No tienes cuenta?
            <Link to="/registro" className="fw-semibold">
              Crear una ahora
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

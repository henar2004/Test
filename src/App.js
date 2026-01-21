// ==================
// Componente: App.js
// Componente raíz de la aplicación con enrutamiento principal
// ==================

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Portafolio from "./pages/portafolio.js";
import Tareas from "./pages/task.js";
import Footer from "./components/footer.js";
import NotFound from "./pages/not-found.js";

// ==================
// COMPONENTE: AnimatedRoutes
// Anima la transición entre páginas con fade-in/fade-out
// ==================
function AnimatedRoutes() {
  // ===== ESTADO DE UBICACIÓN Y ANIMACIÓN =====
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [opacity, setOpacity] = useState(1);

  // ===== EFECTO: Animación de transición =====
  // Detecta cambios de ruta y ejecuta fade-out/fade-in
  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setOpacity(0); // fade-out
      const t = setTimeout(() => {
        setDisplayLocation(location);
        requestAnimationFrame(() => setOpacity(1)); // fade-in
      }, 280);
      return () => clearTimeout(t);
    }
  }, [location, displayLocation]);

  // ===== LÓGICA: Determinar si mostrar footer =====
  // El footer NO se muestra en la página 404
  const isNotFoundPage = displayLocation.pathname === "*" || 
                         !["/" , "/Gestor-de-tareas"].includes(displayLocation.pathname);

  return (
    <div className="app-fade-shell" style={{ minHeight: "100vh" }}>
      <div
        className="fade-layer"
        style={{
          opacity,
          transition: "opacity 0.28s ease-in-out",
        }}
      >
        {/* ===== CONTENIDO DE LA PÁGINA ===== */}
        <Routes location={displayLocation} key={displayLocation.pathname}>
          {/* Ruta principal: Portafolio */}
          <Route path="/" element={<Portafolio />} />
          
          {/* Ruta secundaria: Gestor de tareas */}
          <Route path="/Gestor-de-tareas" element={<Tareas />} />
          
          {/* Ruta de error: Página 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* ===== FOOTER CONDICIONAL ===== */}
        {/* Se muestra solo si NO es página de error 404 */}
        {!isNotFoundPage && <Footer />}
      </div>
    </div>
  );
}

// ==================
// COMPONENTE PRINCIPAL: App
// Renderiza el router y gestiona el favicon según preferencia de tema
// ==================
export default function App() {
  // ===== EFECTO: Cambiar favicon según tema oscuro/claro =====
  // Actualiza el favicon cuando cambia la preferencia de tema del sistema
  useEffect(() => {
    const link =
      document.querySelector("link[rel~='icon']") ||
      document.createElement("link");
    link.rel = "icon";

    // Función para actualizar el favicon
    const setFavicon = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      link.href = isDark ? "/white-favicon.png" : "/black-favicon.png";
      document.head.appendChild(link);
    };

    setFavicon();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", setFavicon);
  }, []);

  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
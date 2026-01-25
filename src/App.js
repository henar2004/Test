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
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [opacity, setOpacity] = useState(1);

  // ===== EFECTO: Animación de fade aplicada a #root =====
  useEffect(() => {
    const root = document.getElementById("root"); // obtenemos el div root
    if (root) root.style.transition = "opacity 0.28s ease-in-out";
    if (location.pathname !== displayLocation.pathname) {
      if (root) root.style.opacity = 0; // fade-out
      const t = setTimeout(() => {
        setDisplayLocation(location);
        requestAnimationFrame(() => {
          if (root) root.style.opacity = 1; // fade-in
        });
      }, 280);
      return () => clearTimeout(t);
    }
  }, [location, displayLocation]);

  // ===== LÓGICA: Mostrar footer solo si NO es página 404 =====
  const isNotFoundPage = displayLocation.pathname === "*" || 
                         !["/", "/Gestor-de-tareas"].includes(displayLocation.pathname);

  return (
    <>
      {/* ===== CONTENIDO DE LA PÁGINA ===== */}
      <Routes location={displayLocation} key={displayLocation.pathname}>
        <Route path="/" element={<Portafolio />} />
        <Route path="/Gestor-de-tareas" element={<Tareas />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* ===== FOOTER CONDICIONAL ===== */}
      {!isNotFoundPage && <Footer />}
    </>
  );
}

// ==================
// COMPONENTE PRINCIPAL: App
// ==================
export default function App() {
  useEffect(() => {
    const link =
      document.querySelector("link[rel~='icon']") ||
      document.createElement("link");
    link.rel = "icon";

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

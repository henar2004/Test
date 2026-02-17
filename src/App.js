// ==================
// Componente principal: App.js
// Componente principal de la aplicación con enrutamiento y animaciones de transición entre páginas
// ==================

// Librerías y hooks
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css"; // Estilos de Bootstrap
import "./styles/global.css"; // Estilos globales de la app
import "./styles/task-manager.css";
import "./styles/portafolio.css";
import "./styles/page-not-found.css";

// Páginas y componentes
import Portafolio from "./pages/portafolio.js";
import Tareas from "./pages/task-manager.js";
import Footer from "./components/footer.js";
import NotFound from "./pages/page-not-found.js";
import TopBar from "./components/navbar.js";
import Login from "./pages/auth.js";

// ==================
// Funcion secundaria de enrutamiento y animación
// ==================
function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);

  //Animación de fade
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

  // Mostrar TopBar en ciertas rutas, ocultar en otras
  const showMenu = ["/login", "/gestor-de-tareas"].includes(
    displayLocation.pathname,
  );

  // Mostrar Footer en ciertas rutas
  const showFooter = ["/", "/gestor-de-tareas", "/login"].includes(
    displayLocation.pathname,
  );

  return (
    <>
      {/* Si se cumple muestra la TopBar y pasa la ubicación actual al componente */}
      {showMenu && <TopBar location={displayLocation} />}

      {/* Enrutamiento de páginas */}
      <Routes location={displayLocation} key={displayLocation.pathname}>
        <Route path="/" element={<Portafolio />} />
        <Route path="/gestor-de-tareas" element={<Tareas />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Si se cumple muestra el Footer */}
      {showFooter && <Footer />}
    </>
  );
}

// ==================
// Funcion principal
// ==================
export default function App() {
  useEffect(() => {
    // Buscar el favicon actual en el documento
    const link = document.querySelector("link[rel~='icon']");
    link.rel = "icon";

    // Cambia el favicon según el tema del sistema (dark/light)
    const setFavicon = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      link.href = isDark ? "/white-favicon.png" : "/black-favicon.png";
      document.head.appendChild(link);
    };

    setFavicon(); // Establece el favicon al cargar la app

    // Escucha cambios en el tema del sistema y actualiza el favicon
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

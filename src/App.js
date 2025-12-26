// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Portafolio from "./pages/portafolio.js";
import Tareas from "./pages/tareas.js";
import Footer from "./components/footer.js";
import NotFound from "./pages/not-found.js";

// Componente que anima la transición entre páginas
function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [opacity, setOpacity] = useState(1);

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

  return (
    <div className="fade-shell" style={{ minHeight: "100vh" }}>
      <div
        className="fade-layer"
        style={{
          opacity,
          transition: "opacity 0.28s ease-in-out",
        }}
      >
        {/* Contenido de la página */}
        <Routes location={displayLocation} key={displayLocation.pathname}>
          <Route path="/" element={<Navigate to="/Home" replace />} />
          <Route path="/Home" element={<Portafolio />} />
          <Route path="/Tareas" element={<Tareas />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Footer también dentro de la capa animada */}
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  // Cambia el favicon según el modo oscuro o claro
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
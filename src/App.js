// Librerías externas
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";

// Componentes internos
import Portafolio from "./pages/portafolio.js";
import Footer from "./components/footer.js";
import NotFound from "./pages/not_found.js";

export default function App() {
  // Cambio de color de favicon
  useEffect(() => {
    const link =
      document.querySelector("link[rel~='icon']") ||
      document.createElement("link");
    link.rel = "icon";
    const setFavicon = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      link.href = isDark ? "/White_Favicon.png" : "/Black_Favicon.png";
      document.head.appendChild(link);
    };
    setFavicon();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", setFavicon);
  }, []);

  return (
    <Router>
      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/Home" element={<Portafolio />} />
          <Route path="*" element={<NotFound />} />
        {/* Ruta catch-all para errores */}
      </Routes>

      {/* <Footer /> */}
      <Footer />
    </Router>
  );
}

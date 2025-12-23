import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Portafolio from "./pages/portafolio.js";
import Footer from "./components/footer.js";
import { useEffect } from "react";

export default function App() {
  /* Cambio de color de favicon */
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
        <Route path="/" element={<Navigate to="/Portafolio" replace />} />
        <Route path="/Portafolio" element={<Portafolio />} />
      </Routes>

      {/* Footer siempre visible */}
      <Footer />
    </Router>
  );
}
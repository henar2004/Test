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
import TopBar from "./components/top-bar.js";
import Login from "./pages/login-page.js";

// ==================
// COMPONENTE: AnimatedRoutes
// Anima la transición entre páginas con fade-in/fade-out
// ==================
function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);

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

  // Mostrar TopBar solo en Gestor-de-tareas
  const showMenu =
    displayLocation.pathname === "/login" ||
    displayLocation.pathname === "/gestor-de-tareas";

  // Footer como antes o ajustado según necesites
  const showFooter =
    displayLocation.pathname === "*" ||
    !["/", "/gestor-de-tareas", "/login"].includes(displayLocation.pathname);

  return (
    <>
      {/* ===== MENU CONDICIONAL ===== */}
      {showMenu && <TopBar location={displayLocation} />}

      {/* ===== CONTENIDO DE LA PÁGINA ===== */}
      <Routes location={displayLocation} key={displayLocation.pathname}>
        <Route path="/" element={<Portafolio />} />
        <Route path="/gestor-de-tareas" element={<Tareas />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* ===== FOOTER CONDICIONAL ===== */}
      {!showFooter && <Footer />}
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

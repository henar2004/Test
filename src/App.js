import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';


function App() {
  return (
    <Router>
      {/* Menú de navegación */}
      <nav>
        <Link to="/home">Inicio</Link> | <Link to="/about">Sobre</Link>
      </nav>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;

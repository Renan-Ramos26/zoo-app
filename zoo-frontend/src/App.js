import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AnimaisPage from "./pages/AnimaisPage";
import CuidadosPage from "./pages/CuidadosPage";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <nav style={styles.nav}>
        <Link style={styles.link} to="/">🏠 Home</Link>
        <Link style={styles.link} to="/animais">🐾 Animais</Link>
        <Link style={styles.link} to="/cuidados">💉 Cuidados</Link>
      </nav>

      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animais" element={<AnimaisPage />} />
          <Route path="/cuidados" element={<CuidadosPage />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  nav: {
    display: "flex",
    gap: "15px",
    padding: "10px",
    background: "#222",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  container: {
    padding: "20px",
  },
};

export default App;

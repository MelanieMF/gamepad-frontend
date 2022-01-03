// Externes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Internes
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games/:id" element={<Game />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

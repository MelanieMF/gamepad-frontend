// Externes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Internes
import Header from "./components/Header";
import Home from "./pages/Home";
import Favoris from "./pages/Favoris";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/games/:id" element={<Offer />} /> */}
          <Route path="/favoris" element={<Favoris />} />
          <Route path="/inscription" element={<Signup />} />
          <Route path="/connexion" element={<Signin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

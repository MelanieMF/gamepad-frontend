// Externes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Internes
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import "./App.css";
import SignUp from "./components/SignUp/SignUp";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 10 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games/:id" element={<Game />} />
          <Route path="login" element={<Login setUser={setUser} />} />
          <Route path="signup" element={<SignUp setUser={setUser} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

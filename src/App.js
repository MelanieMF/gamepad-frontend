// Externes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Internes
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Favoris from "./pages/Favoris/Favoris";

// Styles & CSS
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faBookmark,
  faCommentAlt,
  faTimes,
  faThumbsUp,
  faThumbsDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faSearch,
  faBookmark,
  faCommentAlt,
  faTimes,
  faThumbsUp,
  faThumbsDown,
  faUser
);

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
        <Header token={token} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home token={token} />} />
          <Route path="/games/:id" element={<Game token={token} />} />
          <Route path="login" element={<Login setUser={setUser} />} />
          <Route path="signup" element={<SignUp setUser={setUser} />} />
          <Route path="/favorites" element={<Favoris token={token} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

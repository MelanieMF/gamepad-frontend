// Externes
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

// Internes
import closeIcon from "../../assets/img/icon-removebg.png";

// Styles & CSS
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:4000/user/login", {
        email: email,
        password: password,
      });
      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.reponse);
      console.log(error.message);
    }
  };

  return (
    <div>
      <section className="login-overlay">
        <div className="login-modal">
          <div
            className="close-loginModal"
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src={closeIcon}
              alt="close window icon"
              className="close-icon"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <section className="notice-content">
            <h2>How it works ?</h2>
            <div>
              <p className="login-align">
                <span>
                  <FontAwesomeIcon icon="user" className="login-icons" />
                </span>
                <span>
                  Log in to your free account to be able to get all features of
                  GamePad
                </span>
              </p>
              <p>
                <span>
                  <FontAwesomeIcon icon="bookmark" className="login-icons" />
                </span>
                <span>Add a game to your collection</span>
              </p>
              <p>
                <span>
                  <FontAwesomeIcon icon="comment-alt" className="login-icons" />
                </span>
                <span>Leave a review for a game</span>
              </p>
            </div>
          </section>
          <div className="red-line"></div>
          <section className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleEmail}
                placeholder="Email..."
                type="email"
                value={email}
              />
              <input
                onChange={handlePassword}
                placeholder="Password..."
                type="password"
                value={password}
              />
              <input
                type="submit"
                value="Connexion"
                className="connexion-button"
              />
              <p
                onClick={() => {
                  navigate("/signup");
                }}
                className="signup-navigation"
              >
                Don't have an account yet ?
              </p>
            </form>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Login;

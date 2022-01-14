// Externes
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

// Internes

// CSS
import "./Login.css";

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
      <section>
        <h2>How it works ?</h2>
        <div>
          <p>
            Log in to your free account to be able to get all features of
            GamePad
          </p>
          <p>Add a game to your collection</p>
          <p>Leave a review for a game</p>
        </div>
      </section>
      <section className="form signup-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              onChange={handleEmail}
              placeholder="Email"
              type="email"
              value={email}
            />
          </div>
          <div>
            <input
              onChange={handlePassword}
              placeholder="Password"
              type="password"
              value={password}
            />
          </div>
          <div>
            <input type="submit" value="Connexion" className="connexion" />
          </div>
          <p
            onClick={() => {
              navigate("/signup");
            }}
          >
            Don't have an account yet ?
          </p>
        </form>
      </section>
    </div>
  );
};

export default Login;

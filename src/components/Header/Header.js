// Externes
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Internes
import logo from "../../assets/img/logo.png";

// CSS
import "./Header.css";

const Header = ({ token, setUser }) => {
  const [data, setData] = useState();
  const [loginModal, setLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get("http://localhost:4000/profil", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [token]);

  return (
    <nav>
      <section className="header-container">
        <div>
          <img
            src={logo}
            alt="logo"
            className="header-logo"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <section>
          {token ? (
            <div className="profil-container">
              <button
                className="log-button header-button"
                onClick={() => {
                  setUser(null);
                  navigate("/");
                }}
              >
                Logout
              </button>
              <button
                className="collection-button header-button"
                onClick={() => {
                  navigate("/favorites");
                }}
              >
                My collection
              </button>
              <p> Welcome, {data && data[0].username} </p>
              <img
                className="avatar"
                src={data && data[0].avatar.secure_url}
                alt="avatar"
              />
            </div>
          ) : (
            <div>
              <button
                className="collection-button header-button"
                onClick={() => {
                  navigate("/login");
                }}
              >
                My collection
              </button>
              <button
                className="log-button header-button"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            </div>
          )}
        </section>
      </section>
      <div className="line"></div>
    </nav>
  );
};

export default Header;

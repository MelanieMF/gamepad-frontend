// Externes
import { useNavigate } from "react-router-dom";

// Internes
import logo from "../../assets/img/logo.png";

// CSS
import "./Header.css";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();
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
          <button
            className="collection-button header-button"
            onClick={() => {
              navigate("/favoris");
            }}
          >
            My collection
          </button>

          {token ? (
            <button
              className="log-button header-button"
              onClick={() => {
                setUser(null);
                navigate("/");
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="log-button header-button"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          )}
        </section>
      </section>
      <div className="line"></div>
    </nav>
  );
};

export default Header;

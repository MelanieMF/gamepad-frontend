// Externes
import { useNavigate } from "react-router-dom";

// Internes
import logo from "../../assets/img/logo.png";

// CSS
import "./Header.css";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();
  // ee7acd3aea974d95b29d55f9c60f5960;
  return (
    <nav className="header">
      <div>
        <img
          src={logo}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <section>
        <button
          className="nav"
          onClick={() => {
            navigate("/favoris");
          }}
        >
          My collection
        </button>

        {token ? (
          <button
            className="logout"
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className="nav"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        )}
      </section>
    </nav>
  );
};

export default Header;

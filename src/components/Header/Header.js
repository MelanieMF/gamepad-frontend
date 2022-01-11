import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import "../Header/Header.css";

const Header = () => {
  // ee7acd3aea974d95b29d55f9c60f5960;
  return (
    <div className="header">
      <div>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <section className="nav">
        <Link to="/favoris" className="nav-items">
          My collection
        </Link>
        <Link to="/login" className="nav-items">
          Login
        </Link>
      </section>
    </div>
  );
};

export default Header;

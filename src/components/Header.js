import { Link } from "react-router-dom";

const Header = () => {
  // ee7acd3aea974d95b29d55f9c60f5960;
  return (
    <div className="Navigation">
      <Link to="/">Accueil</Link>
      <Link to="/favoris">My collection</Link>
      {/* <Link to="/inscription">S'inscire</Link> */}
      <Link to="/connexion">Login</Link>
    </div>
  );
};

export default Header;

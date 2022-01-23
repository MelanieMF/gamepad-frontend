// Externes
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Internes
// import logo from "../../assets/img/logo.png";

// Styles & CSS
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchGame, setSearchGame] = useState("");
  const navigate = useNavigate();

  const addFavorite = async (elem) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/add/favorites`,
        {
          name: elem.name,
          background_image: elem.background_image,
          id: elem.id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "https://api.rawg.io/api/games?key=ee7acd3aea974d95b29d55f9c60f5960&name=${searchGame}"
          `http://localhost:4000/?search=${searchGame}`
        );
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [searchGame]);

  return isLoading ? (
    <div>En cours de chargement</div>
  ) : (
    <main>
      <section className="search-bar">
        {/* <div>
          <img
            src={logo}
            alt="logo"
            onClick={() => {
              navigate("/");
            }}
          />
        </div> */}
        <FontAwesomeIcon icon="search" className="search-input-icon" />
        <input
          type="search"
          placeholder=" Search for a game"
          onChange={(event) => setSearchGame(event.target.value)}
        />
      </section>
      <section className="games-container">
        {data.results.map((elem) => {
          return (
            <section key={elem.id} className="games-bloc">
              <button
                onClick={() => {
                  addFavorite(elem);
                }}
              >
                <FontAwesomeIcon icon="heart" />
              </button>
              <article
                onClick={() => {
                  navigate(`/games/${elem.id}`);
                }}
                className="games-item"
              >
                <img src={elem.background_image} alt="couverture du jeu" />
                <h1>{elem.name}</h1>
              </article>
            </section>
          );
        })}
      </section>
    </main>
  );
};

export default Home;

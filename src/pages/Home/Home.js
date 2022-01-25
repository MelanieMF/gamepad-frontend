// Externes
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Internes
// import Filters from "../../components/Filters/Filters";

// Styles & CSS
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [platforms, setPlatforms] = useState();
  const [searchGame, setSearchGame] = useState("");
  const [platformType, setPlatformType] = useState();
  const [sortby, setSortBy] = useState();
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
      if (platformType !== undefined) {
        try {
          const response = await axios.get(
            // `http://localhost:4000/?platforms=${platforms}`
            `https://api.rawg.io/api/games/?key=ee7acd3aea974d95b29d55f9c60f5960&platformType=${platformType}`
          );
          setData(response.data);
          console.log(response.data);
          // setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
        try {
          const response = await axios.get(
            "https://api.rawg.io/api/platforms?key=ee7acd3aea974d95b29d55f9c60f5960"
          );
          setPlatforms(response.data);
          console.log(platforms);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        try {
          const response = await axios.get(
            "https://api.rawg.io/api/platforms?key=ee7acd3aea974d95b29d55f9c60f5960"
          );
          setPlatforms(response.data);
        } catch (error) {
          console.log(error.message);
        }
        try {
          const response = await axios.get(
            `http://localhost:4000/?search=${searchGame}`
          );
          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    fetchData();
  }, [searchGame]);

  return isLoading ? (
    <div>En cours de chargement</div>
  ) : (
    <main>
      {/* Searchbar */}

      <section className="searchbar-container">
        <input
          type="search"
          className="search-bar"
          placeholder=" Search for a game"
          onChange={(event) => setSearchGame(event.target.value)}
        />
        <FontAwesomeIcon icon="search" className="search-input-icon" />
      </section>

      {/* Filters */}

      <select
        onChange={(event) => setPlatformType(event.target.value)}
        name="Plateform"
        id="platform-select"
      >
        <option value="">Plateform : All</option>

        {platforms.results.map((platform, index) => {
          return (
            <option key={index} value={platform.id}>
              {platform.name}
            </option>
          );
        })}
      </select>

      <select name="Type" id="type-select">
        <option value="">Type : All</option>
        Type
      </select>

      <select
        onChange={(event) => setSortBy(event.target.value)}
        name="Sort by"
        id="sort-select"
      >
        <option value="">Sort by : Default </option>
        <option value="name">Name</option>
        <option value="type">Type</option>
        <option value="released">Released</option>
        <option value="rating">Rating</option>
      </select>
      <button className="filter-button">Go filters !</button>

      {/* Game Containers */}
      <section className="games-section-container">
        {/* <h1>Most Relevance Games</h1> */}
        <div className="games-container">
          {data.results.map((elem) => {
            return (
              <section key={elem.id} className="games-bloc">
                <article className="games-item">
                  <img
                    src={elem.background_image}
                    alt="couverture du jeu"
                    onClick={() => {
                      navigate(`/games/${elem.id}`);
                    }}
                  />
                  <div className="game-picture-shadow">
                    <div className="title-game">
                      <h2
                        onClick={() => {
                          navigate(`/games/${elem.id}`);
                        }}
                      >
                        {elem.name}
                      </h2>
                      {token ? (
                        <button
                          className="bookmark-button"
                          onClick={() => {
                            addFavorite(elem);
                          }}
                        >
                          <FontAwesomeIcon icon="bookmark" />
                        </button>
                      ) : (
                        <button
                          className="bookmark-button"
                          onClick={() => {
                            navigate("/login");
                          }}
                        >
                          <FontAwesomeIcon icon="bookmark" />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Home;

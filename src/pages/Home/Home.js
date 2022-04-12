// Externes
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Internes
import Loader from "../../components/Loader/Loader";
import Image from "../../assets/img/picture_notavailable.png";

// Styles & CSS
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../../components/Pagination/Pagination";

const Home = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchGame, setSearchGame] = useState("");
  const [page, searchPage] = useState("");
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
          `http://localhost:4000/?search=${searchGame}&page=${page}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [searchGame]);

  return isLoading ? (
    <Loader />
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

      {/* Pagination */}
      <Pagination />

      {/* Game Containers */}
      <section className="games-section-container">
        {/* <h1>Most Relevance Games</h1> */}
        <div className="games-container">
          {data.results.map((elem) => {
            return (
              <section key={elem.id} className="games-bloc">
                <article className="games-item">
                  <img
                    src={elem.background_image ? elem.background_image : Image}
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

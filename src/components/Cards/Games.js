// Externes
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Internes

// CSS
import "./Games.css";

const Games = (id) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.rawg.io/api/games?key=ee7acd3aea974d95b29d55f9c60f5960"
        );
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div>En cours de chargement</div>
  ) : (
    <div className="games-container">
      {data.results.map((elem) => {
        return (
          <section key={elem.id} className="games-bloc">
            <article
              onClick={() => {
                navigate(`/games/${elem.id}`);
              }}
              className="games-item"
            >
              <img
                src={elem.background_image}
                alt="couverture ou extrait du jeu"
              />
              <h1>{elem.name}</h1>
            </article>
          </section>
        );
      })}
    </div>
  );
};

export default Games;

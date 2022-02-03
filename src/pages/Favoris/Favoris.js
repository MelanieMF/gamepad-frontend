// Externes
import { useEffect, useState } from "react";
import axios from "axios";

// Internes
import Loader from "../../components/Loader/Loader";

// Styles & CSS
import "./Favoris.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Favoris = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteFav, setDeleteFav] = useState(false);

  const delFavorite = async (item) => {
    console.log(item);
    try {
      const response = await axios.post(
        `http://localhost:4000/delete/favorites`,
        {
          id: item.id,
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
        const response = await axios.get("http://localhost:4000/favoris", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [isLoading]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="favoris-container">
      {data.length > 0 ? (
        data.map((item) => {
          return (
            <div key={item.id}>
              <article className="games-item">
                <img src={item.background_image} alt="couverture de jeu" />
                <div className="game-picture-shadow">
                  <div className="title-game">
                    <h2>{item.name}</h2>
                    <button
                      onClick={() => {
                        delFavorite(item);
                        setDeleteFav(!deleteFav);
                        setIsLoading(true);
                      }}
                    >
                      <FontAwesomeIcon icon="bookmark" />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          );
        })
      ) : (
        <p>You have no saved games in your collection</p>
      )}
    </div>
  );
};

export default Favoris;

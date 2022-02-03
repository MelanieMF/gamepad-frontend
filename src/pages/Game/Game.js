// Externes
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Internes
import Loader from "../../components/Loader/Loader";
import ReviewModal from "../../components/ReviewModal/ReviewModal";

// CSS
import "./Game.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Reviews from "../../components/Reviews/Reviews";

const Game = ({ token }) => {
  const [game, setGame] = useState();
  const [similarGames, setSimilarGames] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const addFavorite = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/add/favorites`,
        {
          name: game.name,
          background_image: game.background_image,
          id: game.id,
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
        const gameResponse = await axios.get(
          // `https://api.rawg.io/api/games/${id}?key=ee7acd3aea974d95b29d55f9c60f5960`
          `http://localhost:4000/games/${id}`
        );
        console.log(gameResponse.data);
        setGame(gameResponse.data);
      } catch (error) {
        console.log(error.message);
      }
      try {
        const similarGamesResponse = await axios.get(
          // `https://api.rawg.io/api/games/${id}/game-series?key=ee7acd3aea974d95b29d55f9c60f5960`
          "http://localhost:4000/games/3498/similar-games"
        );
        console.log(similarGamesResponse.data);
        setSimilarGames(similarGamesResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <main>
      <h1>{game.name}</h1>
      <section className="global-container">
        <section className="picture-container">
          <img src={game.background_image} alt="couverture du jeu" />
        </section>
        <section className="informations-container">
          <div className="button-container">
            <button
              onClick={() => {
                addFavorite(game);
              }}
              className="game-button"
            >
              Saved to Collection
              <span>
                <FontAwesomeIcon
                  icon="bookmark"
                  // style={{ background: "transparent" }}
                />
              </span>
            </button>
            <ReviewModal token={token} />
          </div>
          <section className="details-container">
            <section className="flex-section">
              <div>
                <h3>Platforms</h3>
                {game.platforms.map((platforms, index) => {
                  return <span key={index}>{platforms.platform.name}, </span>;
                })}
                <h3> Released date</h3>
                <span>{game.released}</span>
                <h3>Publisher</h3>
                {game.publishers.map((publishers, index) => {
                  return <p key={index}>{publishers.name}</p>;
                })}
              </div>
            </section>
            <section className="flex-section">
              <div className="flex">
                <h3>Genre</h3>
                {game.genres.map((genres, index) => {
                  return <span key={index}>{genres.name}, </span>;
                })}
                <h3>Developer</h3>
                {game.developers.map((developers, index) => {
                  return <span key={index}>{developers.name}</span>;
                })}
                <h3>Age rating</h3>
                <span>{game.esrb_rating.name}</span>
              </div>
            </section>
          </section>
          <section className="game-description">
            <h3>About</h3>
            <p>{game.description_raw}</p>
          </section>
        </section>
      </section>

      {/* Similar Game Section */}
      <section>
        <h2>Games like : {game.name}</h2>
        <div className="similar-game-container">
          {similarGames.results.map((similarGames, index) => {
            return (
              <article key={index} className="similar-game-item">
                <img
                  src={similarGames.background_image}
                  alt="couverture du jeu"
                />
                <div className="similar-game-picture-shadow"></div>
                <div className="title-similar-game">
                  <h3>{similarGames.name}</h3>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section>
        <Reviews id={id} token={token} />
      </section>
    </main>
  );
};

export default Game;

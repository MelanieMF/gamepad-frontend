// Externes
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Internes

// CSS
import "./Game.css";

const Game = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=ee7acd3aea974d95b29d55f9c60f5960`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div>En cours de Chargement</div>
  ) : (
    <main>
      <h1>{data.name}</h1>
      <section className="global-container">
        <section className="picture-container">
          <img src={data.background_image} alt="couverture du jeu" />
        </section>
        <section className="informations-container">
          <div className="button-container">
            <button className="game-button">Saved to Collection</button>
            <button className="game-button">Add a Review</button>
          </div>
          <section className="details-container">
            <section className="flex-section">
              <div>
                <h3>Platforms</h3>
                {data.platforms.map((platforms, index) => {
                  return <span key={index}>{platforms.platform.name}, </span>;
                })}
                <h3> Released date</h3>
                <span>{data.released}</span>
                <h3>Publisher</h3>
                {data.publishers.map((publishers, index) => {
                  return <p key={index}>{publishers.name}</p>;
                })}
              </div>
            </section>
            <section className="flex-section">
              <div className="flex">
                <h3>Genre</h3>
                {data.genres.map((genres, index) => {
                  return <span key={index}>{genres.name}, </span>;
                })}
                <h3>Developer</h3>
                {data.developers.map((developers, index) => {
                  return <span key={index}>{developers.name}</span>;
                })}
                <h3>Age rating</h3>
                <span>{data.esrb_rating.name}</span>
              </div>
            </section>
          </section>
          <section className="game-description">
            <h3>About</h3>
            <span>{data.description_raw}</span>
          </section>
        </section>
      </section>
    </main>
  );
};

export default Game;

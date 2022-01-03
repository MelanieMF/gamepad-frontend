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
    <div>
      <h1>{data.name}</h1>
      {data.description_raw}
    </div>
  );
};

export default Game;

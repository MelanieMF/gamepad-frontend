// Externes
import { useEffect, useState } from "react";
import axios from "axios";

// Internes

// Styles & CSS
import "./Favoris.css";

const Favoris = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
  }, []);

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div>
      {data.length > 0
        ? data.map((item) => {
            return (
              <div key={item.id}>
                <h2>{item.name}</h2>
              </div>
            );
          })
        : "Vous n'avez pas de favoris enregistrés"}
    </div>
  );
};

export default Favoris;

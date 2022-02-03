// Externes
import axios from "axios";
import { useState, useEffect } from "react";

// Internes
import Review from "../Review/Review";
import Loader from "../../components/Loader/Loader";

const Reviews = ({ id, token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/reviews/${id}`);
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [likes, dislikes]);

  // const like = async (_id) => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:4000/review/like`,
  //       {
  //         _id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const dislike = async (_id) => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:4000/review/dislike`,
  //       {
  //         _id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="reviews">
      <h2>Reviews</h2>
      {data.length === 0 && <p>No review for this game.</p>}
      {data.map((review, index) => {
        return (
          <div key={index}>
            <Review
              data={data}
              index={index}
              likes={likes}
              // setLikes={setLikes}
              // dislikes={dislikes}
              // setDislikes={setDislikes}
              // like={like}
              // dislike={dislike}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;

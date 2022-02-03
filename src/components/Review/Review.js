// CSS & STYLES
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Review.css";

const Review = ({
  data,
  index,
  like,
  dislike,
  setLikes,
  likes,
  dislikes,
  setDislikes,
}) => {
  return (
    <section key={index} className="reviews-container">
      <article className="review-container">
        <div className="user-infos">
          <img src={data[0].avatar} alt="" />
          <p>{data[0].username} </p>
        </div>
        <div className="review-infos">
          <h4>{data[0].title}</h4>
          <p>{data[0].description}</p>
        </div>

        <div className="likes-button">
          <button
            onClick={() => {
              like(data._id);
              setLikes(likes + 1);
            }}
          >
            <FontAwesomeIcon icon="thumbs-up" />
            {/* {review.likes.length} */}
          </button>
          <button
            onClick={() => {
              dislike(data._id);
              setDislikes(dislikes + 1);
            }}
          >
            <FontAwesomeIcon icon="thumbs-down" />
            {/* {review.dislikes.length} */}
          </button>
        </div>
      </article>
    </section>
  );
};

export default Review;

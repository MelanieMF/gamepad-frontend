// Externes
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

// Internes
import icon from "../../assets/img/icon.png";

// Styles & CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ReviewModal.css";

const ReviewModal = ({ token }) => {
  const [reviewModal, setReviewModal] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const { id } = useParams();

  const toggleModal = () => {
    setReviewModal(!reviewModal);
  };

  const addReviews = async (event) => {
    event.preventDefault();
    console.log(token);
    try {
      const response = await axios.post(
        `http://localhost:4000/add/reviews`,
        {
          title: title,
          text: text,
          game_id: id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(token);
      // alert(response.data.message);
      // console.log("sa mère ses morts");
      alert(response.data.message);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <button onClick={toggleModal} className="game-button">
        Add a Review
        <span>
          <FontAwesomeIcon
            icon="comment-alt"
            // style={{ background: "transparent" }}
          />
        </span>
      </button>
      {reviewModal && (
        <section className="overlay">
          <div className="modal">
            <section className="modal-content">
              <h2>Write a Review</h2>
              <div className="form">
                <form onSubmit={(event) => addReviews(event)}>
                  <label htmlFor="cheese">Review title</label>
                  <input
                    type="text"
                    onChange={(event) => setTitle(event.target.value)}
                  />
                  <label htmlFor="cheese">Review text</label>
                  <textarea onChange={(event) => setText(event.target.value)} />
                  <input
                    type="submit"
                    value="Publish"
                    className="publish-button"
                  />
                </form>
              </div>
            </section>
          </div>

          <div className="close-modal" onClick={toggleModal}>
            <img src={icon} alt="close-button" />
          </div>
        </section>
      )}
    </div>
  );
};

export default ReviewModal;

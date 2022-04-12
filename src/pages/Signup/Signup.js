// Externes
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

// Internes
import closeIcon from "../../assets/img/icon-removebg.png";

// Styles & CSS
import "./Signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signup = ({ setUser }) => {
  const [file, setFile] = useState({});
  const [preview, setPreview] = useState();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [, setError] = useState();

  const navigate = useNavigate();

  const handleUsername = (event) => {
    const value = event.target.value;
    setUserName(value);
  };

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleConfirmPassword = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("username", username);
      formData.append("avatar", file);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);

      const response = await axios.post(
        "http://localhost:4000/user/signup",
        formData
      );

      setError(response.data.errorMessage);
      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <div>
      <section className="login-overlay">
        <div className="login-modal">
          <div
            className="close-loginModal"
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src={closeIcon}
              alt="close window icon"
              className="close-icon"
            />
          </div>
          <section className="notice-content">
            <h2>How it works ?</h2>
            <div>
              <p className="login-align">
                <span>
                  <FontAwesomeIcon icon="user" className="login-icons" />
                </span>
                <span>
                  Log in to your free account to be able to get all features of
                  GamePad
                </span>
              </p>
              <p>
                <span>
                  <FontAwesomeIcon icon="bookmark" className="login-icons" />
                </span>
                <span>Add a game to your collection</span>
              </p>
              <p>
                <span>
                  <FontAwesomeIcon icon="comment-alt" className="login-icons" />
                </span>
                <span>Leave a review for a game</span>
              </p>
            </div>
          </section>
          <div className="red-line"></div>
          <section className="signup-form">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleUsername}
                placeholder="Username"
                type="text"
                value={username}
              />
              <input
                onChange={handleEmail}
                placeholder="Email"
                type="email"
                value={email}
              />
              <div className="password-container">
                <input
                  onChange={handlePassword}
                  placeholder="Password"
                  type="password"
                  value={password}
                />
                <input
                  onChange={handleConfirmPassword}
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                />
              </div>
              <div className="add-avatar-button">
                <div className="file-select">
                  {preview ? (
                    <div className="preview-image">
                      <img
                        src={preview}
                        alt="pré-visualisation"
                        className="avatar-preview"
                      />
                      <div
                        className="remove-avatar-button"
                        onClick={() => {
                          setPreview("");
                        }}
                      >
                        X
                      </div>
                    </div>
                  ) : (
                    <input
                      id="file"
                      type="file"
                      className="avatar-input"
                      onChange={(event) => {
                        setFile(event.target.files[0]);
                        const file = URL.createObjectURL(event.target.files[0]);
                        setPreview(file);
                      }}
                    />
                  )}
                </div>

                <input
                  type="submit"
                  value="Sign up"
                  className="connexion-button"
                />
              </div>
            </form>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Signup;

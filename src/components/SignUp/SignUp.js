// Externes
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

// Internes

// CSS
import "./SignUp.css";

const SignUp = ({ setUser }) => {
  const [file, setFile] = useState({});
  const [preview, setPreview] = useState();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState();

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

  // const formData = new FormData();
  // formData.append("avatar", file);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(1);
    try {
      console.log(2);

      const formData = new FormData();
      formData.append("email", email);
      formData.append("username", username);
      formData.append("avatar", file);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      console.log(3);

      const response = await axios.post(
        "http://localhost:4000/user/signup",
        formData
      );
      console.log(4);

      setError(response.data.errorMessage);
      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      }
      console.log(5);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <div>
      <section>
        <h2>How it works ?</h2>
        <div>
          <p>
            Log in to your free account to be able to get all features of
            GamePad
          </p>
          <p>Add a game to your collection</p>
          <p>Leave a review for a game</p>
        </div>
      </section>
      <section className="form signup-form">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              onChange={handleUsername}
              placeholder="Username"
              type="text"
              value={username}
            />
          </div>
          <div>
            <input
              onChange={handleEmail}
              placeholder="Email"
              type="email"
              value={email}
            />
          </div>
          <div>
            <input
              onChange={handlePassword}
              placeholder="Password"
              type="password"
              value={password}
            />
          </div>
          <div>
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
                <div className="dashed-preview-image">
                  <img src={preview} alt="pré-visualisation" />
                  <div
                    className="remove-img-button"
                    onClick={() => {
                      setPreview("");
                    }}
                  >
                    X
                  </div>
                </div>
              ) : (
                <div className="dashed-preview-without">
                  <div className="input-design-default">
                    <input
                      id="file"
                      type="file"
                      className="input-file"
                      onChange={(event) => {
                        setFile(event.target.files[0]);
                        const file = URL.createObjectURL(event.target.files[0]);
                        setPreview(file);
                        console.log("file uploaded");
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <input type="submit" value="Connexion" className="connexion" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignUp;

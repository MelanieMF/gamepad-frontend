// Externes
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

// Internes
import Dropzone from "../Dropzone/Dropzone";

// CSS
import "./SignUp.css";

const SignUp = ({ setUser, token }) => {
  const [file, setFile] = useState();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

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

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:4000/user/signup", {
        username: username,
        email: email,
        password: password,
      });
      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.reponse);
      console.log(error.message);
      if (error.reponse.status === 409) {
        setErrorMessage("Cet email a déjà un compte");
      }
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
          <div className="add-picture-button">
            {/* <input
              type="file"
              multiple={true}
              onChange={(event) => {
                setFile(event.target.files[0]);
              }} 
            /> */}
            <Dropzone setFile={setFile} file={file} />
          </div>
          <div>
            <input type="submit" value="Connexion" className="connexion" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignUp;

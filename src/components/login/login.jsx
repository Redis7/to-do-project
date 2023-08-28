import React, { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./login.css"

function Login() {
  const username = useRef();
  const password = useRef();
  const [redirectToHome, setRedirectToHome] = useState(false);

  if (redirectToHome) {
    return <Navigate to="/home" />;
  }

  const buttonHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.10.135:8080/toDo/login",
        {
          email: username.current.value,
          password: password.current.value,
        }
      );

      const authToken=response.data;
      localStorage.setItem("authToken", authToken);
      setRedirectToHome(true);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-modal-holder" onSubmit={buttonHandler}>
        <h1> Log in </h1>
        <div className="login-input">
          <input type="email" required={true} placeholder="yourname@email.com" ref={username} />
        </div>
        <div className="login-input">
          <input type="password" required={true} placeholder="********" ref={password} />
        </div>
        <div className="buttons">
        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;

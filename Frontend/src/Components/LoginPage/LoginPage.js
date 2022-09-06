import "./LoginPage.css";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../images/Moova.png";

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <div className="loginWrapper">
        <img src={logo} alt="logo" />
        <h1>Please log in or sign up</h1>
        <button onClick={() => loginWithRedirect()} className="button">
          Login/Sign up
        </button>
      </div>
    </>
  );
};

export default LoginPage;

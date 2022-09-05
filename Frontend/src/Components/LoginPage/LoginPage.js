import "./LoginPage.css";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <div className="loginWrapper">
        <h1>Please log in</h1>
        <button onClick={() => loginWithRedirect()}>Login</button>
      </div>
    </>
  );
};

export default LoginPage;

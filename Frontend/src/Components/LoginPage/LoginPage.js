import "./LoginPage.css";
import { useState } from "react";

const LoginPage = ({ setUserToken, userToken, searchUser }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const loginUser = async (credentials) => {
    return fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((data) => data.json())
      .then((items) => setUserToken(items))
  };

  const signUpUser = async (credentials) => {
    return fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((data) => data.json())
      .then((items) => setUserToken(items));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await loginUser({
      username,
      password,
    });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    await signUpUser({
      username,
      password,
    });
  };

  return (
    <>
      <div className="loginWrapper">
        <button type="submit" onClick={() => console.log(userToken)}>
          Clicky
        </button>
        <h1>Please log in</h1>
        <form onSubmit={handleLoginSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>

      <div className="loginWrapper">
        <h1>Please Signup</h1>
        <form onSubmit={handleSignupSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};


export default LoginPage;

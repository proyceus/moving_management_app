import "./LoginPage.css";
import PropTypes from "prop-types";
import {useState} from "react";

const loginUser = async (credentials) => {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
}


const LoginPage = ({setToken}) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

    return (
        <div className="loginWrapper">
            <h1>Please log in</h1>
            <form onSubmit={handleSubmit}>
              <label>
                <p>Username</p>
                <input type="text" onChange={(e) => setUsername(e.target.value)} />
              </label>
              <label>
                <p>Password</p>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
              </label>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
        </div>
    
    )
}

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired,
}

export default LoginPage;
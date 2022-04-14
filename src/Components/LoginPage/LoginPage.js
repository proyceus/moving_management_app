import "./LoginPage.css";

const LoginPage = () => {
    return (
        <div className="loginWrapper">
            <h1>Please log in</h1>
            <form>
              <label>
                <p>Username</p>
                <input type="text" />
              </label>
              <label>
                <p>Password</p>
                <input type="password" />
              </label>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
        </div>
    
    )
}

export default LoginPage;
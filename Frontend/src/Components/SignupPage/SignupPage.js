import "./SignupPage.css";

const SignupPage = ({switchToLogin}) => {
    return (
        <>
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
        <div className="signupWrapper">
        <h1>Please sign up</h1>
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
    </>
    )
}

export default SignupPage;
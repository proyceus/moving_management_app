import "./LoginPage.css";

const LoginPage = () => {
    return (
        <div className="loginPage">
            <h1>Login here</h1>
            <p>Username</p>
            <input type="text" />
            <p>Password</p>
            <input type="text" />
            <br />
            <button type="submit">Submit</button>
        </div>
    )
}

export default LoginPage;
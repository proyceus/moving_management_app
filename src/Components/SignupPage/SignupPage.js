import "./SignupPage.css";

const SignupPage = () => {
    return (
        <div className="signupPage">
            <h1>Sign up here</h1>
            <p>Username</p>
            <input type="text" />
            <p>Password</p>
            <input type="text" />
            <br />
            <button type="submit">Submit</button>
        </div>
    )
}

export default SignupPage;
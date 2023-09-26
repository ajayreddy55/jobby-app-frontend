import { useNavigate } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const LoginForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jobbyToken = Cookies.get("jobby_jwt_token");
    if (jobbyToken !== undefined) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, []);

  const [loginEmail, setLoginEmail] = useState({
    email: "",
    emailRequiredText: "",
  });

  const [loginPassword, setPassword] = useState({
    password: "",
    passwordRequiredText: "",
  });

  const [loginServerMessage, setLoginServerMessage] = useState("");

  const changeTheLoginEmail = (event) => {
    const emailInput = event.target.value;

    setLoginServerMessage("");

    if (emailInput === "") {
      setLoginEmail((prevState) => ({
        ...prevState,
        email: "",
        emailRequiredText: "Required*",
      }));
    } else {
      setLoginEmail((prevState) => ({
        ...prevState,
        email: emailInput,
        emailRequiredText: "",
      }));
    }
  };

  const changeTheLoginPassword = (event) => {
    const passwordInput = event.target.value;

    setLoginServerMessage("");

    if (passwordInput === "") {
      setPassword((prevState) => ({
        ...prevState,
        password: "",
        passwordRequiredText: "Required*",
      }));
    } else {
      setPassword((prevState) => ({
        ...prevState,
        password: passwordInput,
        passwordRequiredText: "",
      }));
    }
  };

  const saveTokenAndNavigate = (jwtToken) => {
    Cookies.set("jobby_jwt_token", jwtToken, { expires: 1 });
    navigate("/");
  };

  const loginTheUser = async () => {
    const url = "http://localhost:3005/auth/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail.email,
        password: loginPassword.password,
      }),
    };
    const loginRes = await fetch(url, options);
    const loginJsonData = await loginRes.json();

    if (loginRes.ok === true) {
      saveTokenAndNavigate(loginJsonData.token);
    } else {
      setLoginServerMessage(loginJsonData.message);
    }
  };

  const validateLoginForm = () => {
    if (loginEmail.email === "") {
      setLoginEmail((prevState) => ({
        ...prevState,
        email: "",
        emailRequiredText: "Required*",
      }));
    } else if (loginPassword.password === "") {
      setPassword((prevState) => ({
        ...prevState,
        password: "",
        passwordRequiredText: "Required*",
      }));
    } else {
      loginTheUser();
    }
  };

  const submitLoginForm = (event) => {
    event.preventDefault();

    validateLoginForm();
  };

  return (
    <div className="login-form-bg-container">
      <div className="d-flex justify-content-center align-items-center mt-2 mb-4">
        <button
          className="login-sign-up-button"
          type="button"
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </div>
      <div className="login-form-card">
        <div className="login-logo-image-container">
          <img
            className="login-logo-image"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </div>
        <form className="login-form-element" onSubmit={submitLoginForm}>
          <div className="d-flex flex-column justify-content-center mt-2 mb-2">
            <label className="login-label" htmlFor="loginEmail">
              Email
            </label>
            <input
              className="login-input-ele"
              id="loginEmail"
              placeholder="Enter Your Email"
              type="text"
              value={loginEmail.email}
              onChange={changeTheLoginEmail}
            />
            <p className="login-required-text">
              {loginEmail.emailRequiredText}
            </p>
          </div>
          <div className="d-flex flex-column justify-content-center mt-2 mb-2">
            <label className="login-label" htmlFor="loginPassword">
              Password
            </label>
            <input
              className="login-input-ele"
              id="loginPassword"
              placeholder="Enter Your Password"
              type="password"
              value={loginPassword.password}
              onChange={changeTheLoginPassword}
            />
            <p className="login-required-text">
              {loginPassword.passwordRequiredText}
            </p>
          </div>
          <div className="login-submit-button-container">
            <button className="login-submit-button" type="submit">
              Login
            </button>
          </div>
          <p className="login-required-text">{loginServerMessage}</p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

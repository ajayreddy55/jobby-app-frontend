import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const SignupForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jobbyToken = Cookies.get("jobby_jwt_token");
    if (jobbyToken !== undefined) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, []);

  const [username, setUsername] = useState({
    name: "",
    nameRequiredText: "",
  });

  const [emailText, setEmailText] = useState({
    email: "",
    emailRequiredText: "",
  });

  const [phoneNumberText, setPhoneNumberText] = useState({
    phoneNumber: "",
    phoneNumberRequiredText: "",
  });

  const [genderText, setGenderText] = useState({
    gender: "Male",
    isMaleChecked: true,
    isFemaleChecked: false,
  });

  const [passwordText, setPasswordText] = useState({
    password: "",
    passwordRequiredText: "",
  });

  const [serverResMsg, setServerResMsg] = useState({
    messageText: "",
    messageTextColor: "",
  });

  const changeTheUsername = (event) => {
    const usernameInput = event.target.value;

    setServerResMsg((prevState) => ({
      ...prevState,
      messageText: "",
      messageTextColor: "",
    }));

    if (usernameInput === "") {
      setUsername((prevState) => ({
        ...prevState,
        name: "",
        nameRequiredText: "Required*",
      }));
    } else {
      setUsername((prevState) => ({
        ...prevState,
        name: usernameInput,
        nameRequiredText: "",
      }));
    }
  };

  const changeTheEmail = (event) => {
    const emailInput = event.target.value;

    setServerResMsg((prevState) => ({
      ...prevState,
      messageText: "",
      messageTextColor: "",
    }));

    if (emailInput === "") {
      setEmailText((prevState) => ({
        ...prevState,
        email: "",
        emailRequiredText: "Required*",
      }));
    } else {
      setEmailText((prevState) => ({
        ...prevState,
        email: emailInput,
        emailRequiredText: "",
      }));
    }
  };

  const changeThePhoneNumber = (event) => {
    const phoneNumberInput = event.target.value;

    setServerResMsg((prevState) => ({
      ...prevState,
      messageText: "",
      messageTextColor: "",
    }));

    if (phoneNumberInput === "") {
      setPhoneNumberText((prevState) => ({
        ...prevState,
        phoneNumber: "",
        phoneNumberRequiredText: "Required*",
      }));
    } else {
      setPhoneNumberText((prevState) => ({
        ...prevState,
        phoneNumber: phoneNumberInput,
        phoneNumberRequiredText: "",
      }));
    }
  };

  const changeGenderMale = (event) => {
    const genderInput = event.target.value;

    setServerResMsg((prevState) => ({
      ...prevState,
      messageText: "",
      messageTextColor: "",
    }));

    setGenderText((prevState) => ({
      ...prevState,
      gender: genderInput,
      isMaleChecked: true,
      isFemaleChecked: false,
    }));
  };

  const changeGenderFemale = (event) => {
    const genderInput = event.target.value;

    setServerResMsg((prevState) => ({
      ...prevState,
      messageText: "",
      messageTextColor: "",
    }));

    setGenderText((prevState) => ({
      ...prevState,
      gender: genderInput,
      isMaleChecked: false,
      isFemaleChecked: true,
    }));
  };

  const changeThePassord = (event) => {
    const passwordInput = event.target.value;

    setServerResMsg((prevState) => ({
      ...prevState,
      messageText: "",
      messageTextColor: "",
    }));

    if (passwordInput === "") {
      setPasswordText((prevState) => ({
        ...prevState,
        password: "",
        passwordRequiredText: "Required*",
      }));
    } else {
      setPasswordText((prevState) => ({
        ...prevState,
        password: passwordInput,
        passwordRequiredText: "",
      }));
    }
  };

  const registerTheUser = async () => {
    const url = "http://localhost:3005/auth/signup";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username.name,
        email: emailText.email,
        phoneNumber: phoneNumberText.phoneNumber,
        gender: genderText.gender,
        password: passwordText.password,
      }),
    };
    const serverRes = await fetch(url, options);
    const resJsonData = await serverRes.json();

    if (serverRes.status === 200) {
      setServerResMsg((prevState) => ({
        ...prevState,
        messageText: resJsonData.message,
        messageTextColor: "success-msg-color",
      }));
      //navigate("/login");
    } else {
      setServerResMsg((prevState) => ({
        ...prevState,
        messageText: resJsonData.message,
        messageTextColor: "",
      }));
    }
    setUsername((prevState) => ({
      ...prevState,
      name: "",
      nameRequiredText: "",
    }));
    setEmailText((prevState) => ({
      ...prevState,
      email: "",
      emailRequiredText: "",
    }));
    setPhoneNumberText((prevState) => ({
      ...prevState,
      phoneNumber: "",
      phoneNumberRequiredText: "",
    }));
    setGenderText((prevState) => ({
      ...prevState,
      gender: "Male",
      isMaleChecked: true,
      isFemaleChecked: false,
    }));
    setPasswordText((prevState) => ({
      ...prevState,
      password: "",
      passwordRequiredText: "",
    }));
  };

  const validateFormData = () => {
    if (username.name === "") {
      setUsername((prevState) => ({
        ...prevState,
        name: "",
        nameRequiredText: "Required*",
      }));
    } else if (emailText.email === "") {
      setEmailText((prevState) => ({
        ...prevState,
        email: "",
        emailRequiredText: "Required*",
      }));
    } else if (phoneNumberText.phoneNumber === "") {
      setPhoneNumberText((prevState) => ({
        ...prevState,
        phoneNumber: "",
        phoneNumberRequiredText: "Required*",
      }));
    } else if (passwordText.password === "") {
      setPasswordText((prevState) => ({
        ...prevState,
        password: "",
        passwordRequiredText: "Required*",
      }));
    } else if (
      passwordText.password.length <= 5 ||
      passwordText.password.length > 10
    ) {
      setPasswordText((prevState) => ({
        ...prevState,
        password: "",
        passwordRequiredText:
          "Password must be greater than 5 characters and less than or equal to 10 characters",
      }));
    } else {
      registerTheUser();
    }
  };

  const submitTheForm = (event) => {
    event.preventDefault();

    validateFormData();
  };

  return (
    <div className="signup-form-bg-container">
      <div className="d-flex justify-content-center align-items-center mt-2 mb-4">
        <button
          className="signup-login-button"
          type="button"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
      <div className="signup-form-card">
        <div className="signup-logo-image-container">
          <img
            className="signup-logo-image"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </div>
        <form className="signup-form-element" onSubmit={submitTheForm}>
          <div className="d-flex flex-column justify-content-center mt-2 mb-2">
            <label className="signup-label" htmlFor="signupUsername">
              Username
            </label>
            <input
              className="signup-input-ele"
              id="signupUsername"
              placeholder="Enter Your Username"
              type="text"
              value={username.name}
              onChange={changeTheUsername}
            />
            <p className="signup-required-text">{username.nameRequiredText}</p>
          </div>
          <div className="d-flex flex-column justify-content-center mt-2 mb-2">
            <label className="signup-label" htmlFor="signupEmail">
              Email
            </label>
            <input
              className="signup-input-ele"
              id="signupEmail"
              placeholder="Enter Your Email"
              type="text"
              value={emailText.email}
              onChange={changeTheEmail}
            />
            <p className="signup-required-text">
              {emailText.emailRequiredText}
            </p>
          </div>
          <div className="d-flex flex-column justify-content-center mt-2 mb-2">
            <label className="signup-label" htmlFor="signupPhoneNumber">
              Phone number
            </label>
            <input
              className="signup-input-ele"
              id="signupPhoneNumber"
              placeholder="Enter Your Phone number"
              type="text"
              value={phoneNumberText.phoneNumber}
              onChange={changeThePhoneNumber}
            />
            <p className="signup-required-text">
              {phoneNumberText.phoneNumberRequiredText}
            </p>
          </div>
          <div className="d-flex align-items-center flex-wrap mt-2 mb-2">
            <div className="d-flex align-items-center mr-5 mt-1 mb-1">
              <input
                type="radio"
                className="signup-radio-input"
                id="maleInput"
                value={"Male"}
                name="gender"
                onChange={changeGenderMale}
                checked={genderText.isMaleChecked}
              />
              <label className="signup-radio-text" htmlFor="maleInput">
                Male
              </label>
            </div>
            <div className="d-flex align-items-center mt-1 mb-1">
              <input
                type="radio"
                className="signup-radio-input"
                id="femaleInput"
                value={"Female"}
                name="gender"
                onChange={changeGenderFemale}
                checked={genderText.isFemaleChecked}
              />
              <label className="signup-radio-text" htmlFor="femaleInput">
                Female
              </label>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center mt-2 mb-2">
            <label className="signup-label" htmlFor="signupPassword">
              Password
            </label>
            <input
              className="signup-input-ele"
              id="signupPassword"
              placeholder="Enter Your Password"
              type="password"
              value={passwordText.password}
              onChange={changeThePassord}
            />
            <p className="signup-required-text">
              {passwordText.passwordRequiredText}
            </p>
          </div>
          <div className="signup-submit-button-container">
            <button className="signup-submit-button" type="submit">
              Signup
            </button>
          </div>
          <p
            className={`signup-required-text ${serverResMsg.messageTextColor}`}
          >
            {serverResMsg.messageText}
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

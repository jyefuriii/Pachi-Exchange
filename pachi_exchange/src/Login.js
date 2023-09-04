import React, { useContext, useState } from "react";
import "./Login.css";
import LoginHeader from "./LoginHeader";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        username,
        password,
      };

      await axios.post("http://localhost:8001/auth/login", loginData);
      //await axios.post(
      //  "https://mern-auth-template-tutorial.herokuapp.com/auth/login",
      //  loginData
      //);
      await getLoggedIn();
      history.push("/Homepage");
    } catch (err) {
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        title: "Login Failed",
        showConfirmButton: false,
        html: `<span style="color: #3fa2f7; background: #fff; font-size: 18px;">
        ${err.response.data.errorMessage}
      </span>`,
        customClass: {
          closeButton: "swalCloseButton",
          title: "swalTitle",
        },
      });
    }
  }

  return (
    <div className="login_container">
      <LoginHeader />
      <div className="login_banner">
        <img className="login_img" src="./login_bg.png" alt="" />
        <div className="login_form">
          <form className="form-inline" onSubmit={login}>
            <img src="./pachi_logo.png" alt="" />
            <input
              type="text"
              placeholder="Display Name"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              autoComplete="username"
            />
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="current-password"
            />
            <VisibilityOff
              visibility={passwordShown ? "hidden" : "visible"}
              className="showPassword"
              onClick={togglePassword}
            />
            <Visibility
              visibility={passwordShown ? "visible" : "hidden"}
              className="showPassword"
              onClick={togglePassword}
            />
            <div className="forgot_pw">
              <Link to="./ForgotPassword">I forgot my password</Link>
            </div>
            <div>
              <button type="submit" className="loginForm_button">
                Log In
              </button>
            </div>
            <Link className="signup_link" to="./Signup">
              <button className="signupForm_button">Sign Up</button>
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;

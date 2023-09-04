import React, { useState, useEffect } from "react";
import "./ForgotPassword.css";
import LandingHeader from "./LandingHeader";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import validator from "validator";
import axios from "axios";
import Swal from "sweetalert2";

function ForgotPassword() {
  const [emailAddress, setEmailAddress] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setIsDisabled(!validator.isEmail(emailAddress));
  }, [emailAddress]);

  async function sendResetLink() {
    if (validator.isEmail(emailAddress)) {
      try {
        const sendEmailData = {
          emailAddress: emailAddress,
        };
        await axios.post("http://localhost:8001/password-reset", sendEmailData);
        Swal.fire({
          title: "Check your email inbox",
          text: "Password reset link sent to your email account",
          button: "OK",
        });
        history.push("/");
      } catch (err) {
        setIsDisabled(true);
        Swal.fire({
          title: "Required Field",
          text: err.response.data.errorMessage,
          button: "OK",
        });
      }
    } else {
      Swal.fire({
        title: "Required Field",
        text: "Please input your email.",
        button: "OK",
      });
    }
  }

  return (
    <div className="forgotPassword_container">
      <LandingHeader />
      <div className="forgotPassword_header">
        <img src="./pachi-exchange-favicon.png" alt="" />
        <h1>Password Reset</h1>
      </div>
      <div className="forgotPassword_contents">
        <h1>Enter your Email</h1>
        <p>
          Provide your Pachi Exchange email to receive your password reset link.
        </p>
        <p>
          Please check your Spam or Promotions folder if you fail to receive it
          in your inbox.
        </p>
        <input
          type="email"
          className="forgotPasswordEmail_input"
          placeholder="Email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        <div className="send_button">
          <button
            onClick={sendResetLink}
            disabled={isDisabled}
            className="sendEmail_button"
          >
            SUBMIT
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPassword;

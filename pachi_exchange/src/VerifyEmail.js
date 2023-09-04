import React from "react";
import "./VerifyEmail.css";
import LoginHeader from "./LoginHeader";
import Footer from "./Footer";

function VerifyEmail() {
  return (
    <div className="verifyEmail_container">
      <LoginHeader />
      <div className="verifyEmail_banner">
        <img className="verifyEmail_img" src="" alt="" />
        <div className="verifyEmail_contents">
          <h1>You’re Almost Done!</h1>
          <h2 className="heading1">Thank you for signing up to Pachi+ </h2>
          <h2 className="heading2">
            You’re just more step away from enjoying the most rewarding online
            Pachinko game ever.
          </h2>
          <h2 className="heading3">
            Please verify your email to confirm your account.
          </h2>
          <h3>
            *Please check your SPAM or PROMOTIONS folder if our email does not
            show up in your inbox.
          </h3>
        </div>
        <Footer className="footer" />
      </div>
    </div>
  );
}
export default VerifyEmail;

import React from "react";
import "../styles/AccountCreated.css";
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function AccountCreated() {
  return (
    <div className="accountCreated_container">
      <LandingHeader />
      <div className="accountCreated_banner">
        <img className="accountCreated_img" src="" alt="" />
        <div className="accountCreated_contents">
          <h1>Hooray! Welcome, player!</h1>
          <h2 className="heading1">You are now an official Pachi+ player!</h2>
          <h2 className="heading2">
            Start playing{" "}
            <a
              href="https://play.pachiplus.com/"
              className="welcome_PachiLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pachi+
            </a>{" "}
            and start earning Pachi Tickets to exchange and collect Premium
            Prizes here on Pachi Exchange. Enjoy!
          </h2>
          <Link className="accountLogin_link" to="./Login">
            <button className="accountLogin_button">
              LOG IN TO MY ACCOUNT
            </button>
          </Link>
        </div>
      </div>
      <Footer className="footer" />
    </div>
  );
}
export default AccountCreated;

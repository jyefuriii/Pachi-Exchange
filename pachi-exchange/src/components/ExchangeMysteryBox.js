import React from "react";
import "../styles/ExchangeMysteryBox.css";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import GiftCardStepsThree from "../components/GiftCardStepsThree";
import * as assets from "../assets"; // Import all assets from index.js

function ExchangeMysteryBox() {
  return (
    <div className="exchange_mb_container">
      <HomeHeader />
      <GiftCardStepsThree />
      <div>
        <div className="exchange_mb_contents">
          <h1>IN PROGRESS</h1>
          <h1>Your Pachi Mystery Box is being processed!</h1>
          <h1>Check your email for delivery details.</h1>
          <h5>
            Please ensure you have updated your shipping address in your account
            to ensure delivery is valid.
          </h5>
          <div className="playGame_container">
            <img className="playGame_img" src={assets.playGameImage} alt="" />
            <a
              className="exchange_mb_link"
              href="https://play.pachiplus.com"
              target="blank"
            >
              <div className="exchange_mb_button">
                <button className="playGameBrowser_button">
                  PLAY GAME ON BROWSER
                </button>
              </div>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ExchangeMysteryBox;

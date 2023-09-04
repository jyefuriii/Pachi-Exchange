import React from "react";
import "./ExchangeMysteryBox.css";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import GiftCardStepsThree from "./GiftCardStepsThree";

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
            <img
              className="playGame_img"
              src="./play_game_browser.png"
              alt=""
            />
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

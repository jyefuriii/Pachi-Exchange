import React from "react";
import "../styles/ExchangeGiftCard.css";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import GiftCardStepsThree from "../components/GiftCardStepsThree";

function ExchangeGiftCard() {
  return (
    <div className="exchange_gc_container">
      <HomeHeader />
      <GiftCardStepsThree />
      <div>
        <div className="exchange_gc_contents">
          <h1>CONGRATULATIONS</h1>
          <h1>Your Gift Card delivery is being processed!</h1>
          <h1>Your prize will be emailed within 5-10 working days.</h1>
          <div className="playGame_container">
            <img
              className="playGame_img"
              src="./play_game_browser.png"
              alt=""
            />
            <a
              className="exchange_gc_link"
              href="https://play.pachiplus.com"
              target="blank"
            >
              <div className="exchange_gc_button">
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

export default ExchangeGiftCard;

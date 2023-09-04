import React from "react";
import "./ExchangeTrophy.css";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import PrizeStepsTwo from "./PrizeStepsTwo";

function ExchangeTrophy() {
  return (
    <div className="exchange_trophy_container">
      <HomeHeader />
      <PrizeStepsTwo />
      <div>
        <div className="exchange_trophy_contents">
          <h1>CONGRATULATIONS</h1>
          <h1>Your Pachi Premium Trophy has been processed!</h1>
          <h1>
            Check
            <Link className="myAccount_link" to="./MyAccount">
              My Account
            </Link>{" "}
            to view your collection.
          </h1>
          <div className="playGame_container">
            <img
              className="playGame_img"
              src="./play_game_browser.png"
              alt=""
            />
            <a
              className="exchange_trophy_link"
              href="https://play.pachiplus.com"
              target="blank"
            >
              <div className="exchange_trophy_button">
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

export default ExchangeTrophy;

import React from "react";
import "./CashoutOption.css";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import CashoutStepsTwo from "./CashoutStepsTwo";
import { Link } from "react-router-dom";

function CashoutOption() {
  return (
    <div className="cashoutOption_container">
      <HomeHeader />
      <CashoutStepsTwo />
      <div className="cashoutOption_contents">
        <div className="cashoutOption_details">
          <h1>Choose your payment option</h1>
          <div className="optionButton_container">
            <Link className="optionButton_link" to="/CashoutBank">
              <button className="optionButton">BSB/ACCOUNT</button>
            </Link>
            <Link className="optionButton_link1" to="/CashoutPaypal">
              <button className="optionButton1">PAYPAL</button>
            </Link>
            <Link className="optionButton_link2" to="/Sweepstakes">
              <button className="optionButton2" disabled="true">
                STRIPE
              </button>
            </Link>
            <Link className="optionButton_link3" to="/Sweepstakes">
              <button className="optionButton3" disabled="true">
                AIRWALLEX
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CashoutOption;

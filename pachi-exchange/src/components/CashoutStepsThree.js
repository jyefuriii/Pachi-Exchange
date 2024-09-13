import React from "react";
import "../styles/GiftCardSteps.css";
import * as assets from "../assets"; // Import all assets from index.js

function CashoutStepsThree() {
  return (
    <div className="exchange_steps">
      <div className="steps_col">
        <span>Cashout Amount</span>
        <img src={assets.ellipse1} alt="" />
      </div>
      <div className="steps_col">
        <span>Payment Option</span>
        <img className="step_circle2" src={assets.ellipse1} alt="" />
      </div>
      <div className="steps_col">
        <span>Confirm Cashout</span>
        <img src={assets.ellipse2} alt="" />
      </div>
    </div>
  );
}

export default CashoutStepsThree;

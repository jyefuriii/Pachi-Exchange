import React from "react";
import "./GiftCardSteps.css";

function CashoutStepsThree() {
  return (
    <div className="exchange_steps">
      <div className="steps_col">
        <span>Cashout Amount</span>
        <img src="./ellipse1.png" alt="" />
      </div>
      <div className="steps_col">
        <span>Payment Option</span>
        <img className="step_circle2" src="./ellipse1.png" alt="" />
      </div>
      <div className="steps_col">
        <span>Confirm Cashout</span>
        <img src="./ellipse2.png" alt="" />
      </div>
    </div>
  );
}

export default CashoutStepsThree;

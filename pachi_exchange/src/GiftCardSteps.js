import React from "react";
import "./GiftCardSteps.css";

function GiftCardSteps() {
  return (
    <div className="exchange_steps">
      <div className="steps_col">
        <span>Review Items</span>
        <img src="./ellipse2.png" alt="" />
      </div>
      <div className="steps_col">
        <span>Digital Delivery</span>
        <img className="step_circle2" src="./ellipse1.png" alt="" />
      </div>
      <div className="steps_col">
        <span>Exchange</span>
        <img src="./ellipse1.png" alt="" />
      </div>
    </div>
  );
}

export default GiftCardSteps;

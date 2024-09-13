import React from "react";
import "../styles/PrizeSteps.css";
import * as assets from "../assets"; // Import all assets from index.js

function PrizeStepsTwo() {
  return (
    <div className="exchange_steps">
      <div className="steps_col">
        <span>Review Items</span>
        <img src={assets.ellipse1} alt="" />
      </div>
      <div className="steps_col">
        <span>Exchange</span>
        <img src={assets.ellipse2} alt="" />
      </div>
    </div>
  );
}

export default PrizeStepsTwo;

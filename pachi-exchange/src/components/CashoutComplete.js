import React from "react";
import "../styles/CashoutComplete.css";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import CashoutStepsThree from "../components/CashoutStepsThree";
import { Link } from "react-router-dom";
import * as assets from "../assets"; // Import all assets from index.js

function CashoutComplete() {
  return (
    <div className="cashoutComplete_container">
      <HomeHeader />
      <CashoutStepsThree />
      <div className="cashoutComplete_contents">
        <div className="cashoutComplete_details">
          <div className="cashoutCompleteImage_container">
            <img src={assets.cashoutComplete} alt="" />
          </div>
          <div className="cashoutComplete_col2">
            <h1>Cashout Request Received</h1>
            <span>
              Your request is in progress. Please allow 5-10 days of processing.
              You will receive a notification email once the transaction is
              complete.
            </span>
            <Link className="cashoutComplete_link" to="./MyAccount">
              <button className="cashoutComplete_button">
                BACK TO MY ACCOUNT
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CashoutComplete;

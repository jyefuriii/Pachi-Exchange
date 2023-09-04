import React from "react";
import "./RedeemSuccess.css";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import RedeemStepsTwo from "./RedeemStepsTwo";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function RedeemSuccess() {
  const history = useHistory();
  function myAccountlink() {
    history.push("/myAccount");
  }
  return (
    <div className="redeemSuccess_container">
      <HomeHeader />
      <RedeemStepsTwo />
      <div className="redeemSuccess_content">
        <div className="redeemSuccess_col">
          <img src="./redeem_like.png" alt="" />
        </div>
        <div className="redeemSuccess_col2">
          <h1>Great! You’ve just added cash into your Pachi e-Wallet</h1>
          <p>
            Your Premium Trophy has been successfully converted into cash value.
            You may check your Pachi e-Wallet in
            <Link className="redeemAccount_link" to="./MyAccount">
              My Account
            </Link>
            . Earn more Pachi Tickets to keep your Prize collection growing!
          </p>
          <div className="redeemButton_container">
            <button className="redeemSuccess_button" onClick={myAccountlink}>
              REDEEM MORE
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RedeemSuccess;

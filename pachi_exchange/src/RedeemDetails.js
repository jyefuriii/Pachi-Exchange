import React, { useState, useEffect } from "react";
import "./RedeemDetails.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

function RedeemDetails({ image, price, shortName, _id, count }) {
  const [users, setUsers] = useState([]);
  const history = useHistory();
  async function getUsers() {
    const usersRes = await axios.get("http://localhost:8001/auth/login");
    setUsers(usersRes.data);
  }
  //useEffect
  useEffect(() => {
    getUsers();
  }, []);

  async function updateCashAmount() {
    const newCashAmount = Number(users.userCashAmount) + Number(price);
    try {
      const cashAmountData = {
        userCashAmount: newCashAmount,
      };
      await axios.put(
        "http://localhost:8001/auth/updateCashAmount",
        cashAmountData
      );
      history.push("/RedeemSuccess");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.errorMessage);
      }
    }
  }
  async function updateCollectionCount() {
    try {
      const collectionData = {
        shortName: shortName,
        currentUser: users._id,
      };

      await axios.put(
        "http://localhost:8001/collection/redeemCollection",
        collectionData
      );
      updateCashAmount();
    } catch (err) {
      if (err.response) {
        alert(err.response.data.errorMessage);
      }
    }
  }

  return (
    <div className="redeemDetails_container">
      <div className="redeemExchange_container">
        <div className="redeemDesc_col">
          <div className="redeemImage_container">
            <img src={image} alt="" />
            <p className="redeemDesc_price">
              <strong>${price}.00</strong>
            </p>
          </div>
        </div>
        <div className="redeemDesc_col2">
          <h1>
            Redeem <span className="redeemName">{shortName}</span> Trophy
          </h1>
          <div className="redeemDescInput_container">
            <p>
              You are about to redeem a premium trophy to convert into cash
              value. After redemption, the cash value will be added to your
              wallet and can later be cashed out to you Paypal account and other
              payment gateways.
              <br></br>
              <br></br>
              <span className="redeem_reminder">
                *You cannot undo this action once it is processed.
              </span>
            </p>
            <div className="redeemInput_quantity">
              <label>QTY:</label>
              <input
                type="number"
                placeholder=""
                min="1"
                max="1"
                value="1"
                style={{ width: "123px" }}
              />
            </div>
            <div className="redeemInput_tickets">
              <div>
                <label>TOTAL CASH VALUE:</label>
                <input
                  type="text"
                  placeholder=""
                  style={{ width: "148px" }}
                  value={price}
                />
              </div>
              <div className="redeemContinue_button">
                <button
                  key={_id}
                  className="redeemDesc_button"
                  onClick={updateCollectionCount}
                >
                  CONTINUE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RedeemDetails;

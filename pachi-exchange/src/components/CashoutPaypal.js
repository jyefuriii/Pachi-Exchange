import React, { useState, useEffect } from "react";
import "../styles/CashoutPaypal.css";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import axios from "axios";
import Swal from "sweetalert2";
import * as assets from "../assets"; // Import all assets from index.js

function CashoutPaypal() {
  const [users, setUsers] = useState("");
  const history = useHistory();
  const [paypalAccount, setPaypalAccount] = useState("");
  const [{ cashAmount }] = useStateValue();
  const item = JSON.parse(JSON.stringify({ cashAmount }));
  const cashValue = item.cashAmount[cashAmount.length - 1];

  async function getUsers() {
    try {
      const usersRes = await axios.get("http://localhost:8001/auth/login");
      setUsers(usersRes.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function cashoutLog() {
    if (users.userCashAmount >= cashValue.cashAmount) {
      try {
        const cashoutData = {
          username: users.username,
          paypalAccount: paypalAccount,
          previousCashAmount: users.userCashAmount,
          cashoutValue: Number(cashValue.cashAmount),
        };
        await axios.post("http://localhost:8001/cashout/paypal", cashoutData);
        await axios.put(
          "http://localhost:8001/auth/updateCashoutAmount",
          cashoutData
        );

        history.push("./CashoutComplete");
      } catch (error) {
        alert(error.response?.data?.errorMessage || "An error occurred.");
      }
    } else {
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        title: `<img src="${assets.pachi_logo}" alt="Logo"/>`,
        showConfirmButton: false,
        html: `
          <div style="height: 200px; width: auto; margin-top: 30px;">
            <span style="color: #297FCA; font-weight: 550; font-size: 26px;">
              Cashout amount should not be more than your available amount.<br><br>
            </span>
            <span style="font-weight: 550; color: #297FCA; font-size: 20px;">
              Please see 
              <a href="http://knowledgebase.pachiplus.com/what-are-the-terms-conditions-of-use" target="_blank" style="color: #297FCA;">
                terms and conditions.
              </a>
            </span>
          </div>`,
        customClass: {
          popup: "swalCustomPopup",
          container: "swalContainer",
          closeButton: "swalCloseButton",
          title: "swalTitle1",
        },
      });
    }
  }

  const confirmCashout = () =>
    Swal.fire({
      title: "You are about to cashout",
      html: `
      <span style="font-size: 16px; font-weight: 700; color: #297FCA; text-align: center; display: block;">
        *Minimum cashout amount is $100.00
      </span>
      <div style="height: 60px; width: 100%; display: flex; justify-content: center; align-items: center; margin-top: 20px;">
        <div style="height: 60px; width: 155px; border-radius: 10px; background: #FFFFFF; display: flex; justify-content: center; align-items: center;">
          <p style="font-size: 35px; font-weight: 700; color: #297FCA; text-align: center; margin: 0;">
            $${cashValue.cashAmount}.00
          </p>
        </div>
      </div>`,
      showCancelButton: true,
      allowOutsideClick: false,
      background: "#E5F1FD",
      reverseButtons: true,
      buttonsStyling: false,
      confirmButtonText: "PROCEED",
      cancelButtonText: "CANCEL",
      customClass: {
        title: "swalCashoutTitle",
        confirmButton: "swalCashoutButton",
        cancelButton: "swalCashoutCancelButton",
        popup: "swalCustomPopup",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        cashoutLog();
      } else if (result.isDenied) {
        Swal.close();
      }
    });

  async function validateCashoutAmount() {
    if (!paypalAccount) {
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        background: "#fff",
        title: "Required Field",
        showConfirmButton: false,
        html: `<span style="color: #3fa2f7; font-size: 18px;">
                 Please enter your PayPal account
               </span>`,
        customClass: {
          popup: "swalCustomPopup",
          closeButton: "swalCloseButton",
          title: "swalTitle",
        },
      });
    } else {
      await confirmCashout();
    }
  }

  // Fetch user data on mount
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="cashoutPaypal_container">
      <HomeHeader />
      <div className="cashoutPaypal_head">
        <h1>ENTER YOUR PAYPAL DETAILS</h1>
        <h3>Ensure your details are correct</h3>
      </div>
      <div className="cashoutPaypal_contents">
        <div className="cashoutPaypal_details">
          <div className="cashoutPaypal_inputs">
            <label>Your PayPal Account</label>
            <input
              type="text"
              placeholder="Name, email, or mobile number"
              onChange={(e) => setPaypalAccount(e.target.value)}
              style={{
                width: "429px",
                height: "45px",
                color: "#3fa2f7",
                fontWeight: "700",
              }}
            />
            <div className="cashoutPaypalButton_container">
              <Link className="cashoutPaypal_buttonLink" to="./CashoutOption">
                <button className="cashoutPaypal_button">BACK</button>
              </Link>
              <button
                className="cashoutPaypal_button1"
                onClick={validateCashoutAmount}
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CashoutPaypal;

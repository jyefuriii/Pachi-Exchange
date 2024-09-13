import React, { useEffect, useState } from "react";
import "../styles/CashoutBank.css";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useStateValue } from "../StateProvider";
import Swal from "sweetalert2";
import * as assets from "../assets"; // Import all assets from index.js

function CashoutBank() {
  const [users, setUsers] = useState("");
  const history = useHistory();
  const [country, setCountry] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccountFirstName, setBankAccountFirstName] = useState("");
  const [bankAccountLastName, setBankAccountLastName] = useState("");
  const [{ cashAmount }] = useStateValue();
  const item = JSON.parse(JSON.stringify({ cashAmount }));
  const cashValue = item.cashAmount[cashAmount.length - 1];

  async function getUsers() {
    const usersRes = await axios.get("http://localhost:8001/auth/login");
    setUsers(usersRes.data);
  }

  async function cashoutLog() {
    if (users.userCashAmount >= cashValue.cashAmount) {
      try {
        const cashoutData = {
          username: users.username,
          bankCode: bankCode,
          bankAccountNumber: bankAccountNumber,
          bankAccountFirstName: bankAccountFirstName,
          bankAccountLastName: bankAccountLastName,
          country: country,
          previousCashAmount: users.userCashAmount,
          cashoutValue: Number(cashValue.cashAmount),
        };
        await axios.post("http://localhost:8001/cashout/bank", cashoutData);
        await axios.put(
          "http://localhost:8001/auth/updateCashoutAmount",
          cashoutData
        );

        history.push("./CashoutComplete");
      } catch (error) {
        if (error) {
          alert(error.res.data.errorMessage);
        }
      }
    } else {
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        title: `<img src="${assets.pachi_logo}" alt=""/>`,
        showConfirmButton: false,
        html: `<div style="height: 200px; width: auto; margin-top: 30px;">
          <span style="color: #297FCA; font-weight: 550; font-size: 26px; line-height: 32px;">
            Cashout amount should not be more than your available amount.<br><br>
          </span>
          <span style="font-weight: 550; color: #297FCA; font-size: 20px; line-height: 32px;">
            Please see <a href="http://knowledgebase.pachiplus.com/what-are-the-terms-conditions-of-use" target="_blank" style="font-weight: 550; font-size: 20px; line-height: 32px;">terms and conditions.</a>
          </span>
        </div>`,
        customClass: {
          popup: "swalCustomPopup", // Apply custom CSS class here
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
      html: `<span style="font-size: 16px; font-weight: 700; text-align: center;color: #297FCA;">*Minimum cashout amount is $100.00</span>
      <div style="height: 60px; width: 155px; border-radius: 10px; padding: 10px; margin: 20px auto 0; background: #FFFFFF; text-align: center;">
        <p style="font-family: Arial; font-size: 35px; font-weight: 700; color: #297FCA; margin: 0;">
          $${cashValue.cashAmount}.00
        </p>
      </div>`, // Centered using margin auto
      showCancelButton: true,
      allowOutsideClick: false,
      background: "#E5F1FD",
      reverseButtons: true,
      buttonsStyling: false,
      confirmButtonText: "PROCEED",
      cancelButtonText: "CANCEL",
      customClass: {
        popup: "swalCustomPopup",
        title: "swalCashoutTitle",
        confirmButton: "swalCashoutButton",
        cancelButton: "swalCashoutCancelButton",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        cashoutLog();
      } else if (result.isDenied) {
        Swal.close();
      }
    });

  async function validateCashoutAmount() {
    if (
      !bankCode ||
      !bankAccountNumber ||
      !bankAccountFirstName ||
      !bankAccountLastName ||
      !country
    ) {
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        background: "#fff",
        title: "Required Field  ",
        showConfirmButton: false,
        html: `<span style="color: #3fa2f7; background: #fff; font-size: 18px;">Please enter all required fields</span>`,
        customClass: {
          popup: "swalCustomPopup", // Apply custom CSS class here
          closeButton: "swalCloseButton",
          title: "swalTitle",
        },
      });
    } else {
      await confirmCashout();
    }
  }

  //useEffect
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="cashoutBank_container">
      <HomeHeader />
      <div className="cashoutBank_head">
        <h1>ENTER YOUR BANK DETAILS</h1>
        <h3>Ensure your details are correct</h3>
      </div>
      <div className="cashoutBank_contents">
        <div className="cashoutBank_details">
          <div className="cashoutBank_inputs">
            <div className="cashoutBank_row1">
              <div className="cashoutBank_code">
                <label>SWIFT/BIC code</label>
                <input
                  type="text"
                  placeholder="Bank code"
                  value={bankCode}
                  onChange={(e) => setBankCode(e.target.value)}
                  style={{
                    width: "284px",
                    height: "45px",
                    color: "#3fa2f7",
                    fontWeight: "700",
                  }}
                />
                <span>Find a Bank Code</span>
              </div>
              <div className="cashoutBank_country">
                <label>Country</label>
                <select
                  style={{
                    width: "192px",
                    height: "45px",
                    border: "2px solid #297fca",
                    marginLeft: "0",
                    color: "#297fca",
                  }}
                  id="cashout_country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="" disabled selected hidden>
                    Country
                  </option>
                  <option value="Unspecified">Unspecified</option>
                  <option value="United States">
                    United States of America
                  </option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                  <option value="China">China</option>
                  <option value="Japan">Japan</option>
                  <option value="South Korea">South Korea</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Italy">Italy</option>
                  <option value="Spain">Spain</option>
                </select>
              </div>
            </div>
            <div className="cashoutBank_number">
              <label>Account Number or IBAN</label>
              <input
                type="number"
                placeholder="Bank account number"
                value={bankAccountNumber}
                onChange={(e) => setBankAccountNumber(e.target.value)}
                style={{
                  width: "360px",
                  height: "45px",
                  color: "#3fa2f7",
                  fontWeight: "700",
                }}
              />
            </div>
            <div className="cashoutBank_row3">
              <div className="cashoutBank_name">
                <label>Account Name</label>
                <div className="cashoutBankName_fields">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={bankAccountFirstName}
                    onChange={(e) => setBankAccountFirstName(e.target.value)}
                    style={{
                      width: "170px",
                      height: "45px",
                      color: "#3fa2f7",
                      fontWeight: "700",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={bankAccountLastName}
                    onChange={(e) => setBankAccountLastName(e.target.value)}
                    style={{
                      width: "170px",
                      height: "45px",
                      color: "#3fa2f7",
                      fontWeight: "700",
                    }}
                  />
                </div>
              </div>
              <div className="cashoutBankButton_container">
                <Link className="cashoutBank_buttonLink" to="./CashoutOption">
                  <button className="cashoutBank_button">BACK</button>
                </Link>
                <button
                  className="cashoutBank_button1"
                  onClick={validateCashoutAmount}
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CashoutBank;

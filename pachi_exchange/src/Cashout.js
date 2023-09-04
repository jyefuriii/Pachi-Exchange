import React, { useState, useEffect } from "react";
import "./Cashout.css";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import CashoutSteps from "./CashoutSteps";
import axios from "axios";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function Cashout() {
  const [users, setUsers] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [, dispatch] = useStateValue([]);
  const history = useHistory();
  const cashout = () => {
    //Dispatch the item on the Data Layer
    if (cashAmount > users.userCashAmount) {
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        background: "url(/sweepstakeBG_modal.png)",
        title: `<img src="/pachi_logo.png" alt=""/>`,
        showConfirmButton: false,
        html: `<div style="height: 200px;
      width: auto; margin-top: 30px;
      "><span style="color: #297FCA; background: none; font-weight:550; font-size: 26px; line-height: 32px;">
      Cashout amount should not be more than your available amount.<br><br>
    </span>
    <span style="font-weight:550; color: #297FCA; font-size: 20px; line-height: 32px;">Please see<a href="http://knowledgebase.pachiplus.com/what-are-the-terms-conditions-of-use" target="_blank" style="font-weight:550; font-size: 20px; line-height: 32px;">terms and conditions.</a></span></div>`,
        customClass: {
          background: "swalBackground",
          container: "swalContainer",
          closeButton: "swalCloseButton",
          title: "swalTitle1",
        },
      });
    }
    if (users.userCashAmount >= 999 && cashAmount > 999) {
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        background: "url(/sweepstakeBG_modal.png)",
        title: `<img src="/pachi_logo.png" alt=""/>`,
        showConfirmButton: false,
        html: `<div style="height: 200px;
      width: auto; margin-top: 30px;
      "><span style="color: #297FCA; background: none; font-weight:550; font-size: 26px; line-height: 32px;">
      Oops. You have exceeded the maximum cash out value of $999.<br><br>
    </span>
    <span style="font-weight:550; color: #297FCA; font-size: 20px; line-height: 32px;">Please see<a href="http://knowledgebase.pachiplus.com/what-are-the-terms-conditions-of-use" target="_blank" style="font-weight:550; font-size: 20px; line-height: 32px;">terms and conditions.</a></span></div>`,
        customClass: {
          background: "swalBackground",
          container: "swalContainer",
          closeButton: "swalCloseButton",
          title: "swalTitle1",
        },
      });
    }
    if (cashAmount < 100) {
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        background: "url(/sweepstakeBG_modal.png)",
        title: `<img src="/pachi_logo.png" alt=""/>`,
        showConfirmButton: false,
        html: `<div style="height: 200px;
      width: auto; margin-top: 30px;
      "><span style="color: #297FCA; background: none; font-weight:550; font-size: 26px; line-height: 32px;">
      Oops. You don't have enough to cash out. The minimum cash out is $100.<br><br>
    </span>
    <span style="font-weight:550; color: #297FCA; font-size: 20px; line-height: 32px;">Please see<a href="http://knowledgebase.pachiplus.com/what-are-the-terms-conditions-of-use" target="_blank" style="font-weight:550; font-size: 20px; line-height: 32px;">terms and conditions.</a></span></div>`,
        customClass: {
          background: "swalBackground",
          container: "swalContainer",
          closeButton: "swalCloseButton",
          title: "swalTitle1",
        },
      });
    }
    if (
      cashAmount > 99 &&
      cashAmount < 1000 &&
      users.userCashAmount > 99 &&
      cashAmount <= users.userCashAmount
    ) {
      history.push("/CashoutOption");
    }
    dispatch({
      type: "CASHOUT",
      cashout: {
        cashAmount: Number(cashAmount),
      },
    });
  };
  async function getUsers() {
    const usersRes = await axios.get("http://localhost:8001/auth/login");
    setUsers(usersRes.data);
  }
  //useEffect
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="cashout_container">
      <HomeHeader />
      <CashoutSteps />
      <div className="cashout_contents">
        <div className="cashout_details">
          <div className="cashoutImage_container">
            <img src="/cashoutMoney_img.png" alt="" />
          </div>
          <div className="cashout_col2">
            <h1>Input your cashout amount</h1>
            <span>
              Type in the amount you would like to cash out.<br></br>
              <br></br>
            </span>
            <span style={{ color: "#3FA2F7" }}>
              *This process is irreversible. Please double-check and review the
              amount before confirming this transaction. Minimum cash out is
              $100, Maximum cash out is $999. Fees and charges may apply, please
              read
              <a
                href="http://knowledgebase.pachiplus.com/what-are-the-terms-conditions-of-use"
                target="_blank"
                rel="noreferrer"
              >
                Terms and Conditions.
              </a>
            </span>
            <div className="cashout_inputs">
              <div>
                <label>AVAILABLE AMOUNT:</label>
                <input
                  type="text"
                  placeholder=""
                  value={users.userCashAmount}
                  style={{
                    width: "123px",
                    color: "#3fa2f7",
                    fontWeight: "700",
                  }}
                />
              </div>
              <div>
                <label>CASHOUT AMOUNT:</label>
                <input
                  type="number"
                  placeholder=""
                  min="100"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  style={{
                    width: "129.5px",
                    color: "#3fa2f7",
                    fontWeight: "700",
                  }}
                />
              </div>
              <button className="cashOutButton" onClick={cashout}>
                CONTINUE
              </button>
            </div>
            <span>
              Are You Verified?<br></br>
            </span>
            <p className="cashoutText_verify">
              To enable cashout requests on this website, Pachi Exchange
              requires proper user identification. Please make sure your account
              profile is complete.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cashout;

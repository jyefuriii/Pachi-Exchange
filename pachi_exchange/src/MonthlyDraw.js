import React, { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import "./MonthlyDraw.css";
import axios from "axios";
import Swal from "sweetalert2";
//import { useHistory } from "react-router-dom";

function MonthlyDraw() {
  const [users, setUsers] = useState([]);
  const [drawType, setDrawType] = useState([]);

  async function getUsers() {
    const usersRes = await axios.get("http://localhost:8001/auth/login");
    setUsers(usersRes.data);
  }

  async function getDrawType() {
    const lotteryRes = await axios.get("http://localhost:8001/lottery/monthly");
    setDrawType(lotteryRes.data);
  }
  //useEffect
  useEffect(() => {
    getUsers();
    getDrawType();
  }, [users, drawType]);

  async function updateTickets() {
    const newTickets =
      Number(users.userTickets) - Number(drawType.lotteryTicket);
    try {
      const ticketData = {
        userTickets: newTickets,
      };

      await axios.put("http://localhost:8001/auth/updateTickets", ticketData);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errorMessage);
      }
    }
  }

  async function addDrawEntry() {
    if (users.userTickets >= drawType.lotteryTicket) {
      try {
        const drawEntryData = {
          lotteryType: drawType.lotteryType,
          prize: drawType.prize,
          cashPrize: drawType.cashPrize,
          count: drawType.count,
          lotteryTicket: drawType.lotteryTicket,
          freeEntry: false,
        };
        const lotteryEntryRes = await axios.post(
          "http://localhost:8001/lotteryEntry/monthlyDraw",
          drawEntryData
        );
        updateTickets();
        setDrawType(lotteryEntryRes.data);
        Swal.fire({
          showCloseButton: true,
          closeButtonText: "X",
          background: "url(/sweepstakeBG_modal.png)",
          title: `<img src="/pachi_logo.png" alt=""/>`,
          showConfirmButton: false,
          html: `<div style="height: 250px;
        width: auto; margin-top: 20px;
        "><span style="color: #3fa2f7; background: none; font-weight:550; font-size: 24px; line-height: 22px;">
        YOU’RE IN THE DRAW TO WIN THE MONTHLY PRIZE!
        <div style="display:flex; flex-direction: row; align-content:center; justify-content: center; align-items:center; margin-top: 10px;">
        <div style="width: 280px; height:160px; border-radius:50%; background:#fff; border: 3px solid #145484;z-index:100;">
        <img src="/sweepstakeMonthly_modal.png" alt="" style="width:115px; height: 70px; margin-bottom:-130px;"/>
        </div>
        <div style="background: #297FCA; justify-content:center;align-items:center; border-radius: 15px; height: 140px;margin-left:-40px; text-align:left; padding:8px 10px 15px 50px;">
        <span>The Monthly Draw is drawn at 12am
        (NY EST. TIME) every first day of the month. <br><br>
        Your tickets are saved into <a href="/MyAccount" style="color: #fff; margin-left:0px;">My Account</a>, log back in later to see if you’ve won! </span>
        </div>
        </div>
      </span>
      </div>`,
          customClass: {
            background: "swalBackground",
            container: "swalContainer",
            closeButton: "swalCloseButton",
            title: "swalTitle1",
          },
        });
      } catch (error) {
        Swal.fire({
          showCloseButton: true,
          closeButtonText: "X",
          background: "url(/sweepstakeBG_modal.png)",
          title: `<img src="/pachi_logo.png" alt=""/>`,
          showConfirmButton: false,
          html: `<div style="height: 200px;
          width: auto; margin-top: 30px;
          "><span style="color: #3fa2f7; background: none; font-weight:550; font-size: 26px; line-height: 32px;">
          ${error.response.data.errorMessage}
        </span></div>`,
          customClass: {
            background: "swalBackground",
            container: "swalContainer",
            closeButton: "swalCloseButton",
            title: "swalTitle1",
          },
        });
      }
    } else {
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        title: "Insufficient Tickets",
        showConfirmButton: false,
        html: `<span style="color: #3fa2f7; background: #fff; font-size: 18px;">
        You don't have enough tickets to purchase monthly draw entry.
      </span>`,
        customClass: {
          closeButton: "swalCloseButton",
          title: "swalTitle",
        },
      });
    }
  }
  async function addFreeEntry() {
    try {
      const freeEntryData = {
        lotteryType: drawType.lotteryType,
        prize: drawType.prize,
        cashPrize: drawType.cashPrize,
        count: drawType.count,
        lotteryTicket: drawType.lotteryTicket,
        freeEntry: true,
      };
      const lotteryEntryRes = await axios.post(
        "http://localhost:8001/lotteryEntry/freeEntry/monthly",
        freeEntryData
      );
      setDrawType(lotteryEntryRes.data);
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        background: "url(/sweepstakeBG_modal.png)",
        title: `<img src="/pachi_logo.png" alt=""/>`,
        showConfirmButton: false,
        html: `<div style="height: 250px;
      width: auto; margin-top: 20px;
      "><span style="color: #3fa2f7; background: none; font-weight:550; font-size: 24px; line-height: 22px;">
      YOU’RE IN THE DRAW TO WIN THE MONTHLY PRIZE!
      <div style="display:flex; flex-direction: row; align-content:center; justify-content: center; align-items:center; margin-top: 10px;">
      <div style="width: 280px; height:160px; border-radius:50%; background:#fff; border: 3px solid #145484;z-index:100;">
      <img src="/sweepstakeMonthly_modal.png" alt="" style="width:115px; height: 70px; margin-bottom:-130px;"/>
      </div>
      <div style="background: #297FCA; justify-content:center;align-items:center; border-radius: 15px; height: 140px;margin-left:-40px; text-align:left; padding:8px 10px 15px 50px;">
      <span>The Monthly Draw is drawn at 12am
      (NY EST. TIME) every first day of the month. <br><br>
      Your tickets are saved into <a href="/MyAccount" style="color: #fff; margin-left:0px;">My Account</a>, log back in later to see if you’ve won! </span>
      </div>
      </div>
    </span>
    </div>`,
        customClass: {
          background: "swalBackground",
          container: "swalContainer",
          closeButton: "swalCloseButton",
          title: "swalTitle1",
        },
      });
    } catch (error) {
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        background: "url(/sweepstakeBG_modal.png)",
        title: `<img src="/pachi_logo.png" alt=""/>`,
        showConfirmButton: false,
        html: `<div style="height: 200px;
        width: auto; margin-top: 30px;
        "><span style="color: #3fa2f7; background: none; font-weight:550; font-size: 26px; line-height: 32px;">
        ${error.response.data.errorMessage}
      </span></div>`,
        customClass: {
          background: "swalBackground",
          container: "swalContainer",
          closeButton: "swalCloseButton",
          title: "swalTitle1",
        },
      });
    }
  }

  return (
    <div className="monthlyDraw_mainContainer">
      <HomeHeader />
      <div className="monthlyDraw_container">
        <div className="monthlyDraw_contents">
          <div className="monthlyDraw_head">
            <h1>SWEEPSTAKES ENTRY</h1>
            <h3>
              THANK YOU FOR LOGGING IN TODAY, YOU HAVE 1 FREE ENTRY TO A DRAW OF
              YOUR CHOICE
            </h3>
          </div>
        </div>
        <div className="drawEntry_container">
          <div className="drawEntry_header">
            <h2>MONTHLY DRAW</h2>
            <div className="monthlyDraw_rewards">
              <span>REWARD(USD):</span>
              <span>50.00 USD</span>
            </div>
          </div>
          <div className="monthlyEntry_contents">
            <div className="monthlyEntry_image">
              <img src="/monthlyDraw_ticket.png" alt="" />
            </div>
            <div className="monthlyDraw_col2">
              <div className="monthlyEntryInput_quantity">
                <label>QTY:</label>
                <input
                  type="number"
                  placeholder=""
                  min="1"
                  max="1"
                  value={drawType.count}
                  style={{ width: "148px" }}
                />
              </div>
              <div className="monthlyEntryInput_tickets">
                <label>TICKET COST:</label>
                <input
                  type="text"
                  placeholder=""
                  value={drawType.lotteryTicket}
                  style={{ width: "148px" }}
                />
              </div>
              <div className="drawButton_container">
                <button className="monthlyEntry_button" onClick={addDrawEntry}>
                  EXCHANGE
                </button>
                <button className="monthlyFree_button" onClick={addFreeEntry}>
                  USE MY FREE ENTRY
                </button>
              </div>
              <span>
                View my sweepstake entries in
                <a className="drawAccount_link" href="/MyAccount">
                  My Account
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MonthlyDraw;

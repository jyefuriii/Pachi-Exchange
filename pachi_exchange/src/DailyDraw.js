import React, { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import "./DailyDraw.css";
import axios from "axios";
import Swal from "sweetalert2";
//import { useHistory } from "react-router-dom";

function DailyDraw() {
  const [users, setUsers] = useState([]);
  const [drawType, setDrawType] = useState([]);
  /*const now = new Date();
  const dailyDrawDate = new Date();
  dailyDrawDate.setHours(12, 0, 0); // 12pm

  if (now > dailyDrawDate) {
    dailyDrawDate.setDate(dailyDrawDate.getDate() + 1);
    dailyDrawDate.setHours(12, 0, 0);
  }
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Manila",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const drawDate = dailyDrawDate.toLocaleDateString("en-PH", options);
  dailyDrawDate.toLocaleTimeString("en-PH", options);*/

  async function getUsers() {
    const usersRes = await axios.get("http://localhost:8001/auth/login");
    setUsers(usersRes.data);
  }
  async function getDrawType() {
    const lotteryRes = await axios.get("http://localhost:8001/lottery/daily");
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
      if (error.res) {
        alert(error.res.data.errorMessage);
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
          "http://localhost:8001/lotteryEntry/dailyDraw",
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
        YOU’RE IN THE DRAW TO WIN THE DAILY PRIZE!
        <div style="display:flex; flex-direction: row; align-content:center; justify-content: center; align-items:center; margin-top: 10px;">
        <div style="width: 280px; height:160px; border-radius:50%; background:#fff; border: 3px solid #145484;z-index:100;">
        <img src="/sweepstakeDaily_modal.png" alt="" style="width:115px; height: 70px; margin-bottom:-130px;"/>
        </div>
        <div style="background: #297FCA; justify-content:center;align-items:center; border-radius: 15px; height: 140px;margin-left:-40px; text-align:left; padding:8px 10px 15px 50px;">
        <span>The Daily Draw is drawn at 12am (NY EST. TIME) everyday. <br><br>
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
        You don't have enough tickets to purchase daily draw entry.
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
        "http://localhost:8001/lotteryEntry/freeEntry/daily",
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
      YOU’RE IN THE DRAW TO WIN THE DAILY PRIZE!
      <div style="display:flex; flex-direction: row; align-content:center; justify-content: center; align-items:center; margin-top: 10px;">
      <div style="width: 280px; height:160px; border-radius:50%; background:#fff; border: 3px solid #145484;z-index:100;">
      <img src="/sweepstakeDaily_modal.png" alt="" style="width:115px; height: 70px; margin-bottom:-130px;"/>
      </div>
      <div style="background: #297FCA; justify-content:center;align-items:center; border-radius: 15px; height: 140px;margin-left:-40px; text-align:left; padding:8px 10px 15px 50px;">
      <span>The Daily Draw is drawn at 12am (NY EST. TIME) everyday. <br><br>
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
    <div className="dailyDraw_mainContainer">
      <HomeHeader />
      <div className="dailyDraw_container">
        <div className="dailyDraw_contents">
          <div className="dailyDraw_head">
            <h1>SWEEPSTAKES ENTRY</h1>
            <h3>
              THANK YOU FOR LOGGING IN TODAY, YOU HAVE 1 FREE ENTRY TO A DRAW OF
              YOUR CHOICE
            </h3>
          </div>
        </div>
        <div className="drawEntry_container">
          <div className="drawEntry_header">
            <h2>DAILY DRAW</h2>
            <div className="dailyDraw_rewards">
              <span>REWARD:</span>
              <span>250 TICKETS</span>
            </div>
          </div>
          <div className="dailyEntry_contents">
            <div className="dailyEntry_image">
              <img src="/dailyDraw_ticket.png" alt="" />
            </div>
            <div className="dailyDraw_col2">
              <div className="dailyEntryInput_quantity">
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
              <div className="dailyEntryInput_tickets">
                <label>TICKET COST:</label>
                <input
                  type="text"
                  placeholder=""
                  value={drawType.lotteryTicket}
                  style={{ width: "148px" }}
                />
              </div>
              <div className="drawButton_container">
                <button className="dailyEntry_button" onClick={addDrawEntry}>
                  EXCHANGE
                </button>
                <button className="dailyFree_button" onClick={addFreeEntry}>
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

export default DailyDraw;

import React, { useEffect, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import "../styles/WeeklyDraw.css";
import axios from "axios";
import Swal from "sweetalert2";
import * as assets from "../assets";
//import { useHistory } from "react-router-dom";

function WeeklyDraw() {
  const [users, setUsers] = useState([]);
  const [drawType, setDrawType] = useState([]);
  var now = new Date();
  const weeklyDrawDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay() + 1
  );
  weeklyDrawDate.setHours(12, 0, 0); // 12pm

  if (now > weeklyDrawDate) {
    // too late, go to tomorrow
    weeklyDrawDate.setDate(weeklyDrawDate.getDate() + 7);
    weeklyDrawDate.setHours(12, 0, 0);
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
  const drawDate = weeklyDrawDate.toLocaleDateString("en-PH", options);
  weeklyDrawDate.toLocaleTimeString("en-PH", options);

  async function getUsers() {
    const usersRes = await axios.get("http://localhost:8001/auth/login");
    setUsers(usersRes.data);
  }
  async function getDrawType() {
    const lotteryRes = await axios.get("http://localhost:8001/lottery/weekly");
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
          "http://localhost:8001/lotteryEntry/weeklyDraw",
          drawEntryData
        );
        updateTickets();
        setDrawType(lotteryEntryRes.data);
        Swal.fire({
          showCloseButton: true,
          background: "transparent",
          closeButtonText: "X",
          title: `<img src="${assets.pachi_logo}" alt=""/>`,
          showConfirmButton: false,
          html: `<div style="position: relative; overflow: hidden;">
            <div style="height: 100%; width: 100%; position: absolute; top: 0; left: 0; z-index: -1;"></div>
            <div style="position: relative; z-index: 1; padding: 20px;">
              <span style="color: #3fa2f7; background: none; font-weight:550; font-size: 24px; line-height: 22px;">
                YOU’RE IN THE DRAW TO WIN THE WEEKLY PRIZE!
                <div style="display:flex; flex-direction: row; align-content:center; justify-content: center; align-items:center; margin-top: 10px;">
                  <div style="width: 280px; height:160px; border-radius:50%; background:#fff; border: 3px solid #145484;z-index:2;">
                    <img src="${assets.weeklyDrawTicket}" alt="" style="width:115px; height: 70px; margin-bottom:-130px;"/>
                  </div>
                  <div style="background: #297FCA; justify-content:center;align-items:center; border-radius: 15px; height: 140px;margin-left:-40px; text-align:left; padding:8px 10px 15px 50px;">
        <span>The Weekly Draw is drawn at 12am (NY EST. TIME) every Sunday of the week. <br><br>
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
          backdrop: `url(${assets.sweepstakesBgModal}) no-repeat center center`,
          backdropPadding: "0px",
          backdropOpacity: 1,
          backdropSize: "cover",
          width: "600px",
        });
      } catch (error) {
        Swal.fire({
          showCloseButton: true,
          background: "transparent",
          closeButtonText: "X",
          title: `<img src="${assets.pachi_logo}" alt=""/>`,
          showConfirmButton: false,
          html: `<div style="position: relative; overflow: hidden;">
            <div style="height: 100%; width: 100%; position: absolute; top: 0; left: 0; z-index: -1;"></div>
            <div style="position: relative; z-index: 1; padding: 80px; background: transparent;">
              <span style="color: #3fa2f7; background: none; font-weight:550; font-size: 26px; line-height: 32px;">
                ${error.response.data.errorMessage}
              </span>
            </div>
          </div>`,
          customClass: {
            popup: "swalBackground",
            container: "swalContainer",
            closeButton: "swalCloseButton",
            title: "swalTitle1",
          },
          backdrop: `url(${assets.sweepstakesBgModal}) no-repeat center center`,
          backdropPadding: "0px",
          backdropOpacity: 1,
          backdropSize: "cover",
          width: "600px",
        });
      }
    } else {
      Swal.fire({
        showCloseButton: true,
        background: "transparent",
        closeButtonText: "X",
        title: "Insufficient Tickets",
        showConfirmButton: false,
        html: `<div style="position: relative; overflow: hidden;">
            <div style="height: 100%; width: 100%; position: absolute; top: 0; left: 0; z-index: -1;"></div>
            <div style="position: relative; z-index: 1; padding: 95px; background: transparent;">
              <span style="color: #3fa2f7; background: none; font-weight:550; font-size: 26px; line-height: 32px;">
                You don't have enough tickets to purchase weekly draw entry.
              </span>
            </div>
          </div>`,
        customClass: {
          popup: "swalBackground",
          closeButton: "swalCloseButton",
          title: "swalTitle1",
        },
        backdrop: `url(${assets.sweepstakesBgModal}) no-repeat center center`,
        backdropPadding: "0px",
        backdropOpacity: 1,
        backdropSize: "cover",
        width: "600px",
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
        drawDate: String(drawDate),
        freeEntry: true,
      };
      const lotteryEntryRes = await axios.post(
        "http://localhost:8001/lotteryEntry/freeEntry/weekly",
        freeEntryData
      );
      setDrawType(lotteryEntryRes.data);
      Swal.fire({
        showCloseButton: true,
        background: "transparent",
        closeButtonText: "X",
        title: `<img src="${assets.pachi_logo}" alt=""/>`,
        showConfirmButton: false,
        html: `<div style="position: relative;">
          <div style="position: relative; z-index: 1; padding: 20px;">
            <span style="color: #3fa2f7; background: none; font-weight:550; font-size: 24px; line-height: 22px;">
              YOU’RE IN THE DRAW TO WIN THE WEEKLY PRIZE!
              <div style="display:flex; flex-direction: row; align-content:center; justify-content: center; align-items:center; margin-top: 10px;">
                <div style="width: 280px; height:160px; border-radius:50%; background:#fff; border: 3px solid #145484;z-index:2;">
                  <img src="${assets.weeklyDrawTicket}" alt="" style="width:115px; height: 70px; margin-bottom:-130px;"/>
                </div>
                <div style="background: #297FCA; justify-content:center;align-items:center; border-radius: 15px; height: 140px;margin-left:-40px; text-align:left; padding:8px 10px 15px 50px;">
      <span>The Weekly Draw is drawn at 12am
      (NY EST. TIME) every Sunday of the week. <br><br>
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
        backdrop: `url(${assets.sweepstakesBgModal}) no-repeat center center`,
        backdropPadding: "0px",
        backdropOpacity: 1,
        backdropSize: "cover",
        width: "600px",
      });
    } catch (error) {
      Swal.fire({
        showCloseButton: true,
        background: "transparent",
        closeButtonText: "X",
        title: `<img src="${assets.pachi_logo}" alt=""/>`,
        showConfirmButton: false,
        html: `<div style="position: relative;">
          <div style="position: relative; z-index: 1; padding: 50px;">
            <span style="color: #3fa2f7; background: none; font-weight:550; font-size: 24px; line-height: 22px;">
            <span style="color: #3fa2f7; background: none; font-weight:550; font-size: 26px; line-height: 32px;">
            ${error.response.data.errorMessage}</span>
                </div>
              </div>
            </span>
          </div>
        </div>`,
        customClass: {
          popup: "swalBackground",
          container: "swalContainer",
          closeButton: "swalCloseButton",
          title: "swalTitle1",
        },
        backdrop: `url(${assets.sweepstakesBgModal}) no-repeat center center`,
        backdropPadding: "0px",
        backdropOpacity: 1,
        backdropSize: "cover",
        width: "600px",
      });
    }
  }

  return (
    <div className="weeklyDraw_mainContainer">
      <HomeHeader />
      <div className="weeklyDraw_container">
        <div className="weeklyDraw_contents">
          <div className="weeklyDraw_head">
            <h1>SWEEPSTAKES ENTRY</h1>
            <h3>
              THANK YOU FOR LOGGING IN TODAY, YOU HAVE 1 FREE ENTRY TO A DRAW OF
              YOUR CHOICE
            </h3>
          </div>
        </div>
        <div className="drawEntry_container">
          <div className="drawEntry_header">
            <h2>WEEKLY DRAW</h2>
            <div className="weeklyDraw_rewards">
              <span>REWARD(USD):</span>
              <span>20.00 USD</span>
            </div>
          </div>
          <div className="weeklyEntry_contents">
            <div className="weeklyEntry_image">
              <img src={assets.weeklyDrawTicket} alt="" />
            </div>
            <div className="weeklyDraw_col2">
              <div className="weeklyEntryInput_quantity">
                <label>QTY:</label>
                <input
                  type="number"
                  placeholder=""
                  min="1"
                  max="1"
                  value={drawType.count}
                  style={{ width: "148px" }}
                  readOnly
                />
              </div>
              <div className="weeklyEntryInput_tickets">
                <label>TICKET COST:</label>
                <input
                  type="text"
                  placeholder=""
                  value={drawType.lotteryTicket}
                  style={{ width: "148px" }}
                  readOnly
                />
              </div>
              <div className="drawButton_container">
                <button className="weeklyEntry_button" onClick={addDrawEntry}>
                  EXCHANGE
                </button>
                <button className="weeklyFree_button" onClick={addFreeEntry}>
                  USE MY FREE ENTRY
                </button>
              </div>
              <div className="weeklyDraw_span">
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
      </div>
      <Footer />
    </div>
  );
}

export default WeeklyDraw;

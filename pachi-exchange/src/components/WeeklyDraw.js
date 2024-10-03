import React, { useEffect, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import "../styles/WeeklyDraw.css";
import axios from "axios";
import Swal from "sweetalert2";
import * as assets from "../assets";

function WeeklyDraw() {
  const [users, setUsers] = useState([]);
  const [drawType, setDrawType] = useState({});
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

  async function getUsers() {
    const usersRes = await axios.get("http://localhost:8001/auth/login");
    setUsers(usersRes.data);
  }

  async function getDrawType() {
    const lotteryRes = await axios.get("http://localhost:8001/lottery/weekly");
    setDrawType(lotteryRes.data);
  }

  // useEffect
  useEffect(() => {
    getUsers();
    getDrawType();
  }, []); // Removed users and drawType from the dependency array to prevent re-fetching

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
      // Code for adding draw entry when tickets are sufficient
      await updateTickets();
      Swal.fire({
        title: "Entry Added",
        text: `You have successfully added an entry to the weekly draw.`,
        icon: "success",
      });
    } else {
      // Code for handling insufficient tickets
      Swal.fire({
        title: "Insufficient Tickets",
        text: `You do not have enough tickets to enter this draw.`,
        icon: "error",
      });
    }
  }

  async function addFreeEntry() {
    // Code for adding a free entry
    Swal.fire({
      title: "Free Entry Added",
      text: `You have successfully added a free entry to the weekly draw.`,
      icon: "success",
    });
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
                  value={drawType.count ?? ""} // Default to an empty string if undefined
                  style={{ width: "148px" }}
                  onChange={(e) =>
                    setDrawType({ ...drawType, count: e.target.value })
                  } // Handle input change
                />
              </div>
              <div className="weeklyEntryInput_tickets">
                <label>TICKET COST:</label>
                <input
                  type="text"
                  placeholder=""
                  value={drawType.lotteryTicket ?? ""} // Default to an empty string if undefined
                  style={{ width: "148px" }}
                  readOnly // Consider making this field read-only if not editable
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

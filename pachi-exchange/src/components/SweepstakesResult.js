import React from "react";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import "../styles/SweepstakesResult.css";
import DailyWinnerPagination from "../components/DailyWinnerPagination";
import WeeklyWinnerPagination from "../components/WeeklyWinnerPagination";
import MonthlyWinnerPagination from "../components/MonthlyWinnerPagination";
import * as assets from "../assets"; // Import all assets

function SweepstakesResult() {
  return (
    <div className="sweepstakesResult_mainContainer" id="daily">
      <HomeHeader />
      <img src={assets.sweepstakesResultBanner} alt="" />
      <div className="sweepstakesResult_contents">
        <div className="sweepstakesResult_head">
          <h1>SWEEPSTAKES WINNERS</h1>
        </div>
      </div>
      <div className="sweepstakesResult_container">
        <div className="sweepstakesResult_header">
          <h2>Daily Draw Result for the Last 7 Days</h2>
          <div className="sweepstakesResult_rewards">
            <div className="sweepstakeResult_tab">
              <img src={assets.sweepstakesStar} alt="" />
              <span>Price at stake: 250 Tickets</span>
            </div>
          </div>
        </div>
        <div className="sweepstakesResult_colName">
          <div className="sweepstakes_colHead"></div>
          <div className="sweepstakesResult_colData">
            <DailyWinnerPagination />
          </div>
        </div>
      </div>
      <div className="sweepstakesResult_container" id="weekly">
        <div className="sweepstakesResult_header2">
          <h2>Weekly Draw Result for the Last 7 Draws</h2>
          <div className="sweepstakesResult_rewards">
            <div className="sweepstakeResult_tab">
              <img src={assets.sweepstakesStar} alt="" />
              <span>Price at stake: 20.00 USD</span>
            </div>
          </div>
        </div>
        <div className="sweepstakesResult_colName">
          <div className="sweepstakes_colHead"></div>
          <div className="sweepstakesResult_colData">
            <WeeklyWinnerPagination />
          </div>
        </div>
      </div>
      <div className="sweepstakesResult_container" id="monthly">
        <div className="sweepstakesResult_header3">
          <h2>Monthly Draw Result for the Last 7 Draws</h2>
          <div className="sweepstakesResult_rewards">
            <div className="sweepstakeResult_tab">
              <img src={assets.sweepstakesStar} alt="" />
              <span>Price at stake: 50.00 USD </span>
            </div>
          </div>
        </div>
        <div className="sweepstakesResult_colName">
          <div className="sweepstakes_colHead"></div>
          <div className="sweepstakesResult_colData">
            <MonthlyWinnerPagination />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SweepstakesResult;

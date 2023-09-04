import React, { useEffect, useState } from "react";
import "./DailyWinnerPagination.css";
import DrawWinnerWeekly from "./DrawWinnerWeekly";
import axios from "axios";

const renderWeeklyWinnersData = (lotteryEntry) => {
  return lotteryEntry.map((item) => {
    return (
      <DrawWinnerWeekly
        key={item._id}
        _id={item._id}
        drawDate={item.drawDate}
        drawNumber={item.drawNumber}
        username={item.username}
      />
    );
  });
};

function WeeklyWinnerPagination() {
  const [drawWinners, setDrawWinners] = useState([]);
  async function getDailyWinners() {
    const lotteryWinnerRes = await axios.get(
      "http://localhost:8001/lotteryWinner/weekly"
    );
    setDrawWinners(lotteryWinnerRes.data);
  }

  //useEffect
  useEffect(() => {
    getDailyWinners();
  }, [drawWinners]);

  return (
    <div>
      <div className="dailyWinner-container">
        <div className="dailyWinner_column">
          {renderWeeklyWinnersData(drawWinners)}
        </div>
      </div>
    </div>
  );
}

export default WeeklyWinnerPagination;

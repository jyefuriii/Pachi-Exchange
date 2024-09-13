import React, { useEffect, useState } from "react";
import "../styles/DailyWinnerPagination.css";
import DrawWinnerDaily from "../components/DrawWinnerDaily";
import axios from "axios";

const renderDailyWinnersData = (lotteryEntry) => {
  return lotteryEntry.map((item) => {
    return (
      <DrawWinnerDaily
        key={item._id}
        _id={item._id}
        drawDate={item.drawDate}
        drawNumber={item.drawNumber}
        username={item.username}
      />
    );
  });
};

function DailyWinnerPagination() {
  const [drawWinners, setDrawWinners] = useState([]);
  async function getDailyWinners() {
    const lotteryWinnerRes = await axios.get(
      "http://localhost:8001/lotteryWinner/daily"
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
          {renderDailyWinnersData(drawWinners)}
        </div>
      </div>
    </div>
  );
}

export default DailyWinnerPagination;

import React, { useEffect, useState } from "react";
import "../styles/DailyWinnerPagination.css";
import DrawWinnerMonthly from "../components/DrawWinnerMonthly";
import axios from "axios";

const renderMonthlyWinnersData = (lotteryEntry) => {
  return lotteryEntry.map((item) => {
    return (
      <DrawWinnerMonthly
        key={item._id}
        _id={item._id}
        drawDate={item.drawDate}
        drawNumber={item.drawNumber}
        username={item.username}
      />
    );
  });
};

function MonthlyWinnerPagination() {
  const [drawWinners, setDrawWinners] = useState([]);
  async function getDailyWinners() {
    const lotteryWinnerRes = await axios.get(
      "http://localhost:8001/lotteryWinner/monthly"
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
        <table className="dailyDrawWinner_table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Draw Number</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>{renderMonthlyWinnersData(drawWinners)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default MonthlyWinnerPagination;

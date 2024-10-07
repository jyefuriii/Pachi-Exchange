import React, { useEffect, useState } from "react";
import "../styles/DailyWinnerPagination.css";
import DrawWinnerDaily from "../components/DrawWinnerDaily";
import axios from "axios";

const renderDailyWinnersData = (lotteryEntry) => {
  return lotteryEntry.map((item) => (
    <DrawWinnerDaily
      key={item._id}
      drawDate={item.drawDate}
      drawNumber={item.drawNumber}
      username={item.username}
    />
  ));
};

function DailyWinnerPagination() {
  const [drawWinners, setDrawWinners] = useState([]);

  // Fetch daily winners from API
  async function getDailyWinners() {
    const lotteryWinnerRes = await axios.get(
      "http://localhost:8001/lotteryWinner/daily"
    );
    setDrawWinners(lotteryWinnerRes.data);
  }

  // Fetch data only once when component mounts
  useEffect(() => {
    getDailyWinners();
  }, []);

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
          <tbody>{renderDailyWinnersData(drawWinners)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default DailyWinnerPagination;

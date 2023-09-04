import React from "react";
import "./DrawWinnerDaily.css";

function DrawWinnerWeekly({ username, drawNumber, drawDate }) {
  var options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Manila",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  var today = new Date(drawDate);
  const dailyDrawDate = today.toLocaleString("en-PH", options);
  return (
    <div className="dailyDrawWinner_info">
      <p className="dailyDraw_date">
        <strong>{dailyDrawDate}</strong>
      </p>
      <p className="dailyDraw_number">
        <strong>{drawNumber}</strong>
      </p>
      <p className="dailyDraw_username">
        <strong>{username}</strong>
      </p>
    </div>
  );
}

export default DrawWinnerWeekly;

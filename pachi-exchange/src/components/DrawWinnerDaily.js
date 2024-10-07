import React from "react";
import "../styles/DrawWinnerDaily.css";

function DrawWinnerDaily({ username, drawNumber, drawDate }) {
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Manila",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const today = new Date(drawDate);
  const dailyDrawDate = today.toLocaleString("en-PH", options);

  return (
    <tr>
      <td className="dailyDraw_date">
        <strong>{dailyDrawDate}</strong>
      </td>
      <td className="dailyDraw_number">
        <strong>{drawNumber}</strong>
      </td>
      <td className="dailyDraw_username">
        <strong>{username}</strong>
      </td>
    </tr>
  );
}

export default DrawWinnerDaily;

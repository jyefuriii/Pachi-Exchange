import React from "react";
import "./AccountDrawEntry.css";

function AccountDrawEntry({ entryId, lotteryType, drawDate }) {
  return (
    <div className="entryDraw_info">
      <p className="entry_id">
        <strong>{entryId}</strong>
      </p>
      <p className="entry_type">
        <strong>{lotteryType}</strong>
      </p>
      <p className="entry_date">
        <strong>{drawDate}</strong>
      </p>
    </div>
  );
}

export default AccountDrawEntry;

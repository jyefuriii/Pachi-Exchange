import React from "react";
import "./AccountRewards.css";

function AccountRewards({ name, purchaseDate, status }) {
  return (
    <div className="premium_info">
      <p className="rewards_name">
        <strong>{name}</strong>
      </p>
      <p className="rewards_date">
        <strong>{purchaseDate}</strong>
      </p>
      <p className="rewards_status">
        <strong>{status}</strong>
      </p>
    </div>
  );
}

export default AccountRewards;

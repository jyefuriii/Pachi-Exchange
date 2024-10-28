import React, { useEffect, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import "../styles/MyAccount.css";
import { Link } from "react-router-dom";
import axios from "axios";
import CollectionPagination from "../components/CollectionPagination";
import AccountGCPagination from "../components/AccountGCPagination";
import AccountLotteryPagination from "../components/AccountLotteryPagination";
import * as assets from "../assets"; // Import all assets

function MyAccount() {
  const [users, setUsers] = useState("");
  const [collection, setCollection] = useState([]);
  const [drawEntry, setDrawEntry] = useState([]);
  const [giftCardCollection, setGiftCardCollection] = useState([]);

  async function getUsers() {
    const usersRes = await axios.get("http://localhost:8001/auth/login");
    setUsers(usersRes.data);
  }

  async function getCollection() {
    const collectionRes = await axios.get("http://localhost:8001/collection");
    setCollection(collectionRes.data);
  }

  async function getLottery() {
    const lotteryEntryRes = await axios.get(
      "http://localhost:8001/lotteryEntry/entries"
    );
    setDrawEntry(lotteryEntryRes.data);
  }

  async function getGiftCardCollection() {
    const giftcardCollectionRes = await axios.get(
      "http://localhost:8001/giftcardCollection"
    );
    setGiftCardCollection(giftcardCollectionRes.data);
  }

  useEffect(() => {
    getUsers();
    getCollection();
    getGiftCardCollection();
    getLottery();
  }, []);

  return (
    <div>
      <HomeHeader />
      <div className="my_account_container">
        <h1>MY ACCOUNT</h1>
        <div className="personalDetails_row">
          <div className="cashTickets_container">
            <div className="cashOut_container">
              <span>Cash Value (USD)</span>
              <div className="cashAmount">
                <input
                  type="text"
                  value={new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(users.userCashAmount)}
                  style={{ fontSize: 18, color: "#4E95D2" }}
                />
              </div>
              <Link className="cashOut_link" to="Cashout">
                <button className="account_cashOutButton">CASH OUT</button>
              </Link>
            </div>
            <div className="cashOut_container">
              <span>Pachi Tickets</span>
              <div className="ticketAmount">
                <img className="AccountTicketImage" src={assets.accountTicket} alt="" />
                <input
                  type="text"
                  value={new Intl.NumberFormat().format(users.userTickets)}
                  style={{ fontSize: 18, color: "#4E95D2" }}
                />
              </div>
            </div>
          </div>
          <div className="personalDetails_container">
            <h2>Personal Details</h2>
            <div className="person_info_container">
              <div className="person_details_img">
                <img src={assets.personDetailsAvatar} alt="" />
                <img src={assets.personDetailsMobile} alt="" />
                <img src={assets.personDetailsMail} alt="" />
              </div>
              <div className="person_details_fields">
                <span className="person_details_info">{users.fullName}</span>
                <span className="person_details_info">{users.phoneNumber}</span>
                <span className="person_details_info">
                  {users.emailAddress}
                </span>
              </div>
              <Link className="updateDetails_link" to="/UpdateAccount">
                <div>
                  <button className="account_editButton">EDIT</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="myAccount_rows">
          <div className="myAccount_col1">
            <div className="shippingDetails_container">
              <h2>Shipping Details</h2>
              <div className="person_info_container">
                <div className="person_details_img">
                  <img src={assets.personDetailsAvatar} alt="" />
                  <img src={assets.personDetailsLocation} alt="" />
                </div>
                <div className="shipping_details_fields">
                  <span className="shipping_details_info">
                    {users.shippingName} {users.shippingLastName}
                  </span>
                  <span className="shipping_details_info">
                    {users.address1} {users.city} {users.address2}{" "}
                    {users.country}
                  </span>
                </div>
                <Link className="updateDetails_link" to="./UpdateAccount">
                  <div>
                    <button className="shipping_editButton">EDIT</button>
                  </div>
                </Link>
              </div>
            </div>
            <div className="premium_collection_container">
              <h1>My Premium Prize Collection</h1>
              {collection.length !== 0 ? (
                <div>
                  <CollectionPagination />
                </div>
              ) : (
                <div className="noCollection_container">
                  <h2>You don't have any collection</h2>
                  <h5>Proceed to shop and purchase to collect items.</h5>
                </div>
              )}
            </div>
          </div>
          <div className="myAccount_col2">
            <div className="sweepstakesLog_container">
              <span>Sweepstakes</span>
              <div className="sweepstakesLog_header">
                <div className="sweepstakes_header">Entry Logs</div>
                <div className="sweepstakes_columnInfo">
                  <p className="sweepstakes_columnHeader">
                    <strong>Entry ID</strong>
                  </p>
                  <p className="sweepstakes_columnHeader">
                    <strong>Entry Type</strong>
                  </p>
                  <p className="sweepstakes_columnHeader">
                    <strong>Draw Date</strong>
                  </p>
                </div>
                {drawEntry.length !== 0 ? (
                    <AccountLotteryPagination />
                ) : (
                  <div className="noCollection_container1">
                    <h4>No records to show</h4>
                  </div>
                )}
              </div>
              <Link className="cashOut_link" to="./Sweepstakes">
                <button className="account_cashOutButton2">ENTER MORE</button>
              </Link>
            </div>
            <div className="rewardsLog_container">
              <span>Rewards and Prizes</span>
              <div className="rewardsLog_header">
                <div className="rewards_header">Reward Logs</div>
                <div className="rewards_columnInfo">
                  <p className="rewards_columnHeader">
                    <strong>Rewards</strong>
                  </p>
                  <p className="rewards_columnHeader">
                    <strong>Date</strong>
                  </p>
                  <p className="rewards_columnHeader">
                    <strong>Status</strong>
                  </p>
                </div>
                {giftCardCollection.length !== 0 ? (
                  <div>
                    <AccountGCPagination />
                  </div>
                ) : (
                  <div className="noCollection_container1">
                    <h4>No records to show</h4>
                  </div>
                )}
              </div>
              <Link className="cashOut_link" to="./Shop">
                <button className="account_cashOutButton2">
                  EXCHANGE MORE
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="myAccount_bottom_container">
          <h3>Get More Tickets!</h3>
          <p>
            The more you play, the more Pachi tickets you accumulate in exchange
            for rewards and prizes.
          </p>
          <div className="pachiWeb_button_container">
            <a href="https://play.pachiplus.com/" target="blank">
              <button className="account_playPachiButton">
                PLAY PACHI+ NOW
              </button>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyAccount;

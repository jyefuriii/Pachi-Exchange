import React, { useState, useEffect } from "react";
import "./ProductEmailVerify.css";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import GiftCardStepsTwo from "./GiftCardStepsTwo";
import validator from "validator";
import axios from "axios";

function ProductEmailVerify() {
  const [users, setUsers] = useState([]);
  const [{ product }] = useStateValue("");
  const item = JSON.parse(JSON.stringify({ product }));
  const productItem = item.product[product.length - 1];
  const [emailAddress, setEmailAddress] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();
  const giftcardCollectionData = {
    image: productItem.image,
    price: productItem.price,
    description: productItem.description,
    description1: productItem.description1,
    description2: productItem.description2,
    description3: productItem.description3,
    description4: productItem.description4,
    description5: productItem.description5,
    name: productItem.name,
    emailVerification: productItem.emailVerification,
    emailAddress: emailAddress,
    type: productItem.type,
    productTicket: productItem.productTicket,
  };

  async function getUsers() {
    const usersRes = await axios.get("http://localhost:8001/auth/login");
    setUsers(usersRes.data);
  }
  //useEffect
  useEffect(() => {
    getUsers();
  }, []);
  async function updateTickets() {
    const newTickets =
      Number(users.userTickets) - Number(productItem.productTicket);
    try {
      const ticketData = {
        userTickets: newTickets,
      };

      await axios.put("http://localhost:8001/auth/updateTickets", ticketData);
    } catch (err) {
      if (err.response) {
        alert(err.response.data.errorMessage);
      }
    }
  }
  useEffect(() => {
    setIsDisabled(!validator.isEmail(emailAddress));
  }, [emailAddress]);

  async function exchangeGiftCards() {
    if (validator.isEmail(emailAddress)) {
      try {
        await axios.post(
          "http://localhost:8001/giftcardCollection",
          giftcardCollectionData
        );
        //await axios.post(
        //"https://mern-auth-template-tutorial.herokuapp.com/auth/",
        //registerData
        //);
      } catch (err) {
        setIsDisabled(true);
        alert("Enter valid Email!");
        alert(err.response.data.errorMessage);
      }
      await updateTickets();
      history.push(
        productItem.type === "gc" ? "/ExchangeGiftCard" : "/ExchangeMysteryBox"
      );
    } else {
      alert("Please input your preferred email.");
    }
  }

  return (
    <div className="productEmailVerify_container">
      <HomeHeader />
      <GiftCardStepsTwo />
      <div className="productEmailVerify_contents">
        <h1>Verify Email</h1>
        <p>
          Provide your preferred email to receive your Gift Cards or Mystery
          boxes.
        </p>
        <p>
          Please check your Spam or Promotions folder if you fail to receive it
          in your inbox.
        </p>
        <input
          type="email"
          className="emailVerify_input"
          placeholder="Email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        <div className="confirm_button">
          <button
            onClick={exchangeGiftCards}
            disabled={isDisabled}
            className="productEmailVerify_button"
          >
            CONFIRM
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductEmailVerify;

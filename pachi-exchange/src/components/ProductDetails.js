import React, { useState, useEffect } from "react";
import "../styles/ProductDetails.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import * as assets from "../assets"; // Import all assets from index.js

function ProductDetails({
  image,
  _id,
  price,
  description,
  description1,
  description2,
  description3,
  description4,
  description5,
  name,
  emailVerification,
  type,
  shortName,
  count,
  productTicket,
}) {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  async function getUsers() {
    const usersRes = await axios.get("http://localhost:8001/auth/login");
    setUsers(usersRes.data);
  }
  //useEffect
  useEffect(() => {
    getUsers();
  }, []);
  async function updateTickets() {
    const newTickets = Number(users.userTickets) - Number(productTicket);
    try {
      const ticketData = {
        userTickets: newTickets,
      };

      await axios.put("http://localhost:8001/auth/updateTickets", ticketData);

      history.push("/ExchangeTrophy");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.errorMessage);
      }
    }
  }
  async function exchangeProduct() {
    if (users.userTickets >= productTicket) {
      if (emailVerification === false) {
        try {
          const collectionData = {
            image,
            price,
            description,
            description1,
            description2,
            description3,
            description4,
            description5,
            name,
            emailVerification,
            type,
            count,
            shortName,
            productTicket,
          };

          await axios.post("http://localhost:8001/collection", collectionData);
          //await axios.post(
          //"https://mern-auth-template-tutorial.herokuapp.com/auth/",
          //registerData
          //);
          await getUsers();
          updateTickets();
        } catch (err) {
          alert(err.response.data.errorMessage);
        }
      } else {
        history.push("/ProductEmailVerify");
      }
    } else {
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        title: "Insufficient Tickets",
        showConfirmButton: false,
        html: `<span style="color: #3fa2f7; background: #fff; font-size: 18px;">
        You don't have enough tickets to purchase this item.
      </span>`,
        customClass: {
          closeButton: "swalCloseButton",
          title: "swalTitle",
        },
      });
    }
  }

  // Function to format the image source path
  const formatImageSrc = (src) => {
    if (src.startsWith("./")) {
      return require(`../assets/${src.slice(2)}`); // Dynamically require the image
    }
    return src;
  };

  // Use the imported asset or format the image prop path
  const imageSrc = assets[image] ? assets[image] : formatImageSrc(image);

  return (
    <div className="productDetails_container">
      <div className="productExchange_container">
        <div className="productDesc_col">
          <div className="productImage_container">
            <img src={imageSrc} alt="" />
            <p className="productDesc_price">
              <strong>${price}.00</strong>
            </p>
          </div>
        </div>
        <div className="productDesc_col2">
          <h1>{name}</h1>
          <div className="productDescInput_container">
            <p>
              {description}
              <br></br>
              <br></br>
              {description1}
              <br></br>
              <br></br>
              {description2}
              <br></br>
              <br></br>
              {description3}
              <br></br>
              <br></br>
              {description4}
              <br></br>
              <br></br>
              {description5}
              <br></br>
              <br></br>
              {emailVerification}
            </p>
            <div className="input_quantity">
              <label>QTY:</label>
              <input
                type="number"
                placeholder=""
                min="1"
                max="1"
                value={count}
                style={{ width: "123px" }}
              />
            </div>
            <div className="input_tickets">
              <div>
                <label>Tickets:</label>
                <input
                  type="text"
                  placeholder=""
                  style={{ width: "148px" }}
                  value={productTicket}
                />
              </div>
              <div className="continue_button">
                <button
                  key={_id}
                  id={_id}
                  onClick={exchangeProduct}
                  className="productDesc_button"
                >
                  CONTINUE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

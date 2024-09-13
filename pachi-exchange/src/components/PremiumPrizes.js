import React from "react";
import "../styles/PremiumPrizes.css";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router-dom";
import * as assets from "../assets"; // Import all assets from index.js

function PremiumPrizes({
  _id,
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
  shortName,
  count,
  productTicket,
}) {
  const [, dispatch] = useStateValue([]);
  const history = useHistory();

  const addToProduct = () => {
    dispatch({
      type: "ADD_TO_PRODUCT",
      item: {
        _id,
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
        shortName,
        count,
        productTicket,
      },
    });
    history.push("./Product_description");
  };

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
    <div className="premiumPrizes_container">
      <img src={imageSrc} alt={name} />
      <div className="premiumPrizes_info">
        <p className="premiumPrizes_price">
          <small>
            <strong>$</strong>
          </small>
          <strong>{price}.00</strong>
        </p>
      </div>
      <button onClick={addToProduct} key={_id} className="exchange_button">
        EXCHANGE
      </button>
    </div>
  );
}

export default PremiumPrizes;

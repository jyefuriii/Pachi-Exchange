import React from "react";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router-dom";
import "../styles/PremiumCollection.css";
import * as assets from "../assets"; // Import all assets from index.js


function PremiumCollection({
  image,
  _id,
  price,
  count,
  name,
  uniqueId,
  shortName,
  productTicket,
}) {
  const [, dispatch] = useStateValue([]);
  const history = useHistory();
  const redeemProduct = () => {
    //Dispatch the item on the Data Layer
    dispatch({
      type: "REDEEM_PRODUCT",
      item: {
        image: image,
        price: price,
        count: count,
        name: name,
        shortName: shortName,
        productTicket,
      },
    });

    history.push("./RedeemDescription");
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
    <div className="premiumCollection_container">
      <span className="collectionCount">x{count}</span>
      <img src={imageSrc} alt="" />
      <div className="premiumCollection_info">
        <p className="premiumCollection_price">
          <small>
            <strong>$</strong>
          </small>
          <strong>{price}.00</strong>
        </p>
      </div>
      <button
        key={_id}
        id={uniqueId}
        className="redeem_button"
        onClick={(e) => redeemProduct()}
      >
        REDEEM
      </button>
    </div>
  );
}

export default PremiumCollection;

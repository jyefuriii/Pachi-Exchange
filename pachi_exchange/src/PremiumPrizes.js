import React from "react";
import "./PremiumPrizes.css";
//import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";

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
    //Dispatch the item on the Data Layer
    dispatch({
      type: "ADD_TO_PRODUCT",
      item: {
        _id: _id,
        image: image,
        price: price,
        description: description,
        description1: description1,
        description2: description2,
        description3: description3,
        description4: description4,
        description5: description5,
        name: name,
        emailVerification: emailVerification,
        type,
        shortName: shortName,
        count: count,
        productTicket: productTicket,
      },
    });

    history.push("./Product_description");
  };
  return (
    <div className="premiumPrizes_container">
      <img src={image} alt="" />
      <div className="premiumPrizes_info">
        <p className="premiumPrizes_price">
          <small>
            <strong>$</strong>
          </small>
          <strong>{price}.00</strong>
        </p>
      </div>
      <button
        onClick={(e) => addToProduct()}
        key={_id}
        className="exchange_button"
      >
        EXCHANGE
      </button>
    </div>
  );
}

export default PremiumPrizes;

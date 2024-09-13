import React from "react";
import "../styles/RedeemDescription.css";
import { useStateValue } from "../StateProvider";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import RedeemDetails from "../components/RedeemDetails";
import RedeemSteps from "../components/RedeemSteps";

function RedeemDescription() {
  const [{ redeemItem }] = useStateValue("");
  return (
    <div className="redeemDesc_container">
      <HomeHeader />
      <RedeemSteps />
      <div className="redeemDesc_contents">
        {redeemItem.slice(-1).map((item) => (
          <RedeemDetails
            _id={item._id}
            image={item.image}
            price={item.price}
            count={item.count}
            name={item.name}
            purchaseDate={item.purchaseDate}
            shortName={item.shortName}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default RedeemDescription;

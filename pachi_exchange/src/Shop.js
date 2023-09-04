import React from "react";
import "./Shop.css";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import Pagination from "./Pagination";

function Shop() {
  return (
    <div className="shopPage">
      <HomeHeader />
      <div className="shopMobile_header">
        <h1>Collecting Prizes has never been this fun!</h1>
        <h2>You’ve played well. Now, reap the rewards! </h2>
      </div>
      <div className="shopBackground">
        <img src="./shop_bg.png" alt="" className="shop_bg" />
        <img src="./shopMobile_bg.png" alt="" className="shopMobile_bg" />
      </div>
      <div className="shop_container">
        <div className="shop_header">
          <h1>Your Pachi Tickets to Prizes</h1>
        </div>
        <div className="shop_content">
          <div className="shop_col1">
            <div>
              <img
                src="./browseSelect_img.png"
                className="browseSelect_img"
                alt=""
              />
            </div>
          </div>
          <img src="./shop_arrow.png" className="shop_arrow" alt="" />
          <div className="shop_col2">
            <div>
              <img
                src="./cartConfirm_img.png"
                className="cartConfirm_img"
                alt=""
              />
            </div>
          </div>
          <img src="./shop_arrow.png" className="shop_arrow2" alt="" />
          <div className="shop_col3">
            <div>
              <img
                src="./claimCollect_img.png"
                className="claimCollect_img"
                alt=""
              />
              <img
                src="claimCollect_img2.png"
                className="claimCollect_img2"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="shopPrize_container">
        <h1>Select From The Following Premium Prizes and Rewards</h1>
      </div>
      <Pagination />
      <Footer />
    </div>
  );
}

export default Shop;

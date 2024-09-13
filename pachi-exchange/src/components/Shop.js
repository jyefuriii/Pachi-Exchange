import React from "react";
import "../styles/Shop.css";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import ShopPagination from "../components/ShopPagination";
import * as assets from "../assets"; // Import all assets

function Shop() {
  return (
    <div className="shopPage">
      <HomeHeader />
      <div className="shopMobile_header">
        <h1>Collecting Prizes has never been this fun!</h1>
        <h2>You’ve played well. Now, reap the rewards!</h2>
      </div>
      <div className="shopBackground">
        <img src={assets.shop_bg} alt="" className="shop_bg" />
        <img src={assets.shopMobile_bg} alt="" className="shopMobile_bg" />
      </div>
      <div className="shop_container">
        <div className="shop_header">
          <h1>Your Pachi Tickets to Prizes</h1>
        </div>
        <div className="shop_content">
          <div className="shop_col1">
            <div>
              <img
                src={assets.browseSelect_img}
                className="browseSelect_img"
                alt=""
              />
            </div>
          </div>
          <img src={assets.shop_arrow} className="shop_arrow" alt="" />
          <div className="shop_col2">
            <div>
              <img
                src={assets.cartConfirm_img}
                className="cartConfirm_img"
                alt=""
              />
            </div>
          </div>
          <img src={assets.shop_arrow} className="shop_arrow2" alt="" />
          <div className="shop_col3">
            <div>
              <img
                src={assets.claimCollect_img}
                className="claimCollect_img"
                alt=""
              />
              <img
                src={assets.claimCollect_img2}
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
      <ShopPagination />
      <Footer />
    </div>
  );
}

export default Shop;

import React from "react";
import "./ProductDescription.css";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import { useStateValue } from "./StateProvider";
import ProductDetails from "./ProductDetails";
import PrizeSteps from "./PrizeSteps";
import GiftCardSteps from "./GiftCardSteps";

function ProductDescription() {
  const [{ product }] = useStateValue("");
  const item = JSON.parse(JSON.stringify({ product }));
  const emailVerify = item.product[product.length - 1].emailVerification;

  return (
    <div className="productDesc_container">
      <HomeHeader />
      {emailVerify ? <GiftCardSteps /> : <PrizeSteps />}
      <div className="productDesc_contents">
        {product.slice(-1).map((item) => (
          <ProductDetails
            key={item._id}
            _id={item._id}
            image={item.image}
            price={item.price}
            name={item.name}
            description={item.description}
            description1={item.description1}
            description2={item.description2}
            description3={item.description3}
            description4={item.description4}
            description5={item.description5}
            emailVerification={item.emailVerification}
            type={item.type}
            shortName={item.shortName}
            productTicket={item.productTicket}
            count={item.count}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ProductDescription;

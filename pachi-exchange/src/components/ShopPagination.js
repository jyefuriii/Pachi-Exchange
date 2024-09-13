import React, { useEffect, useState } from "react";
import "../styles/ShopPagination.css";
import CallMadeIcon from "@material-ui/icons/CallMade";
import PremiumPrizes from "../components/PremiumPrizes";
import axios from "../axios";

const renderData = (product) => {
  return product.map((item) => {
    return (
      <PremiumPrizes
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
    );
  });
};

function ShopPagination() {
  const [product, setProducts] = useState([]);

  async function getProducts() {
    const productRes = await axios.get("http://localhost:8001/productitems");
    setProducts(productRes.data);
  }

  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 481) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  //useEffect
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    getProducts();
  }, []);

  const [currentPage, setcurrentPage] = useState(1);
  const itemsPerPage = isMobile ? 10 : 9;

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(product.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = product.slice(indexOfFirstItem, indexOfLastItem);
  const maxPageNumberLimit = Math.ceil(product.length / itemsPerPage);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > 0) {
      return (
        <div
          key={number}
          id={number}
          onClick={handleClick}
          className={
            currentPage === number ? "round-effect active" : "round-effect"
          }
        >
          {number}
        </div>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    if (currentPage < maxPageNumberLimit) {
      setcurrentPage(currentPage + 1);
    }
  };

  const handlePrevbtn = () => {
    if (currentPage > 1) {
      setcurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex-container">
      <div className="shopPrize_row">{renderData(currentItems)}</div>
      <div className="paginate-ctn">
        <div
          className="round-effect"
          onClick={handlePrevbtn}
          disabled={currentPage === pages[0] ? true : false}
        >
          {" "}
          <CallMadeIcon className="lArrow" />
          {" Previous"}
        </div>
        {renderPageNumbers}

        <div
          className="round-effect"
          onClick={handleNextbtn}
          disabled={currentPage === pages[pages.length - 1] ? true : false}
        >
          {"Next "}
          <CallMadeIcon className="rArrow" />{" "}
        </div>
      </div>
    </div>
  );
}

export default ShopPagination;

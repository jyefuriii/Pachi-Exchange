import React, { useEffect, useState } from "react";
import "./AccountGCPagination.css";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import AccountRewards from "./AccountRewards";
import axios from "axios";

const renderAccountGCData = (collection) => {
  return collection.map((item) => {
    return (
      <AccountRewards
        key={item._id}
        _id={item._id}
        image={item.image}
        price={item.price}
        name={item.name}
        type={item.type}
        purchaseDate={item.purchaseDate}
        status={item.status}
      />
    );
  });
};

function AccountGCPagination() {
  const [collection, setCollection] = useState([]);
  async function getCollection() {
    const giftcardCollectionRes = await axios.get(
      "http://localhost:8001/giftcardCollection"
    );
    setCollection(giftcardCollectionRes.data);
  }

  //useEffect
  useEffect(() => {
    getCollection();
  }, [collection]);

  const [currentPage, setcurrentPage] = useState(1);
  const itemsPerPage = 10;

  const pages = [];
  for (let i = 1; i <= Math.ceil(collection.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = collection.slice(indexOfFirstItem, indexOfLastItem);
  const maxPageNumberLimit = Math.ceil(collection.length / itemsPerPage);

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
    <div>
      <div className="flex-container">
        <div className="shopPrize_column">
          {renderAccountGCData(currentItems)}
        </div>
      </div>
      <div className="paginate-ctn2">
        <div
          className="round-effects1"
          onClick={handlePrevbtn}
          disabled={currentPage === pages[0] ? true : false}
        >
          <ArrowLeftIcon
            className="lArrows"
            style={{ width: "60px", height: "50px" }}
          />
        </div>
        <div className="paginate_Pages">
          {currentPage}/{maxPageNumberLimit}
        </div>
        <div
          className="round-effects1"
          onClick={handleNextbtn}
          disabled={currentPage === pages[pages.length - 1] ? true : false}
        >
          <ArrowRightIcon
            className="rArrows"
            style={{ width: "60px", height: "50px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default AccountGCPagination;
